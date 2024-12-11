import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CardComponent = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const cardsWrappers = gsap.utils.toArray(".card-wrapper", wrapperRef.current);
    const cards = gsap.utils.toArray(".card", wrapperRef.current);

    cardsWrappers.forEach((wrapper, i) => {
      const card = cards[i];
      let scale = 1;
      let rotation = 0;

      if (i !== cards.length - 1) {
        scale = 0.9 + 0.025 * i;
      }

      gsap.to(card, {
        scale: scale,
        rotationX: rotation,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top " + (60 + 10 * i),
          end: "bottom 550",
          endTrigger: ".wrapper",
          scrub: true,
          pin: wrapper,
          pinSpacing: false,
          // markers: {
          //   indent: 150 * i
          // },
          id: i + 1
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="wrapper light" ref={wrapperRef}>
      <div className="cards">
        <div className="card-wrapper">
          <div className="card gradient-red">Card 1</div>
        </div>
        <div className="card-wrapper">
          <div className="card gradient-blue">Card 2</div>
        </div>
        <div className="card-wrapper">
          <div className="card gradient-orange">Card 3</div>
        </div>
        <div className="card-wrapper">
          <div className="card gradient-purple">Card 4</div>
        </div>
        <div className="card-wrapper">
          <div className="card gradient-blue">Card 4</div>
        </div>
        <div className="card-wrapper">
          <div className="card gradient-red">Card 4</div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
