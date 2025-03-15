import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, IconButton } from "@mui/material";
import SavingsIcon from "@mui/icons-material/AccountBalance";
import CloseIcon from "@mui/icons-material/Close";
import { useCash } from "./CashContext";
import "./styles.css"; 

const SavingsAccountCard = () => {
  const { pocketCash, setPocketCash, simulatedDate } = useCash();
  const [balance, setBalance] = useState(0.0);
  const [actionType, setActionType] = useState(null); // "deposit" or "withdraw"
  const [amount, setAmount] = useState("");
  const [lastProcessedMonth, setLastProcessedMonth] = useState(null);
  
  // Interest rate (monthly)
  const MONTHLY_INTEREST_RATE = 0.003; // 0.3% monthly (approximately 3.6% annually)

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Handle transaction (deposit/withdraw)
  const handleTransaction = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      if (actionType === "deposit") {
        // Check if deposit amount is less than available pocket cash
        if (value > pocketCash) {
          alert("Insufficient pocket cash!");
        } else {
          // Subtract from pocket cash and add to savings
          setPocketCash(prevCash => prevCash - value);
          setBalance(prev => prev + value);
        }
      } else if (actionType === "withdraw") {
        // Check if withdrawal amount is less than available savings balance
        if (value > balance) {
          alert("Insufficient savings balance!");
        } else {
          // Add to pocket cash and subtract from savings
          setPocketCash(prevCash => prevCash + value);
          setBalance(prev => prev - value);
        }
      }
      
      // Reset form
      setAmount(""); 
      setActionType(null);
    }
  };

  // Handle MAX button click
  const handleMaxAmount = () => {
    if (actionType === "deposit") {
      setAmount(pocketCash.toString());
    } else if (actionType === "withdraw") {
      setAmount(balance.toString());
    }
  };

  // Process monthly interest based on the simulated date
  useEffect(() => {
    if (!simulatedDate) return;
    
    // Get current month and year from simulated date
    const currentMonth = simulatedDate.getMonth();
    const currentYear = simulatedDate.getFullYear();
    
    // Create a unique identifier for this month
    const monthIdentifier = `${currentYear}-${currentMonth}`;
    
    // If this is a new month and we have a balance, apply interest
    if (lastProcessedMonth !== monthIdentifier && balance > 0) {
      // Calculate interest
      const interest = balance * MONTHLY_INTEREST_RATE;
      
      // Add interest to balance
      setBalance(prevBalance => {
        const newBalance = prevBalance + interest;
        console.log(`Applied interest: ${interest.toFixed(2)} to savings. New balance: ${newBalance.toFixed(2)}`);
        return newBalance;
      });
      
      // Update the last processed month
      setLastProcessedMonth(monthIdentifier);
    }
  }, [simulatedDate, balance, lastProcessedMonth]);

  return (
    <Box className="savings-container">
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        SAVINGS ACCOUNT
      </Typography>
      <SavingsIcon sx={{ fontSize: 50, mb: 2 }} />
      <Box className="balance-section">
        <Typography sx={{ fontWeight: "bold" }}>BALANCE</Typography>
        <Typography sx={{ fontWeight: "bold" }}>{formatCurrency(balance)}</Typography>
      </Box>
      
      <Box className="pocket-cash-info">
        <Typography sx={{ fontSize: 14 }}>Available Pocket Cash: {formatCurrency(pocketCash)}</Typography>
      </Box>

      {/* Show Input Box when Deposit/Withdraw is Clicked */}
      {actionType ? (
        <Box className="transaction-box">
          <IconButton className="close-button" onClick={() => setActionType(null)}>
            <CloseIcon />
          </IconButton>
          <button className="max-button" onClick={handleMaxAmount}>MAX</button>
          <TextField
            type="number"
            variant="standard"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="$0.00"
            size="small"
            className="amount-input"
            inputProps={{ min: 0 }}
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
      
      <Box className="interest-info" sx={{ mt: 2, fontSize: 12 }}>
        <Typography>Monthly Interest Rate: {(MONTHLY_INTEREST_RATE * 100).toFixed(2)}%</Typography>
        <Typography>Annual Interest Rate: {(MONTHLY_INTEREST_RATE * 12 * 100).toFixed(2)}%</Typography>
      </Box>
    </Box>
  );
};

export default SavingsAccountCard;