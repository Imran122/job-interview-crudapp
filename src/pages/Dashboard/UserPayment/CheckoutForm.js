import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getCookie } from "../../../utilities/helper";
import axios from "axios";

const CheckoutForm = () => {
  const { user, isLoading, setIsLoading } = useAuth();
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const [error, setError] = useState("");
  const [amounts, setAmounts] = useState("");
  console.log(amounts);
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");

      try {
        const { id } = paymentMethod;
        console.log(id);
        setIsLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_URL_API}/api/user-payment`,
          {
            name: user.name,
            email: user.email,
            payAmonut: amounts,
            id: id,
          },

          {
            headers: {
              authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );

        if (response.status === 200) {
          setIsLoading(false);
          navigate("/success", { replace: true });
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };
  return (
    <>
      {isLoading === true && <div className="loader"></div>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div class="mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:text-gray-900 focus-within:border-gray-500">
          <label
            for="cc-number"
            class="text-xs tracking-wide uppercase font-semibold"
          >
            Enter amount
          </label>
          <input
            id="cc-number"
            type="text"
            name="payAmonut"
            onChange={(e) => setAmounts(e.target.value)}
            class=" h-8 focus:outline-none"
            placeholder=" give amount"
          />
        </div>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="row g-3 mt-3">
          <div className="col col-6 col-md-4">
            <Link to="/">
              <button className="cr-rp-btn-back">Back</button>
            </Link>
          </div>

          <div className="col col-6 col-md-4">
            <button
              disabled={!stripe}
              type="submit"
              onClick={handleSubmit}
              className="button-style cr-rp-btn-continue"
            >
              Pay & Confirm
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
