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
            video.currentTime = 0;
        };

        video.addEventListener('loadeddata', handleLoadedData);

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData);
        };
    }, []);

    useGSAP(() => {
        gsap.set('.first-vd-wrapper', {
            y: '-150vh',
            opacity: 0,
        });

        // Entrance animation that triggers when section enters viewport
        const entranceTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.first-vd-wrapper',
                start: 'top bottom',
                end: 'top center',
                scrub: false,
                once: true,
            }
        });

        // Bring element into view by animating y position
        entranceTl.to('.first-vd-wrapper', {
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
        });

        // Fade in opacity when element is moving into view
        entranceTl.to('.first-vd-wrapper', {
            opacity: 1,
            duration: 0.6,
            ease: 'power1.inOut',
        }, '-=0.4');

        // Fade out hero section so video section is clearly visible
        entranceTl.to('.hero-section', {
            opacity: 0,
            duration: 0.4,
            ease: 'power1.inOut',
        }, '-=0.3');

        // Video scrubbing ScrollTrigger (separate from entrance)
        ScrollTrigger.create({
            trigger: '.first-vd-wrapper',
            start: 'top top',
            end: '+=100% top',
            scrub: 0.5,
            pin: true,
            onUpdate: (self) => {
                const video = videoRef.current;
                if (video && video.duration) {
                    // Only advance video after user has arrived (after startAt)
                    const startAt = 0.25;
                    const videoProgress = self.progress <= startAt
                        ? 0
                        : (self.progress - startAt) / (1 - startAt);
                    video.currentTime = videoProgress * video.duration;
                }
            }
        });
    }, { scope: containerRef });
    return (
        <section className="first-vd-wrapper" ref={containerRef}>
            <div className="h-dvh flex items-center justify-center">
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    src="/video/first-vdi.mp4"
                    className="first-vd" />
            </div>

        </section>
    )
}

export default FirstVideo