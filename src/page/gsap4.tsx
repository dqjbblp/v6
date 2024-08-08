import clsx from "clsx";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Gsap4 = () => {
  const list = [1, 2, 3, 4];
  const divRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 对每个子 div 元素应用动画
    divRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          scale: 0.5, // 初始缩小
          rotationX: 45, // 初始3D倾斜
          autoAlpha: 0, // 初始透明度
        },
        {
          scale: 1, // 放大至正常大小
          rotationX: 0, // 恢复正常视角
          autoAlpha: 1, // 完全可见
          scrollTrigger: {
            trigger: el,
            start: "top 90%", // 当div滚动到视窗底部80%时开始动画
            end: index === 0 ? "bottom bottom" : "top 40%", // 当div到达视窗的顶部30%时动画结束
            scrub: true, // 平滑滚动
            markers: true, // 显示scroll trigger的标记（开发调试时使用）
          },
        }
      );
    });

    // 清理函数
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="father" style={{ perspective: 1000 }}>
      {list.map((it, id) => {
        return (
          <div
            ref={(el) => {
              divRefs.current[id] = el as HTMLDivElement;
            }}
            className={clsx(
              "w-full h-dvh",
              (id === 0 || id === 2) && "bg-red-600",
              (id === 1 || id === 3) && "bg-green-700"
            )}
            key={id}
          />
        );
      })}
    </div>
  );
};

export default Gsap4;
