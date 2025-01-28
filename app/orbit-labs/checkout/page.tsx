"use client";

import TransactionModal from "./TransactionModal";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/orbit-labs/card";
import Image from "next/image";
import productsData from "../../../app/data/products.json";

interface CheckoutStep {
  title: string;
  isCompleted: boolean;
}

interface PaymentMethod {
  cardType: string;
  cardNumber: string;
  cardHolder: string;
  petName: string;
}

const CARD_TYPES = [
  "Visa",
  "MasterCard",
  "Visa Debit",
  "Maestro",
  "American Express",
  "Upex Gold Member",
];

export default function CheckoutPage() {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const steps: CheckoutStep[] = [
    { title: "Buyer Information", isCompleted: false },
    { title: "Payment Method", isCompleted: false },
    { title: "Confirmation", isCompleted: false },
  ];

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(Array.from(items));
      calculateTotal(Array.from(items));
    }
  }, []);

  const calculateTotal = (items: string[]) => {
    const sum = items.reduce((acc, id) => {
      const product = productsData.find((p) => p.id === id);
      return acc + (product?.price || 0);
    }, 0);
    setTotal(sum);
  };

  const PaymentForm = () => {
    const [cardNumberError, setCardNumberError] = useState(false);
    const [cardHolderError, setCardHolderError] = useState(false);
    const [formData, setFormData] = useState<PaymentMethod>({
      cardType: CARD_TYPES[0],
      cardNumber: "",
      cardHolder: "",
      petName: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setPaymentMethods([...paymentMethods, formData]);
      setShowPaymentForm(false);
      steps[1].isCompleted = true;
      setCurrentStep(2);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <Card className="w-96 bg-gray-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Add Payment Method
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <select
                className="w-full p-2 rounded bg-gray-700 text-white"
                value={formData.cardType}
                onChange={(e) =>
                  setFormData({ ...formData, cardType: e.target.value })
                }
                required
              >
                {CARD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="text"
                placeholder="Card Number"
                className={`w-full p-2 rounded ${
                  cardNumberError
                    ? "bg-red-200 text-red-900 border-red-500"
                    : "bg-gray-700 text-white"
                }`}
                value={formData.cardNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  const isValid = /^\d{0,16}$/.test(value);
                  setCardNumberError(!isValid);
                  if (isValid) {
                    setFormData({ ...formData, cardNumber: value });
                  }
                }}
                maxLength={16}
                required
              />
              {cardNumberError && (
                <p className="text-red-500 text-sm mt-1">Invalid card number</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Cardholder Name"
                className={`w-full p-2 rounded ${
                  cardHolderError
                    ? "bg-red-200 text-red-900 border-red-500"
                    : "bg-gray-700 text-white"
                }`}
                value={formData.cardHolder}
                onChange={(e) => {
                  const value = e.target.value;
                  const nameRegex = /^[A-Za-z\s]*$/;
                  setCardHolderError(!nameRegex.test(value));
                  if (nameRegex.test(value)) {
                    setFormData({ ...formData, cardHolder: value });
                  }
                }}
                required
              />
              {cardHolderError && (
                <p className="text-red-500 text-sm mt-1">
                  Only letters allowed
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Pet Name"
                className="w-full p-2 rounded bg-gray-700 text-white"
                value={formData.petName}
                onChange={(e) =>
                  setFormData({ ...formData, petName: e.target.value })
                }
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowPaymentForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </form>
        </Card>
      </div>
    );
  };

  const BuyerForm = () => {
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [countryError, setCountryError] = useState(false);

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setBuyerInfo([...buyerInfo, formData]);
      setShowBuyerForm(false);
      steps[0].isCompleted = true;
      setCurrentStep(1);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <Card className="w-96 bg-gray-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            Add Buyer Information
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                className={`w-full p-2 rounded ${
                  nameError
                    ? "bg-red-200 text-red-900 border-red-500"
                    : "bg-gray-700 text-white"
                }`}
                value={formData.firstName}
                onChange={(e) => {
                  const value = e.target.value;
                  const nameRegex = /^[A-Za-z\s]*$/;
                  setNameError(!nameRegex.test(value));
                  if (nameRegex.test(value)) {
                    setFormData({ ...formData, firstName: value });
                  }
                }}
                onBlur={() => {
                  const nameRegex = /^[A-Za-z\s]*$/;
                  setNameError(!nameRegex.test(formData.firstName));
                }}
                required
              />
              {nameError && (
                <p className="text-red-500 text-sm mt-1">
                  Only letters allowed
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Last Name"
                className={`w-full p-2 rounded ${
                  lastNameError
                    ? "bg-red-200 text-red-900 border-red-500"
                    : "bg-gray-700 text-white"
                }`}
                value={formData.lastName}
                onChange={(e) => {
                  const value = e.target.value;
                  const nameRegex = /^[A-Za-z\s]*$/;
                  setLastNameError(!nameRegex.test(value));
                  if (nameRegex.test(value)) {
                    setFormData({ ...formData, lastName: value });
                  }
                }}
                onBlur={() => {
                  const nameRegex = /^[A-Za-z\s]*$/;
                  setLastNameError(!nameRegex.test(formData.lastName));
                }}
                required
              />
              {lastNameError && (
                <p className="text-red-500 text-sm mt-1">
                  Only letters allowed
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className={`w-full p-2 rounded ${
                  emailError
                    ? "bg-red-200 text-red-900 border-red-500"
                    : "bg-gray-700 text-white"
                }`}
                value={formData.email}
                onChange={(e) => {
                  const email = e.target.value;
                  setFormData({ ...formData, email });
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  setEmailError(!emailRegex.test(email));
                }}
                onBlur={() => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  setEmailError(!emailRegex.test(formData.email));
                }}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">
                  Invalid email format
                </p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className={`w-full p-2 rounded ${
                  phoneError
                    ? "bg-red-200 text-red-900 border-red-500"
                    : "bg-gray-700 text-white"
                }`}
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  const phoneRegex = /^[0-9]*$/;
                  setPhoneError(!phoneRegex.test(value));
                  if (phoneRegex.test(value) && value.length <= 10) {
                    setFormData({ ...formData, phone: value });
                  }
                }}
                maxLength={10}
                required
              />
              {phoneError && (
                <p className="text-red-500 text-sm mt-1">
                  Only numbers allowed
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Country"
                className={`w-full p-2 rounded ${
                  countryError
                    ? "bg-red-200 text-red-900 border-red-500"
                    : "bg-gray-700 text-white"
                }`}
                value={formData.country}
                onChange={(e) => {
                  const value = e.target.value;
                  const countryRegex = /^[A-Za-z\s]*$/;
                  setCountryError(!countryRegex.test(value));
                  if (countryRegex.test(value)) {
                    setFormData({ ...formData, country: value });
                  }
                }}
                onBlur={() => {
                  const countryRegex = /^[A-Za-z\s]*$/;
                  setCountryError(!countryRegex.test(formData.country));
                }}
                required
              />
              {countryError && (
                <p className="text-red-500 text-sm mt-1">
                  Only letters allowed
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowBuyerForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </form>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 text-center p-4 ${
                currentStep === index
                  ? "bg-blue-500 text-white"
                  : step.isCompleted
                  ? "bg-green-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {step.title}
            </div>
          ))}
        </div>

        <div className="flex gap-8">
          <div className="flex-1">
            {currentStep === 0 && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Buyer Information
                </h2>
                {buyerInfo.map((info, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-700 rounded">
                    <p className="text-white">{`${info.firstName} ${info.lastName}`}</p>
                    <p className="text-gray-300">{info.email}</p>
                    <p className="text-gray-300">{info.phone}</p>
                    <p className="text-gray-300">{info.country}</p>
                  </div>
                ))}
                <button
                  onClick={() => setShowBuyerForm(true)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add New Buyer
                </button>
              </div>
            )}

            {currentStep === 1 && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Payment Methods
                </h2>
                {paymentMethods.map((method, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-700 rounded">
                    <p className="text-white font-medium">{method.cardType}</p>
                    <p className="text-gray-300">
                      Card ending in {method.cardNumber.slice(-4)}
                    </p>
                    <p className="text-gray-300">{method.cardHolder}</p>
                    <p className="text-gray-300">Pet: {method.petName}</p>
                  </div>
                ))}
                <button
                  onClick={() => setShowPaymentForm(true)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Payment Method
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Order Confirmation
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl text-white mb-2">
                      Buyer Information
                    </h3>
                    {buyerInfo.map((info, index) => (
                      <div key={index} className="mb-4 p-4 bg-gray-700 rounded">
                        <p className="text-white">{`${info.firstName} ${info.lastName}`}</p>
                        <p className="text-gray-300">{info.email}</p>
                        <p className="text-gray-300">{info.phone}</p>
                        <p className="text-gray-300">{info.country}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-2">Payment Method</h3>
                    {paymentMethods.map((method, index) => (
                      <div key={index} className="mb-4 p-4 bg-gray-700 rounded">
                        <p className="text-white font-medium">
                          {method.cardType}
                        </p>
                        <p className="text-gray-300">
                          Card ending in {method.cardNumber.slice(-4)}
                        </p>
                        <p className="text-gray-300">{method.cardHolder}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => setShowTransactionModal(true)}
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="w-96">
            <Card className="bg-gray-800">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Order Summary
                </h2>
                {cartItems.map((id) => {
                  const product = productsData.find((p) => p.id === id);
                  if (!product) return null;

                  return (
                    <div key={id} className="flex items-center mb-4">
                      <div className="relative h-16 w-16 mr-4">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          style={{ objectFit: "cover" }}
                          className="rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{product.name}</p>
                        <p className="text-gray-300">${product.price}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="border-t border-gray-700 mt-4 pt-4">
                  <div className="flex justify-between text-white">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {showBuyerForm && <BuyerForm />}
      {showPaymentForm && <PaymentForm />}
      <TransactionModal
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
      />
    </div>
  );
}
