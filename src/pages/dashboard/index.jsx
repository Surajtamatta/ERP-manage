
import { Button } from "@/components/ui/button"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import Navbar from "@/components/navbar";
import Products from "../products"
import SalesOrder from "../salesorder"
import Reports from "../reports"





const DashboardPage = () => {

    const TabsItems = [
        {
            id: 1,
            trigger: "Reports Summary",
            content: <Reports />
        },
        {
            id: 2,
            trigger: "Products",
            content: <Products />
        },
        {
            id: 3,
            trigger: "Sales Orders",
            content: <SalesOrder />
        }
    ]

    return (
        <div className="w-full">

            <div className="flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center">
                        <div className="w-full flex items-center space-x-4">
                            <Navbar />
                        </div>
                    </div>
                </div>
                <div className="flex-1 space-y-4 sm:p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                        <div className="flex items-center space-x-2">
                            {/* <CalendarDateRangePicker /> */}
                            <Button>Download</Button>
                        </div>
                    </div>
                    <Tabs defaultValue="reports-summary" className="space-y-4">
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
        </div>
    )
}

export default DashboardPage