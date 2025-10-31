import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-black placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-black border-2 h-11 w-full min-w-0 rounded-none bg-white px-4 py-2 text-base font-mono font-bold text-black transition-all outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-bold disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "hover:shadow-[2px_2px_0_0_rgb(0,0,0)]",
        "focus-visible:shadow-[3px_3px_0_0_rgb(0,0,0)] focus-visible:border-black",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
