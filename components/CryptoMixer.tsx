import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CryptoMixer() {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [delay, setDelay] = useState(0);
  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");
  const [coin, setCoin] = useState("ETH");

  const handleMix = async () => {
    setStatus("Processing...");
    try {
      const response = await fetch("/api/mix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, recipient, delay, coin })
      });
      const data = await response.json();
      if (data.success) {
        setTxHash(data.txHash);
        setStatus("Mixing complete");
      } else {
        setStatus("Mixing failed: " + data.error);
      }
    } catch (err) {
      setStatus("Error connecting to mixer backend.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl p-6 bg-zinc-900">
        <CardContent className="space-y-4">
          <h1 className="text-3xl font-bold text-center">💸 Crypto Mixer</h1>
          <div className="space-y-2">
            <Label>Select Coin</Label>
            <Select onValueChange={setCoin} defaultValue="ETH">
              <SelectTrigger className="bg-zinc-800 text-white">
                <SelectValue placeholder="Select coin" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 text-white">
                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                <SelectItem value="XMR">Monero (XMR)</SelectItem>
                <SelectItem value="USDT">Tether (USDT)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              placeholder="Enter amount"
              className="bg-zinc-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label>Recipient Address</Label>
            <Input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Paste wallet address"
              className="bg-zinc-800 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label>Delay (minutes)</Label>
            <Input
              type="number"
              value={delay}
              onChange={(e) => setDelay(parseInt(e.target.value))}
              placeholder="Optional delay"
              className="bg-zinc-800 text-white"
            />
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleMix}>Start Mixing</Button>
          {status && <p className="text-sm text-center mt-2 text-gray-400">{status}</p>}
          {txHash && <p className="text-sm text-center text-green-400 break-all">Tx Hash: {txHash}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
