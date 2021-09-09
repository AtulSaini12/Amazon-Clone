import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession, signIn } from "next-auth/client";
import setUser from "../src/helpers/setUser";

export default function Home({ products, session }) {
  if (!session) {
    signIn();
  } else {
    setUser(session);
  }

  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Amazon Clone</title>
        <meta
          name="description"
          content="A complete amazon clone with auth, stripe payments and firestore"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />

        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products: products,
      session: session,
    },
  };
}

//Get >>> https://fakestoreapi.com/products
