import { FormEvent, useEffect, useState } from "react";
import { SearchFormType } from "../pages/Home";
import { searchInputs } from "../utils/formInputs";
import FormInput from "./Forms/FormInput";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as ResetIcon } from "../assets/arrow-counterclockwise.svg";
import { useAppDispatch } from "../app/hooks";
import { fetchTransactions } from "../features/transactions/transaction.thunks";

export const Filter = () => {
  const [searchValues, setSearchValues] = useState<SearchFormType>({
    searchText: "",
    searchDate: "",
  });

  const dispatch = useAppDispatch();

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchTransactions(searchValues));
  };

  const handleCancel = () => {
    setSearchValues({ searchText: "", searchDate: "" });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValues({ ...searchValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(fetchTransactions(searchValues));
  }, [searchValues, dispatch]);

  let searchKeys = Object.keys(searchValues) as (keyof SearchFormType)[];
  return (
    <div className=" bg-gradient-to-t from-primary to-blue-500 rounded-lg px-2 py-1 col-span-2 w-full">
      <form
        className="flex-1 md:flex flex-wrap items-center w-full gap-1"
        onSubmit={(e) => handleSubmitSearch(e)}
      >
        <div className="flex">
          <SearchIcon className="text-white w-7 h-5" />
          <div className="flex flex-grow justify-end md:hidden">
            <button
              className="py-1 px-2 bg-accent-orange text-xs text-white rounded my-auto hover:bg-opacity-75"
              type="submit"
            >
              Search
            </button>
            <button
              className="ml-1 py-1 px-2 bg-accent-orange text-xs text-white rounded my-auto hover:bg-opacity-75"
              type="button"
              onClick={handleCancel}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="flex-1 md:flex gap-1">
          {searchInputs.map((input, index) => {
            return (
              <FormInput
                key={input.id}
                {...input}
                value={searchValues[searchKeys[index]]}
                onChange={onChange}
              />
            );
          })}
        </div>
        <div className="hidden md:flex flex-grow md:flex-grow-0 justify-end ">
          <button
            className="ml-1 px-2 py-2 bg-accent-orange text-xs md:text-sm text-white rounded my-auto hover:bg-opacity-75"
            type="submit"
          >
            <SearchIcon className="h-4" />
          </button>
          <button
            className="ml-2 px-2 py-2 bg-accent-orange text-xs md:text-sm text-white rounded my-auto hover:bg-opacity-75"
            type="button"
            onClick={handleCancel}
          >
            <ResetIcon className="h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
