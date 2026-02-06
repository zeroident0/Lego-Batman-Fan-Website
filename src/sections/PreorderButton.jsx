import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PreorderButton = () => {
    const containerRef = useRef(null);
    const buttonRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(
        () => {
            // Entrance animation
            gsap.fromTo(
                buttonRef.current,
                {
                    scale: 0,
                    opacity: 0,
                    rotate: -15,
                },
                {
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Continuous floating animation
            gsap.to(buttonRef.current, {
                y: -10,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        },
        { scope: containerRef }
    );

    const handleMouseEnter = () => {
        gsap.to(buttonRef.current, {
            scale: 1.1,
            backgroundColor: "#ffd700",
            boxShadow: "0 0 20px #ffd700",
            duration: 0.3,
            ease: "power2.out",
        });
        gsap.to(textRef.current, {
            color: "#000",
            scale: 1.1,
            duration: 0.3,
        });
    };

    const handleMouseLeave = () => {
        gsap.to(buttonRef.current, {
            scale: 1,
            backgroundColor: "#fff9cb", // Original yellow from theme
            boxShadow: "0 0 0px transparent",
            duration: 0.3,
            ease: "power2.out",
        });
        gsap.to(textRef.current, {
            color: "#000",
            scale: 1,
            duration: 0.3,
        });
    };

    return (
        <section
            ref={containerRef}
            className="w-full py-10 flex justify-center items-center bg-black relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-black to-black opacity-50" />

            <a
                ref={buttonRef}
                href="https://legobatmangame.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 px-12 py-6 bg-yellow rounded-full cursor-pointer group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <span
                    ref={textRef}
                    className="block font-round-bold text-3xl uppercase tracking-wider text-black group-hover:text-black transition-colors"
                >
                    Pre-Order Now
                </span>
                <div className="absolute inset-0 rounded-full border-4 border-white/20 group-hover:border-white/40 transition-colors" />
            </a>
        </section>
    );
};

export default PreorderButton;
