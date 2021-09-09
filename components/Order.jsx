import Currency from "react-currency-formatter";

export default function Order({
  id,
  amount,
  amountShipping,
  items,
  timestamp,
  orderDate,
}) {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-sx">ORDER PLACED</p>
          <p>{orderDate.substring(0, 15)}</p>
        </div>

        <div>
          <p className="text-x font-bold">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="USD" /> - SHIPPING CHARGES{" "}
            <Currency quantity={amountShipping} currency="USD" />
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.length} items
        </p>

        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER #{id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {items.map((item, i) => (
            <img
              src={item.image}
              alt="items"
              className="h-20 object-contain sm:h-32"
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
