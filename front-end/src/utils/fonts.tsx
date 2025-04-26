import localFont from "next/font/local";
import { Montserrat, Be_Vietnam_Pro } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    weight: ["400", "500", "600", "700"],
});
const beVietnamPro = Be_Vietnam_Pro({
    subsets: ["latin"],
    variable: "--font-beVietnamPro",
    weight: ["400", "500", "600", "700"],
});

const pecita = localFont({
    src: [
        {
            path: "../../public/fonts/Pecita.otf",
            weight: "500",
        },
        {
            path: "../../public/fonts/Pecita.otf",
            weight: "600",
        },
        {
            path: "../../public/fonts/Pecita.otf",
            weight: "700",
        },
        {
            path: "../../public/fonts/Pecita.otf",
            weight: "800",
        },
    ],
    variable: "--font-pecita",
});

export { montserrat, pecita, beVietnamPro };
