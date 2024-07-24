import { useEffect, useRef } from "react";
import vivo1 from "../assets/vivo1.webp";
import vivo2 from "../assets/vivo2.webp";
import vivo3 from "../assets/vivo3.webp";
import vivo4 from "../assets/vivo4.webp";
import vivo5 from "../assets/vivo5.webp";
import vivo6 from "../assets/vivo6.webp";
import vivo7 from "../assets/vivo7.webp";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const VivoDemo = () => {
  const list = [vivo1, vivo2, vivo3, vivo4, vivo5, vivo6, vivo7];
  const imgRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    ScrollTrigger.refresh();
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  //vivo的DEMO
  useEffect(() => {
    const windowWidth = window.innerWidth / 2;
    if (imgRef.current.length > 0) {
      const img0Width =
        (windowWidth - imgRef.current[0].offsetWidth / 2) / (windowWidth * 2);
      const img1Width =
        (windowWidth - imgRef.current[1].offsetWidth / 2) / (windowWidth * 2);
      const img2Width =
        (windowWidth - imgRef.current[2].offsetWidth / 2) / (windowWidth * 2);
      const img3Width = imgRef.current[3].offsetWidth;
      const img4Width =
        (windowWidth - imgRef.current[4].offsetWidth / 2) / (windowWidth * 2);
      const img5Width =
        (windowWidth - imgRef.current[5].offsetWidth / 2) / (windowWidth * 2);
      const img6Width =
        (windowWidth - imgRef.current[6].offsetWidth / 2) / (windowWidth * 2);

      // ScrollTrigger.create({
      //   trigger: ".section1",
      //   start: "top top",
      //   end: `+=983`,
      //   markers: true,
      //   pin: true,
      //   scrub: true,
      //   animation: gsap
      //     .timeline()
      //     .fromTo(
      //       imgRef.current[0],
      //       { left: `${img0Width * 100}%` },
      //       { left: "14.3rem" }
      //     )
      //     .fromTo(
      //       imgRef.current[6],
      //       { right: `${img6Width * 100}%` },
      //       { right: "14.3rem" },
      //       "<" //表示和上一个动画同时开始
      //     )
      //     .fromTo(
      //       imgRef.current[1],
      //       { left: `${img1Width * 100}%` },
      //       { left: "26.1rem" },
      //       "<"
      //     )
      //     .fromTo(
      //       imgRef.current[5],
      //       { right: `${img5Width * 100}%` },
      //       { right: "26.1rem" },
      //       "<"
      //     )
      //     .fromTo(
      //       imgRef.current[2],
      //       { left: `${img2Width * 100}%` },
      //       { left: "39.8rem" },
      //       "<"
      //     )
      //     .fromTo(
      //       imgRef.current[4],
      //       { right: `${img4Width * 100}%` },
      //       { right: "39.8rem" },
      //       "<"
      //     )
      //     .fromTo(imgRef.current[3], { width: 220 }, { width: img3Width }, "<"),
      // });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".section1",
            start: "top top",
            end: `+=983`,
            markers: true,
            pin: true,
            scrub: true,
          },
        })
        .fromTo(
          imgRef.current[0],
          { left: `${img0Width * 100}%` },
          { left: "14.3rem" }
        )
        .fromTo(
          imgRef.current[6],
          { right: `${img6Width * 100}%` },
          { right: "14.3rem" },
          "<" //表示和上一个动画同时开始
        )
        .fromTo(
          imgRef.current[1],
          { left: `${img1Width * 100}%` },
          { left: "26.1rem" },
          "<"
        )
        .fromTo(
          imgRef.current[5],
          { right: `${img5Width * 100}%` },
          { right: "26.1rem" },
          "<"
        )
        .fromTo(
          imgRef.current[2],
          { left: `${img2Width * 100}%` },
          { left: "39.8rem" },
          "<"
        )
        .fromTo(
          imgRef.current[4],
          { right: `${img4Width * 100}%` },
          { right: "39.8rem" },
          "<"
        )
        .fromTo(imgRef.current[3], { width: 220 }, { width: img3Width }, "<");
    }
  }, [imgRef.current]);

  return (
    <>
      <section
        className={
          "relative w-full h-dvh bg-pink-200 flex items-center justify-center section1"
        }
      >
        {list.map((item, index) => {
          return (
            <img
              ref={(el) => {
                imgRef.current[index] = el as HTMLImageElement;
              }}
              key={item}
              src={item}
              alt=""
              className={clsx(
                (index === 0 || index === 6) && "w-[140px] h-[250px] z-[1]",
                (index === 1 || index === 5) && "w-[160px] h-[300px] z-[2]",
                (index === 2 || index === 4) && "w-[180px] h-[350px] z-[3]",
                index === 3 && "w-[200px] h-[400px] z-10",
                "absolute"
              )}
            />
          );
        })}
      </section>
    </>
  );
};

export default VivoDemo;
