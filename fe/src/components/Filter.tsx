import { FormEvent, useState } from "react";
import { sortEnum } from "../enums";
import { SearchFormType } from "../pages/Home";
import { searchInputs } from "../utils/formInputs";
import FormInput from "./Forms/FormInput";
import RadioInput from "./RadioInput";

interface FilterI {
  setSearch: Function;
}

export const Filter = ({ setSearch }: FilterI) => {
  const [selectedShow, setSelectedShow] = useState(sortEnum.THIS_MONTH);
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
    <div className="bg-secondary rounded px-2 py-1 md:mt-10">
      <div className="flex flex-col">
        <form className="flex-col" onSubmit={(e) => handleSubmitSearch(e)}>
          <label className="font-medium">Search: </label>
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
          {/* <input
            id="0"
            name="search"
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
          <input id="1" name="date" type="month" placeholder=""></input> */}
          <button type="submit">Search</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <div className="flex items-center gap-x-2">
          {Object.values(sortEnum).map((enumValue) => (
            <RadioInput
              key={enumValue}
              value={enumValue}
              selected={selectedShow}
              onChange={setSelectedShow}
              label={enumValue}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
