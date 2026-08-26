import { X, PlusIcon, FolderMinus } from "lucide-react";
import { useState } from "react";
import {
  sanitizeProductName,
  sanitizeProductPrice,
  MAX_PRICE,
  MAX_FILE_SIZE,
  MAX_FILES_LENGTH,
  ALLOWED_TYPES,
  checkNameValidity,
  checkPriceValidity,
  categories,
  conditions,
  type FilePreview,
} from "../validator/listProductForm";

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
  const [isListing, setIsListing] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string>("");

  const [listName, setListName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");

  const [files, setFiles] = useState<FilePreview[]>([]);
  const hasFiles = files.length > 0;

  const isListValid =
    isValidName && isValidPrice && hasListCategory && hasListCondition;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(sanitizeProductName(e.target.value));
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

  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCondition(e.target.value);
  };
  const selectedCondition = conditions.find((item) => item.value === condition);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const selectedCategory = categories.find((item) => item.value === category);

  const handleSubmitListing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);

    if (selectedFiles.length === 0) return;

    for (const file of selectedFiles) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`${file.name} must be 10 MB or smaller.`);
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
    setFiles(newFiles);
  };
  // const handleFileSubmit = () => {};
  return (
    <>
      {isOpenForm ? (
        <div className="flex flex-col w-full rounded-2xl shadow-md shadow-gray-50 p-6">
          <div className="flex flex-row justify-between p-4">
            <h1 className="text-2xl font-semibold">Product Listing Form </h1>
            <button
              onClick={() => setIsOpenForm(false)}
              className="hover:cursor-pointer"
              title="Close form"
            >
              <X />
            </button>
          </div>

          <form
            className="grid grid-cols-3 space-x-10 p-5"
            onSubmit={handleSubmitListing}
            action=""
          >
            <div className="flex flex-col gap-4 justify-start">
              <div className="flex flex-col gap-2">
                <label className="">Product name</label>
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
              </div>

              <div className="flex flex-col gap-2">
                <label className="">Price</label>
                <input
                  required
                  type="text"
                  min={1}
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
                <label>Category</label>
                <select
                  required
                  className="outline-1 outline-black p-2"
                  value={category}
                  onChange={handleCategoryChange}
                >
                  <option disabled>Select a category</option>

                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label>Condition</label>
                <select
                  onChange={(e) => setCondition(e.target.value)}
                  required
                  className="outline-1 outline-black p-2"
                >
                  <option selected disabled>
                    What's your product's condition?
                  </option>
                  {conditions.map((condition) => (
                    <option key={condition.value} value={condition.value}>
                      {condition.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="">Description</label>
                <textarea
                  minLength={10}
                  maxLength={2000}
                  required
                  rows={4}
                  className="outline-1 outline-black rounded-xl p-2 resize-none"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-start">
              <div className="flex flex-col gap-4">
                <label>Select and upload images or videos (max. of 6)</label>
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
                      <p className="text-sm">JPG, PNG, MP4 (10MB)</p>
                    </div>
                    {files.length > 0 ? (
                      <div className="flex flex-row gap-3 p-2">
                        <div className="grid grid-cols-3 gap-3">
                          {files.slice(0, 6).map((item, index) => (
                            <div className="relative" key={index}>
                              <button
                                type="button"
                                className="absolute top-2 right-2 z-10 rounded-full bg-white shadow-sm hover:cursor-pointer"
                              >
                                <X size={20} />
                              </button>
                              {item.file.type.startsWith("image/") ? (
                                <img
                                  className="rounded-xl aspect-square h-full w-full"
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
                                  className="rounded-xl aspect-video h-full w-full"
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
                    disabled={files.length === 6}
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
                </div>
                <div className="flex flex-col gap-2">
                  <label>Delivery / Meetup options</label>
                  <select required className="outline-1 outline-black p-2">
                    <option selected disabled>
                      How will the buyer receive the item?
                    </option>
                    <option value="delivery">Delivery</option>
                    <option value="meetup">Meetup</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <label>Product attributes (max. of 4)</label>
                  <button
                    type="button"
                    className="hover:cursor-pointer p-2 rounded-lg hover:bg-[#85d65c] active:bg-[#5fb33a] bg-[#75cf4c]"
                  >
                    <PlusIcon size={18} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 justify-center h-full">
              <h1 className="font-semibold text-xl mb-5">Product Summary</h1>
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                <FolderMinus size={50} />
                <p className="text-sm md:text-base">
                  Listing breakdown unavailable, <br />
                  please fill up the form first
                </p>
              </div>
              <div className="flex flex-col justify-between">
                <div className="grid grid-cols-2">
                  <div className="grid grid-rows-3 text-left gap-2">
                    <label className="font-semibold">Product name: </label>
                    <label className="font-semibold">Category: </label>
                    <label className="font-semibold">Condition: </label>
                  </div>
                  <div className="grid grid-rows-3 text-right gap-2">
                    <p className="truncate">{listName}</p>
                    <p>{selectedCategory?.label || "-"}</p>
                    <p>{selectedCondition?.label || "-"}</p>
                  </div>
                  <div className="flex flex-row justify-between"></div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div className="flex flex-row justify-between">
                    <label className="font-semibold">Price assessment:</label>
                    <p className="truncate">
                      {price ? "₱" : null} {price} {/*Temporary placeholder */}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="p-3 rounded-3xl text-white hover:cursor-pointer hover:bg-[#85d65c] active:bg-[#5fb33a] bg-[#75cf4c]"
                  >
                    List item
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
};
export default ListingForm;
