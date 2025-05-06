import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Container from './Container'
import Button from './Button'


export default function Header() {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <header className='min-h-svh pt-24 flex flex-col'>
            <div className={`fixed top-0 w-full z-10 bg-light ${scrolling ? 'shadow-md' : ''}`}>
                <nav className="flex items-center justify-center h-24 px-[15px] md:px-[40px] lg:justify-between lg:max-w-[988px] lg:mx-auto lg:px-0">
                    <a href="#">
                        <Image src="/images/logo.svg" width={150} height={50} objectFit="contain" alt="logo" />
                    </a>

                    <div className="hidden lg:flex gap-4 items-center">
                        <button
                            className="px-6 py-2 bg-secondary hover:shadow-[0_10px_0] transition-all rounded-xl shadow-[0_4px_0] text-info"
                            onClick={() => window.open('/survey', '_self')}
                        >
                            <p className="font-bold text-light whitespace-nowrap">Khảo sát ngay</p>
                        </button>
                        <button
                            className="px-6 py-2 bg-accent hover:shadow-[0_10px_0] transition-all rounded-xl shadow-[0_4px_0] text-pink-500"
                            onClick={() => window.open('/environment', '_self')}
                        >
                            <p className="font-bold text-light whitespace-nowrap">Mô phỏng</p>
                        </button>
                    </div>
                </nav>
            </div>

            <Container>
                <div className='flex-initial items-center flex flex-col justify-center relative'>
                    <Image src="/images/logo.svg" width={420} height={50} objectFit='contain' alt="logo" />
                </div>
                <div className='flex-initial items-center flex flex-col justify-center relative'>
                    <h1
                        className="text-accent flex-1 text-5xl leading-normal mt-2.5 max-w-[345px] 
                        text-center font-bold 
                        md:max-w-[480px] md:mt-4 md:flex-initial 
                        lg:mt-0 lg:w-[480px] mb-[30px]
                    ">
                        Counter Striker
                    </h1>
                    <p className='
                        text-eel flex-1 text-2xl leading-normal mt-2.5 max-w-[345px] 
                        text-center font-bold 
                        md:max-w-[480px] md:mt-4 md:flex-initial 
                        lg:mt-0 lg:w-[480px] mb-[24px]
                    '>
                        Nền tảng hỗ trợ học sinh khám phá bản thân,
                        định hướng nghề nghiệp và lựa chọn ngành học
                        phù hợp để xây dựng tương lai vững chắc
                    </p>
                    <Button label="Khảo sát ngay"
                        onClick={() => window.open('/survey', '_self')}
                    />
                </div>
            </Container>

            <div className="hidden md:flex items-center justify-center h-[80px] border-t-[1px] border-b-[1px] border-eel px-[40px]">
                <nav className="
                grid grid-cols-[min-content_1fr_min-content] 
                gap-[22px]
                items-center h-[74px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path></svg>
                    <div className=''>
                        <ul className='flex gap-5'>
                            <li className=''>
                                <a href="" className='items-center justify-center flex no-underline text-eel'>
                                    <span className='text-base'>Câu hỏi: 100+</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
                </nav>
            </div>

        </header>
    )
}
