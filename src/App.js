import { useState } from "react";
import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary Page and Entry page need provader */}
        <OrderEntry />
        <OrderSummary />
        {/* Confirmation Page doesn't */}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
