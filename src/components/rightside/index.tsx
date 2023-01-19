import React, { useState, useEffect } from "react";
import refreshIcon from "../../assets/icons/refresh1.png";
import trashIcon from "../../assets/icons/trash.png";
import editIcon from "../../assets/icons/edit.png";
import { useAppSelector, useAppDispatch } from "../../store";
import {
  selectCurrent,
  getCurrentLocation,
  updateLocation,
  deleteLocation,
} from "../../slices/locationSlice";
import { DetailType } from "../../global/types";

const RightSide: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [rFlag, setRFlag] = useState(false);
  const [detailForm, setDetailForm] = useState({} as DetailType);
  let current: any = useAppSelector(selectCurrent);

  const handleDelete = () => {
    dispatch(deleteLocation(current?.id)).then(() => {
      setDetailForm({} as DetailType);
    });
  };

  const handleUpdate = () => {
    dispatch(updateLocation([current.id, detailForm]));
  };

  useEffect(() => {
    setDetailForm({
      ...current,
    });
  }, [current]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDetailForm({
      ...detailForm,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleRefresh = (id: string) => () => {
    dispatch(getCurrentLocation(id)).then((res) => {
      setDetailForm({
        ...res.payload,
      });
    });
  };

  if (current?.id) {
    return (
      <div className="rightside flex flex-col justify-center gap-6 px-6 my-[100px] items-start border-4 rounded-md shadow-xl      ">
        <div className=" header w-full flex flex-row gap-3 justify-between">
          <div
            className="refresh px-7 my-auto cursor-pointer"
            onClick={handleRefresh(current.id)}
          >
            <img src={refreshIcon} alt="refresh" />
          </div>
          <div className="title mr-[20px] text-bold text-[30px]">
            Detail Information
          </div>
          <div
            className="add relative text-[30px] mr-[20px] cursor-pointer"
            onClick={() => {
              setRFlag(!rFlag);
            }}
          >
            ...
            {rFlag && (
              <div className="absolute -bottom-5 z-50" onClick={handleDelete}>
                <img src={trashIcon} alt="trash" />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col text-center">
          <div className="flex gap-4">
            <input
              type="text"
              defaultValue={current.name}
              value={detailForm.name}
              className="title text-bold text-[50px] text-red-700 mb-5"
              id="name"
              onChange={handleChange}
              onBlur={handleUpdate}
            />
            <div className="my-auto ml-10" onClick={handleUpdate}>
              <img src={editIcon} alt="edit" />
            </div>
          </div>
          <div className="flex gap-1 justify-start">
            {current?.alias?.split(",").map((item: string, id: number) => (
              <div
                key={id}
                className="alias text-[16px] w-[100px] rounded-md bg-blue-500 text-white opacity-80"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="address flex justify-start gap-3">
            <div className="title flex">
              <label
                htmlFor="address"
                className="my-auto mr-4 font-medium w-[100px]"
              >
                ADDRESS:{" "}
              </label>
              <input
                type="text"
                id="address"
                className="py-2 my-2 text-[20px]"
                onChange={handleChange}
                defaultValue={current.address}
                value={detailForm.address}
              />
            </div>
            <div className="my-auto ml-10" onClick={handleUpdate}>
              <img src={editIcon} alt="edit" />
            </div>
          </div>
          <div className="npi flex justify-start gap-3">
            <div className="title flex">
              <label
                htmlFor="npi"
                className="my-auto w-[100px] mr-4 font-medium"
              >
                NPI:{" "}
              </label>
              <input
                type="text"
                id="npi"
                className="py-2 my-2 text-[20px]"
                onChange={handleChange}
                defaultValue={current.npi}
                value={detailForm.npi}
              />
            </div>
            <div className="my-auto ml-10" onClick={handleUpdate}>
              <img src={editIcon} alt="edit" />
            </div>
          </div>
          <div className="taxid flex justify-start gap-3">
            <div className="title flex">
              <label
                htmlFor="taxid"
                className="my-auto w-[100px] mr-4 font-medium"
              >
                TAXID:{" "}
              </label>
              <input
                type="text"
                id="taxid"
                className="py-2 my-2 text-[20px]"
                onChange={handleChange}
                defaultValue={current.taxid}
                value={detailForm.taxid}
              />
            </div>
            <div className="my-auto ml-10" onClick={handleUpdate}>
              <img src={editIcon} alt="edit" />
            </div>
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
};
export default RightSide;
