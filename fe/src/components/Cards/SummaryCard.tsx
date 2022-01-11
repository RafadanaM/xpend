import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTransactionSummary } from "../../features/transactions/transaction.thunks";
import {
  getGained,
  getSpent,
} from "../../features/transactions/transactionsSlice";
import BaseCard from "./BaseCard";

export const SummaryCard = () => {
  const gained = useAppSelector(getGained);
  const spent = useAppSelector(getSpent);
  const total = gained - spent;
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      dispatch(fetchTransactionSummary());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <BaseCard title="Monthly Summary" className="col-span-2 md:col-span-1">
      <div className="flex flex-col mt-2 md:mt-5 text-sm w-full gap-y-1 md:gap-y-5">
        <p className="font-medium">
          This month you have gained:{" "}
          <span className=" text-green-500">{`+ Rp.${gained}`}</span>
        </p>
        <p className="font-medium">
          This month you have spent:{" "}
          <span className=" text-red-600">{`- Rp.${spent}`}</span>
        </p>
        {total < 0 ? (
          <p className="font-medium">
            Your total this month:{" "}
            <span className="text-red-600">{`- Rp.${-total}`}</span>
          </p>
        ) : (
          <p className="font-medium">
            Your total this month:{" "}
            <span className="text-green-500">{`+ Rp.${total}`}</span>
          </p>
        )}
      </div>
    </BaseCard>
  );
};
