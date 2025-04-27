import { DefaultSeoProps } from "next-seo";

const description = ""
const urlBase = "" // Cập nhật URL chính thức của website
const title = "Counter Striker"

// See https://www.npmjs.com/package/next-seo for more options
const config: DefaultSeoProps = {
    // Page Title
    titleTemplate: "%s | Trang chủ",
    title,
    defaultTitle: "Trang chủ Counter Striker",
    canonical: `${urlBase}`,
    description,
    // Meta Tags
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: `${urlBase}`,
        title: 'Counter Striker',
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
            alt: 'Counter Striker Og Image',
        }]
    },
    twitter: {
        site: '@__BLong12__',
        cardType: 'summary_large_image',
    },
    additionalLinkTags: [
        {
            rel: 'icon',
            type: 'image/svg+xml',
            href: '/favicon/32.svg',
            sizes: '32x32',
        },
        {
            rel: 'icon',
            type: 'image/svg+xml',
            href: '/favicon/16.svg',
            sizes: '16x16',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/favicon/180.svg',
        },
        {
            rel: 'shortcut icon',
            type: 'image/svg+xml',
            href: '/favicon/196.svg',
        },
        {
            rel: 'manifest',
            href: '/favicon/site.webmanifest',
        },
    ],
};

export default config;
