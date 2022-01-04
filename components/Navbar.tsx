import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/router";

export default function Navbar() {
    const [search, setSearch] = useState("");
    const router = useRouter();
    function handleChange(event: any) {
        setSearch(event.target.value);
    }

    // add keybinding to search
    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === "Enter") {
                event.preventDefault();
                router.push(`/search?search=${search}`);
            }

        };
        document.getElementById("search").addEventListener("keydown", handleKeyDown);
        return () => {
            document.getElementById("search").removeEventListener("keydown", handleKeyDown);
        };
    }, [search]);




    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <div className="nav-link">
                            <Link href="/">
                                <a className={
                                    router.pathname === "/" ? "nav-link active" : "nav-link"
                                }>Home <span className="sr-only">(current)</span></a>
                            </Link>

                        </div>
                    </li>

                    <li className="nav-item">
                        <div className="nav-link">
                            <Link href="/search">
                                <a className={
                                    router.pathname === "/search" ? "nav-link active" : "nav-link"
                                }>
                                    Search
                                    <span className="sr-only">
                                        (current)
                                    </span>
                                </a>
                            </Link>
                        </div>
                    </li>


                </ul>
                <div className="form-inline my-2 my-lg-0">
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={search}
                        onChange={handleChange}
                        id="search"
                    />
                    <Link href={`/search?search=${search}`}>
                        <button
                            className="btn btn-outline-success my-2 my-sm-0"
                            type="button"
                        >
                            Search
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
