import { DefaultSeoProps } from "next-seo";

const description = ""
const urlBase = ""
const title = "Blong"
// See https://www.npmjs.com/package/next-seo for more options
const config: DefaultSeoProps = {
    // Page Title
    titleTemplate: "%s | Personal Portfolio & Resume",
    title,
    defaultTitle: "Personal Portfolio & Resume ",
    canonical: `${urlBase}`,
    description,
    // Meta Tags


    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: `${urlBase}`,
        title: 'Personal Portfolio & Resume',
        description,
        profile: {
            firstName: 'Le',
            lastName: 'Blong',
            username: 'Blong12',
            gender: 'male',
        },
        images: [{
            url: `${urlBase}/favicon/og-image.png`,
            width: 1200,
            height: 787,
            alt: 'Og Image Alt',
        }]
    },
    twitter: {
        site: '@__BLong12__',
        cardType: 'summary_large_image',
    },
    additionalLinkTags: [
        {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon/32.png',
            sizes: '32x32'
        },
        {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon/16.png',
            sizes: '16x16'
        },
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            href: "/favicon/180.png"
        },
        {
            rel: "shortcut icon",
            type: "image/png",
            href: "/favicon/196.png"
        },
        {
            rel: "manifest",
            href: "/favicon/site.webmanifest"
        }
    ]
};

export default config;