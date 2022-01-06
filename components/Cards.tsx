import React from 'react'
import Image from 'next/image';
import Link from "next/link";




interface Book {
    _id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    author: string;
    description: string;
}

interface Props {
    books: Book[];
}


export default function Cards(props: Props) {
    return (
        <div className="row">
            {
                props.books.map((book, index) => (
                    <Link
                        href={`/products/${book._id}`}
                        key={index}
                    >
                        <div className="col-md-4 align-items-stretch d-flex">
                            <div className="card mb-4 mr-4 shadow-sm mx-auto wrapper" style={{ width: "18rem" }}>
                                <Image
                                    src={book.image}
                                    className="card-img-top"
                                    alt={book.name}
                                    layout="responsive"
                                    width={325}
                                    height={500}
                                    placeholder="blur"
                                    blurDataURL={`/_next/image?url=${book.image}&w=16&q=1`}
                                />

                                <div className="card-body">



                                    <h5 className="card-title">{book.name}</h5>
                                    <p className="card-text">
                                        {book.description}
                                    </p>
                                    <div className={"d-flex justify-content-between align-items-center"}>
                                        <div className={"btn-group"}>
                                            <strong>
                                                {book.author}
                                            </strong>

                                        </div>
                                        <strong>
                                            ₹{book.price}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))


            }
        </div>

    )
}
