import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Batman = () => {
    useGSAP(() => {
        gsap.set('.Batman', {
            marginTop: '-50vh',
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: '.Batman',
                start: 'top 90%',
                end: '24% center',
                scrub: 2,
            }
        }).to('.first-vd', {
            opacity: 0,
            duration: 7,
            ease: 'power1.inOut'
        });

        gsap.to('.Batman .img-box', {
            scrollTrigger: {
                trigger: '.Batman',
                start: 'top center',
                end: '82% center',
                scrub: 2,
            }, y: -300, duration: 2, ease: 'power1.inOut'
        }
            , '<');
    });

    return (

        <section className="Batman">
            <div className="max-w-lg batman-content">
                <h1>Batman</h1>
                <h2>I am vengeance. I am the night. I am Batman.</h2>
                <p>I have spent my entire life trying to make sense of that night… the moment my parents were taken from me. I have trained my mind and my body to stand against the fear that moment left behind. I am not what happened to me. I am what I choose to become.</p>

                <div className="batman-1" >
                    <img src="/images/batman-1.webp" alt="batman"
                    />
                </div>
            </div>

            <div className="space-y-5 mt-55 img-box">
                <div className="batman-2">
                    <img src="/images/batman-2.webp" alt="batman" />
                </div>
                <div className="batman-3">
                    <img src="/images/batman-3.webp" alt="batman" />
                </div>
            </div>
        </section>
    )
}

export default Batman