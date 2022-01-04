import Table from "../components/Cards";
import { InferGetServerSidePropsType } from 'next'
import { getProducts } from "./api/products"
import Head from "next/head";


type Book = {
  _id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  author: string;
  description: string;
}

type Data = Book[]


export const getServerSideProps = async () => {
  const data: Data = await getProducts()

  console.log(data)
  return {
    props: {
      books: data,
    },
  }
}




export default function index(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>DEV Book Store</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="A DEV book store" />
        <meta name="keywords" content="DEV, book, store" />
        <meta name="author" content="Padmashree Jha" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="og:title" content="DEV Book Store" />
        <meta name="og:description" content="A DEV book store" />
        <meta name="og:type" content="website" />
        <meta name="og:image" content="https://res.cloudinary.com/practicaldev/image/fetch/s--R9qwOwpC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/78hs31fax49uwy6kbxyw.png" />

      </Head>

      <div className="container">
        <br />
        <h1 className="text-center">
          DEV Book Shop
        </h1>

        <br />
        <Table books={props.books} />
      </div>
    </>
  )
}
