import { X, PlusIcon, FolderMinus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  sanitizeProductName,
  sanitizeProductPrice,
  sanitizeYearBought,
  MAX_PRICE,
  MAX_FILES_LENGTH,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
  ALLOWED_TYPES,
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
import SelectMenu from "../components/CustomDropMenu";
// import type { Product } from "../schema/products";
interface ListingFormProps {
  isOpenForm: boolean;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListingForm = ({ isOpenForm, setIsOpenForm }: ListingFormProps) => {
  const [isValidName, setIsValidName] = useState<boolean>(false);
  const [isValidPrice, setIsValidPrice] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [hasListCategory, setHasListCategory] = useState<boolean>(false);
  const [hasListCondition, setHasListCondition] = useState<boolean>(false);
  const [hasDelivery, setHasDelivery] = useState<boolean>(false);
  // const [isListing, setIsListing] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [fileError, setFileError] = useState<string>("");
  const [attrFormToggle, setAttrFormToggle] = useState<boolean>(false);

  const [categoryLabel, setCategoryLabel] = useState<string>("");
  const [conditionLabel, setConditionLabel] = useState<string>("");

  const [listName, setListName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("");
  const [fileType, setFileType] = useState("");
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [attributesList, setAttributesList] = useState<typeof attributes>([]);

  const [attrYear, setAttrYear] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");

  const hasFiles = files.length > 0;

  const [warranty, setWarranty] = useState<string>("");
  const [, setWarrantyLabel] = useState<string>("");
  const [, setHasListWarranty] = useState<boolean>(false);

  const isListValid =
    isValidName &&
    isValidPrice &&
    hasListCategory &&
    hasListCondition &&
    hasDelivery;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(sanitizeProductName(e.target.value));
  };

  const handleAttrYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttrYear(sanitizeYearBought(e.target.value));
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModel(sanitizeProductModel(e.target.value));
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(sanitizeProductBrand(e.target.value));
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

  const handlePriceBlur = () => {
    const rawPrice = price.replace(/,/g, "");
    if (rawPrice === "") {
      setPriceError("");
      setIsValidPrice(false);
      return;
    }
    if (!checkPriceValidity(rawPrice)) {
      setIsValidPrice(false);
      setPriceError("Price is not valid");
    } else if (Number(rawPrice) > MAX_PRICE) {
      setIsValidPrice(false);
      setPriceError("Price cannot exceed ₱10,000,000");
    } else {
      setIsValidPrice(true);
      setPriceError("");
    }
  };

  const handleNameBlur = () => {
    if (listName === "") {
      setNameError("");
      setIsValidName(false);
      return;
    }
    if (!checkNameValidity(listName)) {
      setNameError("Product name is invalid");
      setIsValidName(false);
    } else {
      setNameError("");
      setIsValidName(true);
    }
  };

  const handleToggle = (menu: string) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const handleClose = () => {
    setOpenMenu(null);
  };

  const handleSubmitListing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    let current_size = 0;

    if (selectedFiles.length === 0) return;

    for (const file of selectedFiles) {
      if (file.type.startsWith("image")) {
        current_size = MAX_IMAGE_SIZE;
        setFileType("image");
      } else {
        current_size = MAX_VIDEO_SIZE;
        setFileType("video");
      }

      if (file.size > current_size) {
        setFileError(
          `${file.name} must be ${fileType === "image" ? "5" : "25"} MB or smaller.`,
        );
        return;
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        setFileError(`${file.name} is an unsupported file type.`);
        return;
      }
    }

    const newFiles: FilePreview[] = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFileError("");
    setFiles((prev) => [...prev, ...newFiles].slice(0, 6));
  };

  const handleAttributeChange = (attribute: (typeof attributes)[number]) => {
    setAttributesList((prev) => [...prev, attribute]);
  };

  const handleRemoveAttribute = (label: string) => {
    setAttributesList((prev) =>
      prev.filter((attribute) => attribute.label !== label),
    );
  };

  // const handleFileSubmit = () => {
  //   const products: Product = {

  //   };
  // };
  return (
    <>
      {isOpenForm ? (
        <div className="flex flex-col w-full rounded-2xl shadow-md shadow-gray-50 p-6">
          <div className="flex flex-row justify-between pb-7">
            <h1 className="text-lg md:text-2xl font-semibold">
              Product Listing Form
            </h1>
            <button
              onClick={() => setIsOpenForm(false)}
              className="hover:cursor-pointer"
              title="Close form"
            >
              <X />
            </button>
          </div>

          <form
            className="flex flex-col md:grid md:grid-cols-3 justify-evenly space-y-8 md:gap-8"
            onSubmit={handleSubmitListing}
            action=""
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
                  className="outline-1 outline-black rounded-3xl p-2"
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
                  min={1}
                  maxLength={10}
                  value={price}
                  onChange={handlePriceChange}
                  onBlur={handlePriceBlur}
                  max={1000000}
                  step={0.01}
                  placeholder="₱0.00"
                  className="outline-1 outline-black rounded-3xl p-2"
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
                  minLength={10}
                  maxLength={2000}
                  rows={4}
                  className="outline-1 outline-black rounded-xl p-2 resize-none"
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
                      <p className="text-xs md:text-sm">
                        JPG, PNG, WEBP · (5MB) MP4 · (25MB)
                      </p>
                    </div>
                    {files.length > 0 ? (
                      <div className="p-2 overflow-x-auto">
                        <div className="flex flex-row gap-3 w-max">
                          {files.slice(0, 6).map((item, index) => (
                            <div className="relative" key={index}>
                              <button
                                onClick={() => {
                                  setFiles((prev) =>
                                    prev.filter((_, i) => i !== index),
                                  );
                                }}
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
                                  autoPlay
                                  muted
                                  playsInline
                                  loop
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
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                    disabled={files.length === MAX_FILES_LENGTH}
                    className={`flex flex-col justify-center items-center ${hasFiles ? "p-3 rounded-3xl" : "rounded-r-2xl px-4"} disabled:opacity-50 disabled:cursor-not-allowed text-center text-white text-sm hover:cursor-pointer hover:bg-[#85d65c] active:bg-[#5fb33a] bg-[#75cf4c]`}
                  >
                    {hasFiles ? "Add Files" : "Choose files"}
                  </button>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    multiple
                    accept="image/png, image/webp, image/jpg, image/webp, video/mp4"
                    className="outline-1 p-1 hidden"
                  />
                  <p className="text-red-400">{fileError}</p>
                </div>
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
                    <div className="flex flex-col md:grid md:grid-cols-2 md:items-center gap-2">
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
                              <input
                                type="text"
                                value={attrYear}
                                maxLength={4}
                                onChange={handleAttrYearChange}
                                className="text-right p-1.5 pr-2 rounded-3xl outline-1 outline-black w-full"
                              ></input>
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
                                className="text-right p-1.5 pr-2 rounded-3xl outline-1 outline-black w-full"
                              ></input>
                            )}
                          </>
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveAttribute(attribute.label)}
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
            <div className="flex flex-col gap-6 justify-start">
              <h1 className="font-semibold text-md md:text-xl mb-5">Summary</h1>
              {isValidName ? (
                <div className="flex flex-col justify-between gap-2 h-full pb-7">
                  <div className="grid grid-cols-2">
                    <div className="grid grid-rows-3 text-left gap-2 text-sm md:text-base">
                      <label className="font-semibold">Product name: </label>
                      <label className="font-semibold">Category: </label>
                      <label className="font-semibold">Condition: </label>
                    </div>
                    <div className="grid grid-rows-3 text-right gap-2">
                      <p className="truncate">{listName || "-"}</p>
                      <p>{categoryLabel || "-"}</p>
                      <p>{conditionLabel || "-"}</p>
                    </div>
                    <div className="flex flex-row justify-between"></div>
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div className="flex flex-row justify-between">
                      <label className="font-semibold text-sm md:text-base">
                        Price assessment:
                      </label>
                      <p className="truncate">
                        {price ? "₱" : null} {price}{" "}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={!isListValid}
                      className="p-3 rounded-3xl disabled:cursor-not-allowed disabled:opacity-50 text-white hover:cursor-pointer hover:bg-[#85d65c] active:bg-[#5fb33a] bg-[#75cf4c]"
                    >
                      List item
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                  <FolderMinus size={50} />
                  <p className="text-sm md:text-base">
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
