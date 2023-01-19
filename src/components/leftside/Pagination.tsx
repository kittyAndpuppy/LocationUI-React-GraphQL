import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  getLocations,
  getPages,
  selectPages,
} from "../../slices/locationSlice";

const Pagination: React.FC = (): JSX.Element => {

  const [pageForm, setPageForm] = React.useState({ page: 0, perPage: 0 });
  const [pageCount, setPageCount] = React.useState(1);
  const pages: any = useAppSelector(selectPages);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPages());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLocations(pageForm));
    setPageCount(pages.length);
  }, [pageForm, pages.length, dispatch]);

  const handleChange = (
    e: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLSelectElement>
  ) => {
    if (e.currentTarget.id === "prev") {
      setPageForm({
        ...pageForm,
        page: pageForm.page - 1,
      });
    } else if (e.currentTarget.id === "next") {
      setPageForm({
        ...pageForm,
        page: pageForm.page + 1,
      });
    } else if (e.currentTarget.id === "perPage") {
      setPageForm({
        page: 0,
        perPage: Number(e.currentTarget.value),
      });
    } else {
      setPageForm({
        ...pageForm,
        [e.currentTarget.id]: Number(e.currentTarget.value),
      });
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex justify-center border">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              id="prev"
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              onClick={handleChange}
              disabled={pageForm.page <= 0 ? true : false}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.7 5.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="flex gap-3 justify-center">
              {Array(
                pageForm.perPage === 0 || pageCount === undefined
                  ? 1
                  : Math.ceil(pageCount / pageForm.perPage)
              )
                .fill(0)
                .map((_, i) => (
                  <button
                    key={i}
                    aria-current="page"
                    id="page"
                    className={
                      (pageForm.page === i ? "bg-green-500 " : "") +
                      " relative z-10 inline-flex items-center border rounded-md border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                    }
                    onClick={handleChange}
                    value={i}
                  >
                    {i + 1}
                  </button>
                ))}
            </div>

            <button
              id="next"
              onClick={handleChange}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              disabled={
                !pageForm.perPage ||
                pageForm.page  === Math.floor(pageCount / pageForm.perPage)
                  ? true
                  : false
              }
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
          <div className="ml-5 h-full p-2 border focus:outline-none border-blue-400 rounded-md">
            <select
              id="perPage"
              className="bg-gray-50  text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleChange}
            >
              <option value="0">All</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
