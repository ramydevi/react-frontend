import ShoppingList from "./components/ShoppingList";
import AddItemForm from "./components/AddItemForm";
import { addItem, getItems, deleteItem, updateItem } from "./api/api";
import { useState, useEffect } from "react";
import ProgressBar from "./components/ProgressBar";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [budget, setBudget] = useState(1000);
  const [totalBudget, setTotalBudget] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [isBudgetLocked, setIsBudgetLocked] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setRemainingBudget(totalBudget);
  }, [totalBudget]);

  const handleAdd = (item) => {
    if (totalBudget === 0) {
      alert("⚠️ Please set a fixed budget before adding items.");
      return;
    }

    if (!isBudgetLocked) {
      setIsBudgetLocked(true);
    }
    const totalCost = item.quantity * item.price;
    if (totalCost > remainingBudget) {
      alert("⚠️ Budget exceeded. Cannot add item.");
      return;
    }
    addItem(item)
      .then(() => {
        setRemainingBudget((prev) => prev - totalCost);
        setRefresh((prev) => !prev);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = async (id, itemCost) => {
    try {
      await deleteItem(id);
      setRemainingBudget((prev) => prev + itemCost);
      setRefresh((prev) => !prev);

      // Fetch the updated list of items
      const response = await fetch("/api/items");
      const data = await response.json();

      // Unlock budget if all items are deleted
      if (data.length === 0) {
        setIsBudgetLocked(false);
        setTotalBudget(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateQuantity = async (item, newQuantity) => {
    const oldQuantity = item.quantity;
    const quantityDifference = (newQuantity - oldQuantity) * item.price;
    
    if (remainingBudget - quantityDifference < 0) {
      alert("⚠️ Budget exceeded. Cannot increase quantity.");
      return;
    }

    try {
      const updatedItem = {
        itemName: item.itemName,
        category: item.category,
        quantity: newQuantity,
        price: item.price,
      };
      await updateItem(item.id, updatedItem);
      
      // Fetch updated items to sync with backend
      const response = await getItems();
      const allItems = response.data;
      
      // Recalculate remaining budget based on updated items
      let totalCost = 0;
      allItems.forEach((it) => {
        totalCost += it.quantity * it.price;
      });
      
      const newRemainingBudget = totalBudget - totalCost;
      setRemainingBudget(newRemainingBudget);
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error(err);
      alert("Failed to update quantity");
    }
  };

  const fetchItems = () => {
    getItems()
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchItems();
  }, [refresh]);

  const handleRefresh = () => {
    setIsBudgetLocked(false);
    setTotalBudget(0);
    setRemainingBudget(0);
    setItems([]);
  };

  return (
    <div className="container">
      <h1 className="main-heading">Manage Your Budget and Shopping List</h1>
      <p className="sub-heading">"Every rupee counts ✨"</p>
      <div className="budget-section">
        <label className="budget-label">Enter fixed Budget:</label>
        <input
          type="number"
          value={totalBudget === 0 ? "" : totalBudget}
          min="0"
          onChange={(e) => setTotalBudget(Number(e.target.value.replace(/^0+/, "")) || 0)}
          disabled={isBudgetLocked}
          className="budget-input"
        />
        <button
          onClick={handleRefresh}
          className="refresh-button"
        >
          Refresh
        </button>
      </div>
      <ProgressBar totalBudget={totalBudget} remainingBudget={remainingBudget} className="progress-bar" />
      <AddItemForm onAdd={handleAdd} remainingBudget={remainingBudget} />
      <ShoppingList
        key={refresh}
        onDelete={(id, itemCost) => handleDelete(id, itemCost)}
        onUpdateQuantity={handleUpdateQuantity}
        remainingBudget={remainingBudget}
      />
    </div>
  );
}

export default App;
