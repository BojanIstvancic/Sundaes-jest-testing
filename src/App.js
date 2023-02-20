import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary Page and Entry page need provader */}
        <OrderEntry />
        {/* Confirmation Page doesn't */}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
