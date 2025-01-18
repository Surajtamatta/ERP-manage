
import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

  try {
    if (req.method === "GET") {
      const order = await prisma.salesOrder.findUnique({
        where: { id },
        include: { items: true },
      });
      res.status(200).json(order);
    } 
    else if (req.method === "PUT") {

      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ error: "status fields  required" });
      }

      const updatedProduct = await prisma.salesOrder.update({
        where: { id },
        data: { status },
      });

      res.status(200).json(updatedProduct);
    } 
    else if (req.method === "DELETE") {
        await prisma.salesOrderItem.deleteMany({
          where: { salesOrderId: id },
        });
        await prisma.salesOrder.delete({
          where: { id }, 
        });
        res.status(204).json({ message: "order successfully deleted" }).end();
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
