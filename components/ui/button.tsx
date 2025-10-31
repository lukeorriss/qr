import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border-2 border-black font-mono uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-primary text-black border-black hover:bg-black hover:text-primary hover:border-primary",
        destructive:
          "bg-destructive text-white border-black hover:bg-black hover:text-destructive hover:border-destructive",
        outline:
          "border-2 border-black bg-background text-black hover:bg-black hover:text-white",
        secondary:
          "bg-secondary text-black border-black hover:bg-black hover:text-secondary",
        ghost:
          "border-2 border-black bg-transparent text-black hover:bg-black hover:text-white",
        link: "border-0 text-primary underline-offset-4 hover:underline hover:border-0",
      },
      size: {
        default: "h-11 px-6 py-3 has-[>svg]:px-4",
        sm: "h-9 gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-14 px-8 py-4 text-base has-[>svg]:px-6",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
