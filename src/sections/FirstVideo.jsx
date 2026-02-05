import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";

const FirstVideo = () => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedData = () => {
            // Ensure video is ready
            video.currentTime = 0;
        };

        video.addEventListener('loadeddata', handleLoadedData);

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData);
        };
    }, []);

    useGSAP(() => {
        gsap.set('.first-vd-wrapper', {
            marginTop: '-150vh',
            opacity: 0,
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.first-vd-wrapper',
                start: 'top top',
                end: '+=200% top',
                scrub: 1,
                pin: true,
                onUpdate: (self) => {
                    const video = videoRef.current;
                    if (video && video.duration) {
                        // Map scroll progress (0 to 1) to video time (0 to duration)
                        video.currentTime = self.progress * video.duration;
                    }
                }
            }
        });

        // Start fading in the video wrapper early, overlapping with hero fade-out
        tl.to('.first-vd-wrapper', {
            opacity: 1,
            duration: 1.5,
            ease: 'power1.inOut',
        }, 0);

        tl.to('.hero-section', {
            opacity: 0,
            duration: 1,
            ease: 'power1.inOut',
        }, 0.3);
    }, { scope: containerRef });
    return (
        <section className="first-vd-wrapper" ref={containerRef}>
            <div className="h-dvh flex items-center justify-center">
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    src="/video/first-vd.mp4"
                    className="first-vd" />
            </div>

        </section>
    )
}

export default FirstVideo