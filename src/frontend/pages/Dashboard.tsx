import { Home } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center overflow-y-auto w-full h-full bg-white rounded-2xl shadow-sm p-4">
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
        <Home size={50} />
        <p className="text-sm md:text-base">
          Welcome aboard! Let’s fill up this space
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
