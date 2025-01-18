import React, { useState, useEffect } from 'react';


import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
  } from "@/components/ui/card"
  import { useToast } from "@/hooks/use-toast"
import EditProduct from './editproduct';
import { useModal } from '@/context/modalContext';

const ProductList = () => {

  const [products, setProducts] = useState([]);
  const { toast } = useToast()
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useModal();





  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products'); 
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      setProducts(products.filter(product => product.id !== id)); 
      toast({
        variant: "success",
        title: "Successfully deleted",
        description: "Successfully  deleted your product",
      })
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to  deleted your product",
      })
    }
  };

  const handleEdit = (product) => {
    openModal(
        <EditProduct product={product}/>
      );
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>  
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
          </CardContent>

          <CardFooter className="flex justify-between ">
            <Button onClick={() => handleEdit(product)} className="btn-edit">Edit</Button>
            <Button onClick={() => handleDelete(product.id)} className="btn-delete">Delete</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
