import Image from "next/image";
import Header from "../components/Header";

export default function Checkout() {
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
            <h1 className="text-3xl border-b pb-4">My Cart Items</h1>
          </div>
        </div>
      </main>
    </div>
  );
}