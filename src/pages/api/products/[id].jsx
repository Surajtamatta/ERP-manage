
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

  try {
    if (req.method === "GET") {
      const product = await prisma.product.findUnique({ where: { id } });
      res.status(200).json(product);
    } 
    else if (req.method === "PUT") {

      const { name, description, price, quantity } = req.body;
      if (!name || !description || !price || !quantity) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const updatedProduct = await prisma.product.update({
        where: { id },
        data: { name, description, price, quantity },
      });

      res.status(200).json(updatedProduct);
    } 
    else if (req.method === "DELETE") {
      await prisma.product.delete({ where: { id } });
      res.status(204).json({ error: "product successfully deleted" }).end();
    }
    else {
      res.setHeader("Allow", ["GET", "PUT","DELETE"]);
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
