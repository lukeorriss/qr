import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-black border-2 placeholder:text-muted-foreground focus-visible:border-black dark:bg-input/30 flex field-sizing-content min-h-20 w-full rounded-none bg-white px-4 py-3 text-base font-mono font-bold text-black transition-all outline-none hover:shadow-[2px_2px_0_0_rgb(0,0,0)] focus-visible:shadow-[3px_3px_0_0_rgb(0,0,0)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
