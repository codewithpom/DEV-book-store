import React from 'react'
import { hashedEmail, hashedPassword } from "./admin.config";
import bcrypt from 'bcryptjs'
import { getProducts } from "../api/products"
import Table from "../../components/Cards"
import Link from "next/link"


export async function getServerSideProps({ req, res, query }) {
    console.log(req.cookies.credentials)
    let email;
    let password;
    try {
        email = JSON.parse(req.cookies.credentials)?.email;
        password = JSON.parse(req.cookies.credentials)?.password;

    } catch (error) {
        console.log(error)
        return {
            redirect: {
                destination: '/admin/login',
            }
        }
    }

    if (!email || !password) {
        return {
            redirect: {
                destination: '/admin/login',
            }
        }

    }
    // veryfing email and password
    const adminEmail = hashedEmail;
    const adminPassword = hashedPassword;
    const isPasswordValid = await bcrypt.compare(password, adminPassword);
    const isEmailValid = await bcrypt.compare(email, adminEmail);
    if (!isPasswordValid || !isEmailValid) {
        console.log('Invalid credentials');
        return {
            redirect: {
                destination: '/admin/login',
            }
        }
    }
    const products = await getProducts();
    console.log(products)
    return {
        props: {
            products: products
        }
    }
}


export default function index(props) {
    return (
        <>
            <div className='container'>
                <br />
                <div className="text-center">
                    <h1>
                        Welcome Boss
                    </h1>
                </div>
                <br />
                <Link href={"/api/admin/logout"}>
                    <button className='btn btn-danger float-right'>
                        Logout
                    </button>
                </Link>
                <Link href={"/admin/add_product"}>
                    <button className='btn btn-success float-left'>Add new book</button>
                </Link>
                <div className='text-center'>
                    <button className='btn btn-primary'>
                        See Orders
                    </button>
                </div>


                <br />
                <br />
                <br />
                <Table books={props.products} admin={true} />
            </div>
        </>
    )
}
