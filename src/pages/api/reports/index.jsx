import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const totalOrders = await prisma.salesOrder.count();
    const totalSales = await prisma.salesOrder.aggregate({
      _sum: { totalAmount: true },
    });
    const topProducts = await prisma.salesOrderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true, totalPrice: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    });

    res.status(200).json({
      totalOrders,
      totalSales: totalSales._sum.totalAmount,
      topProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error",error: error });
  }
}

