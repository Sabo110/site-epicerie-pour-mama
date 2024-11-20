"use client"

import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSideBarMobile } from './app-sidebar'

export const NavbarMobile = () => {
    return (
        <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent side={"left"}>
                <SidebarProvider>
                    <AppSideBarMobile />
                </SidebarProvider>
            </SheetContent>
        </Sheet>

    )
}
