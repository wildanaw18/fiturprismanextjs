// pages/api/auth/error.ts
import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { error } = req.query;
  if (error === "OAuthAccountNotLinked") {
    res.redirect("/");
  } else {
    res.redirect(`/login?error=${encodeURIComponent(error as string)}`);
  }
};
