import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import PNG1 from "../assets/1.jpg";
import PNG2 from "../assets/2.jpg";
import PNG3 from "../assets/3.jpeg";
import PNG4 from "../assets/4.jpeg";

const Gsap = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const section2 = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (ref1.current) {
      gsap.to(ref1.current, {
        duration: 2,
        x: 700,
        scrollTrigger: {
          trigger: ref1.current, // 触发动画的元素
          start: "center center", // 动画开始位置  代表：触发元素的顶部到达视口中间触发;如果是数字：400的话，代表滚动条滚动400像素的时候运行动画
          end: () =>
            `+=${
              Number(section2.current?.offsetHeight) -
              Number(ref1.current?.offsetHeight)
            }`, // 动画结束位置  这种写法代表的是：结束位置比起始位置低一个元素本身的高度;如果是：+=200的话，代表比其实位置低200的时候结束动画
          // end: "bottom top",
          scrub: true, // 动画会跟随滚动条位置变化 如果给的是数字，比如：scrub:1的话，代表延迟一秒的返回
          // markers: true,
          toggleClass: "test", //意思是：在动画事件内，把ref1.current的类名加一个：test
          pin: true, //这个代表当动画结束之后，才会随着滚动条向上滚动 也可以写类名
          pinSpacing: false, //这属性为true时：ref2会在ref1元素动画结束的位置，为false时，则是正常情况，dom渲染出来就在ref1的后面
        },
      });
    }
  }, [ref1]);

  //时间线动画
  useEffect(() => {
    if (ref3.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref3.current,
          markers: true,
          scrub: true,
          start: "top 70%",
          end: "top 30%",
        },
      });
      tl.to(ref3.current, {
        x: 500,
        duration: 5,
      })
        .to(ref3.current, {
          y: 200,
          duration: 3,
        })
        .to(ref3.current, {
          x: 0,
          duration: 1,
        })
        .to(ref3.current, {
          y: 0,
          duration: 2,
        });
    }
  }, [ref3]);

  useEffect(() => {
    const ses = document.querySelectorAll("section");

    ses.forEach((s) => {
      console.log(window.innerHeight / 2);

      gsap.fromTo(
        s,
        {
          backgroundPositionY: `-${window.innerHeight / 2}px`,
        },
        {
          backgroundPositionY: `${window.innerHeight / 2}px`,
          duration: 2,
          ease: "none",
          scrollTrigger: {
            trigger: s,
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div>
      <section
        style={{ background: `url(${PNG1}) center center / cover no-repeat` }}
        className="relative w-full h-dvh bg-green-300"
      ></section>

      <section
        style={{ background: `url(${PNG2}) center center / cover no-repeat` }}
        ref={section2}
        className="relative w-full h-dvh bg-yellow-900"
      >
        <div ref={ref1} className={"size-[100px] rounded-full bg-orange-500"} />
        <div
          ref={ref2}
          className={"z-10 size-[100px] rounded-full bg-red-500"}
        />
      </section>

      <section
        style={{ background: `url(${PNG3}) center center / cover no-repeat` }}
        className="relative w-full h-dvh bg-pink-600"
      >
        <div ref={ref3} className={"size-[100px] rounded-full bg-blue-500"} />
      </section>

      <section
        style={{ background: `url(${PNG4}) center center / cover no-repeat` }}
        className="relative w-full h-dvh bg-purple-950"
      ></section>
    </div>
  );
};

export default Gsap;
