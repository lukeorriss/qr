import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-none border-2 border-black px-3 py-1 text-xs font-bold font-mono uppercase tracking-wider w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-all overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-black bg-primary text-primary-foreground [a&]:hover:bg-black [a&]:hover:text-primary [a&]:hover:shadow-[2px_2px_0_0_rgb(0,0,0)]",
        secondary:
          "border-black bg-secondary text-secondary-foreground [a&]:hover:bg-black [a&]:hover:text-secondary [a&]:hover:shadow-[2px_2px_0_0_rgb(0,0,0)]",
        destructive:
          "border-black bg-destructive text-white [a&]:hover:bg-black [a&]:hover:text-destructive [a&]:hover:shadow-[2px_2px_0_0_rgb(0,0,0)]",
        outline:
          "border-black bg-transparent text-foreground [a&]:hover:bg-black [a&]:hover:text-white [a&]:hover:shadow-[2px_2px_0_0_rgb(0,0,0)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
