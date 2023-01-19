import React, { useState, useEffect } from "react";
import AddLocation from "./AddLocation";
import Filter from "./Filter";
import Locations from "./Locations";
import Search from "./Search";
import Pagination from "./Pagination";
import { useAppDispatch, useAppSelector } from "../../store";
import { getLocations, selectLocations } from "../../slices/locationSlice";
import refreshIcon from "../../assets/icons/refresh1.png";

const LeftSide: React.FC = (): JSX.Element => {

  const [addFlag, setAddFlag] = useState(false);
  const [keyword, setKeyword] = useState("");
  const dispatch = useAppDispatch();
  const locations = useAppSelector(selectLocations);

  const SearchFunc = (index: string) => {
    setKeyword(index);
  };

  useEffect(() => {
    setAddFlag(false);
  }, [locations]);
  const handleReload = () => {
    dispatch(getLocations({ page: 0, perPage: 0 }));
  };

  return (
    <div className="leftside flex flex-col gap-1 p-6 justify-between items-center border-2 rounded-md">
      <div className=" header w-full flex flex-row gap-3 justify-between">
        <div
          className="refresh px-7 ml-4 py-2 border rounded-md border-black"
          onClick={handleReload}
        >
          <img src={refreshIcon} alt="refresh" />
        </div>
        <div className="title text-red-800 mr-[20px] text-bold text-[30px]">
          Locations
        </div>
        <div
          className="add  text-[30px] mr-[20px] cursor-pointer"
          onClick={() => {
            setAddFlag(true);
          }}
        >
          +
        </div>
      </div>
      {addFlag && (
        <div>
          <div
            className="fixed top-0 left-0 z-30 w-full h-full bg-black opacity-[0.8]"
            onClick={() => {
              setAddFlag(false);
            }}
          ></div>
          <AddLocation />
        </div>
      )}
      <Search SearchFilter={SearchFunc} />
      <Filter />
      <Locations keyword={keyword} />
      <Pagination />
    </div>
  );
};
export default LeftSide;
