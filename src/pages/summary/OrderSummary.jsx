import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formantCurrency } from "../../utilities";

export default function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingArray = Object.keys(optionCounts.toppings);
  const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

  return (
    <div>
      <h1>Order Summary </h1>
      <h2>Scoops: {formantCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <ul>{toppingList}</ul>
      <h2>Toppings: {formantCurrency(totals.toppings)}</h2>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
