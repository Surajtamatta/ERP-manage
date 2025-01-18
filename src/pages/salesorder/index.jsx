import React from 'react'
import Salesorderlist from './salesorderlist'
import CreateSalesOrder from './createsaleorder'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const SalesOrder = () => {
    const TabsItems = [
        {
            id: 1,
            trigger: "Sales Lists",
            content: <Salesorderlist />
        },
        {
            id: 2,
            trigger: "Add Sales Order",
            content: <CreateSalesOrder />
        },
    ]

    return (
        <div className="w-full">

            <div className="flex-col md:flex">
               
     
                    <Tabs defaultValue="sales-lists" className="space-y-4">
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

export default SalesOrder