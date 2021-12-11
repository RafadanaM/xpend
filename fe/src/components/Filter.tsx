import { FormEvent, useState } from "react";
import { sortEnum } from "../enums";
import RadioInput from "./RadioInput";

interface FilterI {
  setSearch: Function;
  // setDoSearch: Function;
}

export const Filter = ({ setSearch }: FilterI) => {
  const [selectedShow, setSelectedShow] = useState(sortEnum.THIS_MONTH);
  const [searchInput, setSearchInput] = useState("");

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setDoSearch(true);
    setSearch(searchInput);
  };

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  // };

  return (
    <div className="bg-secondary rounded px-2 py-1 md:mt-10">
      <div className="flex flex-col">
        <form className="flex-col" onSubmit={(e) => handleSubmitSearch(e)}>
          <label className="font-medium">Search: </label>
          {/* <FormInput
              {...searchInputs}
              value={search}
              onChange={onChange}
              labelStyle="font-bold text-white"
            /> */}
          <input
            id="0"
            name="search"
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
          <input id="1" name="date" type="month" placeholder=""></input>
          <button type="submit">Search</button>
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
