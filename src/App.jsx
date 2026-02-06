import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import FirstVideo from "./sections/FirstVideo";
import Batman from "./sections/Batman";
import SecondVideo from "./sections/SecondVideo";
import Robin from "./sections/Robin";
import PostCard from "./sections/PostCard";
import PreorderButton from "./sections/PreorderButton";
import Footer from "./sections/Footer";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    return (
        <main>
            <Navbar />
            <Hero />
            <FirstVideo />
            <Batman />
            <SecondVideo />
            <Robin />
            <PostCard />
            <PreorderButton />
            <Footer />
        </main>
    )
}

export default App
