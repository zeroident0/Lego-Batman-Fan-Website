import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Footer = () => {
    const footerRef = useRef(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.from(".footer-anim", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="relative w-full bg-[#1c1829] text-white overflow-hidden">
            {/* Vertical Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1c1829] via-[#111117] to-black z-0 pointer-events-none" />

            <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center">

                {/* Top Branding */}
                <div className="text-center mb-16">
                    <h1 className="footer-anim font-long text-6xl md:text-9xl text-yellow uppercase mb-6 drop-shadow-lg">
                        I'm Batman
                    </h1>
                    <p className="footer-anim font-round-bold text-white text-lg md:text-2xl max-w-2xl mx-auto">
                        Thanks for visiting the coolest website on the internet. <br className="hidden md:block" />
                        Remember, always be yourself. Unless you can be Batman.
                    </p>
                </div>

                {/* Divider */}
                <div className="footer-anim w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

                {/* Footer Bottom */}
                <div className="flex flex-col justify-center items-center w-full max-w-6xl">
                    {/* Copyright */}
                    <div className="footer-anim text-center">
                        <p className="font-sans text-white/60 text-sm">
                            © {new Date().getFullYear()} LEGO Batman Fan Site.
                        </p>
                        <p className="font-sans text-white/40 text-xs mt-1">
                            This is a fan-made tribute. Not affiliated with LEGO or DC.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
