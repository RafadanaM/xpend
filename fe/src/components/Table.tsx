import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import {
  getTransactionsStatus,
  selectAllTransactions,
} from "../features/transactions/transactionsSlice";
import Transaction from "../interfaces/transaction.interface";
import { formatDate, transactionDateFormat } from "../utils/formatDate";
import Loading from "./Loading";
import { ReactComponent as Down } from "../assets/down.svg";
import { ReactComponent as BarLeft } from "../assets/bar-left.svg";
import { ReactComponent as BarRight } from "../assets/bar-right.svg";
import PaginationItem from "./PaginationItem";

interface TableI {
  onRowClick: (transaction: Transaction) => void;
}
const ROW_PER_PAGE = 10;
export const Table = ({ onRowClick }: TableI) => {
  const status = useAppSelector(getTransactionsStatus);
  const transactions = useAppSelector(selectAllTransactions);
  const [currentPage, setPage] = useState(1);

  const CalculateRange = () => {
    const range = [];
    const num = Math.ceil(transactions.length / ROW_PER_PAGE);
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    const maxRange = range[range.length - 1];
    return (
      <div className="flex items-center justify-center gap-x-1 my-5">
        <PaginationItem
          className="hover:bg-secondary"
          onClick={() => (currentPage !== 1 ? setPage(1) : {})}
        >
          <BarLeft className="w-5 h-5" />
        </PaginationItem>
        <PaginationItem
          className="hover:bg-secondary"
          onClick={() =>
            currentPage > 1 ? setPage((prevState) => prevState - 1) : {}
          }
        >
          <Down className="transform rotate-90 w-4 h-4" />
        </PaginationItem>

        {range
          .slice(
            currentPage >= 2 ? currentPage - 2 : 0,
            currentPage + 1 <= maxRange ? currentPage + 1 : maxRange
          )
          .map((page) => (
            <PaginationItem
              key={page}
              className={` hover:bg-accent-grey ${
                page === currentPage
                  ? " bg-gradient-to-t from-primary to-blue-500 text-white"
                  : "bg-secondary"
              }`}
              onClick={() => setPage(page)}
            >
              {page}
            </PaginationItem>
          ))}
        <PaginationItem
          className="hover:bg-secondary"
          onClick={() =>
            currentPage < maxRange ? setPage((prevState) => prevState + 1) : {}
          }
        >
          <Down className="transform -rotate-90 w-4 h-4" />
        </PaginationItem>
        <PaginationItem
          className="hover:bg-secondary"
          onClick={() => (currentPage !== maxRange ? setPage(maxRange) : {})}
        >
          <BarRight className="w-5 h-5" />
        </PaginationItem>
      </div>
    );
  };

  useEffect(() => {
    setPage(1);
  }, [transactions]);

  return (
    <div className="h-full col-span-2 bg-white">
      <table className="table-fixed w-full border-separate table-space">
        <thead className="bg-gradient-to-t border-0 from-primary to-blue-500 h-12 ">
          <tr className="text-xs md:text-base font-medium text-white md:rounded-md head-shadow">
            <th className="w-1/5 md:rounded-l-md">Title</th>
            <th className="">Description</th>
            <th className="w-1/6">Amount</th>
            <th className="w-1/6 md:rounded-r-md">Date</th>
          </tr>
        </thead>
        <tbody>
          {status === "loading" && (
            <tr className="">
              <td colSpan={4}>
                <Loading />
              </td>
            </tr>
          )}
          {status === "failed" && (
            <tr>
              <td className="text-red-500 font-bold text-center" colSpan={4}>
                <span>Error fetching transaction</span>
              </td>
            </tr>
          )}
          {status === "succeeded" ? (
            transactions.length > 0 ? (
              transactions
                .slice(
                  (currentPage - 1) * ROW_PER_PAGE,
                  currentPage * ROW_PER_PAGE
                )
                .map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="text-2xs border bg-white border-primary md:text-sm h-11 cursor-pointer md:rounded-md hover:bg-primary hover:bg-opacity-10 md:shadow-lg"
                    onClick={() => onRowClick(transaction)}
                  >
                    <td className="px-2 md:rounded-l-md">
                      {transaction.title}
                    </td>
                    <td className="truncate md:line-clamp-none px-2 ">
                      {transaction.description}
                    </td>
                    <td className="text-3xs md:text-sm text-center px-2 b">
                      {`Rp. ${transaction.amount}`}
                    </td>
                    <td
                      className={`text-3xs md:text-sm text-center px-1 md:rounded-r-md border-r-8  ${
                        transaction.amount >= 0
                          ? "border-green-500"
                          : "border-red-500"
                      } `}
                    >
                      {formatDate(transaction.date, transactionDateFormat)}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td className="text-center" colSpan={4}>
                  <span>No transaction found</span>
                </td>
              </tr>
            )
          ) : null}
        </tbody>
      </table>
      {CalculateRange()}
    </div>
  );
};
