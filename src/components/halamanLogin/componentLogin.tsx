'use client';

import React, { useState } from "react";
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";
import Link from "next/link";

export default function ComponentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const response = await signIn('google', {
        callbackUrl: '/',
      });
      if (response?.error) {
        setError("Login failed: " + response.error);
      }
    } catch (error) {
      setError("An unexpected error occurred: " + error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (response?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      window.location.reload(); // Reload the page on failure
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
          <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>Login</Typography>
        </Box>
        {error && (
          <Typography sx={{ fontSize: "16px", fontWeight: "bold", color: "red" }}>
            {error}
          </Typography>
        )}
        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
            Login
          </Button>
        </Box>
        <Button onClick={handleGoogleSignIn}>Login With Google</Button>
        <Link href="/register">Register</Link>
      </Grid>
    </Grid>
  );
}
