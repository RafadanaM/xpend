export const Table = () => {
  return (
    <div className="overflow-x-auto col-span-2 md:mt-14">
      <table className="table-fixed w-full border-collapse">
        <thead className="bg-accent-grey h-12 ">
          <tr className="text-xs md:text-base">
            <th className="w-1/5 border-r border-gray-400 font-medium">
              Title
            </th>
            <th className="border-r border-gray-400 font-medium">
              Description
            </th>
            <th className="w-1/6 border-r border-gray-400 font-medium">
              Amount
            </th>
            <th className="w-1/6  font-medium">Date</th>
          </tr>
        </thead>
        <tbody className="bg-secondary">
          <tr className="text-2xs md:text-sm h-11">
            <td className="px-2 border-r border-t border-gray-400">
              Buy Groceries
            </td>
            <td className="truncate md:line-clamp-none px-2 border-r border-t border-gray-400">
              Buy Groceries for August 2021 log truncate
            </td>
            <td className="text-3xs md:text-sm text-center px-2 border-r border-t border-gray-400">
              Rp. 10,000,000
            </td>
            <td className="text-3xs md:text-sm border-t border-gray-400 text-center px-2 ">
              22/12/2000
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
