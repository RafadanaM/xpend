import { useEffect, useState } from "react";
import { TransactionService } from "../../api/services/TransactionService";
import Transaction from "../../interfaces/transaction.interface";
import BaseCard from "./BaseCard";

interface SummaryCardI {
  transactions: Transaction[];
}

export const SummaryCard = ({ transactions }: SummaryCardI) => {
  const [values, setValues] = useState({
    gain: 0,
    spending: 0,
    total: 0,
  });

  useEffect(() => {
    Promise.all([
      TransactionService.getThisMonthTransactions()
        .then(({ data }) => {
          let newGain = 0;
          let newSpending = 0;
          let newTotal = 0;
          data.forEach((transaction: Transaction) => {
            if (transaction.amount > 0) {
              newGain += transaction.amount;
            } else {
              newSpending -= transaction.amount;
            }
            newTotal = newGain - newSpending;
            setValues((prevValues) => {
              return {
                ...prevValues,
                gain: newGain,
                spending: newSpending,
                total: newTotal,
              };
            });
          });
        })
        .catch((err) => {
          console.log(err);
        }),
    ]);
  }, [transactions]);

  return (
    <BaseCard title="Monthly Summary" className="col-span-2 md:col-span-1">
      <div className="flex flex-col mt-2 md:mt-5 text-sm w-full gap-y-1 md:gap-y-5">
        <p className="font-medium">
          This month you have gained:{" "}
          <span className=" text-green-500">{`+ Rp.${values.gain}`}</span>
        </p>
        <p className="font-medium">
          This month you have spent:{" "}
          <span className=" text-red-600">{`- Rp.${values.spending}`}</span>
        </p>
        {values.total < 0 ? (
          <p className="font-medium">
            Your total this month:{" "}
            <span className="text-red-600">{`- Rp.${-values.total}`}</span>
          </p>
        ) : (
          <p className="font-medium">
            Your total this month:{" "}
            <span className="text-green-500">{`+ Rp.${values.total}`}</span>
          </p>
        )}
      </div>
    </BaseCard>
  );
};
