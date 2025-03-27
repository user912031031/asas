import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { amount, recipient, delay, coin } = req.body;
  console.log("Incoming mix request:", { amount, recipient, delay, coin });

  await new Promise(resolve => setTimeout(resolve, 2000));

  const fakeTxHash = "0x" + Math.random().toString(16).slice(2).padEnd(64, "0");

  return res.status(200).json({ success: true, txHash: fakeTxHash });
}
