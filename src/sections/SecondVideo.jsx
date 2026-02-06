import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";


const SecondVideo = () => {
    const videoRef = useRef(null);

    useGSAP(() => {
        gsap.set('.robin', {
            marginTop: '-60vh',
            opacity: 0,
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.robin',
                start: 'top top',
                end: 'bottom top',
                scrub: 2,
                pin: true,
            }
        });

        tl.to('.robin', {
            opacity: 1,
            duration: .2,
            ease: 'power1.inOut'
        });

        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration,
                duration: 3,
                ease: 'power1.inOut'
            }, '<');
        };


    }, []);

    return (
        <section className="robin">
            <div className="h-dvh">
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    src="/video/second-vdi.mp4"
                    className="size-full object-cover second-vd"
                    style={{ ObjectPosition: '50% 0%' }} />
            </div>

        </section>
    )
}

export default SecondVideo