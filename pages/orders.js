import { getSession } from "next-auth/client";
import Header from "../components/Header";
import { db } from "../firebase";
import Order from "../components/Order";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useState } from "react";

export default function orders({ session }) {
  const [orders, setOrders] = useState(null);

  const collecRef = query(
    collection(db, `users/${session.user.email}/orders`),
    orderBy("timeStamp", "desc")
  );
  getDocs(collecRef).then((res) => setOrders(res));

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          My Orders
        </h1>

        {session ? (
          <h2>{orders?.docs?.length} Orders</h2>
        ) : (
          <h2>Sign in to see your orders.</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders &&
            orders.docs?.map((order) => (
              <Order
                id={order.id}
                amount={order.data().totalAmount}
                amountShipping={order.data().amountShipping}
                items={order.data().items}
                timestamp={order.data().timeStamp}
                orderDate={order.data().orderDate}
                key={order.id}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }

  return {
    props: { session },
  };
}
