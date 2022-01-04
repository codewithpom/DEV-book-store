import Head from "next/head";
import Navbar from "../components/Navbar";
import "../styles/global.css";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>

                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                    rel="stylesheet"
                    crossOrigin="anonymous"
                />
            </Head>

            <NextNProgress options={{ showSpinner: false }} />

            <Navbar />

            <Component {...pageProps} />
            <script
                src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            />

            <script
                src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
            />
        </>
    );
}
export default MyApp;