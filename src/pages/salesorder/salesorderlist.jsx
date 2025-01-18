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

import { useModal } from '@/context/modalContext';
import EditSalesOrder from './editsalesorder';
import OrderItemList from './orderitemlist';


const Salesorderlist = () => {
    const [saleorder, setSaleOrder] = useState([]);
    const { toast } = useToast()
    const [menuOpen, setMenuOpen] = useState(false);
    const { openModal } = useModal();





    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const fetchSaleOrder = async () => {
            const response = await fetch('/api/sales-orders');
            const data = await response.json();
            setSaleOrder(data);
        };

        fetchSaleOrder();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });
            setSaleOrder(saleorder.filter(product => product.id !== id));
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

    const handleEdit = (salesorder) => {
        openModal(
            <EditSalesOrder salesorder={salesorder} />
        );
    };
    const handleItems = (orderdetail) => {
        openModal(
            <OrderItemList orderdetail={orderdetail} />
        );
    };
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {saleorder.map((order) => (
                <Card key={order.id} className="flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle>{order.customerName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p>Order Date: {new Date(order.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        })}</p>

                        <p>Total Amount: ${order.totalAmount}</p>
                        <p className={`font-medium ${order.status === 'pending'
                                ? 'text-yellow-500'
                                : order.status === 'completed'
                                    ? 'text-green-500'
                                    : order.status === 'cancel'
                                        ? 'text-red-500'
                                        : ''
                            }`}>Status: {order.status}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-3 ">
                        <Button onClick={() => handleItems(order)} className="btn-delete">Items</Button>

                        <Button onClick={() => handleEdit(order)} className="btn-edit">Edit</Button>

                        <Button onClick={() => handleDelete(order.id)} className="btn-delete">Delete</Button>

                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default Salesorderlist