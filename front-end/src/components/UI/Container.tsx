import React from 'react'

interface ContainerProps {
    children?: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div
            className="
        flex flex-col flex-grow 
        px-4 pt-[10px] pb-5 
        md:flex-row md:justify-center md:px-10 md:pt-4 md:pb-12 md:gap-[80px]
        lg:justify-end lg:w-[988px] lg:mx-auto lg:my-0 lg:py-12
        items-center
      "
        >
            {children}
        </div>
    )
}
