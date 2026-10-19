import { Star, MessageCircleMore, UserPlus } from "lucide-react";

const ProductView = () => {
  return (
    <div className="flex min-h-full w-full flex-col items-center overflow-y-auto scrollbar-none rounded-2xl bg-white p-7 shadow-sm">
      <div className="flex flex-col w-full md:w-5xl space-y-7">
        <div className="flex flex-row justify-between">
          <p className="text-sm">Category</p>
          <p className="text-sm">Listed on: </p>
        </div>
        <h1 className="text-3xl font-bold">Product name</h1>

        {/*Media carousel*/}
        <div className="aspect-video w-full overflow-hidden rounded-2xl outline">
          Media goes here
        </div>
        <div className="">Description</div>

        <div className="flex w-full flex-col gap-7 rounded-2xl border border-gray-300 p-5 md:p-7">
          <div className="flex flex-row w-full justify-between">
            <h2 className="text-lg font-semibold">Seller's Information</h2>
            <button
              title="Follow user"
              className="flex items-center justify-center hover:bg-gray-300 cursor-pointer rounded-full p-1.5"
            >
              <UserPlus size={21} />
            </button>
          </div>

          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            {/* Profile and statistics */}
            <div className="flex min-w-0 flex-1 flex-col gap-6 sm:flex-row">
              {/* Seller avatar */}
              <div className="flex flex-col items-center justify-center gap-2">
                <img
                  src="/images/default-avatar.png"
                  alt="Seller profile"
                  className="h-28 w-28 shrink-0 rounded-2xl border border-gray-200 object-cover md:h-32 md:w-32"
                />
                <p>Username</p>
              </div>

              {/* Seller details */}
              <div className="flex min-w-0 flex-1 flex-col gap-7">
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="truncate text-lg font-semibold">Name</p>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-sm text-gray-600">Contact</p>
                </div>

                {/* Seller statistics */}
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <p className="font-semibold">4.9</p>
                    </div>
                    <span className="text-xs text-gray-500">Rating</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <p className="font-semibold">10</p>
                    <span className="text-xs text-gray-500">Listings</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <p className="font-semibold">10</p>
                    <span className="text-xs text-gray-500">Sold Items</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <p className="font-semibold">543</p>
                    <span className="text-xs text-gray-500">Followers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message seller */}
            <button
              type="button"
              className="flex w-full shrink-0 cursor-pointer items-center justify-center gap-3 rounded-3xl bg-[#75cf4c] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[#85d65c] active:bg-[#5fb33a] xl:w-auto"
            >
              <MessageCircleMore className="hidden md:block" />
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
