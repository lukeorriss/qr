"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("bg-muted text-muted-foreground inline-flex h-11 w-fit items-center justify-center rounded-none  border-black p-1 gap-3", className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-primary data-[state=active]:text-black dark:data-[state=active]:text-foreground focus-visible:border-black focus-visible:outline-black dark:data-[state=active]:border-black dark:data-[state=active]:bg-primary text-black dark:text-muted-foreground inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-none border-2 border-black bg-white px-4 py-2 text-sm font-bold font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-[3px_3px_0_0_rgb(0,0,0)] hover:shadow-[2px_2px_0_0_rgb(0,0,0)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
