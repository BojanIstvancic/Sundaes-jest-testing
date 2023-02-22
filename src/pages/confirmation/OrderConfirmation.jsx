import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const { resetOrder } = useOrderDetails();

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {
        setOrderNumber(null);
      });
  }, []);

  const handleClick = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };

  return (
    <div>
      {!orderNumber && <h1>Loading</h1>}
      {orderNumber && (
        <div>
          <h1>Thank you</h1>
          <h2>Your order number is: {orderNumber}</h2>
          <p>Some mini test</p>
          <Button variant="primary" onClick={handleClick}>
            Create New Order
          </Button>
        </div>
      )}
    </div>
  );
}
