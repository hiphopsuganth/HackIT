import React, { useState } from "react";
import { Typography, Box, TextField, IconButton } from "@mui/material";
import SavingsIcon from "@mui/icons-material/AccountBalance";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css"; // Import CSS file

const SavingsAccountCard = () => {
  const [balance, setBalance] = useState(0.0);
  const [actionType, setActionType] = useState(null); // "deposit" or "withdraw"
  const [amount, setAmount] = useState("");

  const handleTransaction = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      if (actionType === "withdraw" && value > balance) {
        alert("Insufficient balance!");
      } else {
        setBalance((prev) => (actionType === "deposit" ? prev + value : prev - value));
      }
      setAmount(""); // Reset input
      setActionType(null); // Hide input field after transaction
    }
  };

  return (
    <Box className="savings-container">
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        SAVINGS ACCOUNT
      </Typography>
      <SavingsIcon sx={{ fontSize: 50, mb: 2 }} />
      <Box className="balance-section">
        <Typography sx={{ fontWeight: "bold" }}>BALANCE</Typography>
        <Typography sx={{ fontWeight: "bold" }}>${balance.toFixed(2)}</Typography>
      </Box>

      {/* Show Input Box when Deposit/Withdraw is Clicked */}
      {actionType ? (
        <Box className="transaction-box">
          <IconButton className="close-button" onClick={() => setActionType(null)}>
            <CloseIcon />
          </IconButton>
          <button className="max-button">MAX</button>
          <TextField
            type="number"
            variant="standard"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$0.00"
            size="small"
            className="amount-input"
          />
          <button className="action-button" onClick={handleTransaction}>
            {actionType}
          </button>
        </Box>
      ) : (
        <Box className="button-container">
          <button className="action-button" onClick={() => setActionType("withdraw")}>
            Withdraw
          </button>
          <button className="action-button" onClick={() => setActionType("deposit")}>
            Deposit
          </button>
        </Box>
      )}
    </Box>
  );
};

export default SavingsAccountCard;
