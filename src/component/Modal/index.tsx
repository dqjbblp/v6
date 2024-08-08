/**
 * 该组件是：屏幕中间的弹窗
 */

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useFloating,
} from "@floating-ui/react";
import clsx from "clsx";
import { ReactNode } from "react";

export type CenterDialogProps = {
  open: boolean;
  onOpenChange?(open: boolean): void;
};
export default function CenterDialog(
  props: {
    open: boolean;
    onOpenChange?(open: boolean): void;
    isFit?: boolean;
  } & {
    children?: ReactNode;
  }
) {
  const { context } = useFloating({
    open: props.open,
    onOpenChange: props.onOpenChange,
  });

  return (
    <>
      {props.open && (
        <FloatingPortal>
          <FloatingOverlay
            lockScroll
            className={"z-40 flex flex-row items-stretch bg-black/80"}
            onClick={(e) => {
              e.target === e.currentTarget && props.onOpenChange?.(false);
            }}
          >
            <FloatingFocusManager context={context}>
              <div
                className={clsx(
                  "w-full h-fit absolute px-6 top-1/2 -translate-y-1/2",
                  props.isFit && "!w-fit !px-0 left-1/2 -translate-x-1/2"
                )}
              >
                {props.children}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </>
  );
}
