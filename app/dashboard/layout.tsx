import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { UserButton, } from '@clerk/nextjs'

type Props = {
    children: React.ReactNode
}
export default function layout({ children }: Props) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='grow p-4'>
                <div className='flex items-center justify-between'>
                    <SidebarTrigger />
                    <UserButton />
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}
