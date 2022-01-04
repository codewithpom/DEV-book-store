import Image from "next/image"
import { getProduct } from "../api/product_details";

interface props {
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
    console.log(props)
    return (
        <div className="container">
            <br />
            <h1 className="text-center">
                DEV Book Shop
            </h1>
            <main className="mt-5 pt-4">
                <div className="container dark-grey-text mt-5">


                    <div className="row wow fadeIn">


                        <div className="col-md-6 mb-4">
                            {/* <Image
                                src={props.image}
                                className="img-fluid"
                                alt={props.name}
                                layout="responsive"
                                width={325}
                                height={500}
                                placeholder="blur"
                                blurDataURL={`/_next/image?url=${props.image}&w=16&q=1`}
                            /> */}
                            <img src={props.image} className="img-fluid" alt={props.name} />
                        </div>

                        <div className="col-md-6 mb-4">

                            <div className="p-4">

                                <h5>
                                    {props.stock > 0 ? "In Stock" : "Out of Stock"}
                                </h5>

                                <p className="lead">
                                    <span>${props.price}</span>

                                </p>

                                <p className="lead font-weight-bold">Description</p>

                                <p>{props.description}</p>

                                <form className="d-flex justify-content-left">

                                    <input type="number" value="1" aria-label="Search" className="form-control" style={{ width: "100px" }} />
                                    <button className="btn btn-primary btn-md my-0 p" type="submit">Add to cart
                                        <i className="fas fa-shopping-cart ml-1"></i>
                                    </button>

                                </form>

                            </div>


                        </div>


                    </div>




                </div>
            </main>
        </div>

    )
}
