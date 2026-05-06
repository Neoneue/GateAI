import * as React from 'react';

/**
 * Filled-disc arrow icons for `<DeltaTag />`. The disc renders in
 * `currentColor`; the arrow is a `fill-rule="evenodd"` knockout, so on a
 * tinted pill background (e.g. `bg-success/15`) the arrow shape shows the
 * pale wash through — yielding a 3-tier color stack: outer pill wash →
 * solid disc → pale arrow.
 *
 * Source: `arrow-right-up-circle.svg` and `arrow-left-down-circle.svg`
 * (provided 2026-05-05). Fills swapped from raw hex (#15803D / #B91C1C)
 * to `currentColor` so consumers control color via Tailwind classes.
 */
export function DeltaArrowUp({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.8334 7C12.8334 3.77834 10.2217 1.16666 7.00002 1.16666C3.77836 1.16666 1.16669 3.77834 1.16669 7C1.16669 10.2217 3.77836 12.8333 7.00002 12.8333C10.2217 12.8333 12.8334 10.2217 12.8334 7ZM9.33335 4.66666H5.25002V5.54166H7.83964L4.48547 8.89583L5.10419 9.51455L8.45835 6.16038V8.75H9.33335V4.66666Z"
      />
    </svg>
  );
}

export function DeltaArrowDown({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.16669 7C1.16669 10.2217 3.77836 12.8333 7.00002 12.8333C10.2217 12.8333 12.8334 10.2217 12.8334 7C12.8334 3.77834 10.2217 1.16666 7.00002 1.16666C3.77836 1.16666 1.16669 3.77834 1.16669 7ZM4.66669 9.33333H8.75002V8.45833H6.16041L9.51457 5.10416L8.89585 4.48545L5.54169 7.83961V5.25H4.66669V9.33333Z"
      />
    </svg>
  );
}
