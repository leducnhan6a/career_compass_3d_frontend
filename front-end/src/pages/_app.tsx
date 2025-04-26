import type { AppProps } from "next/app";
import { GoogleAnalytics } from "@next/third-parties/google";
import { PostHogProvider } from "posthog-js/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import posthog from "posthog-js";

import gsap from 'gsap'
import { LenisRef, ReactLenis } from 'lenis/react'

import "@styles/globals.css";
import "@styles/tailwindcss.css";
import 'lenis/dist/lenis.css'
import BreakpointsContextProvider from "../context/breakpointsContext";
import { useEffect, useRef } from "react";
import { LenisOptions } from "lenis";
import { CookiesProvider } from 'react-cookie'


// if (typeof window !== "undefined") {
//   // checks that we are client-side
//   posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
//     api_host:
//       process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",

//     loaded: (posthog) => {
//       if (process.env.NODE_ENV === "development") posthog.debug(); // debug mode in development
//     },
//   });
// }

const optionsReactLenis: LenisOptions = {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    orientation: 'vertical',
    gestureOrientation: 'both',
    infinite: false,
    autoResize: true,
};

export default function App({ Component, pageProps }: AppProps) {
    const lenisRef = useRef<LenisRef>(null);
    useEffect(() => {
        const lenis = lenisRef.current?.lenis;

        if (!lenis) {
            console.warn("⚠️ Lenis chưa được khởi tạo!");
            return;
        }
        function update(time: number) {
            if (lenis) {
                lenis.raf(time * 1000);
            }
        }

        async function initGSAP() {
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.defaults({ markers: true });
            gsap.ticker.add(update);
            gsap.ticker.lagSmoothing(0);
        }

        initGSAP();

        lenis.on("scroll", ScrollTrigger.update);
        lenis.on("scroll", (e) => {
            console.log("Scrolling event:", e);
        });

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);
    return (<>
        <GoogleAnalytics gaId={process.env.GTAG_ID as string} />
        <DefaultSeo {...SEO} />
        <PostHogProvider client={posthog}>
            <BreakpointsContextProvider>
                <ReactLenis options={optionsReactLenis} ref={lenisRef} root>
                    <CookiesProvider>
                        <Component {...pageProps} />
                    </CookiesProvider>
                </ReactLenis>
            </BreakpointsContextProvider>
        </PostHogProvider >
        <Analytics />
        <SpeedInsights />
    </>
    );
}