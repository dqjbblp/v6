/**
 * 按钮组件
 * 想要设置纯色的按钮，需要传colorBtn，在写className
 */

import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  colorBtn?: boolean; //该按钮式渐变色，还是纯色
  loading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, className, colorBtn, loading, ...rest } = props;

  return (
    <button
      {...rest}
      disabled={loading}
      ref={ref}
      className={clsx(
        "flex w-full justify-center rounded-xl bg-custom-gradient1 py-2.5 text-sm text-[#111216] outline-none",
        className,
        colorBtn && "bg-none",
        loading && "cursor-not-allowed !bg-none",
        loading && "bg-[#42454E]"
      )}
    >
      {loading ? <Loading /> : <>{children}</>}
    </button>
  );
});

export default Button;

const Loading = () => {
  return (
    <div
      className={
        "size-5 animate-spin rounded-full border-4 border-[#1B1C21] border-r-transparent"
      }
    />
  );
};
