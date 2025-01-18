import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreateSalesOrder = () => {
  const { toast } = useToast();
  const [salesOrder, setSalesOrder] = useState({
    customerName: "",
    status: "pending",
    items: [
      { productId: "", quantity: 0, unitPrice: 0, totalPrice: 0 },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSalesOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...salesOrder.items];
    updatedItems[index][field] = field === "quantity" || field === "unitPrice" ? parseFloat(value) : value;
    if (field === "quantity" || field === "unitPrice") {
      updatedItems[index].totalPrice = updatedItems[index].quantity * updatedItems[index].unitPrice;
    }
    setSalesOrder((prevState) => ({
      ...prevState,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    setSalesOrder((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        { productId: "", quantity: 0, unitPrice: 0, totalPrice: 0 },
      ],
    }));
  };

  const removeItem = (index) => {
    const updatedItems = salesOrder.items.filter((_, i) => i !== index);
    setSalesOrder((prevState) => ({
      ...prevState,
      items: updatedItems,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/sales-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(salesOrder),
      });

      if (response.ok) {
        alert("Sales order created successfully!");
        setSalesOrder({
          customerName: "",
          status: "pending",
          items: [{ productId: "", quantity: 0, unitPrice: 0, totalPrice: 0 }],
        });
        toast({
          variant: "success",
          title: "Successfully create",
          description: "Successfully  creates your order",
        })
      } else {
        alert("Failed to create sales order.");
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Failed to  create your product",
        })
      }
    } catch (error) {
      console.error("Error creating sales order:", error);
    }
    toast({
      title: "Uh oh! Something went wrong.",
      description: "Failed to  update your product",
    })
  };

  return (
    <Card className="min-w-72 sm:min-w-96">
      <CardHeader>
        <CardTitle>Create Sales Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={salesOrder.customerName}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={salesOrder.status}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded"
              required
            >
              <option value="pending">Pending</option>
              <option value="complete">Complete</option>
              <option value="cancel">Cancel</option>
            </select>
          </div>
          <div>
            <h3 className="text-lg font-medium">Items</h3>
            {salesOrder.items.map((item, index) => (
              <div key={index} className="mb-4 border p-3 rounded">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Product ID</label>
                  <input
                    type="text"
                    value={item.productId}
                    onChange={(e) => handleItemChange(index, "productId", e.target.value)}
                    className="w-full mt-1 p-2 border rounded"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      className="w-full mt-1 p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                      className="w-full mt-1 p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Price</label>
                    <input
                      type="number"
                      value={item.totalPrice}
                      readOnly
                      className="w-full mt-1 p-2 border rounded bg-gray-100"
                    />
                  </div>
                </div>
                <div className="mt-2 text-right">
                  <Button
                    variant="destructive"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="secondary" onClick={addItem}>
              Add Item
            </Button>
          </div>
          <div className="mt-4 text-right">
            <Button type="submit">Create Order</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateSalesOrder;
