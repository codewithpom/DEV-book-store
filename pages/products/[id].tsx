import Image from "next/image"
import { getProduct } from "../api/product_details";
import { useCart } from "react-use-cart"
import { useState } from 'react'

interface props {
    _id: string;
    name: string
    price: number
    description: string
    image: string
    author: string
    stock: number
}


export async function getServerSideProps(context) {
    const { id } = context.query
    const data = await getProduct(id)
    return {
        props: {
            ...data,
        },
    }
}

export default function Detail(props: props) {
    const [addedToCart, setAddedToCart] = useState(false)
    const { addItem } = useCart()

    function addToCart(event) {
        event.preventDefault()
        // @ts-ignore
        const amount = Number(document.getElementById("quantity").value);
        addItem({
            id: props._id,
            name: props.name,
            price: props.price,
            image: props.image,
        }, amount)
        setAddedToCart(true);
        // add a timeout of two seconds to show the success message
        setTimeout(() => {
            setAddedToCart(false);
        }, 2000);
    }

    function Markup() {
        if (props.stock <= 0) {
            return (
                <div className="text-center">
                    <div className="alert alert-danger" role="alert">
                        <h4>
                            Out of Stock
                        </h4>
                    </div>
                    <h5>
                        Contact
                        <a
                            href={`mailto:${process.env.NEXT_PUBLIC_OWNER_EMAIL_ADDRESS}`}
                            target={"_blank"}
                        >
                            {" "}
                            me
                            {" "}
                        </a>
                        for special requests
                    </h5>
                </div>
            )
        } else {
            return (
                <div className="text-center">
                    <div className="alert alert-primary" role="alert">
                        <h4>
                            In stock
                        </h4>


                    </div>
                </div>
            )
        }
    }
    return (
        <div className="container">
            <br />
            <h1 className="text-center">
                {props.name}
            </h1>
            <main className="mt-5 pt-4">
                <div className="container dark-grey-text mt-5">


                    <div className="row wow fadeIn">


                        <div className="col-md-6 mb-4">
                            <Image
                                src={props.image}
                                className="img-fluid"
                                alt={props.name}
                                layout="responsive"
                                width={325}
                                height={500}
                                placeholder="blur"
                                blurDataURL={`/_next/image?url=${props.image}&w=16&q=1`}
                            />
                            {/* <img src={props.image} className="img-fluid" alt={props.name} /> */}
                        </div>

                        <div className="col-md-6 mb-4">

                            <div className="p-4">

                                <Markup />

                                <p className="lead">
                                    <span>₹{props.price}</span>

                                </p>

                                <p className="lead font-weight-bold">Description</p>

                                <p>{props.description}</p>

                                {
                                    props.stock > 0 ? (
                                        <>
                                            <form className="d-flex justify-content-left" onSubmit={addToCart}>

                                                <input
                                                    type="number"
                                                    aria-label="Search"
                                                    className="form-control mr-4"
                                                    style={{ width: "100px" }}
                                                    required
                                                    placeholder="Quantity"
                                                    min={1}
                                                    max={props.stock}
                                                    id="quantity"
                                                />
                                                <button
                                                    className={"btn btn-primary btn-md my-0 p"}
                                                    type={"submit"}
                                                >
                                                    Add to cart
                                                    <i className="fas fa-shopping-cart ml-1"></i>
                                                </button>

                                            </form>
                                            <br />
                                            {
                                                addedToCart ? (
                                                    <div className="alert alert-success" role="alert">
                                                        <h5 className="text-center">
                                                            Added to cart
                                                        </h5>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                        </>
                                    ) : (
                                        <></>
                                    )

                                }

                            </div>


                        </div>


                    </div>




                </div>
            </main>
        </div>

    )
}
