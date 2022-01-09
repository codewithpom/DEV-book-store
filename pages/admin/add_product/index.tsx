import React from 'react'
import { hashedEmail, hashedPassword } from "../admin.config";
import bcrypt from 'bcryptjs'
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

    return {
        props: {

        }
    }
}


export default function index() {
    async function submit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const object = {};
        data.forEach(function (value, key) {
            object[key] = value;
        });
        console.log(object)
        await fetch("/api/admin/add_product", {
            // @ts-ignore
            body: JSON.stringify(object),
            method: "post"
        });

    }

    return (
        <div className='container'>
            {/* 
                create a bootstrap form for the product details 
                The fields should be:
                - name
                - description
                - price
                - quantity
                - image
                - author
            */}
            <br />
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" placeholder="Enter name of the book" name="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" placeholder="Enter description of the book" name="description" />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" className="form-control" name="price" placeholder="Enter price" />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" className="form-control" name="stock" placeholder="Enter quantity" />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input type="text" className="form-control" name="image_url" placeholder="Enter image URL" />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input type="text" className="form-control" name="author" placeholder="Enter author" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}
