import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const products = await prisma.product.findMany();
      return res.status(200).json(products);
    } 
    else if (req.method === "POST") {

      const { name, description, price, quantity } = req.body;
      if (!name || !description || !price || !quantity) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity),
        },
      });

      return res.status(201).json(product);
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
