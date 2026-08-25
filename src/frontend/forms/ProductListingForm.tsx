import { X, PlusIcon, FolderMinus } from "lucide-react";
import { useState } from "react";

interface ListingFormProps {
  isOpenForm: boolean;
  setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListingForm = ({ isOpenForm, setIsOpenForm }: ListingFormProps) => {
  // const [hasListName, setHasListName] = useState(false);
  // const [hasListPrice, setHasListPrice] = useState(false);
  // const [hasListCategory, setHasListCategory] = useState(false);
  // const [hasListCondition, setHasListCondition] = useState(false);
  // const [isListing, setIsListing] = useState(false);

  const [listName, setListName] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");

  // const isListValid =
  //   hasListName && hasListPrice && hasListCategory && hasListCondition;

  const handleSubmitListing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
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
                  onBlur={(e) => setListName(e.target.value)}
                  type="text"
                  className="outline-1 outline-black rounded-3xl p-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="">Price</label>
                <input
                  required
                  type="number"
                  min={1}
                  max={1000000}
                  step={0.01}
                  placeholder="₱0.00"
                  className="outline-1 outline-black rounded-3xl p-2"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="outline-1 outline-black p-2"
                >
                  <option selected disabled>
                    Choose your product's category
                  </option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion-and-clothing">
                    Fashion & Clothing
                  </option>
                  <option value="home-and-living">Home & Living</option>
                  <option value="appliances">Appliances</option>
                  <option value="books-and-education">Books & Education</option>
                  <option value="sports-and-outdoors">Sports & Outdoors</option>
                  <option value="toys-and-games">Toys & Games</option>
                  <option value="beauty-and-personal-care">
                    Beauty & Personal Care
                  </option>
                  <option value="hobbies-and-collections">
                    Hobbies & Collections
                  </option>
                  <option value="pet-supplies">Pet Supplies</option>
                  <option value="tools-and-equipment">Tools & Equipment</option>
                  <option value="automotive">Automotive</option>
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
                  <option value="brand-new">Brand New</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="">Description</label>
                <textarea
                  required
                  rows={4}
                  className="outline-1 outline-black rounded-xl p-2 resize-none"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-start">
              <div className="flex flex-col gap-4">
                <label>Select and upload images or videos (max. of 6)</label>
                <div className="flex flex-row justify-center items-stretch">
                  <output className="w-full h-full rounded-l-xl p-4 border-dashed border text-center">
                    <div className="flex flex-col space-y-3 justify-center items-center">
                      <p className="font-semibold">Only valid formats</p>
                      <p className="text-sm">JPG, PNG, MP4</p>
                    </div>
                  </output>
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col justify-center items-center px-4 text-center rounded-r-2xl text-white text-sm hover:cursor-pointer hover:bg-[#85d65c] active:bg-[#5fb33a] bg-[#75cf4c]"
                  >
                    Choose files
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple={true}
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
                    <p>{category}</p>
                    <p>{condition}</p>
                  </div>
                  <div className="flex flex-row justify-between"></div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div className="flex flex-row justify-between">
                    <label className="font-semibold">Price assessment:</label>
                    <p>Price</p>
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
