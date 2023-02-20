import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

// create custom hook to check whether we are in a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error("useOrderDetails must be called in context");
  }

  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // example { "Chocolate": 1, "Vanilla": 2 }
    toppings: {},
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    const newOptionCounts = { ...optionCounts };

    newOptionCounts[optionType][itemName] = newItemCount;
    // create new element or increase ammount for the existent element

    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  // utility function
  function calculateTotal(optionType) {
    // get an array of counts for the option type

    const countsArray = Object.values(optionCounts[optionType]);

    // total the values in the array of counts
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    // multiplty the total number of items by the proce for this item type
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };

  return <OrderDetails.Provider value={value} {...props} />;
}
