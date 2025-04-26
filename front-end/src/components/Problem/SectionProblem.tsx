'use client';
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface SectionProblemProps {
    title: string;
    description: string | React.ReactNode;
    imageSrc: string;
    imageAlt?: string;
    reverse?: boolean;
}

const SectionProblem = ({
    title,
    description,
    imageSrc,
    imageAlt = "Image",
    reverse = false
}: SectionProblemProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Import ScrollTrigger trong client-side
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                gsap.fromTo(sectionRef.current,
                    {
                        opacity: 0,
                        y: 80,
                        scale: 0.95,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.3,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }, sectionRef);

            return () => ctx.revert();
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`flex flex-col justify-center ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} 
            items-center gap-8 px-[15px] max-w-full lg:gap-[101px] 
            lg:w-[988px] lg:mx-auto lg:px-0`}
        >
            {/* Text Content */}
            <div className="flex flex-col items-center gap-6 max-w-full break-words text-center lg:items-start lg:shrink-0 lg:text-left">
                <h2 className="md:text-7xl text-4xl text-accent font-bold">
                    {title}
                </h2>
                <p className="text-center md:text-left text-[24px] leading-6 max-w-[330px] md:max-w-[473px] m-0">
                    {description}
                </p>
            </div>

            {/* Image Section */}
            <div className="relative aspect-square leading-none max-w-[345px] w-full md:w-[452px] md:max-w-none lg:w-[530px] lg:shrink-0 flex justify-center">
                <Image
                    src={imageSrc}
                    width={350}
                    height={200}
                    objectFit="contain"
                    alt={imageAlt}
                />
            </div>
        </section>
    );
};

export default SectionProblem;
