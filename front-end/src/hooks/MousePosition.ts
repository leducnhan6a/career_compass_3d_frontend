import { useState, useEffect } from "react";

function useMousePosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        function trackMouse(event: MouseEvent) {
            setPosition({ x: event.clientX, y: event.clientY });
        }

        document.addEventListener("mousemove", trackMouse);
        return () => document.removeEventListener("mousemove", trackMouse);
    }, []);

    return position;
}

export default useMousePosition;
