import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = ({
  cart,
  handleIncrease,
  handleDecrease,
  handleRemove,
  getTotalPrice,
  applyPromoCode,
  promoCode,
  setPromoCode,
  invalid,
  setCart,
}) => {
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  // Payment input fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = () => {
    // Validate payment fields
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast.error("Please fill in all payment details");
      return;
    }

    // Dummy success
    setCart([]); // Clear cart
    setShowPayment(false);
    toast.success("Payment Successful! Order placed.");
    navigate("/"); // Redirect to home
  };

  return (
    <>
      <div className="w-[90%] mx-auto">
        <div className="container mx-auto mt-10">
          <div className="flex flex-col lg:flex-row shadow-md my-10">
            {/* Left: Cart Details */}
            <div className="w-full lg:w-3/4 bg-white px-6 sm:px-10 py-10">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl uppercase">
                  {cart.length} Items
                </h2>
              </div>

              <div className="hidden sm:flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Quantity
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                  Total
                </h3>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center flex-wrap sm:flex-nowrap hover:bg-gray-100 -mx-4 sm:-mx-8 px-4 sm:px-6 py-5"
                >
                  <div className="flex w-full sm:w-2/5 mb-4 sm:mb-0">
                    <div className="w-20">
                      <img className="h-24" src={item.image} alt={item.title} />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{item.title}</span>
                      <span className="text-red-500 text-xs">
                        {item.category}
                      </span>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-xs text-gray-500 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center w-full sm:w-1/5 mb-2 sm:mb-0">
                    <button
                      className="border px-2 py-1"
                      onClick={() => handleDecrease(item.id)}
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      className="border px-2 py-1"
                      onClick={() => handleIncrease(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <span className="w-full sm:w-1/5 text-sm font-semibold text-center">
                    Rs. {item.price}
                  </span>
                  <span className="w-full sm:w-1/5 text-sm font-semibold text-center">
                    Rs. {item.price * item.quantity}
                  </span>
                </div>
              ))}

              <p
                className="flex font-semibold text-indigo-600 text-sm mt-10 cursor-pointer"
                onClick={() => navigate("/products")}
              >
                ← Continue Shopping
              </p>
            </div>

            {/* Right: Summary */}
            <div className="w-full lg:w-1/4 px-6 sm:px-8 py-10 bg-[#f6f6f6]">
              <h1 className="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  {cart.length} Items
                </span>
                <span className="font-semibold text-sm">
                  Rs. {getTotalPrice()}
                </span>
              </div>

              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                  Shipping
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - Rs. 10.00</option>
                </select>
              </div>

              <div className="py-10">
                <label className="font-semibold inline-block mb-3 text-sm uppercase">
                  Promo Code
                </label>
                <input
                  type="text"
                  className="p-2 text-sm w-full"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter your code"
                />
                {promoCode && promoCode !== "DISCOUNT10" ? (
                  <span className="text-[red] font-semibold">{invalid}</span>
                ) : (
                  <span>Use DISCOUNT10</span>
                )}
                {promoCode === "DISCOUNT10" && (
                  <p className="text-green-500">Promo Applied!</p>
                )}
              </div>

              <button
                className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase"
                onClick={applyPromoCode}
              >
                Apply
              </button>

              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>Rs. {(getTotalPrice() + 10).toFixed(2)}</span>
                </div>
                <button
                  className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                  onClick={handleCheckoutClick}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dummy Payment Modal */}
        {showPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-md w-96">
              <h2 className="text-xl font-bold mb-4">Payment Gateway</h2>
              <input
                type="text"
                placeholder="Card Number (e.g. 1234 5678 9012 3456)"
                className="border p-2 w-full mb-3 rounded"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <input
                type="text"
                placeholder="Name on Card"
                className="border p-2 w-full mb-3 rounded"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                className="border p-2 w-full mb-3 rounded"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              <input
                type="text"
                placeholder="CVV (e.g. 123)"
                className="border p-2 w-full mb-3 rounded"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setShowPayment(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
