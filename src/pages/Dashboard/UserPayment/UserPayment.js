import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./userpayment.css";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
const stripePromise = loadStripe(
  "pk_test_51L5L5KJPPkc8MG0BYB5ofyV53pnOxyBfsodvNn6Wg7dvsqTeaNPJM9NSDIfPPbvtLVrqF32cxLwzonQ2ynR7GspN00VAHDdS4q"
);
const UserPayment = () => {
  const { user } = useAuth();
  return (
    <div className="payform">
      <div class="w-96 mx-auto border border-gray-400 rounded-lg">
        <div class="w-full h-auto p-4 flex items-center border-b border-gray-400">
          <h1 class="w-full">Credit Card</h1>
        </div>
        <div class="w-full h-auto p-4">
          <form action="login.php" method="get">
            <div class="mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:text-gray-900 focus-within:border-gray-500">
              <label
                for="cc-name"
                class="text-xs tracking-wide uppercase font-semibold"
              >
                Name
              </label>
              <input
                id="cc-name"
                type="text"
                name="cc-name"
                defaultValue={user.name}
              />
            </div>

            <div class="mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:text-gray-900 focus-within:border-gray-500">
              <label
                for="cc-number"
                class="text-xs tracking-wide uppercase font-semibold"
              >
                email
              </label>
              <input
                id="cc-number"
                type="text"
                name="cc-number"
                class=" h-8 focus:outline-none"
                defaultValue={user.email}
              />
            </div>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPayment;
