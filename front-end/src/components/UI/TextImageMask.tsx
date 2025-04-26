import React, { useState, useEffect, JSX } from "react";

interface TextImageMaskProps {
    text: string | JSX.Element;
    images: string[];
    fontSize?: string;
    fontFamily?: string;
    interval?: number;
    verticalScale?: string;  // Vertical scale
    horizontalScale?: string; // Horizontal scale
    leading?: string; // Leading
}

export default function TextImageMask({
    text,
    images,
    fontSize = "text-8xl",
    fontFamily = "font-sans",
    interval = 2000,
    verticalScale = "scale-y-100",  // Default to no scale
    horizontalScale = "scale-x-100", // Default to no scale
    leading = "leading-none", // Default to no leading
}: TextImageMaskProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const imageChangeInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);
        return () => clearInterval(imageChangeInterval);
    }, [images.length, interval]);

    return (
        <div
            className={`select-none font-bold uppercase bg-cover bg-center text-transparent bg-clip-text inline-block ${fontSize} ${fontFamily} ${verticalScale} ${horizontalScale} ${leading}`}
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        >
            {text}
        </div>
    );
}
