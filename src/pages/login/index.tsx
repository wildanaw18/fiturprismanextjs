// pages/login.js

import ComponentLogin from "@/components/halamanLogin/componentLogin";
import { Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const { error } = router.query;
  return (
    <>
      <Head>
        <title>Halaman Login</title>
      </Head>
      {error && <Typography sx={{ fontSize: "16px", fontWeight: "bold", color: "red" }}>Login failed</Typography>}
      <ComponentLogin />
    </>
  );
}
