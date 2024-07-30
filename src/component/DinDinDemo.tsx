import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
const Din = () => {
  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);

  const list = Array.from({ length: 6 }, () => ["", ""]);

  useEffect(() => {
    if (ref2.current) {
      gsap.fromTo(
        ref2.current,
        {
          scaleX: 0,
          scaleY: 0,
        },
        {
          scaleX: 1,
          scaleY: 1,
          duration: 1, // 添加动画持续时间
          ease: "power3.out", // 使用缓动效果
          scrollTrigger: {
            trigger: ref1.current, // 触发动画的元素
            start: "top top", // 动画开始位置
            end: "bottom top", // 动画结束位置
            scrub: true, // 动画会跟随滚动条位置变化
            pin: true,
            invalidateOnRefresh: true,
            markers: true,
          },
        }
      );
    }
  }, []);

  return (
    <div
      ref={ref1}
      className={"w-full h-dvh bg-slate-800 flex justify-center items-center"}
    >
      <div
        ref={ref2}
        className={"bg-white w-[920px] h-[280px] flex justify-between p-5"}
      >
        {list.map((item, index) => {
          return (
            <div className={"flex flex-col justify-between"} key={index}>
              {item.map((_, id) => {
                return <div className={"size-[60px] bg-black"} key={id} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Din;
