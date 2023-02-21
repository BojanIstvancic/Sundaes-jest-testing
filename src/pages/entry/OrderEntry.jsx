import { useOrderDetails } from "../../contexts/OrderDetails";
import { formantCurrency } from "../../utilities";
import Options from "./Options";

export default function OrderEntry() {
  const { totals } = useOrderDetails();
  const grandTotal = totals.scoops + totals.toppings;

  return (
    <div>
      <h1>Design your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formantCurrency(grandTotal)}</h2>
    </div>
  );
}
