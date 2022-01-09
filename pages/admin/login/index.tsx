import bcrypt from 'bcryptjs';
import getRawBody from 'raw-body';
import { hashedEmail, hashedPassword } from "../../../utils/admin.config";
const qs = require('querystring')
import cookie from 'cookie';

export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    if (req.method !== 'POST') {
        return {
            props: {}
        }
    }
    const body = await getRawBody(req)
    req.body = qs.parse(body.toString("utf-8"))

    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return {
            redirect: {
                destination: '/admin/login',
            }
        }
    }

    const adminEmail = hashedEmail;
    const adminPassword = hashedPassword;
    console.log(adminEmail, adminPassword);
    const isPasswordValid = await bcrypt.compare(password, adminPassword);
    console.log(isPasswordValid);
    // even email is encrypted, just try to compare it
    const isEmailValid = await bcrypt.compare(email, adminEmail);
    console.log(isEmailValid);
    if (!isPasswordValid || !isEmailValid) {
        console.log('Invalid credentials');
        return {
            props: {
                error: 'Invalid email or password',
            }
        }
    }
    console.log("Valid credentials");
    const credentials = {
        email: email,
        password: password,
    }
    console.log(JSON.stringify(credentials));
    if (req.body.remember) {
        const cookieOptions = {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: false,
            secure: process.env.NODE_ENV === 'production',
            path: "/"
        }
        res.setHeader('Set-Cookie', cookie.serialize('credentials', JSON.stringify(credentials), cookieOptions))
    } else {
        // set cookies to expire in 1 hour
        const cookieOptions = {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === 'production',
            path: "/"
        }



        res.setHeader('Set-Cookie', cookie.serialize('credentials', JSON.stringify(credentials), cookieOptions))


    }
    return {
        redirect: {
            destination: '/admin',
        }
    }

}



export default function index(props: any) {
    return (
        <div className="container">
            <br />
            <form action="/admin/login" method="post">
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input type="email" className="form-control" placeholder="Enter email" id="email" name="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" className="form-control" placeholder="Enter password" id="pwd" name="password" />
                </div>
                <div className="form-group form-check">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" name="remember" />
                        Remember me
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <br />

            {props.error && <div className="alert alert-danger">{props.error}</div>}
        </div>
    )
}
