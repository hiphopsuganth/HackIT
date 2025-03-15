import React, { useState } from "react";
import { Typography, Box, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCash } from "./CashContext";
import "./styles.css";

const COD = () => {
  const { pocketCash, setPocketCash } = useCash();
  const [balance, setBalance] = useState(0.0);
  const [amount, setAmount] = useState("");
  const [selectedTerm, setSelectedTerm] = useState(null); // Track selected term

  // Term options
  const termOptions = [
    { label: "3 Months", value: "3m", minDeposit: 250 },
    { label: "1 Year", value: "1y", minDeposit: 500 },
    { label: "3 Years", value: "3y", minDeposit: 1000 },
  ];

  // Format currency
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(amount);

  // Handle deposit transaction
  const handleTransaction = () => {
    const value = parseFloat(amount);
    const minDeposit = termOptions.find((t) => t.value === selectedTerm)?.minDeposit || 0;

    if (isNaN(value) || value <= 0) {
      alert("Enter a valid amount!");
      return;
    }
    if (value < minDeposit) {
      alert(`Minimum deposit is $${minDeposit}`);
      return;
    }
    if (value > pocketCash) {
      alert("Insufficient pocket cash!");
      return;
    }

    setPocketCash((prev) => prev - value);
    setBalance((prev) => prev + value);
    setAmount("");
    setSelectedTerm(null);
  };

  return (
    <Box className="savings-container">
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        CERTIFICATE OF DEPOSIT
      </Typography>
      <Box sx={{ mb: 2 }}>
        <img src="/dvd-removebg-preview.png" alt="Certificate of Deposit" style={{ width: "100px" }} />
      </Box>
      <Box className="balance-section">
        <Typography sx={{ fontWeight: "bold" }}>PROFIT</Typography>
        <Typography sx={{ fontWeight: "bold" }}>{formatCurrency(balance)}</Typography>
      </Box>
      <Box className="pocket-cash-info">
        <Typography sx={{ fontSize: 14 }}>Available Pocket Cash: {formatCurrency(pocketCash)}</Typography>
      </Box>

      {/* Deposit Flow */}
      {selectedTerm ? (
        <Box className="transaction-box">
          <IconButton className="close-button" onClick={() => setSelectedTerm(null)}>
            <CloseIcon />
          </IconButton>
          <TextField
            type="number"
            variant="standard"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Min: $${termOptions.find((t) => t.value === selectedTerm)?.minDeposit}`}
            size="small"
            className="amount-input"
          />
          <button className="action-button" onClick={handleTransaction}>Confirm</button>
        </Box>
      ) : (
        <Box className="button-container">
          {termOptions.map((term) => (
            <button key={term.value} className="term-button" onClick={() => setSelectedTerm(term.value)}>
              {term.label} - Min ${term.minDeposit}
            </button>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default COD;
