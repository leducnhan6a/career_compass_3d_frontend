import { useState, createContext, useEffect, ReactNode, useContext } from "react"

interface Breakpoint {
    name: string;
    width: number;
}

interface BreakpointsContextValue {
    isMaxWidth: { [key: string]: boolean };
}

const breakpoints: Breakpoint[] = [
    {
        name: 'mobile',
        width: 576,
    }
];

const resizer = (): { [key: string]: boolean } => {
    const maxWidth: { [key: string]: boolean } = {};
    breakpoints.forEach(breakpoint => {
        maxWidth[breakpoint.name] = window.innerWidth <= breakpoint.width;
    });
    return maxWidth;
}

const BreakpointsContext = createContext<BreakpointsContextValue>({
    isMaxWidth: {}
});

interface BreakpointsContextProviderProps {
    children: ReactNode;
}

const BreakpointsContextProvider = ({ children }: BreakpointsContextProviderProps) => {
    const [isMaxWidth, setIsMaxWidth] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        // onResize()
        setTimeout(onResize, 300);
        // window.addEventListener("load", onResize);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize)
    }, [])

    function onResize() {
        setIsMaxWidth(resizer())
    }

    const value = { isMaxWidth }

    return (
        <BreakpointsContext.Provider value={value}>
            {children}
        </BreakpointsContext.Provider>
    )
}

const useBreakpoints = () => {
    const context = useContext(BreakpointsContext);
    if (!context) {
        throw new Error('useBreakpoints must be used within a BreakpointsContextProvider');
    }
    return context;
}

export default BreakpointsContextProvider
export { BreakpointsContext, useBreakpoints }