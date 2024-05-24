import { Box, Button, Typography } from "@mui/material";
import { signOut, useSession } from 'next-auth/react';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Box sx={{ bgcolor: "red", padding: "16px" }}>
        <Typography variant="h6">Ini adalah halaman utama</Typography>
        {session?.user?.email && (
          <Typography variant="subtitle1">Logged in as: {session.user.email}</Typography>
        )}
        <Button onClick={handleLogout} variant="contained" color="primary" sx={{ marginTop: "16px" }}>
          Logout
        </Button>
      </Box>
    </>
  );
}
