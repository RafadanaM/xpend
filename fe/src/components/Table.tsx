import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ReactComponent as Loading } from "../assets/loading.svg";
import {
  fetchTransactions,
  getTransactionsStatus,
  selectAllTransactions,
} from "../features/transactionsSlice";
import Transaction from "../interfaces/transaction.interface";
import { formatDate, transactionDateFormat } from "../utils/formatDate";

interface TableI {
  onRowClick: (transaction: Transaction) => void;
}

export const Table = ({ onRowClick }: TableI) => {
  const status = useAppSelector(getTransactionsStatus);
  const transactions = useAppSelector(selectAllTransactions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTransactions());
    }
  }, [status, dispatch]);
  return (
    <div className="overflow-x-auto md:overflow-x-hidden  h-full col-span-2">
      {status === "loading" && (
        <Loading className="text-primary animate-spin mx-auto w-14 h-14" />
      )}
      {status === "failed" && <p>Error Fetching Transactions</p>}
      {status === "succeeded" && (
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
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="text-2xs md:text-sm h-11 cursor-pointer hover:bg-gray-300"
                onClick={() => onRowClick(transaction)}
              >
                <td className="px-2 border-r border-t border-gray-400">
                  {transaction.title}
                </td>
                <td className="truncate md:line-clamp-none px-2 border-r border-t border-gray-400">
                  {transaction.description}
                </td>
                <td className="text-3xs md:text-sm text-center px-2 border-r border-t border-gray-400">
                  {`Rp. ${transaction.amount}`}
                </td>
                <td className="text-3xs md:text-sm border-t border-gray-400 text-center px-2 ">
                  {formatDate(transaction.date, transactionDateFormat)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
