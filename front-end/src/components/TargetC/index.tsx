'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TargetC() {
    const targetsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        // Import ScrollTrigger trong client-side
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
            gsap.registerPlugin(ScrollTrigger);

            targetsRef.current.forEach((el) => {
                if (!el) return;
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        });
    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !targetsRef.current.includes(el)) {
            targetsRef.current.push(el);
        }
    };

    return (
        <section>
            <div
                className="container mx-auto flex flex-col items-center justify-center h-screen text-center"
                ref={addToRefs}
            >
                <h1 className="text-7xl font-bold mb-4 text-accent">Mục tiêu</h1>
            </div>

            {[
                "Đưa ra định hướng nghề nghiệp phù hợp",
                "Chỉ ra góc nhìn tổng quan về môi trường làm việc",
                "Ước lượng khả năng, tỉ lệ đậu vào các trường",
                "Chi tiết các trường để học sinh hiểu rõ hơn về trường đó",
            ].map((text, idx) => (
                <div
                    key={idx}
                    ref={addToRefs}
                    className="container mx-auto flex flex-col items-center justify-center h-screen text-center"
                >
                    <p className="text-5xl font-bold hover:text-secondary transition-colors duration-300">
                        {text}
                    </p>
                </div>
            ))}
        </section>
    );
}
