import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Gsap3 = () => {
  const getRatio = (el: HTMLElement) => {
    return window.innerHeight / (window.innerHeight + el.offsetHeight);
  };

  useEffect(() => {
    const lis = gsap.utils.toArray<HTMLElement>("li");
    lis.forEach((item, index) => {
      const bg = item.querySelector(`.background${index}`) as HTMLElement;
      const content = item.querySelector(`.content${index}`) as HTMLElement;

      if (bg && content) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: index ? "top bottom" : "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          bg,
          {
            y: index ? -window.innerHeight * getRatio(item) : 0,
            z: -100,
          },
          {
            y: window.innerHeight * (1 - getRatio(item)),
            z: 100,
            ease: "none",
          }
        );

        tl.fromTo(
          content,
          {
            y: index ? window.innerHeight * -getRatio(item) * 2 : 0,
          },
          {
            y: window.innerHeight * getRatio(item) * 2,
            ease: "none",
          },
          0
        );
      }
    });
  }, []);

  return (
    <main>
      <section className={"h-[50vh] flex justify-center items-center text-5xl"}>
        Parallax with wiping titles
      </section>
      <section>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <li
              key={i}
              style={{
                position: "relative",
                height: "100vh",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  backgroundImage: `url("https://placedog.net/1920?id=${
                    i + 1
                  }")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                className={`background${i}`}
              ></div>
              <div
                className={`content${i}`}
                style={{
                  position: "relative",
                  color: "white",
                  fontSize: "2rem",
                  textAlign: "center",
                  lineHeight: "100vh", // 垂直居中
                }}
              >
                SLIDE {i + 1}
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className={"h-[50vh] flex justify-center items-center text-5xl"}>
        So fun, right?
      </section>
    </main>
  );
};

export default Gsap3;
