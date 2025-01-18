import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card,CardContent,
    CardDescription,
    CardHeader,
    CardTitle, } from "@/components/ui/card";

const OrderItemList = ({ orderdetail }) => {
  if (!orderdetail || !Array.isArray(orderdetail.items)) {
    console.error("Invalid orderdetail prop:", orderdetail);
    return <p>No items to display.</p>;
  }

  return (
    <Card className="overflow-x-auto ">
         <CardHeader>
                <CardTitle>Order Items</CardTitle>
        </CardHeader>
      <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Total Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderdetail.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.Product?.name || "N/A"}</TableCell>
              <TableCell>{item.salesOrderId}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${parseFloat(item.unitPrice).toFixed(2)}</TableCell>
              <TableCell>${parseFloat(item.totalPrice).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </CardContent>
    </Card>
  );
};

export default OrderItemList;


