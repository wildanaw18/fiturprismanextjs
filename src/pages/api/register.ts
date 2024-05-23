// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, phone, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const user = await prisma.user.create({
        data: {
          name,
          phone,
          email,
          password: hashedPassword,
        },
      });
      res.status(200).json({ message: "User created successfully", user });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
