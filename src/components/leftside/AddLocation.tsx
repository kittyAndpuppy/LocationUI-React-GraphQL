import React from "react";
import { useAppDispatch } from "../../store";
import { ILocation } from "../../global/types";
import { createLocation } from "../../slices/locationSlice";

const AddLocation: React.FC = (): JSX.Element => {
  const [formData, setFormData] = React.useState<Omit<ILocation, "id"> | {}>();
  const dispatch = useAppDispatch();
  const handleForm = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSaveLocation = (e: React.FormEvent, data: ILocation | any) => {
    e.preventDefault();
    dispatch(
      createLocation({
        createdAt: Date.now().toString(),
        status: "Active",
        npi: "1234-123-454",
        taxid: "123-345-123",
        alias: ["first", "second"].toString(),
        ...data,
      })
    );
  };

  return (
    <div className="relative z-50 text-gray-300">
      <form
        className="w-full max-w-lg"
        onSubmit={(e) => handleSaveLocation(e, formData)}
      >
        <div className="flex flex-col justify-between">
          <div className="w-full  px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="name"
            >
              Location Name
            </label>
            <input
              className="appearance-none text-gray-800 block w-full bg-gray-200  border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="name"
              type="text"
              onChange={handleForm}
              required
            />
          </div>
          <div className="w-full  px-3">
            <label
              className="block uppercase tracking-wide  text-xs font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="appearance-none text-gray-800 block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address"
              type="address"
              onChange={handleForm}
              required
            />
          </div>
          <div className="flex flex-row justify-between">
            <div className="w-full  px-3 mb-6">
              <label
                className="block uppercase text-xs font-bold mb-2"
                htmlFor="type"
              >
                Location Type
              </label>
              <div className="relative">
                <select
                  className="block text-gray-800 appearance-none w-full bg-gray-200 border border-gray-200  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="type"
                  onChange={handleForm}
                  required
                >
                  <option></option>
                  <option value="home">Home</option>
                  <option value="office">Office</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 ">
                  <svg
                    className="fill-current h-4 w-4 text-gray-800"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full  px-3">
              <label
                className="block uppercase tracking-wide  text-xs font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="appearance-none text-gray-800 block w-full bg-gray-200  border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="phone"
                type="phone"
                onChange={handleForm}
                required
              />
            </div>
          </div>
          <div className="ml-3">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddLocation;
