import { Link } from "react-router-dom";
import * as apiClient from "../apiClient";
import { useQuery } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import { BsMap } from "react-icons/bs";

const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData } = useQuery("getMyHotels", apiClient.getMyHotels, {
    onError: () => {
      showToast({ message: "Couldn't get Hotels", type: "ERROR" });
    },
  });

  if (!hotelData) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to={"/add-hotel"}
          className="p-3 bg-blue-700 text-white font-bold text-xl hover:bg-blue-600"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData?.map((hotel) => (
          <div className="border rounded-lg p-8 gap-5 flex flex-col justify-between border-slate-300">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line line-clamp-1 ">
              {hotel.description}
            </div>
            <span className="flex items-center gap-2">
              <BsMap />
              {hotel.city}, {hotel.country}
            </span>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {hotel.facilities.map((facility) => (
                <div className="border border-slate-300 rounded-sm p-3 flex items-center gap-2">
                  <BsMap />
                  {facility}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
