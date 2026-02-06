import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { useMaskSettings } from "../../constants";
import ComingSoon from "./ComingSoon";


const Hero = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const { initialMaskPos, initialMaskSize, maskPos, maskSize } = useMaskSettings();

    useGSAP(() => {
        gsap.set('.mask-wrapper', {
            maskPosition: initialMaskPos,
            maskSize: initialMaskSize
        });

        gsap.set('.mask-logo', { marginTop: '-100vh', opacity: 0 });

        gsap.set('.entrance-message', { opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                scrub: 2.5,
                end: '+=200%',
                pin: true,
                onLeave: () => setIsPlaying(false),
                onEnterBack: () => setIsPlaying(false),
            }
        });

        tl
            .to('.fade-out', { opacity: 0, ease: 'power1.inOut' })
            .to('.scale-out', { scale: 1, ease: 'power1.inOut' })
            .to('.mask-wrapper', { maskSize, ease: 'power1.inOut' }, '<')
            .to('.mask-wrapper', { opacity: 0 })
            .to('.overlay-logo', {
                opacity: 1, onComplete: () => {
                    gsap.to('.overlay-logo', { opacity: 0 });
                }
            }, '<')
            .to('.entrance-message', {
                duration: 1,
                ease: 'power1.inOut',
                opacity: 1,
                maskImage: 'radial-gradient(circle at 50% 0vh, black 50%, transparent 100%)'
            }, '<');
    });


    return (
        <section className="hero-section">
            <div className="size-full mask-wrapper">
                {!isPlaying ? (
                    <>
                        <img
                            src="/images/hero-bg.webp"
                            alt="background image"
                            className="scale-out"
                        />

                        <img
                            src="/images/hero-text.png"
                            alt="hero text"
                            className="title-logo fade-out"
                        />


                        {/* <img
                            src="/images/watch-trailer.png"
                            alt="trailer"
                            className="trailer-logo fade-out"
                        /> */}
                    </>
                ) : (
                    <div className="w-full h-full">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/1hQAoGj01Rc?autoplay=1&start=2&rel=0&modestbranding=1"
                            title="Lego Batman Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>

            {!isPlaying && (
                <button
                    type="button"
                    className="play-img fade-out"
                    onClick={() => setIsPlaying(true)}
                    onMouseEnter={(e) =>
                        gsap.to(e.currentTarget, {
                            scale: 1.1,
                            opacity: 0.5,
                            duration: 0.3,
                            ease: "power1.out",
                        })
                    }
                    onMouseLeave={(e) =>
                        gsap.to(e.currentTarget, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.3,
                            ease: "power1.out",
                        })
                    }
                    aria-label="Play trailer"
                >
                    <img
                        src="/images/play.png"
                        alt="play button"
                        className="w-7 ml-1"
                    />
                </button>
            )}

            <div>
                <img src="/images/big-hero-text.svg" alt="" className="size-full object-cover mask-logo" />
            </div>

            <div className="fake-logo-wrapper">
                <img src="/images/big-hero-text.png" alt="" className="overlay-logo" />
            </div>

            <ComingSoon />
        </section>

    )
}

export default Hero
