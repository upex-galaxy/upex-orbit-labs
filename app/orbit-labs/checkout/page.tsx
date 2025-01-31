"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../app/context/LanguageContext";
import TransactionModal from "./TransactionModal";
import { StepIndicator } from "../../../components/ui/orbit-labs/checkout/StepIndicator";
import { BuyerForm } from "../../forms/BuyerForm";
import { PaymentForm } from "../../forms/PaymentForm";
import { OrderSummary } from "../../../components/ui/orbit-labs/checkout/OrderSummary";
import { Product } from "../../../lib/utils";
import productsData from "../../../app/data/products.json";
import { Pencil, Trash2 } from "lucide-react";
import {
  BuyerInfo as BuyerFormPropsForm,
  PaymentMethod,
} from "../../types/checkout";
import { CHECKOUT_STEPS } from "../../../app/utils/constants";
import { Step } from "../../types/checkout";

interface ProductsData {
  english: Product[];
  spanish: Product[];
}

const PRODUCTS_DATA: ProductsData = productsData;

export default function Checkout() {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [currentStep, setCurrentStep] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [steps, setSteps] = useState<Step[]>(
    CHECKOUT_STEPS.map(step => ({
      ...step,
      title: t(step.title)
    }))
  );
  
  const [buyerInfo, setBuyerInfo] = useState<BuyerFormPropsForm[]>([]);
  const [selectedBuyerIndex, setSelectedBuyerIndex] = useState<number>(-1);
  const [editingBuyer, setEditingBuyer] = useState<BuyerFormPropsForm | null>(
    null
  );
  useEffect(() => {
    setSteps(CHECKOUT_STEPS.map(step => ({
      ...step,
      title: t(step.title)
    })));
  }, [language, t]);
  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState<number>(-1);
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(
    null
  );

  useEffect(() => {
    const loadCartItems = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const cartIds = new Set(JSON.parse(savedCart));
        const PRODUCTS =
          language === "en" ? PRODUCTS_DATA.english : PRODUCTS_DATA.spanish;
        const items = PRODUCTS.filter((product) => cartIds.has(product.id));
        setCartItems(items);

        const total = items.reduce((sum, item) => sum + item.price, 0);
        setTotalAmount(total);
      } else {
        router.push("/orbit-labs/products");
      }
    };

    loadCartItems();
  }, [language, router]);

  const handleCloseModal = () => {
    setShowTransactionModal(false);
  };

  const handleCompleteTransaction = () => {
    localStorage.removeItem("cart");
    router.push("/orbit-labs/products");
  };

  const handleContinueShopping = () => {
    router.push("/orbit-labs/products");
  };

  const updateStepCompletion = (stepIndex: number, completed: boolean) => {
    const newSteps = steps.map((step, index) => 
      index === stepIndex ? { ...step, isCompleted: completed } : step
    ) as Step[];
    setSteps(newSteps);
  };

  const handleStepClick = (stepIndex: number) => {
    if (steps[stepIndex].isCompleted) {
      setCurrentStep(stepIndex);
    }
  };

  const handleContinueToPayment = () => {
    if (buyerInfo.length > 0 && selectedBuyerIndex !== -1) {
      updateStepCompletion(0, true);
      setCurrentStep(1);
    }
  };

  const handleContinueToConfirmation = () => {
    if (paymentMethods.length > 0 && selectedPaymentIndex !== -1) {
      updateStepCompletion(1, true);
      setCurrentStep(2);
    }
  };

  const handleRemoveBuyer = (index: number) => {
    const newBuyerInfo = buyerInfo.filter((_, i) => i !== index);
    setBuyerInfo(newBuyerInfo);
    if (selectedBuyerIndex === index) {
      setSelectedBuyerIndex(-1);
    } else if (selectedBuyerIndex > index) {
      setSelectedBuyerIndex(selectedBuyerIndex - 1);
    }
  };

  const handleEditBuyer = (buyer: BuyerFormPropsForm) => {
    setEditingBuyer(buyer);
    setShowBuyerForm(true);
  };

  const handleRemovePayment = (index: number) => {
    const newPaymentMethods = paymentMethods.filter((_, i) => i !== index);
    setPaymentMethods(newPaymentMethods);
    if (selectedPaymentIndex === index) {
      setSelectedPaymentIndex(-1);
    } else if (selectedPaymentIndex > index) {
      setSelectedPaymentIndex(selectedPaymentIndex - 1);
    }
  };

  const handleEditPayment = (payment: PaymentMethod) => {
    setEditingPayment(payment);
    setShowPaymentForm(true);
  };

  const handleBuyerFormSubmit = (data: BuyerFormPropsForm) => {
    if (editingBuyer) {
      const newBuyerInfo = [...buyerInfo];
      const index = buyerInfo.indexOf(editingBuyer);
      newBuyerInfo[index] = data;
      setBuyerInfo(newBuyerInfo);
    } else {
      setBuyerInfo([...buyerInfo, data]);
      setSelectedBuyerIndex(buyerInfo.length);
    }
    setShowBuyerForm(false);
    setEditingBuyer(null);
  };

  const handlePaymentFormSubmit = (data: PaymentMethod) => {
    if (editingPayment) {
      const newPaymentMethods = [...paymentMethods];
      const index = paymentMethods.indexOf(editingPayment);
      newPaymentMethods[index] = data;
      setPaymentMethods(newPaymentMethods);
    } else {
      setPaymentMethods([...paymentMethods, data]);
      setSelectedPaymentIndex(paymentMethods.length);
    }
    setShowPaymentForm(false);
    setEditingPayment(null);
  };

  return (
    <div className="min-h-screen p-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
          allowNavigation={
            currentStep !== 2 || (steps[0].isCompleted && steps[1].isCompleted)
          }
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {currentStep === 0 && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t("pages.checkout.steps.0.title")}
                </h3>
                <div className="space-y-4 mb-6">
                  {buyerInfo.map((info, index) => (
                    <div
                      key={index}
                      className={`p-4 bg-gray-700 rounded relative transition-all
                        ${
                          selectedBuyerIndex === index
                            ? "ring-2 ring-blue-500"
                            : "hover:bg-gray-600"
                        }
                        cursor-pointer`}
                      onClick={() => setSelectedBuyerIndex(index)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white">{`${info.firstName} ${info.lastName}`}</p>
                          <p className="text-gray-300">{info.email}</p>
                          <p className="text-gray-300">{info.phone}</p>
                          <p className="text-gray-300">{info.country}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditBuyer(info);
                            }}
                            className="p-1 hover:bg-gray-500 rounded"
                          >
                            <Pencil className="h-4 w-4 text-gray-300" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveBuyer(index);
                            }}
                            className="p-1 hover:bg-gray-500 rounded"
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setEditingBuyer(null);
                      setShowBuyerForm(true);
                    }}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    {t("pages.checkout.steps.0.buttons.addNewBuyer")}
                  </button>
                  {buyerInfo.length > 0 && selectedBuyerIndex !== -1 && (
                    <button
                      onClick={handleContinueToPayment}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      {t("pages.checkout.steps.0.buttons.continueToPayment")}
                    </button>
                  )}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t("pages.checkout.steps.1.title")}
                </h3>
                <div className="space-y-4 mb-6">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      className={`p-4 bg-gray-700 rounded relative transition-all
                        ${
                          selectedPaymentIndex === index
                            ? "ring-2 ring-blue-500"
                            : "hover:bg-gray-600"
                        }
                        cursor-pointer`}
                      onClick={() => setSelectedPaymentIndex(index)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-medium">
                            {method.cardType}
                          </p>
                          <p className="text-gray-300">
                            {t("forms.paymentForm.placeholders.cardNumber")}:{" "}
                            {method.cardNumber.slice(-4)}
                          </p>
                          <p className="text-gray-300">{method.cardHolder}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditPayment(method);
                            }}
                            className="p-1 hover:bg-gray-500 rounded"
                          >
                            <Pencil className="h-4 w-4 text-gray-300" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemovePayment(index);
                            }}
                            className="p-1 hover:bg-gray-500 rounded"
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setEditingPayment(null);
                      setShowPaymentForm(true);
                    }}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    {t("pages.checkout.steps.1.buttons.addPaymentMethod")}
                  </button>
                  {paymentMethods.length > 0 && selectedPaymentIndex !== -1 && (
                    <button
                      onClick={handleContinueToConfirmation}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      {t(
                        "pages.checkout.steps.1.buttons.continueToConfirmation"
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t("pages.checkout.steps.2.title")}
                </h3>
                <div className="space-y-6">
                  {selectedBuyerIndex !== -1 && (
                    <div>
                      <h4 className="text-xl text-white mb-2">
                        {t("forms.buyerForm.title.edit")}
                      </h4>
                      <div className="p-4 bg-gray-700 rounded">
                        <p className="text-white">
                          {`${buyerInfo[selectedBuyerIndex].firstName} ${buyerInfo[selectedBuyerIndex].lastName}`}
                        </p>
                        <p className="text-gray-300">
                          {buyerInfo[selectedBuyerIndex].email}
                        </p>
                        <p className="text-gray-300">
                          {buyerInfo[selectedBuyerIndex].phone}
                        </p>
                        <p className="text-gray-300">
                          {buyerInfo[selectedBuyerIndex].country}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedPaymentIndex !== -1 && (
                    <div>
                      <h4 className="text-xl text-white mb-2">
                        {t("pages.checkout.steps.1.title")}
                      </h4>
                      <div className="p-4 bg-gray-700 rounded">
                        <p className="text-white font-medium">
                          {paymentMethods[selectedPaymentIndex].cardType}
                        </p>
                        <p className="text-gray-300">
                          {t("forms.paymentForm.placeholders.cardNumber")}:{" "}
                          {paymentMethods[
                            selectedPaymentIndex
                          ].cardNumber.slice(-4)}
                        </p>
                        <p className="text-gray-300">
                          {paymentMethods[selectedPaymentIndex].cardHolder}
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    onClick={() => setShowTransactionModal(true)}
                  >
                    {t("pages.checkout.steps.2.buttons.confirmOrder")}
                  </button>
                </div>
              </div>
            )}
          </div>

          <OrderSummary
            cartItems={cartItems.map(item => item.id)}
            total={totalAmount}
            onContinueShopping={handleContinueShopping}
          />
        </div>
      </div>

      {showBuyerForm && (
        <BuyerForm
          initialData={editingBuyer || undefined}
          onSubmit={handleBuyerFormSubmit}
          onCancel={() => {
            setShowBuyerForm(false);
            setEditingBuyer(null);
          }}
        />
      )}

      {showPaymentForm && (
        <PaymentForm
          initialData={editingPayment}
          onSubmit={handlePaymentFormSubmit}
          onCancel={() => {
            setShowPaymentForm(false);
            setEditingPayment(null);
          }}
        />
      )}

      <TransactionModal
        isOpen={showTransactionModal}
        onClose={handleCloseModal}
        onComplete={handleCompleteTransaction}
      />
    </div>
  );
}
