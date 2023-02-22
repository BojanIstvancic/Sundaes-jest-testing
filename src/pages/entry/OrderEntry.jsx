import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formantCurrency } from "../../utilities";
import Options from "./Options";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();
  const grandTotal = totals.scoops + totals.toppings;
  const isButtonDisabled = grandTotal === 0 ? true : false;

  const handleClick = () => {
    setOrderPhase("review");
  };

  return (
    <div>
      <h1>Design your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formantCurrency(grandTotal)}</h2>

      <Button
        variant="primary"
        onClick={handleClick}
        disabled={isButtonDisabled}
      >
        Confirm order
      </Button>
    </div>
  );
}
