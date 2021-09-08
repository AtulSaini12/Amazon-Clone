export default function Notification({ itemName }) {
  return (
    <div
      className="flex items-center justify-end p-2
      
    "
    >
      <p
        className="font-bold text-white bg-green-700 px-2 rounded
       "
      >
        Item added to cart.
      </p>
    </div>
  );
}
