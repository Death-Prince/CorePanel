This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

npm install firebase

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHE6i32FGDUorauHzc0lWYwz2r74A7wCU",
  authDomain: "stackshelf-auth.firebaseapp.com",
  projectId: "stackshelf-auth",
  storageBucket: "stackshelf-auth.appspot.com", // ✅ FIXED
  messagingSenderId: "19299320957",
  appId: "1:19299320957:web:d3ed4dee13884a19201d14",
  measurementId: "G-LL5VVEJP01",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };



// import {
//   Calendar,
//   Inbox,
//   Search,
//   Settings,
//   LogOut,
//   CircleUserRound,
//   LayoutDashboard,
// } from "lucide-react";
// import { signOut } from "firebase/auth";
// import { auth } from "@/lib/firebase";
// import { useRouter } from "next/navigation";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarHeader,
//   SidebarFooter,
// } from "@/components/ui/sidebar";

// interface SidebarTriggerProps {
//   user: {
//     displayName: string | null;
//     email: string | null;
//     photoURL?: string | null;
//   };
// }

// // Menu items.
// const items = [
//   {
//     title: "Dashboard",
//     url: "/",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ];

// export function AppSidebar({ user }: SidebarTriggerProps) {
//   const router = useRouter();

//   const handleSignOut = async () => {
//     await signOut(auth);
//     router.push("/login");
//   };

//   return (
//     <Sidebar className="select-none border-none">
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <div className="flex items-center gap-2 rounded-md p-2 transition-colors data-[state=open]:bg-muted cursor-pointer">
//                   <Avatar>
//                     <AvatarImage
//                       src={user.photoURL || "https://github.com/shadcn.png"}
//                     />
//                     <AvatarFallback>
//                       {user.displayName?.[0] ?? "?"}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="text-left hidden sm:block">
//                     <p className="font-semibold text-sm">{user.displayName}</p>
//                   </div>
//                 </div>
//               </PopoverTrigger>
//               <PopoverContent side="right" className="p-0 mt-2">
//                 <SidebarGroupContent className="py-2 px-1">
//                   <SidebarGroupLabel>Application</SidebarGroupLabel>
//                   <SidebarMenu>
//                     <SidebarMenuItem>
//                       <SidebarMenuButton className="py-5 border-none ring-0 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 data-[state=active]:bg-transparent">
//                         <CircleUserRound />
//                         <span className="p-1">Account</span>
//                       </SidebarMenuButton>

//                       <SidebarMenuButton
//                         onClick={handleSignOut}
//                         className="py-5 border-none ring-0 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 data-[state=active]:bg-transparent"
//                       >
//                         <LogOut />
//                         <span className="p-1">Sign out</span>
//                       </SidebarMenuButton>
//                     </SidebarMenuItem>
//                   </SidebarMenu>
//                 </SidebarGroupContent>
//               </PopoverContent>
//             </Popover>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>

//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Application</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <a href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <div className="flex items-center gap-2 rounded-md p-2 transition-colors data-[state=open]:bg-muted cursor-pointer">
//                   <Avatar>
//                     <AvatarImage
//                       src={user.photoURL || "https://github.com/shadcn.png"}
//                     />
//                     <AvatarFallback>
//                       {user.displayName?.[0] ?? "?"}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="text-left hidden sm:block">
//                     <p className="font-semibold text-sm">{user.displayName}</p>
//                     <p className="text-muted-foreground text-xs">
//                       {user.email}
//                     </p>
//                   </div>
//                 </div>
//               </PopoverTrigger>
//               <PopoverContent side="right" className="p-0 mb-2">
//                 <div className="flex items-center gap-2 m-2">
//                   <Avatar className="rounded-lg w-10 h-10">
//                     <AvatarImage
//                       src={user.photoURL || "https://github.com/shadcn.png"}
//                     />
//                     <AvatarFallback>
//                       {user.displayName?.[0] ?? "?"}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="text-left hidden sm:block">
//                     <p className="font-semibold text-sm">{user.displayName}</p>
//                     <p className="text-muted-foreground text-xs">
//                       {user.email}
//                     </p>
//                   </div>
//                 </div>
//                 <Separator />

//                 <SidebarGroupContent className="py-2 px-1">
//                   <SidebarMenu>
//                     <SidebarMenuItem>
//                       <SidebarMenuButton className="py-5 border-none ring-0 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 data-[state=active]:bg-transparent">
//                         <CircleUserRound />
//                         <span className="p-1">Account</span>
//                       </SidebarMenuButton>

//                       <SidebarMenuButton
//                         onClick={handleSignOut}
//                         className="py-5 border-none ring-0 outline-none focus:ring-0 focus:outline-none focus-visible:ring-0 data-[state=active]:bg-transparent"
//                       >
//                         <LogOut />
//                         <span className="p-1">Sign out</span>
//                       </SidebarMenuButton>
//                     </SidebarMenuItem>
//                   </SidebarMenu>
//                 </SidebarGroupContent>
//               </PopoverContent>
//             </Popover>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

// app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/lib/firebase";
import {
  signInWithPopup,
  // GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    // If already logged in, redirect to home
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info:", user);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login Error:", error.message);
      } else {
        console.error("Unknown Login Error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-background p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Login to CorePanel
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Button onClick={handleLogin} className="w-full">
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
