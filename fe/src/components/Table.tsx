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
    <div className="h-full col-span-2">
      {status === "loading" && (
        <Loading className="text-primary animate-spin mx-auto w-14 h-14" />
      )}
      {status === "failed" && <p>Error Fetching Transactions</p>}
      {status === "succeeded" && (
        <table className="table-fixed w-full border-separate table-space">
          <thead className="bg-gradient-to-t border-0 from-primary to-blue-500 h-12 ">
            <tr className="text-xs md:text-base font-medium text-white rounded-md head-shadow">
              <th className="w-1/5 rounded-l-md">Title</th>
              <th className="">Description</th>
              <th className="w-1/6">Amount</th>
              <th className="w-1/6 rounded-r-md">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="text-2xs border bg-white border-primary md:text-sm h-11 cursor-pointer rounded-md hover:bg-primary hover:bg-opacity-10 row-shadow"
                onClick={() => onRowClick(transaction)}
              >
                <td className="px-2 rounded-l-md">{transaction.title}</td>
                <td className="truncate md:line-clamp-none px-2 ">
                  {transaction.description}
                </td>
                <td className="text-3xs md:text-sm text-center px-2 b">
                  {`Rp. ${transaction.amount}`}
                </td>
                <td
                  className={`text-3xs md:text-sm text-center px-1 rounded-r-md border-r-8  ${
                    transaction.amount >= 0
                      ? "border-green-500"
                      : "border-red-500"
                  } `}
                >
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
