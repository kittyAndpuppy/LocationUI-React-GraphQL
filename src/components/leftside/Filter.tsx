import React from "react";
import { useAppDispatch } from "../../store";
import { filterByHome, filterByOffice,filterByActive, filterByOff } from "../../slices/locationSlice";

const Filter: React.FC = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const handleFilterHome = () => {
    dispatch(filterByHome());
  };

  const handleFilterOffice = () => {
    dispatch(filterByOffice());
  };

  const handleFilterActive = () => {
    dispatch(filterByActive());
  };
  
  const handleFilterOff = () => {
    dispatch(filterByOff());
  };
  return (
    <div className="m-1 p-3 flex gap-5">
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleFilterHome}
        >
          Home
        </button>
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleFilterOffice}
        >
          Office
        </button>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleFilterActive}
        >
          Active
        </button>
      </div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleFilterOff}
        >
          Off
        </button>
      </div>
    </div>
  );
};
export default Filter;
