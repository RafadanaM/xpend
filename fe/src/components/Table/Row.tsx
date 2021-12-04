import { Column } from "./Column";

export const Row = () => {
  return (
    <tr>
      <Column>Buy Groceries</Column>
      <Column>Groceries for August 2000</Column>
      <Column className="text-center">Rp. 10,000,000</Column>
      <Column className="text-center">22/12/2000</Column>
    </tr>
  );
};
