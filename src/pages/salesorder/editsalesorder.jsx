import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditSalesOrder = ({ salesorder }) => {
  const [formData, setFormData] = useState({ orderDate: '', customerName: '', totalAmount: '', status: '' });
  const { toast } = useToast();
 console.log(salesorder)
  useEffect(() => {
    if (salesorder) {
      setFormData({
        orderDate: salesorder.orderDate,
        customerName: salesorder.customerName,
        totalAmount: salesorder.totalAmount,
        status: salesorder.status,
      });
    }
  }, [salesorder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStatusChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      status: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/sales-orders/${salesorder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          variant: "success",
          title: "Successfully updated",
          description: "Successfully updated your sales order",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Failed to update your sales order",
        });
      }
    } catch (error) {
      console.error('Error updating sales order:', error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to update your sales order",
      });
    }
  };

  if (!salesorder) return <div>Loading...</div>;

  return (
    <Card className="min-w-72 sm:min-w-96 flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Edit Sales Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              type="text"
              name="customerName"
              disabled
              value={formData.customerName}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Order Date</label>
            <input
              type="date"
              name="orderDate"
              disabled
              value={formData.orderDate}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Total Amount</label>
            <input
              type="number"
              name="totalAmount"
              disabled
              value={formData.totalAmount}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <Select
              value={formData.status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancel">Cancel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit">
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditSalesOrder;
