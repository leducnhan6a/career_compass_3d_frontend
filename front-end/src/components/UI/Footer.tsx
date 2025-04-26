import React from 'react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-white text-gray-600 text-sm border-t">
            <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
                {/* Logo + Description */}
                <div>
                    <div className="flex items-center mb-4">
                        <Image src="/images/logo.svg" alt="Logo" width={128} height={32} className="mr-2" />
                        <span className="text-lg text-accent font-bold">Counter Striker</span>
                    </div>
                    <p className="max-w-xs">Nền tảng hỗ trợ học sinh khám phá bản thân, định hướng nghề nghiệp và lựa chọn ngành học phù hợp để xây dựng tương lai vững chắc</p>
                </div>

                {/* Navigation Links */}
                <div className="grid grid-cols-2 gap-4">
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">About</a></li>
                        <li><a href="#" className="hover:underline">Pricing</a></li>
                        <li><a href="#" className="hover:underline">FAQs</a></li>
                    </ul>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Contact us</a></li>
                        <li><a href="#" className="hover:underline">Sign in</a></li>
                        <li><a href="#" className="hover:underline">Cancel subscription</a></li>
                        <li><a href="#" className="hover:underline">Privacy policy</a></li>
                        <li><a href="#" className="hover:underline">Terms of use</a></li>
                    </ul>
                </div>

                {/* Disclaimer */}
                {/* <div className="md:col-span-3 text-sm mt-6 text-gray-500">
                    <p>
                        Disclaimer: The Site does not offer professional or definitively accurate...{' '}
                        <a href="#" className="text-blue-600 hover:underline">read more</a>
                    </p>
                </div> */}
            </div>

            {/* Bottom Bar */}
            <div className="border-t text-center text-xs text-gray-400 py-4">
                © 2025 Counter Striker. All rights reserved.
            </div>
        </footer>
    );
}
