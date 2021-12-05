import SummaryCard from "../components/SummaryCard";
import { Table } from "../components/Table/Table";

export const Home = () => {
  return (
    <div className="grid grid-cols-2 md:px-0 md:py-8 gap-x-10 md:gap-y-10">
      <SummaryCard
        title="Monthly Summary"
        className="col-span-2 md:col-span-1"
      />
      <SummaryCard title="Tasks" className="col-span-2 md:col-span-1">
        <ul className="list-disc list-inside mt-2 text-sm w-full">
          <li>
            <span>Pay Rent</span>
            <input
              type="checkbox"
              className=" float-right  align-middle ml-auto mr-2 rounded-full focus:ring-0 focus:ring-offset-0 focus:text-primary my-auto"
            />
          </li>

          <li className="">Pay Rent</li>
        </ul>
      </SummaryCard>
      <Table />
    </div>
  );
};
