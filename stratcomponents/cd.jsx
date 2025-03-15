import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCash } from "./CashContext";
import "./styles.css";

const COD = () => {
  const { pocketCash, setPocketCash } = useCash();
  const [balance, setBalance] = useState(0.0);
  const [amount, setAmount] = useState("");
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [maturityDate, setMaturityDate] = useState(null);
  const [interestRate, setInterestRate] = useState(0);
  const [isMatured, setIsMatured] = useState(false);

  // Term options with interest rates
  const termOptions = [
    { label: "3 Months", value: "3m", minDeposit: 250, interestRate: 0.02 },
    { label: "1 Year", value: "1y", minDeposit: 500, interestRate: 0.05 },
    { label: "3 Years", value: "3y", minDeposit: 1000, interestRate: 0.1 },
  ];

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(amount);

  const handleTransaction = () => {
    const value = parseFloat(amount);
    const termDetails = termOptions.find((t) => t.value === selectedTerm);
    if (!termDetails || isNaN(value) || value <= 0) {
      alert("Enter a valid amount!");
      return;
    }
    if (value < termDetails.minDeposit) {
      alert(`Minimum deposit is $${termDetails.minDeposit}`);
      return;
    }
    if (value > pocketCash) {
      alert("Insufficient pocket cash!");
      return;
    }

    setPocketCash((prev) => prev - value);
    setBalance(value);
    setInterestRate(termDetails.interestRate);

    // Calculate maturity date
    const currentDate = new Date();
    let futureDate = new Date(currentDate);
    if (selectedTerm === "3m") futureDate.setMonth(futureDate.getMonth() + 3);
    if (selectedTerm === "1y") futureDate.setFullYear(futureDate.getFullYear() + 1);
    if (selectedTerm === "3y") futureDate.setFullYear(futureDate.getFullYear() + 3);

    setMaturityDate(futureDate);
    setIsMatured(false);
    setSelectedTerm(null);
    setAmount("");
  };

  useEffect(() => {
    if (!maturityDate || isMatured) return;
    const interval = setInterval(() => {
      const currentDate = new Date();
      if (currentDate >= maturityDate) {
        setIsMatured(true);
        clearInterval(interval);
      } else {
        setBalance((prevBalance) => prevBalance * (1 + interestRate / 12));
      }
    }, 5000); // Simulate monthly growth every 5 seconds

    return () => clearInterval(interval);
  }, [maturityDate, interestRate, isMatured]);

  return (
    <Box className="savings-container">
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        CERTIFICATE OF DEPOSIT
      </Typography>
      <Box sx={{ mb: 2 }}>
        <img src="/dvd-removebg-preview.png" alt="Certificate of Deposit" style={{ width: "100px" }} />
      </Box>
      <Box className="balance-section">
        <Typography sx={{ fontWeight: "bold" }}>BALANCE</Typography>
        <Typography sx={{ fontWeight: "bold" }}>{formatCurrency(balance)}</Typography>
      </Box>
      <Box className="pocket-cash-info">
        <Typography sx={{ fontSize: 14 }}>
          Available Pocket Cash: {formatCurrency(pocketCash)}
        </Typography>
      </Box>

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
          <button className="action-button" onClick={handleTransaction}>
            Confirm
          </button>
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

      {maturityDate && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography>
            Maturity Date: {maturityDate.toLocaleDateString()}
          </Typography>
          <Typography>
            {isMatured ? "Funds available for withdrawal." : "Funds growing..."}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default COD;
