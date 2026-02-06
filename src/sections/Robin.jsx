import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Robin = () => {
    useGSAP(() => {

        gsap.set('.robin-life', {
            marginTop: '-60vh',
        });


        gsap.timeline({
            scrollTrigger: {
                trigger: '.robin-life',
                start: 'top top',
                end: '38% center',
                scrub: 2,
            }
        })
            .to('.second-vd', {
                opacity: 0,
                duration: 6,
                ease: 'power1.inOut'
            });


        gsap.to('.robin-life .img-box', {
            scrollTrigger: {
                trigger: '.robin-life',
                start: 'top center',             // Start when section top hits viewport center
                end: '82% center',               // End when 82% down the section hits viewport center
                scrub: 2,
            },
            y: -200,                             // Move the image box up by 200px
            duration: 2,
            ease: 'power1.inOut'
        }, '<');
    });

    return (

        <section className="robin-life">
            <div className="flex flex-col gap-5 items-end img-box lg:1/2 ps-10 mt-10">
                <div className="robin-2">
                    <img src="/images/robin-2.webp" alt="robin" />
                </div>
                <div className="robin-3">
                    <img src="/images/robin-3.webp" alt="robin" />
                </div>
            </div>

            <div className="max-w-lg robin-life-content">
                <div className="max-w-xl lg:ps-32 ps-10">
                    <h1>Robin</h1>
                    <h2>You don’t have to do this alone. You never did.</h2>
                    <p>I want him. I want the man who took my family from me. I want him, and I’ll make him pay.</p>
                </div>

                <div className="robin-1" >
                    <img src="/images/robin-1.webp" alt="robin"
                    />
                </div>

                <p className="max-w-xl lg:ps-32 ps-10">I am not your soldier, Father. I fight because I choose to, because it is right, because Gotham needs protecting, and because I will not let my life be decided by rage or by anyone else.</p>
            </div>
        </section>
    )
}

export default Robin