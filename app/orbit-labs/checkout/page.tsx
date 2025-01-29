"use client";

import { useState } from 'react';
import { useCheckout } from '../../hooks/useCheckout';
import { createCheckoutSteps } from '../../../app/utils/constants';
import { StepIndicator } from '../../../components/ui/orbit-labs/checkout/StepIndicator';
import { BuyerForm } from '../../forms/BuyerForm';
import { PaymentForm } from '../../forms/PaymentForm';
import { OrderSummary } from '../../../components/ui/orbit-labs/checkout/OrderSummary';
import TransactionModal from "./TransactionModal";
import { Pencil, Trash2 } from 'lucide-react';
import { BuyerInfo as BuyerFormPropsForm, PaymentMethod } from '../../types/checkout';

export default function CheckoutPage() {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [steps, setSteps] = useState(createCheckoutSteps());
  const [selectedBuyerIndex, setSelectedBuyerIndex] = useState<number>(-1);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState<number>(-1);
  const [editingBuyer, setEditingBuyer] = useState<BuyerFormPropsForm | null>(null);
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null);
  
  const {
    currentStep,
    setCurrentStep,
    cartItems,
    total,
    buyerInfo,
    setBuyerInfo,
    paymentMethods,
    setPaymentMethods,
    continueShopping
  } = useCheckout();

  const updateStepCompletion = (stepIndex: number, completed: boolean) => {
    const newSteps = [...steps];
    newSteps[stepIndex].isCompleted = completed;
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

  return (
    <div className="min-h-screen p-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <StepIndicator 
          steps={steps} 
          currentStep={currentStep}
          onStepClick={handleStepClick}
          allowNavigation={currentStep !== 2 || (steps[0].isCompleted && steps[1].isCompleted)}
        />
        
        <div className="flex gap-8">
          <div className="flex-1">
            {currentStep === 0 && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Buyer Information</h2>
                <div className="space-y-4 mb-6">
                  {buyerInfo.map((info, index) => (
                    <div 
                      key={index} 
                      className={`p-4 bg-gray-700 rounded relative transition-all
                        ${selectedBuyerIndex === index ? 'ring-2 ring-blue-500' : 'hover:bg-gray-600'}
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
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add New Buyer
                  </button>
                  {buyerInfo.length > 0 && selectedBuyerIndex !== -1 && (
                    <button
                      onClick={handleContinueToPayment}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Continue to Payment
                    </button>
                  )}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Payment Methods</h2>
                <div className="space-y-4 mb-6">
                  {paymentMethods.map((method, index) => (
                    <div 
                      key={index}
                      className={`p-4 bg-gray-700 rounded relative transition-all
                        ${selectedPaymentIndex === index ? 'ring-2 ring-blue-500' : 'hover:bg-gray-600'}
                        cursor-pointer`}
                      onClick={() => setSelectedPaymentIndex(index)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-medium">{method.cardType}</p>
                          <p className="text-gray-300">Card ending in {method.cardNumber.slice(-4)}</p>
                          <p className="text-gray-300">{method.cardHolder}</p>
                          <p className="text-gray-300">Pet: {method.petName}</p>
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
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Payment Method
                  </button>
                  {paymentMethods.length > 0 && selectedPaymentIndex !== -1 && (
                    <button
                      onClick={handleContinueToConfirmation}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Continue to Confirmation
                    </button>
                  )}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Order Confirmation</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl text-white mb-2">Selected Buyer</h3>
                    {selectedBuyerIndex !== -1 && (
                      <div className="mb-4 p-4 bg-gray-700 rounded">
                        <p className="text-white">
                          {`${buyerInfo[selectedBuyerIndex].firstName} ${buyerInfo[selectedBuyerIndex].lastName}`}
                        </p>
                        <p className="text-gray-300">{buyerInfo[selectedBuyerIndex].email}</p>
                        <p className="text-gray-300">{buyerInfo[selectedBuyerIndex].phone}</p>
                        <p className="text-gray-300">{buyerInfo[selectedBuyerIndex].country}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-2">Selected Payment Method</h3>
                    {selectedPaymentIndex !== -1 && (
                      <div className="mb-4 p-4 bg-gray-700 rounded">
                        <p className="text-white font-medium">
                          {paymentMethods[selectedPaymentIndex].cardType}
                        </p>
                        <p className="text-gray-300">
                          Card ending in {paymentMethods[selectedPaymentIndex].cardNumber.slice(-4)}
                        </p>
                        <p className="text-gray-300">
                          {paymentMethods[selectedPaymentIndex].cardHolder}
                        </p>
                      </div>
                    )}
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

          <OrderSummary
            cartItems={cartItems}
            total={total}
            onContinueShopping={continueShopping}
          />
        </div>
      </div>

      {showBuyerForm && (
        <BuyerForm
          initialData={editingBuyer || undefined}
          onSubmit={(data) => {
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
          }}
          onCancel={() => {
            setShowBuyerForm(false);
            setEditingBuyer(null);
          }}
        />
      )}

      {showPaymentForm && (
        <PaymentForm
          initialData={editingPayment}
          onSubmit={(data) => {
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
          }}
          onCancel={() => {
            setShowPaymentForm(false);
            setEditingPayment(null);
          }}
        />
      )}

      <TransactionModal
        isOpen={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
      />
    </div>
  );
}