import React from "react";
import { Card } from "@mui/material";

export default function CustomCard() {
  return (
    <Card
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 3,
        p: 2,
        boxShadow: 3,
        backgroundColor: "lightblue", // Added background color
      }}
    >
      {/* ...existing code... */}
    </Card>
  );
}
