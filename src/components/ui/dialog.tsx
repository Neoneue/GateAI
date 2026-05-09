import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-ink-900/40 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 motion-reduce:animate-none motion-reduce:duration-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          // Skill: emil-design-eng — modals belong in the 200–500ms range
          // (slower than dropdowns; the surface is visually heavy enough that
          // a 100ms snap reads as a glitch). Origin stays centered (modal
          // exception — they aren't anchored to a trigger).
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-white p-4 text-sm text-ink-900 border border-ink-200 shadow-(--shadow-modal) overscroll-contain duration-200 ease-out outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 motion-reduce:animate-none motion-reduce:duration-0",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
              />
            }
          >
            <XIcon
            />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

/* ─── Scroll-shell variant ────────────────────────────────────────────────
 * Detail-modal pattern: fixed header band → optional fixed summary band
 * (KPI rail) → scrollable body → fixed footer. Used by CMP-013 Request
 * detail and CMP-014 Conversation detail. The plain `DialogContent` works
 * for short forms; this set ships the structural wiring so consumers
 * don't hand-roll `flex-col / overflow-hidden / flex-1 / min-h-0 /
 * px-4 pt-4 / border-t` every time.
 *
 * Composition:
 *   <DialogScrollContent>
 *     <DialogScrollHeader>...</DialogScrollHeader>
 *     <DialogScrollSummary>...</DialogScrollSummary>   // optional
 *     <DialogScrollBody>...</DialogScrollBody>
 *     <DialogScrollFooter>...</DialogScrollFooter>
 *   </DialogScrollContent>
 *
 * `DialogScrollContent` capacities: `max-h-[90vh] flex flex-col gap-0 p-0
 * overflow-hidden` — consumer passes width override (`sm:max-w-2xl` etc.).
 * Each section owns its own `px-4` so they all line up against the modal
 * edge at 16px regardless of which sections are present.
 * ───────────────────────────────────────────────────────────────────── */

function DialogScrollContent({
  className,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      data-slot="dialog-scroll-content"
      // `gap-0 p-0 overflow-hidden flex flex-col max-h-[90vh]` is the
      // structural contract — sections inside manage their own padding so
      // a fixed footer can sit flush at the modal's bottom edge while the
      // body scrolls between fixed header/footer.
      className={cn(
        "max-h-[90vh] gap-0 p-0 overflow-hidden flex flex-col",
        className,
      )}
      {...props}
    />
  )
}

function DialogScrollHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-scroll-header"
      // Fixed header band — eyebrow / title / identity meta. `pr-12` on
      // the title block in consumers is OK to clear the absolute close
      // button when needed, but the primitive itself doesn't bake it in
      // (some headers don't need it).
      className={cn("shrink-0 flex flex-col gap-3 px-4 pt-4", className)}
      {...props}
    />
  )
}

function DialogScrollSummary({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-scroll-summary"
      // Optional fixed summary band between header and scrollable body —
      // typically a KPI rail or status tile. `pt-4` separates it from
      // the header above; bottom spacing comes from the next section's
      // own padding.
      className={cn("shrink-0 px-4 pt-4", className)}
      {...props}
    />
  )
}

function DialogScrollBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-scroll-body"
      // Scrollable middle. `flex-1 min-h-0` lets it consume remaining
      // height between fixed sections; `overflow-y-auto` does the
      // scrolling. `pt-4 pb-4` provides internal breathing room from
      // the fixed sections above and below.
      className={cn("flex-1 min-h-0 overflow-y-auto px-4 pt-4 pb-4", className)}
      {...props}
    />
  )
}

function DialogScrollFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-scroll-footer"
      // Fixed footer band. `border-t` is intentional in this pattern
      // (unlike CardFooter / DialogFooter which run dividerless): the
      // body above scrolls and content can run right up to the footer's
      // top edge — the hairline visually anchors the action band so it
      // reads as chrome, not as more content.
      className={cn(
        "shrink-0 flex items-center justify-end gap-2 px-4 py-4 border-t border-ink-200",
        className,
      )}
      {...props}
    />
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      // `mt-2` (8px) compounds with a parent `gap-4` (16px) to land at
      // 24px between the last form element and the action zone — clearer
      // gestalt than the field-to-field 16px rhythm. Consumers don't
      // need to remember to add it; it's part of the primitive contract.
      // CardFooter gets the equivalent breath naturally from Card's
      // gap-4 + CardFooter's p-4 (= 32px total, similar story).
      className={cn(
        "mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-ink-600 *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-ink-900",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogScrollBody,
  DialogScrollContent,
  DialogScrollFooter,
  DialogScrollHeader,
  DialogScrollSummary,
  DialogTitle,
  DialogTrigger,
}
