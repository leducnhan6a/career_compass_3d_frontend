import { useEffect } from "react";

interface UseHoverEffectProps {
    ref: React.RefObject<HTMLElement | null>;
    onHover?: (event: MouseEvent) => void;
    onLeave?: (event: MouseEvent) => void;
}

function useHoverEffect({ ref, onHover, onLeave }: UseHoverEffectProps) {
    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

        function handleMouseEnter(event: MouseEvent) {
            onHover?.(event);
        }

        function handleMouseLeave(event: MouseEvent) {
            onLeave?.(event);
        }

        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mouseenter", handleMouseEnter);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [ref, onHover, onLeave]);
}

export default useHoverEffect;