import { getSession, useSession } from "next-auth/client";
import Header from "../components/Header";
import { db } from "../firebase";

export default function orders({ orders }) {
  const [session] = useSession();

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          My Orders
        </h1>

        {session ? <h2>Orders</h2> : <h2>Sign in to see your orders.</h2>}

        <div className="mt-5 space-y-4"></div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  const session = getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();
}
