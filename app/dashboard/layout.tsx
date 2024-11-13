import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

type Props = {
    children: React.ReactNode
}
export default function layout({ children }: Props) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='grow p-4'>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
