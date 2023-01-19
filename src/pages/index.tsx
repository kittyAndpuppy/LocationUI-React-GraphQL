import React from "react";
import LeftSide from "../components/leftside";
import RightSide from "../components/rightside";

const LocationUI: React.FC = (): JSX.Element => {
  return (
    <div className="flex justify-start gap-[100px] mx-[100px]">
      <LeftSide />
      <RightSide />
    </div>
  );
};
export default LocationUI;
