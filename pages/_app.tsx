import Navbar from "../components/Navbar";
import "../styles/global.css";
function MyApp({ Component, pageProps }) {
    return (
        <>
            <Navbar />
            <Component {...pageProps} />
            <script
                src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            />

            <script
                src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
            />
            <link
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                rel="stylesheet"
                crossOrigin="anonymous"
            />
        </>
    );
}
export default MyApp;