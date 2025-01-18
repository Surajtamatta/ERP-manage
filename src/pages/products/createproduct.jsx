import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreateProduct = () => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', quantity: '' });
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    };

    try {
      const response = await fetch(`/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct), 
      });

      if (response.ok) {
        toast({
          variant: "success",
          title: "Product Created",
          description: "Your product was successfully created.",
        });

        setFormData({ name: '', description: '', price: '', quantity: '' });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Failed to create your product. Please try again.",
        });
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to create your product. Please try again.",
      });
    }
  };

  return (
    <Card className="min-w-72 sm:min-w-96 flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit">Create Product</Button>
          </div>
        </form>
      </CardContent>
    </Card>

    
  );
};

export default CreateProduct;
