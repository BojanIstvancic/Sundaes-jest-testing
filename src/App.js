import { useState } from "react";
import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  const defineComponent = () => {
    switch (orderPhase) {
      case "inProgress":
        return OrderEntry;
      case "review":
        return OrderSummary;
      default:
        return OrderConfirmation;
    }
  };

  const Component = defineComponent();

  return (
    <Container>
      <OrderDetailsProvider>
        {<Component setOrderPhase={setOrderPhase} />}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
