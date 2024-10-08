import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import VivoDemo from "../component/VivoDemo";
import Din from "../component/DinDinDemo";

const Gsap2 = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement[]>([]);

  const swagRef = useRef<HTMLDivElement>(null);
  const se3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.refresh();
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (ref1.current) {
      // ScrollTrigger.create({
      // trigger: ref1.current,
      // start: "top 80%",
      // end: "bottom 55%",
      // toggleClass: "size-[200px]",
      // markers: true,
      // onEnter: (e) => console.log(e),
      // onLeave: (e) => console.log(e),
      // onEnterBack: (e) => console.log(e),
      // onLeaveBack: (e) => console.log(e),
      // onUpdate: (e) => console.log(e),
      // });
      // 重复动画
      // gsap.to(ref1.current, {
      //   x: 200,
      //   repeat: -1,
      // });
    }
  }, [ref1]);

  //stagger属性
  useEffect(() => {
    const ps: HTMLDivElement[] = gsap.utils.toArray(".h-fit");
    gsap.to(ps, {
      y: 100,
      repeatDelay: 0.3,
      // autoAlpha: 1, //其实是opacity
      stagger: {
        each: 0.2,
        from: "center",
      },
      // repeat: -1,
      scrollTrigger: {
        trigger: ps,
        scrub: true,
        start: "top 80%",
        end: "bottom 60%",
        // markers: true,
      },
    });
  }, []);

  useEffect(() => {
    const lis: HTMLLIElement[] = gsap.utils.toArray("li");
    if (se3.current) {
      gsap.from(lis, {
        scale: 0,
        y: 200,
        stagger: {
          each: 0.4,
          from: 0,
        },
        scrollTrigger: {
          trigger: se3.current,
          scrub: true,
          start: "top 80%",
          end: `+=${lis[0].offsetHeight}px`,
          // markers: true,
        },
      });
    }
  }, [se3]);

  useEffect(() => {
    if (swagRef.current) {
      gsap.fromTo(
        swagRef.current,
        {
          y: 0,
          opacity: 0,
        },
        {
          y: 100,
          opacity: 1,
          // repeat: -1,
          duration: 2,
          ease: "bounce.out", // 添加弹跳效果
          // scrollTrigger: {
          //   trigger: ".aaaa",
          //   scrub: true,
          //   start: "bottom 80%",
          //   end: "+=100",
          //   once: true,
          // },
        }
      );
    }
  }, [swagRef]);

  return (
    <div>
      <section
        className={
          "w-full h-dvh flex items-center justify-center bg-lime-600 aaaa"
        }
      >
        <div>12354</div>
        <div
          ref={swagRef}
          className={"w-[200px] h-10 bg-violet-950 absolute left-10"}
        />
      </section>

      {/* <div ref={ref1} className={"size-[100px] bg-green-400"} /> */}

      <VivoDemo />

      <Din />

      <section
        className={
          "w-full h-dvh bg-orange-600 flex gap-5 justify-center items-center"
        }
      >
        <div className={"h-fit flex flex-col gap-4 *:bg-black"}>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
        </div>

        <div className={"h-fit flex flex-col gap-4 *:bg-black"}>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
        </div>

        <div className={"h-fit flex flex-col gap-4 *:bg-black"}>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
        </div>

        <div className={"h-fit flex flex-col gap-4 *:bg-black"}>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
        </div>

        <div className={"h-fit flex flex-col gap-4 *:bg-black"}>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
          <p className={"size-10"}></p>
        </div>
      </section>

      <section ref={se3} className={"w-full h-dvh bg-rose-300 flex gap-5"}>
        {[1, 2, 3, 4].map((_, id) => {
          return <li key={id} className={"size-[100px] bg-red-950"} />;
        })}
      </section>
    </div>
  );
};
export default Gsap2;
