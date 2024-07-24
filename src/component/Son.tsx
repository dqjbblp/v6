import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export interface IRef {
  sonevent: () => void;
}

const Son = forwardRef<IRef>((_, ref) => {
  const sonRef = useRef<HTMLDivElement | null>(null);

  const sonevent = () => {
    console.log("我是子组件");
  };

  const ob = new IntersectionObserver(
    (e) => {
      console.log(123, e[0]);
    },
    {
      root: null,
      threshold: 0,
      // rootMargin:'100px'
    }
  );

  useEffect(() => {
    if (sonRef.current) {
      ob.observe(sonRef.current);
    }
  }, [sonRef]);

  useImperativeHandle(
    ref,
    () => ({
      sonevent,
    }),
    []
  );

  return <div ref={sonRef}>Son 组件</div>;
});

export default Son;
