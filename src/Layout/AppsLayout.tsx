import { Box } from "@mui/material";
import React from "react";

export default function ProductLayout({ children, backgroundColor, full }: any) {
  return (
    <Box className="product-wrap-white" sx={{ display: "flex", bgcolor: backgroundColor, minWidth: "375px", height: full }}>
      <Box
        className="product-container"
        sx={{
          width: "100%",
          maxWidth: "1200px",
          padding: { xs: "20px 15px", md: "20px 30px" },
          margin: "0 auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
