import Head from "next/head";
import Script from "next/script"
import Navbar from "../components/Navbar";
import "../styles/global.css";
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

            <Script
                src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
                integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
                crossOrigin="anonymous"
            />
            <Navbar />
            <Component {...pageProps} />
        </>
    );
}
export default MyApp;