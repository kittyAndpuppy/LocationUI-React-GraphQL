import React from "react";
import Location from "./Location";
import { ILocation } from "../../global/types";
import {  selectLocations } from "../..//slices/locationSlice";
import {  useAppSelector } from "../../store";

interface PropType {
  keyword: string;
}

const Locations: React.FC<PropType> = ({ keyword }): JSX.Element => {
  const locations: any = useAppSelector(selectLocations);

  return (
    <div className="py-4 px-2">
      {locations &&
        locations?.map((item: ILocation,id:number) => {
          return (
            <div className="flex mb-10" key={id}>
              {item.name.includes(keyword) && (
                <Location location={item}></Location>
              )}
            </div>
          );
        })}
    </div>
  );
};
export default Locations;
