import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
    const [search, setSearch] = useState("");
    function handleChange(event: any) {
        setSearch(event.target.value);
    }
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
                                <a className="nav-link">Home <span className="sr-only">(current)</span></a>

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
