import Footer from '@components/UI/Footer';
import Header from '@components/UI/Header';
import React from 'react'

interface LayoutsProps {
    children?: React.ReactNode;
}

export default function Layout({ children }: LayoutsProps) {
    return (
        <div className='select-none bg-light'>
            <Header />
            <main className="block">
                {children}
            </main>
            <Footer />
        </div>
    )
}
