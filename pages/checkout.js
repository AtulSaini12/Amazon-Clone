import Image from "next/image";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../src/slices/cartSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";

export default function Checkout() {
  const [session] = useSession();
  const cartItems = useSelector(selectItems);
  const totalPrice = useSelector(selectTotal);

  return (
    <div className="bg-gray-100 ">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white ">
            <h1 className="text-3xl border-b pb-4">
              {cartItems.length === 0
                ? "Your cart is empty!! "
                : "Your Cart Items : "}
            </h1>

            {cartItems.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                category={item.category}
                description={item.description}
                hasPrime={item.hasPrime}
                image={item.image}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-white p-10 shadow-md">
          {cartItems.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({cartItems.length} items):
                <span className="font-bold">
                  <Currency quantity={totalPrice * 30} currency="INR" />
                </span>
              </h2>
              <button
                disabled={!session}
                className={`button mt-2 font-bold  ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign In to Checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
