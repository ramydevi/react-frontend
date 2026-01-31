import React from "react";

function ProgressBar({ totalBudget, remainingBudget }) {
  const percentage = ((remainingBudget / totalBudget) * 100).toFixed(2);
  let progressColor = "#4CAF50"; // Green

  if (percentage < 60 && percentage >= 30) {
    progressColor = "#FF9800"; // Orange
  } else if (percentage < 30) {
    progressColor = "#F44336"; // Red
  }

  return (
    <div style={{ margin: "20px 0" }}>
      <div style={{
        height: "20px",
        width: "100%",
        backgroundColor: "#e0e0e0",
        borderRadius: "10px",
        overflow: "hidden",
      }}>
        <div
          style={{
            height: "100%",
            width: `${percentage}%`,
            backgroundColor: progressColor,
            transition: "width 0.5s ease-in-out",
          }}
        ></div>
      </div>
      <p style={{ textAlign: "center", marginTop: "5px" }}>
        Remaining Budget: {remainingBudget} / {totalBudget} ({percentage}%)
      </p>
    </div>
  );
}

export default ProgressBar;