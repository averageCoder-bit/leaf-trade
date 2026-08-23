import { ClipboardClock } from "lucide-react";
import SearchFilter from "../components/SearchFilterBar";
const Orders = () => {
  return (
    <div className="flex flex-col justify-center items-center overflow-y-auto w-full h-full bg-white rounded-2xl shadow-sm p-4">
      <div className="flex justify-center md:justify-between w-full mb-6">
        <SearchFilter
          placeholder="Search for orders..."
          filterTitle="Filter orders"
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
        <ClipboardClock size={50} />
        <p className="text-sm md:text-base">No orders and invoices yet</p>
      </div>
    </div>
  );
};

export default Orders;
