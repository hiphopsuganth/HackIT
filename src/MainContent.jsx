import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import SavingsAccountCard from "../stratcomponents/SavingAccountCard"; // Import your component
import "../stratcomponents/styles.css";

export const MainContent = () => {
  return (
    <section className="main-content">
      <Card sx={{ maxWidth: 400, mx: "auto", mt: 3, p: 2, boxShadow: 3 }}>
        <CardContent>
          <SavingsAccountCard /> 
        </CardContent>
      </Card>
    </section>
  );
};
