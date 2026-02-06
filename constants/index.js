import { useMediaQuery } from "react-responsive";

export const useMaskSettings = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

    if (isMobile) {
        return {
            initialMaskPos: "50% 30%",
            initialMaskSize: "3200% 2000%",
            maskPos: "50% 55%",
            maskSize: "65% 20%",
        };
    }

    if (isTablet) {
        return {
            initialMaskPos: "50% 50%",
            initialMaskSize: "2300% 2300%",
            maskPos: "50% 45%",
            maskSize: "55% 30%",
        };
    }

    return {
        initialMaskPos: "50% 45%",
        initialMaskSize: "2700% 3640%",
        maskPos: "50% 28%",
        maskSize: "19% 26%",
    };
};