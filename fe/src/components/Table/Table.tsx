import { Row } from "./Row";

export const Table = () => {
  return (
    <table className="table-fixed col-span-2 border-collapse mt-14">
      <thead className="bg-accent-grey h-12 ">
        <tr>
          <th className="w-1/5 border border-gray-400 font-medium">Title</th>
          <th className="border border-gray-400 font-medium">Description</th>
          <th className="w-1/6 border border-gray-400 font-medium">Amount</th>
          <th className="w-1/6 border border-gray-400 font-medium">Date</th>
        </tr>
      </thead>
      <tbody className="bg-secondary text-sm">
        <Row />
        <Row />
        <Row />
      </tbody>
    </table>
  );
};
