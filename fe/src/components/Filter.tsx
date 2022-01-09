import { FormEvent, useState } from "react";
// import { sortEnum } from "../enums";
import { SearchFormType } from "../pages/Home";
import { searchInputs } from "../utils/formInputs";
import FormInput from "./Forms/FormInput";
// import RadioInput from "./RadioInput";

interface FilterI {
  setSearch: Function;
}

export const Filter = ({ setSearch }: FilterI) => {
  // const [selectedShow, setSelectedShow] = useState(sortEnum.THIS_MONTH);
  const [searchValues, setSearchValues] = useState<SearchFormType>({
    searchText: "",
    searchDate: "",
  });

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(searchValues);
  };

  const handleCancel = () => {
    setSearchValues({ searchText: "", searchDate: "" });
    setSearch({ searchText: "", searchDate: "" });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValues({ ...searchValues, [e.target.name]: e.target.value });
  };

  let searchKeys = Object.keys(searchValues) as (keyof SearchFormType)[];
  return (
    <div className=" bg-gradient-to-t from-primary to-blue-500 rounded-lg px-2 py-1 col-span-2 w-full">
      <form
        className="flex-1 md:flex flex-wrap items-center w-full gap-1"
        onSubmit={(e) => handleSubmitSearch(e)}
      >
        <div className="flex">
          <label className="mt-2 text-xs text-white font-medium md:mt-0 md:text-base">
            Search:{" "}
          </label>
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
            className="px-2 py-1.5 bg-accent-orange text-xs md:text-sm text-white rounded my-auto hover:bg-opacity-75"
            type="submit"
          >
            Search
          </button>
          <button
            className="ml-2 px-2 py-1.5 bg-accent-orange text-xs md:text-sm text-white rounded my-auto hover:bg-opacity-75"
            type="button"
            onClick={handleCancel}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
