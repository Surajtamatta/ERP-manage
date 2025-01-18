import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";

const EditProduct = ({ product}) => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', quantity: '' });
  const { toast } = useToast();
 
  console.log(product)
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        quantity: product.quantity || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    };

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        toast({
            variant: "success",
            title: "Successfully updated",
            description: "Successfully  updated your product",
          })
      } else {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Failed to  update your product",
          })
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to  update your product",
      })
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Card className="min-w-72 sm:min-w-96 flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
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
            />
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

export default EditProduct;
