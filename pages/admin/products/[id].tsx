import { getProduct } from "../../api/product_details"
import Image from 'next/image';
import { useState } from 'react';

export async function getServerSideProps(context) {
    const id = context.query.id;
    const details = await getProduct(id);
    return {
        props: {
            ...details,
        },
    }
}

export default function EachProduct(props) {

    const [title, setTitle] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [stock, setStock] = useState(props.stock);
    const [loading, setLoading] = useState(false);
    async function updateDetails(event) {
        event.preventDefault();
        const id = props._id;
        let updates = {};
        if (title !== props.name) {
            // @ts-ignore
            updates.name = title;
        }

        if (description !== props.description) {
            // @ts-ignore
            updates.description = description;
        }

        if (stock !== props.stock) {
            // @ts-ignore
            updates.stock = stock;
        }
        const data = JSON.stringify({
            _id: id,
            change_object: updates
        })
        console.log(data);
        setLoading(true);
        await fetch("/api/admin/update_product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        })
        setLoading(false);
        window.location.reload();

    }

    return (
        <div className='container'>
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


                                <p className="lead font-weight-bold">Price</p>
                                <p className="lead" title="Price is not editable">
                                    <span>₹{props.price}</span>

                                </p>

                                <form onSubmit={updateDetails}>
                                    <p className="lead font-weight-bold">Title</p>
                                    <input type="text" className="form-control" placeholder="Title" value={title} onChange={
                                        (e) => {
                                            setTitle(e.target.value);
                                        }
                                    } />

                                    <p className="lead font-weight-bold">Description</p>

                                    <div className="form-group">
                                        <textarea className="form-control"
                                            rows={3}
                                            value={description}
                                            onChange={(e) => {
                                                setDescription(e.target.value);
                                            }}
                                        ></textarea>

                                        <br />
                                        <p className="lead font-weight-bold">Stock</p>
                                        <input type="number" className="form-control" placeholder="Stock" value={stock} min={0} onChange={
                                            (e) => {
                                                setStock(Number(e.target.value));
                                            }
                                        } />
                                        {/* check if any of the states are changed */}
                                        <br />
                                        {
                                            title !== props.name || description !== props.description || stock !== props.stock ?
                                                <button className="btn btn-primary btn-md">
                                                    {
                                                        loading ?
                                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            :
                                                            <span>Update</span>
                                                    }
                                                </button>
                                                :
                                                <button className="btn btn-primary btn-md" disabled title="Change something to update">
                                                    Update
                                                </button>

                                        }
                                    </div>

                                </form>

                            </div>


                        </div>


                    </div>




                </div>
            </main>
        </div>
    )
}
