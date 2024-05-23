// pages/api/register.ts
import { registerUser } from "@/lib/action";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, phone, email, password } = req.body;

    const result = await registerUser(name, phone, email, password);

    if (result.success) {
      res.status(201).json(result.user);
    } else {
      res.status(400).json({ error: result.error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
