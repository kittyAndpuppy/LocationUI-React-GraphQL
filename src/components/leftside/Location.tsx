import React from "react";
import { ILocation } from "../../global/types";
import { useAppDispatch } from "../../store";
import { getCurrentLocation } from "../../slices/locationSlice";
import homeIcon from "../../assets/icons/home.png";
import officeIcon from "../../assets/icons/office.png";
import phoneIcon from "../../assets/icons/phone.png";

type Props = {
  location: ILocation;
};

const Location: React.FC<Props> = ({ location }) => {
  const dispatch = useAppDispatch();
  const elapsedTime = (
    (Date.now() - Number(location.createdAt)) /
    (3600 * 1000)
  ).toFixed(0);
  const handleDetail = () => {
    dispatch(getCurrentLocation(location.id));
  };

  return (
    <div
      className="flex gap-3 border-2 shadow-md border-blue-500 rounded-md p-4 align-top pl-6 w-full justify-between cursor-pointer"
      onClick={handleDetail}
    >
      <div className="content flex flex-col gap-3 mr-8">
        <div className="font-bold text-[25px] text-gray-800">
          {location.name}
        </div>
        <div className="font-medium text-[20px] text-gray-400">
          {location.address}
        </div>
        <div className="flex gap-3 align-middle">
          <div className="mr-3">
            <img
              src={location.type === "home" ? homeIcon : officeIcon}
              alt="type"
            />{" "}
          </div>
          <div className="flex h-5">
            <img src={phoneIcon} alt="phone" /> {location.phone}
          </div>
        </div>
      </div>
      <div className="status flex flex-col gap-3  justify-between  font-medium">
        <div
          className={
            (location.status === "Active" ? "bg-yellow-400" : "bg-red-400") +
            " rounded-md p-1 text-center w-[60px] mx-auto opacity-80"
          }
        >
          {location.status}
        </div>
        <div className="text-gray-500">{elapsedTime}h</div>
      </div>
    </div>
  );
};
export default Location;
