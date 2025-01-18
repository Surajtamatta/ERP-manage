import React from 'react'
import Productlist from './productlist'
import Createproduct from './createproduct'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const Products = () => {
    const TabsItems = [
        {
            id: 1,
            trigger: "Product List",
            content: <Productlist />
        },
        {
            id: 2,
            trigger: "Add Product",
            content: <Createproduct />
        },
    ]

    return (
        <div className="w-full">

            <div className="flex-col md:flex">
               
     
                    <Tabs defaultValue="product-list" className="space-y-4">
                        <TabsList>
                            {TabsItems.map(item => (
                                <TabsTrigger key={item.id} value={item.trigger.toLowerCase().replace(' ', '-')}>
                                    {item.trigger}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {TabsItems.map(item => (
                            <TabsContent key={item.id} value={item.trigger.toLowerCase().replace(' ', '-')}>
                                {item.content}
                            </TabsContent>
                        ))}
                    </Tabs>
            </div>
        </div>
    )
}

export default Products