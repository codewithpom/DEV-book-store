import React from 'react'
import { useState, useEffect } from 'react'
import { getData } from './api/search_product'
import Table from '../components/Cards'

interface Book {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    author: string;
}



interface props {
    search: string;
    results: Book[];
}

export async function getServerSideProps(context: any) {
    const search = context.query.search || "";
    const results = await getData(search);
    return {
        props: {
            search,
            results
        }
    }
}


export default function search(props: props) {
    const [results, setResults] = useState(props.results);
    const [search, setSearch] = useState(props.search);
    function handleChange(event: any) {
        setSearch(event.target.value);
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        const res = await fetch(`/api/search_product?term=${search}`)
        const data = await res.json();
        setResults(data);
    }



    return (
        <div className='container'>
            <br />
            <h1 className='text-center'>Search</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">

                    <input
                        type="text"
                        className="form-control"
                        id="searchTerm"
                        placeholder="Search term"
                        title='Search term'
                        value={search}
                        onChange={handleChange}
                    />

                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <br />
            <Table books={results} />

        </div>

    )
}
