import { useEffect, useState } from "react";
import { getItems, deleteItem } from "../api/api";

function ShoppingList({ onDelete, remainingBudget }) {
  const [items, setItems] = useState([]);

  const fetchItems = () => {
    getItems()
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchItems();
  }, [remainingBudget]);

  const handleDelete = (item) => {
    onDelete(item.id, item.quantity * item.price);
  };

  const toggleBought = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  };

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#4CAF50", color: "white" }}>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Item</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Quantity</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Price</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Total</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Bought</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              style={{
                backgroundColor: "#f9f9f9",
                textAlign: "center",
              }}
            >
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.itemName}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.quantity}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.price}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.quantity * item.price}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <input
                  type="checkbox"
                  checked={item.bought || false}
                  onChange={() => toggleBought(item.id)}
                />
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <button
                  onClick={() => handleDelete(item)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShoppingList;
