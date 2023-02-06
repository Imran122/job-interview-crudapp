import React from "react";
import "./userpayment.css";
const UserPayment = () => {
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
                اسم البطاقة
              </label>
              <input
                id="cc-name"
                type="text"
                name="cc-name"
                placeholder="اسم البطاقة"
              />
            </div>

            <div class="mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:text-gray-900 focus-within:border-gray-500">
              <label
                for="cc-number"
                class="text-xs tracking-wide uppercase font-semibold"
              >
                رقم البطاقة
              </label>
              <input
                id="cc-number"
                type="text"
                name="cc-number"
                class=" h-8 focus:outline-none"
                placeholder="رقم البطاقة"
              />
            </div>

            <div class="flex mb-4 px-3 py-1 bg-white rounded-sm border border-gray-300 focus-within:border-gray-500">
              <div class="w-full focus-within:text-gray-900">
                <label
                  for=""
                  class="text-xs tracking-wide uppercase font-semibold"
                >
                  تاريخ الانتهاء
                </label>
                <input
                  id="cc-expiry"
                  type="text"
                  class=" h-8 focus:outline-none"
                  placeholder="MM / YYYY"
                />
              </div>
            </div>

            <button class="text-success h-16 w-full rounded-sm bg-dark tracking-wide font-semibold  hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600">
              pay now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPayment;
