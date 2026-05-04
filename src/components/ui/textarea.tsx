import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Surface mirrors <Input /> · padding x=16 y=12 matches Input default.
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-ink-100 bg-ink-25 text-ink-800 px-4 py-3 text-sm transition-colors outline-none placeholder:text-ink-300 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-400 disabled:opacity-100 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
