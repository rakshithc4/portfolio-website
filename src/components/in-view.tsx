"use client";

import { useRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { useInView } from "motion/react";

type Margin = NonNullable<Parameters<typeof useInView>[1]>["margin"];
type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  margin?: Margin;
  amount?: "some" | "all" | number;
  children?: ReactNode;
  [k: `data-${string}`]: string | undefined;
};

/** Wrapper that sets [data-in] once, the first time it scrolls into view. CSS does the rest. */
export function InView({ as: Tag = "div", margin = "0px 0px -12% 0px", amount = "some", children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { once: true, margin, amount });
  return (
    <Tag ref={ref} data-in={seen ? "" : undefined} {...rest}>
      {children}
    </Tag>
  );
}
