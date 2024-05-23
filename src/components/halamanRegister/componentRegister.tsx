// components/Register.tsx
import React, { useState } from "react";
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import router from "next/router";

export default function ComponentRegister() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("/api/register", {
        name,
        phone,
        email,
        password,
      });
      console.log(response.data);
      router.push("/login");
    } catch (error) {
      if (error.response && error.response.data.error === "User already exists") {
        setError("User already exists");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <Grid sx={{ bgcolor: "cyan", height: "100vh" }}>
      <Grid sx={{ m: "90px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "",
            bgcolor: "red",
          }}
        >
          <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>Register</Typography>
        </Box>
        {error && <Typography sx={{ fontSize: "16px", fontWeight: "bold", color: "red" }}>{error}</Typography>}
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" margin="normal" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField fullWidth label="Phone" margin="normal" variant="outlined" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <TextField fullWidth label="Email" margin="normal" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth label="Password" type="password" margin="normal" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
            Register
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
