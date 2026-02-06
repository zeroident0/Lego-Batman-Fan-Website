import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const carouselImages = [
    "/images/overlay.webp",
    "/images/overlay-1.webp",
    "/images/overlay-2.webp",
    "/images/overlay-3.webp",
];

const PostCard = () => {
    const cardRef = useRef(null);
    const wrapperRef = useRef(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const slides = gsap.utils.toArray(".post-card-slide");

            if (slides.length <= 1) return;

            const slideDelay = 4;     // time each slide is visible
            const slideDuration = 0.6;  // time for the slide movement

            // lay out slides horizontally
            gsap.set(slides, {
                xPercent: (index) => index * 100,
            });

            // wrap xPercent so slides loop infinitely in one direction
            const wrapX = gsap.utils.wrap(-100, (slides.length - 1) * 100);

            const autoPlay = () => {
                gsap.to(slides, {
                    xPercent: "+=-100",
                    duration: slideDuration,
                    ease: "power2.inOut",
                    modifiers: {
                        xPercent: (x) => wrapX(parseFloat(x)),
                    },
                });
                timer.restart(true);
            };

            const timer = gsap.delayedCall(slideDelay, autoPlay);

            // Set initial perspective
            gsap.set(wrapperRef.current, { transformPerspective: 1000, transformOrigin: "center center" });

        }, cardRef);

        return () => ctx.revert();
    }, []);

    const handleHoverIn = () => {
        // Kill any ongoing animations (like exit animations) to prevent conflicts
        gsap.killTweensOf(wrapperRef.current);

        gsap.to(wrapperRef.current, {
            scale: 1.03,
            duration: 0.2,
            ease: "power2.out",
        });
    };

    const handleHoverOut = () => {
        gsap.to(wrapperRef.current, {
            scale: 1,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    return (
        <section className="post-card" ref={cardRef}>
            <div className="animated-gradient-bg" />

            <div
                className="post-card-container"
                onMouseEnter={handleHoverIn}
                onMouseLeave={handleHoverOut}
                onMouseMove={(e) => {
                    const { left, width } = e.currentTarget.getBoundingClientRect();
                    const relativeX = e.clientX - left;
                    const center = width / 2;

                    const rotationStrength = 6;
                    const rotateY = ((relativeX - center) / center) * rotationStrength;

                    // Calculate dynamic duration for smoothness
                    // If the difference is large (e.g. on entry), use a longer duration
                    // If small (continuous movement), use shorter duration
                    const currentRotateY = gsap.getProperty(wrapperRef.current, "rotationY");
                    const diff = Math.abs(rotateY - currentRotateY);

                    // Map diff (0-40) to duration (0.1 - 0.5)
                    // At 0 diff, 0.1s. At 20 diff, ~0.4s.
                    const duration = Math.min(0.1 + (diff / 20) * 0.4, 0.5);

                    gsap.to(wrapperRef.current, {
                        rotationY: rotateY,
                        duration: duration,
                        ease: "power2.out",
                        overwrite: "auto", // Ensure new tweens override old ones immediately
                    });
                }}
            >
                <div
                    ref={wrapperRef}
                    className="post-card-wrapper group skew-x-0"
                >
                    {carouselImages.map((src, index) => (
                        <img
                            key={src}
                            src={src}
                            alt=""
                            className="post-card-slide"
                            aria-hidden={index !== 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PostCard