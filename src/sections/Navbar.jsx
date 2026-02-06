import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
    const containerRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = [
        { name: "Home", target: "top" },
        { name: "Release Date", target: ".hero-section" },
        { name: "Batman", target: ".Batman" },
        { name: "Robin", target: ".robin-life" },
    ];

    const { contextSafe } = useGSAP({ scope: containerRef });

    const toggleMenu = contextSafe(() => {
        setIsMenuOpen((prev) => !prev);

        if (!isMenuOpen) {
            gsap.to(".mobile-menu", {
                x: 0,
                duration: 0.5,
                ease: "power2.out",
                display: "flex",
            });
            gsap.fromTo(".nav-link",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.2 }
            );
        } else {
            gsap.to(".mobile-menu", {
                x: "100%",
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => gsap.set(".mobile-menu", { display: "none" })
            });
        }
    });

    const handleScroll = (target) => {
        toggleMenu();
        if (target === "top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const handleLogoHover = contextSafe((e) => {
        gsap.to(e.target, {
            scale: 1.1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
        });
    });

    const handleLogoLeave = contextSafe((e) => {
        gsap.to(e.target, {
            scale: 0.9, // returning to tailwind's scale-90
            duration: 0.3,
            ease: "power2.out",
        });
    });

    const handleMenuHover = contextSafe((e) => {
        gsap.to(e.target, {
            rotation: 180,
            scale: 1.2,
            duration: 0.4,
            ease: "back.out(1.7)",
        });
    });

    const handleMenuLeave = contextSafe((e) => {
        gsap.to(e.target, {
            rotation: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
        });
    });

    return (
        <nav ref={containerRef}>
            <img
                src="/images/nav-logo.png"
                className="scale-90 cursor-pointer"
                alt="Logo"
                onMouseEnter={handleLogoHover}
                onMouseLeave={handleLogoLeave}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />

            <button onClick={toggleMenu} className="focus:outline-none cursor-pointer">
                <img
                    src="/images/nav-menu.png"
                    className="w-7 cursor-pointer"
                    alt="Menu"
                    onMouseEnter={handleMenuHover}
                    onMouseLeave={handleMenuLeave}
                />
            </button>

            {/* Mobile Menu Overlay */}
            <div className="mobile-menu hidden fixed inset-0 bg-black/90 backdrop-blur-lg flex-col items-center justify-center translate-x-full z-[80]">
                <div className="flex flex-col gap-8 text-center">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleScroll(item.target)}
                            className="nav-link text-white text-4xl font-bold uppercase tracking-wider hover:text-yellow-400 transition-colors cursor-pointer"
                        >
                            {item.name}
                        </button>
                    ))}
                    <button
                        onClick={toggleMenu}
                        className="nav-link text-white/50 text-2xl font-bold uppercase tracking-wider hover:text-white transition-colors cursor-pointer mt-4"
                    >
                        Close
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
