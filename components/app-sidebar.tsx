"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import logo from "@/public/logo.png"
import { useRouter } from 'nextjs-toploader/app';

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Epicerie 1",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Catégorie",
          url: "/dashboard/categorie",
        },
        {
          title: "sous-catégorie",
          url: "/dashboard/sous-categorie",
        },
        {
          title: "sous-sous-catégorie",
          url: "/dashboard/sous-sous-categorie",
        },
        {
          title: "Produit",
          url: "/dashboard/produit",
        },
      ],
    },
    {
      title: "Epicerie 2",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "GenCesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
          <Image
            src={logo}
            alt="logo" 
            className="cursor-pointer"
            onClick={() => {
              document.getElementById("btn-dsh")?.click()
              router.push("/dashboard")
            }}
            />
        
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
