import { X, PlusIcon, FolderMinus, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import {
  sanitizeProductName,
  sanitizeProductPrice,
  MAX_PRICE,
  MAX_FILES_LENGTH,
  MAX_VIDEOS_LENGTH,
  checkNameValidity,
  checkPriceValidity,
  categories,
  conditions,
  attributes,
  warranties,
  options,
  type FilePreview,
  sanitizeProductModel,
  sanitizeProductBrand,
} from "../validator/listProductForm";
import CustomCalendar from "../components/CustomCalendar";
import { uploadFileSchema } from "../schema/products";
import SelectMenu from "../components/CustomDropMenu";
import type { Product } from "../schema/products";
import createProduct, { completeProduct } from "../services/productService";
import { showToast } from "../components/ToastUI";

interface ListingFormProps {
  isOpenForm: boolean;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}
interface CreateListingInput {
  product: Product;
  selectedFiles: File[];
}

type CreateProductResponse = Awaited<ReturnType<typeof createProduct>>;

interface PendingUpload {
  response: CreateProductResponse;
  selectedFiles: File[];
  receivedAt: number;
  uploadsComplete: boolean;
  uploadedKeys: Set<string>;
}

// R2 URLs are valid for 10 minutes. Leave a margin for clock skew / network delay.
const PRESIGNED_URL_RETRY_WINDOW_MS = 8 * 60 * 1000;

const ListingForm = ({ isOpenForm, setIsOpenForm }: ListingFormProps) => {
  const queryClient = useQueryClient();

  // Validation is derived from the current field values to avoid stale flags.
  const [nameTouched, setNameTouched] = useState(false);
  const [priceTouched, setPriceTouched] = useState(false);
  const [fileError, setFileError] = useState("");

  // These setters are required by the existing SelectMenu component.
  const [, setHasListCategory] = useState(false);
  const [, setHasListCondition] = useState(false);
  const [, setHasDelivery] = useState(false);
  const [, setHasListWarranty] = useState(false);
  const [, setWarrantyLabel] = useState("");

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [attrFormToggle, setAttrFormToggle] = useState(false);
  const [categoryLabel, setCategoryLabel] = useState("");
  const [conditionLabel, setConditionLabel] = useState("");

  const [listName, setListName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("");
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [attributesList, setAttributesList] = useState<typeof attributes>([]);
  const [attrYear, setAttrYear] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [warranty, setWarranty] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlsRef = useRef<Set<string>>(new Set());

  // Once POST /products succeeds, retry R2 uploads without another POST.
  const pendingUploadRef = useRef<PendingUpload | null>(null);
  const [hasPendingUpload, setHasPendingUpload] = useState(false);
  const [uploadLinksExpired, setUploadLinksExpired] = useState(false);

  useEffect(() => {
    const previewUrls = previewUrlsRef.current;
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      previewUrls.clear();
    };
  }, []);

  const releasePreview = (url: string) => {
    URL.revokeObjectURL(url);
    previewUrlsRef.current.delete(url);
  };

  const hasFiles = files.length > 0;
  const rawPrice = price.replace(/,/g, "");
  const priceNumber = Number(rawPrice);
  const isValidName = listName.trim() !== "" && checkNameValidity(listName);
  const isValidPrice =
    rawPrice !== "" &&
    checkPriceValidity(rawPrice) &&
    Number.isFinite(priceNumber) &&
    priceNumber >= 0.01 &&
    priceNumber <= MAX_PRICE;

  const nameError =
    nameTouched && listName && !isValidName ? "Product name is invalid" : "";
  const priceError =
    priceTouched && rawPrice && !isValidPrice
      ? priceNumber > MAX_PRICE
        ? "Price cannot exceed ₱10,000,000"
        : "Price is not valid"
      : "";

  const isListValid =
    isValidName &&
    isValidPrice &&
    Boolean(category) &&
    Boolean(condition) &&
    hasFiles &&
    Boolean(deliveryOption);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(sanitizeProductName(e.target.value));
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModel(sanitizeProductModel(e.target.value));
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(sanitizeProductBrand(e.target.value));
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeProductPrice(e.target.value);

    if (sanitized === "") {
      setPrice("");
      return;
    }
    const [integer, decimal] = sanitized.split(".");
    const formattedInteger = Number(integer).toLocaleString("en-PH");

    const formatted =
      decimal !== undefined
        ? `${formattedInteger}.${decimal}`
        : formattedInteger;

    setPrice(formatted);
  };

  const handlePriceBlur = () => setPriceTouched(true);
  const handleNameBlur = () => setNameTouched(true);

  const handleToggle = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const handleClose = () => {
    setOpenMenu(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    // Native input is not our source of truth. Clearing it lets users reselect.
    e.target.value = "";
    if (!selectedFiles.length) return;

    if (files.length + selectedFiles.length > MAX_FILES_LENGTH) {
      setFileError(`You can upload a maximum of ${MAX_FILES_LENGTH} files.`);
      return;
    }

    const currentVideoCount = files.filter((item) =>
      item.file.type.startsWith("video/"),
    ).length;
    const selectedVideoCount = selectedFiles.filter((file) =>
      file.type.startsWith("video/"),
    ).length;

    if (currentVideoCount + selectedVideoCount > MAX_VIDEOS_LENGTH) {
      setFileError(`You can upload a maximum of ${MAX_VIDEOS_LENGTH} videos.`);
      return;
    }

    // The current backend uses original filenames as R2 object keys.
    // Duplicate names on one listing would overwrite the same object.
    const usedNames = new Set(files.map(({ file }) => file.name.toLowerCase()));
    for (const file of selectedFiles) {
      const parsed = uploadFileSchema.safeParse(file);
      if (!parsed.success) {
        setFileError(
          `${file.name}: ${parsed.error.issues[0]?.message ?? "Invalid file"}`,
        );
        return;
      }
      const normalizedName = file.name.toLowerCase();
      if (usedNames.has(normalizedName)) {
        setFileError(`A file named "${file.name}" has already been selected.`);
        return;
      }
      usedNames.add(normalizedName);
    }

    const newFiles: FilePreview[] = selectedFiles.map((file) => {
      const preview = URL.createObjectURL(file);
      previewUrlsRef.current.add(preview);
      return { file, preview };
    });

    setFiles((previous) => [...previous, ...newFiles]);
    setFileError("");
  };

  const handleRemoveFile = (index: number) => {
    const selected = files[index];
    if (!selected) return;
    releasePreview(selected.preview);
    setFiles((previous) => previous.filter((_, i) => i !== index));
    setFileError("");
  };

  const handleAttributeChange = (attribute: (typeof attributes)[number]) => {
    setAttributesList((previous) =>
      previous.some((item) => item.label === attribute.label)
        ? previous
        : [...previous, attribute],
    );
  };

  const handleRemoveAttribute = (label: string) => {
    const attribute = attributesList.find((item) => item.label === label);
    if (!attribute) return;

    if (attribute.value === "brand") setBrand("");
    if (attribute.value === "model") setModel("");
    if (attribute.value === "year-bought") setAttrYear("");
    if (attribute.element === "dropdown") {
      setWarranty("");
      setWarrantyLabel("");
      setHasListWarranty(false);
    }

    setAttributesList((previous) =>
      previous.filter((item) => item.label !== label),
    );
  };

  const resetForm = () => {
    setListName("");
    setPrice("");
    setCategory("");
    setCondition("");
    setDescription("");
    setDeliveryOption("");
    setAttributesList([]);
    setAttrYear("");
    setModel("");
    setBrand("");
    setWarranty("");

    setCategoryLabel("");
    setConditionLabel("");
    setWarrantyLabel("");
    setHasListCategory(false);
    setHasListCondition(false);
    setHasDelivery(false);
    setHasListWarranty(false);
    setNameTouched(false);
    setPriceTouched(false);
    setFileError("");
    setOpenMenu(null);
    setAttrFormToggle(false);

    files.forEach(({ preview }) => releasePreview(preview));
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";

    pendingUploadRef.current = null;
    setHasPendingUpload(false);
    setUploadLinksExpired(false);
  };

  const createProductMutation = useMutation({
    mutationKey: ["products", "create"],
    retry: false,

    mutationFn: async ({ product, selectedFiles }: CreateListingInput) => {
      let pending = pendingUploadRef.current;

      // Step 1: Create a product only once
      if (!pending) {
        const response = await createProduct(product);

        console.info("Product created (pending media):", response.product_id);

        pending = {
          response,
          selectedFiles,
          receivedAt: Date.now(),
          uploadsComplete: false,
          uploadedKeys: new Set<string>(),
        };

        pendingUploadRef.current = pending;
        setHasPendingUpload(true);
      }

      // Keep a stable reference for asynchronous callbacks
      const uploadState = pending;

      const uploadUrls = uploadState.response.upload_urls;

      if (uploadUrls.length !== uploadState.selectedFiles.length) {
        throw new Error("Upload URL count mismatch.");
      }

      // Ensure two files aren't targeting the same R2 object
      const objectKeys = uploadUrls.map((item) => item.object_key);

      if (new Set(objectKeys).size !== objectKeys.length) {
        throw new Error("Duplicate R2 object keys returned.");
      }

      // Step 2: Upload files not yet successfully uploaded
      if (!uploadState.uploadsComplete) {
        const remainingUploads = uploadUrls
          .map((upload, index) => ({
            upload,
            file: uploadState.selectedFiles[index],
          }))
          .filter(
            ({ upload }) => !uploadState.uploadedKeys.has(upload.object_key),
          );

        if (remainingUploads.length > 0) {
          // Only need valid URLs when PUT requests are still required
          if (
            Date.now() - uploadState.receivedAt >
            PRESIGNED_URL_RETRY_WINDOW_MS
          ) {
            setUploadLinksExpired(true);

            throw new Error("Presigned upload URLs have expired.");
          }

          const results = await Promise.allSettled(
            remainingUploads.map(async ({ upload, file }) => {
              const result = await fetch(upload.upload_url, {
                method: "PUT",
                headers: {
                  "Content-Type": file.type,
                },
                body: file,
              });

              if (!result.ok) {
                throw new Error(
                  `Failed to upload ${file.name}: ${result.status}`,
                );
              }

              // Remember this successful upload
              uploadState.uploadedKeys.add(upload.object_key);
            }),
          );

          const failures = results.filter(
            (result) => result.status === "rejected",
          );

          if (failures.length > 0) {
            throw new Error(
              `${failures.length} media file(s) failed to upload.`,
            );
          }
        }

        uploadState.uploadsComplete = true;
      }

      // Step 3: Ask FastAPI to verify all files and publish
      const completed = await completeProduct(uploadState.response.product_id);

      // Step 4: Confirm actual publication
      if (completed.listing_status !== "active") {
        throw new Error("Product publication was not confirmed.");
      }

      console.info("Product published:", completed);

      return uploadState.response;
    },

    onSuccess: (response) => {
      console.info("Product published successfully:", response.product_id);

      resetForm();

      void queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      showToast("Your product has been published successfully!", "success");
    },

    onError: (error: Error) => {
      console.error("Failed to create listing:", error);

      const pending = pendingUploadRef.current;

      if (error.message.includes("Presigned upload URLs have expired")) {
        showToast(
          "Upload links expired. Please refresh the upload URLs.",
          "error",
        );

        return;
      }

      if (pending?.uploadsComplete) {
        showToast(
          "Media uploaded, but publication wasn't confirmed. Retry publishing.",
          "error",
        );

        return;
      }

      if (pending) {
        showToast(
          "Some media uploads failed. Retry the remaining files.",
          "error",
        );

        return;
      }

      showToast(
        "Product creation failed or its result is unknown. Please check your listings before retrying.",
        "error",
      );
    },
  });

  const handleListingPost = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (createProductMutation.isPending || uploadLinksExpired) return;
    if (!isListValid) {
      setNameTouched(true);
      setPriceTouched(true);
      showToast("Please complete the required fields.", "error");
      return;
    }

    // When retrying a failed R2 upload, mutationFn uses its saved response and
    // file snapshot rather than issuing a second POST /products.
    const selected = new Set(attributesList.map((item) => item.value));
    const payloadAttributes: Product["attributes"] = {};
    if (selected.has("model") && model.trim())
      payloadAttributes.model = model.trim();
    if (selected.has("brand") && brand.trim())
      payloadAttributes.brand = brand.trim();
    if (
      attributesList.some((item) => item.element === "dropdown") &&
      warranty
    ) {
      payloadAttributes.warranty = warranty;
    }
    if (selected.has("year-bought") && attrYear.trim()) {
      const year = Number(attrYear);
      if (
        !Number.isInteger(year) ||
        year < 1900 ||
        year > new Date().getFullYear()
      ) {
        showToast("Please select a valid year purchased.", "error");
        return;
      }
      payloadAttributes.year_brought = year;
    }

    const product: Product = {
      name: listName,
      description,
      price: priceNumber,
      product_files: files.map(({ file }) => ({
        filename: file.name,
        content_type: file.type,
      })),
      category,
      condition,
      attributes: payloadAttributes,
      delivery_options: deliveryOption,
    };

    createProductMutation.mutate({
      product,
      selectedFiles: files.map(({ file }) => file),
    });
  };

  return (
    <>
      {isOpenForm ? (
        <div className="flex flex-col w-full rounded-2xl shadow-md shadow-gray-50 p-6">
          <div className="flex flex-row justify-between pb-7">
            <h1 className="text-lg md:text-xl font-bold">
              Product Listing Form
            </h1>
            <button
              type="button"
              onClick={() => setIsOpenForm(false)}
              className="hover:cursor-pointer"
              title="Close form"
            >
              <X />
            </button>
          </div>

          <form
            className="flex flex-col md:grid md:grid-cols-3 justify-evenly space-y-8 md:gap-8"
            onSubmit={handleListingPost}
          >
            <fieldset
              disabled={hasPendingUpload || createProductMutation.isPending}
              className="contents"
            >
              <div className="flex flex-col gap-6 justify-start">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm">Product name</label>
                  <input
                    minLength={3}
                    maxLength={50}
                    required
                    value={listName}
                    onBlur={handleNameBlur}
                    onChange={handleNameChange}
                    type="text"
                    className="text-sm outline outline-black/10 rounded-xl p-2 bg-gray-100/70 focus:bg-white focus:outline-[#85d65c]"
                  />
                  {!isValidName ? (
                    <p className="text-red-400">{nameError}</p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm">Price</label>
                  <input
                    required
                    type="text"
                    inputMode="decimal"
                    maxLength={14}
                    value={price}
                    onChange={handlePriceChange}
                    onBlur={handlePriceBlur}
                    placeholder="₱0.00"
                    className="text-sm outline outline-black/10 rounded-xl p-2 bg-gray-100/70 focus:bg-white focus:outline-[#85d65c]"
                  />
                  {!isValidPrice ? (
                    priceError === "Price cannot exceed ₱10,000,000" ? (
                      <p className="text-red-400">{priceError}</p>
                    ) : (
                      <p className="text-orange-400">{priceError}</p>
                    )
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm">Category</label>
                  <SelectMenu
                    placeholder="Select category"
                    options={categories}
                    label={setCategoryLabel}
                    value={category}
                    hasSelected={setHasListCategory}
                    onChange={setCategory}
                    isOpen={openMenu === "category"}
                    onClose={handleClose}
                    onToggle={() => handleToggle("category")}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm">Condition</label>
                  <SelectMenu
                    placeholder="What's your product conditon?"
                    options={conditions}
                    value={condition}
                    onChange={setCondition}
                    hasSelected={setHasListCondition}
                    label={setConditionLabel}
                    isOpen={openMenu === "condition"}
                    onClose={handleClose}
                    onToggle={() => handleToggle("condition")}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm">
                    Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={handleDescChange}
                    maxLength={2000}
                    rows={4}
                    className="text-sm outline outline-black/10 rounded-xl p-2 bg-gray-100/70 resize-none focus:bg-white focus:outline-[#85d65c]"
                  ></textarea>
                </div>
              </div>
              <div className="flex flex-col gap-6 justify-start">
                <div className="flex flex-col gap-4">
                  <label className="font-semibold text-sm">
                    Select and upload images or videos (max. of 6)
                  </label>
                  <div
                    className={`flex ${hasFiles ? "flex-col" : "flex-row"} justify-center items-stretch`}
                  >
                    <div
                      className={`w-full h-full ${hasFiles ? "rounded-xl mb-3 p-2" : "rounded-l-xl p-4"}  border-dashed border text-center`}
                    >
                      <div
                        className={`${hasFiles ? "hidden" : "block"} flex flex-col space-y-3 justify-center items-center`}
                      >
                        <p className="font-semibold">Only valid formats</p>
                        <p className="text-xs">Max. of 2 videos only</p>
                        <p className="text-xs">
                          JPG, PNG, WEBP · (5MB) MP4 · (25MB)
                        </p>
                      </div>
                      {files.length > 0 ? (
                        <div className="p-2 overflow-x-auto">
                          <div className="flex flex-row gap-3 w-max">
                            {files.slice(0, 6).map((item, index) => (
                              <div className="relative" key={item.preview}>
                                <button
                                  onClick={() => handleRemoveFile(index)}
                                  type="button"
                                  className="absolute top-2 right-2 rounded-full bg-white shadow-sm hover:cursor-pointer"
                                >
                                  <X size={20} />
                                </button>
                                {item.file.type.startsWith("image/") ? (
                                  <img
                                    className="rounded-xl aspect-square shrink-0 w-32 h-32"
                                    src={item.preview}
                                    alt={`Preview ${index + 1}`}
                                  />
                                ) : (
                                  <video
                                    src={item.preview}
                                    controls
                                    preload="metadata"
                                    playsInline
                                    className="rounded-xl aspect-video shrink-0 w-32 h-32"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={files.length === MAX_FILES_LENGTH}
                      className={`flex flex-col justify-center items-center ${hasFiles ? "p-3 rounded-3xl" : "rounded-r-2xl px-4"} disabled:opacity-50 disabled:cursor-not-allowed text-center text-white text-sm hover:cursor-pointer hover:bg-[#85d65c] active:bg-[#5fb33a] bg-[#75cf4c]`}
                    >
                      {hasFiles ? "Add Files" : "Choose files"}
                    </button>
                    <input
                      ref={fileInputRef}
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      multiple
                      accept="image/png,image/jpeg,image/webp,video/mp4"
                      className="outline-1 p-1 hidden"
                    />
                  </div>
                  <p className="text-red-400 text-sm">{fileError}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm">
                    Delivery / Meetup options
                  </label>
                  <SelectMenu
                    placeholder="How will the buyer receive the item?"
                    onChange={setDeliveryOption}
                    options={options}
                    value={deliveryOption}
                    hasSelected={setHasDelivery}
                    label={() => ""}
                    onClose={handleClose}
                    isOpen={openMenu === "delivery"}
                    onToggle={() => handleToggle("delivery")}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between items-center">
                    <label className="font-semibold text-sm">
                      Product attributes
                    </label>
                    {attributesList.length < attributes.length && (
                      <button
                        onClick={() => setAttrFormToggle((prev) => !prev)}
                        title="Add Brand, year purchased, model, or warranty"
                        type="button"
                        className="hover:cursor-pointer p-2 rounded-lg hover:bg-[#85d65c] active:bg-[#5fb33a] bg-[#75cf4c]"
                      >
                        {attrFormToggle ? (
                          <PlusIcon size={18} className="text-white" />
                        ) : (
                          <X size={18} className="text-white" />
                        )}
                      </button>
                    )}
                  </div>
                  {attributesList.length < attributes.length && (
                    <div
                      className={`${attrFormToggle ? "hidden" : "grid"} grid-rows-2 grid-cols-2 md:grid-rows-1 md:grid-cols-4 py-2 gap-4 md:gap-2.5 transition-all duration-300`}
                    >
                      {attributes
                        .filter(
                          (attribute) =>
                            !attributesList.some(
                              (selected) => selected.label === attribute.label,
                            ),
                        )
                        .map((attribute) => (
                          <button
                            key={attribute.label}
                            type="button"
                            onClick={() => handleAttributeChange(attribute)}
                            className="rounded-2xl text-sm shadow-md shadow-gray-200 p-2 hover:cursor-pointer hover:bg-gray-200"
                          >
                            {attribute.label}
                          </button>
                        ))}
                    </div>
                  )}
                  <div className="flex flex-col space-y-4">
                    {attributesList.map((attribute) => (
                      <div
                        key={attribute.label}
                        className="flex flex-col md:grid md:grid-cols-2 md:items-center gap-2 text-sm"
                      >
                        <label>{attribute.label}</label>
                        <div className="flex flex-row gap-2">
                          {attribute.element === "dropdown" ? (
                            <div className="w-full">
                              <SelectMenu
                                placeholder="Select warranty"
                                options={warranties}
                                label={setWarrantyLabel}
                                value={warranty}
                                hasSelected={setHasListWarranty}
                                onChange={setWarranty}
                                isOpen={openMenu === "warranty"}
                                onClose={handleClose}
                                onToggle={() => handleToggle("warranty")}
                              />
                            </div>
                          ) : (
                            <>
                              {attribute.value === "year-bought" ? (
                                <CustomCalendar
                                  value={attrYear}
                                  onChange={setAttrYear}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={
                                    attribute.value === "brand" ? brand : model
                                  }
                                  onChange={
                                    attribute.value === "brand"
                                      ? handleBrandChange
                                      : handleModelChange
                                  }
                                  maxLength={50}
                                  className="text-right outline outline-black/10 rounded-xl p-2 bg-gray-100/70 focus:bg-white focus:outline-[#85d65c] w-full"
                                ></input>
                              )}
                            </>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveAttribute(attribute.label)
                            }
                            className="hover:cursor-pointer"
                            title="Remove attribute"
                          >
                            <Trash2 size={18} color="red" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="flex flex-col gap-6 justify-start">
              <h1 className="font-bold text-md md:text-lg mb-5">Summary</h1>
              {hasPendingUpload && (
                <p
                  role="status"
                  className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800"
                >
                  Product record {pendingUploadRef.current?.response.product_id}{" "}
                  already exists. Details are locked until publication succeeds.
                </p>
              )}
              {uploadLinksExpired && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
                >
                  The upload links expired. This listing needs a backend
                  endpoint to generate fresh URLs before it can be retried.
                </p>
              )}
              {isValidName ? (
                <div className="flex flex-col justify-between gap-2 h-full pb-7">
                  <div className="grid grid-cols-2">
                    <div className="grid grid-rows-3 text-left gap-2 text-sm md:text-base">
                      <label className="font-semibold text-sm">
                        Product name:{" "}
                      </label>
                      <label className="font-semibold text-sm">
                        Category:{" "}
                      </label>
                      <label className="font-semibold text-sm">
                        Condition:{" "}
                      </label>
                    </div>
                    <div className="grid grid-rows-3 text-right gap-2 text-sm">
                      <p className="truncate">{listName || "-"}</p>
                      <p>{categoryLabel || "-"}</p>
                      <p>{conditionLabel || "-"}</p>
                    </div>
                    <div className="flex flex-row justify-between"></div>
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div className="flex flex-row justify-between">
                      <label className="font-semibold text-sm">
                        Price assessment:
                      </label>
                      <p className="truncate text-sm">
                        {price ? "₱" : null} {price}{" "}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={
                        createProductMutation.isPending ||
                        uploadLinksExpired ||
                        (!isListValid && !hasPendingUpload)
                      }
                      className="p-3 rounded-3xl disabled:cursor-not-allowed disabled:opacity-50 text-white hover:cursor-pointer hover:bg-[#85d65c] active:bg-[#5fb33a] bg-[#75cf4c]"
                    >
                      {createProductMutation.isPending
                        ? "Processing listing..."
                        : hasPendingUpload
                          ? pendingUploadRef.current?.uploadsComplete
                            ? "Retry publication"
                            : "Retry media upload"
                          : "List item"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                  <FolderMinus size={50} />
                  <p className="text-sm">
                    Listing breakdown unavailable, <br />
                    please fill up the form first
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};
export default ListingForm;
