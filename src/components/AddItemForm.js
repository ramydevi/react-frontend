import { useState } from "react";

const categories = [
  { label: "Grocery 🛒", value: "grocery" },
  { label: "Electronics 💻", value: "electronics" },
  { label: "Clothing 👗", value: "clothing" },
  { label: "Cosmetics 💄", value: "cosmetics" },
];

function AddItemForm({ onAdd, remainingBudget }) {
  const [item, setItem] = useState({
    itemName: "",
    category: "",
    quantity: 1,
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(item);
    setItem({ itemName: "", category: "", quantity: 1, price: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="text"
          name="itemName"
          value={item.itemName}
          onChange={handleChange}
          placeholder="Enter item name"
          required
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
        />
        <input
          type="number"
          name="quantity"
          value={item.quantity}
          onChange={handleChange}
          min="1"
          placeholder="Quantity"
          required
          style={{ width: "80px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
        />
        <input
          type="number"
          name="price"
          value={item.price}
          onChange={handleChange}
          min="0"
          placeholder="Enter price"
          required
          style={{ width: "100px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Add Item
        </button>
      </div>
    </form>
  );
}

export default AddItemForm;
