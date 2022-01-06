import React from 'react'
import { useCart } from 'react-use-cart'
import loadStripe from "../../utils/get-stripe"
import Link from 'next/link';
import axios from 'axios';


interface CartProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}



interface CartProps {
    products: CartProduct[];
    removeProduct: (id: string) => void;
    redirectToCheckout: () => void;
}


function Table(props: CartProps) {
    console.log(props.products)
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <table className="table table-image">
                        <thead>
                            <tr>
                                <th scope="col" style={{ verticalAlign: "middle" }}>#</th>
                                <th scope="col" style={{ verticalAlign: "middle" }}>Image</th>
                                <th scope="col" style={{ verticalAlign: "middle" }}>Book Name</th>
                                <th scope="col" style={{ verticalAlign: "middle" }}>Price</th>
                                <th scope="col" style={{ verticalAlign: "middle" }}>Quantity</th>
                                <th scope="col" style={{ verticalAlign: "middle" }}>Total</th>
                                <th scope="col" style={{ verticalAlign: "middle" }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.products.map((product, index) => (
                                    <tr key={index}>
                                        <th scope="row" style={{ verticalAlign: "middle" }}>{index + 1}</th>
                                        <td className='w-25' style={{ verticalAlign: "middle" }}>
                                            <img src={product.image} alt={product.name} width={50} />
                                        </td>
                                        <td style={{ verticalAlign: "middle" }}>
                                            <Link href={`/products/${product.id}`}>
                                                {product.name}
                                            </Link>
                                        </td>
                                        <td style={{ verticalAlign: "middle" }}>₹{product.price}</td>
                                        <td style={{ verticalAlign: "middle" }}>{product.quantity}</td>
                                        <td style={{ verticalAlign: "middle" }}>₹{product.price * product.quantity}</td>
                                        <td style={{ verticalAlign: "middle" }}>
                                            <button className="btn btn-danger" onClick={() => {
                                                console.log(product.id)
                                                props.removeProduct(product.id)
                                            }}>Remove</button>
                                        </td>

                                    </tr>
                                ))

                            }
                        </tbody>
                    </table>
                    <button className="btn btn-primary" onClick={props.redirectToCheckout}>Checkout</button>
                </div>
            </div>
        </div>
    )

}


export default function index() {
    const {
        isEmpty,
        items,
        updateItemQuantity,
        removeItem,
    } = useCart();

    const redirectToCheckout = async () => {
        const lineItems = items.map(item => ({
            price: item.id,
            quantity: item.quantity,
        }));

        const {
            data: { id },
        } = await axios.post('/api/checkout_sessions', {
            lineItems: lineItems,
        });

        const stripe = await loadStripe();
        await stripe.redirectToCheckout({ sessionId: id });

    }

    if (isEmpty) {
        return (
            <div className='container'>
                <br />
                <br />
                <br />
                <h1 className='text-center'>Your cart is empty</h1>
            </div>
        );
    }

    return (
        <Table products={items as unknown as CartProduct[]} removeProduct={removeItem} redirectToCheckout={redirectToCheckout} />
    )
}
