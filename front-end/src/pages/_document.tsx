import {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
// import { beVietnamPro, montserrat, pecita } from "@utils/fonts";

const MyDocument = () => (
  <Html
    lang="vi"
    dir="ltr"
  // className={`${montserrat.variable} ${pecita.variable} ${beVietnamPro.variable}`}
  >
    <Head></Head>
    <body className="select-none">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default MyDocument;
