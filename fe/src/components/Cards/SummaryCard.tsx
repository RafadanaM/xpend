import Transaction from "../../interfaces/transaction.interface";
import BaseCard from "./BaseCard";

interface SummaryCardI {
  transactions: Transaction[];
}

export const SummaryCard = ({ transactions }: SummaryCardI) => {
  let gain: number = 0;
  let spending: number = 0;
  let total: number = 0;
  transactions.forEach((transaction) => {
    if (transaction.amount > 0) {
      gain += transaction.amount;
    } else {
      spending -= transaction.amount;
    }
    total = gain - spending;
  });

  return (
    <BaseCard title="Monthly Summary" className="col-span-2 md:col-span-1">
      <div className="flex flex-col mt-5 text-sm w-full gap-y-5">
        <p className="font-medium">
          This month you have gained:{" "}
          <span className=" text-green-500">{`+ Rp.${gain}`}</span>
        </p>
        <p className="font-medium">
          This month you have spent:{" "}
          <span className=" text-red-600">{`- Rp.${spending}`}</span>
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
