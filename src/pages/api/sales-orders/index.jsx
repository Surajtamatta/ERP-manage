
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const orders = await prisma.salesOrder.findMany({ include: { items: true } });
      return res.status(200).json(orders);
    } 
    else if (req.method === "POST") {

      const {customerName, status, items } = req.body;

      if ( !customerName || !status || !items) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Items must be a non-empty array." });
      }

      const order = await prisma.salesOrder.create({
              data: {
                orderDate: new Date(),
                customerName,
                status,
                totalAmount: items.reduce((sum, item) => sum + item.totalPrice, 0),
                items: { create: items },
              },
      });

      return res.status(201).json(order);
    } 
    else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error("Error in handler:", error);
    return res.status(500).json({
      message: "An unexpected error occurred.",
      error: error.message,
    });
  }
}
