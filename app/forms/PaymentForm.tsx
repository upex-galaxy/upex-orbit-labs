import { useState } from 'react';
import { Card } from "@/components/ui/orbit-labs/card";
import { PaymentMethod, PaymentFormProps } from '../../app/types/checkout';
import { CARD_TYPES } from '../../app/utils/constants';
import { useFormValidation } from './useFormValidation';

export const PaymentForm = ({ initialData, onSubmit, onCancel }: PaymentFormProps) => {
  const { validateCardNumber, validateCardHolder, errors, setErrors } = useFormValidation();

  const [formData, setFormData] = useState<PaymentMethod>(
    initialData || {
      cardType: CARD_TYPES[0],
      cardNumber: "",
      cardHolder: "",
      petName: ""
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      cardNumber: !validateCardNumber(formData.cardNumber),
      cardHolder: !validateCardHolder(formData.cardHolder)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <Card className="w-96 bg-gray-800 p-6">
        <h3 className="text-xl font-bold text-white mb-4">Add Payment Method</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <select
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={formData.cardType}
              onChange={(e) => setFormData({ ...formData, cardType: e.target.value })}
              required
            >
              {CARD_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="text"
              placeholder="Card Number"
              className={`w-full p-2 rounded ${
                errors.cardNumber
                  ? "bg-red-200 text-red-900 border-red-500"
                  : "bg-gray-700 text-white"
              }`}
              value={formData.cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 16) {
                  setFormData({ ...formData, cardNumber: value });
                  setErrors({ ...errors, cardNumber: !validateCardNumber(value) });
                }
              }}
              maxLength={16}
              required
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">Invalid card number</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Cardholder Name"
              className={`w-full p-2 rounded ${
                errors.cardHolder
                  ? "bg-red-200 text-red-900 border-red-500"
                  : "bg-gray-700 text-white"
              }`}
              value={formData.cardHolder}
              onChange={(e) => {
                const value = e.target.value;
                if (validateCardHolder(value)) {
                  setFormData({ ...formData, cardHolder: value });
                  setErrors({ ...errors, cardHolder: false });
                }
              }}
              required
            />
            {errors.cardHolder && (
              <p className="text-red-500 text-sm mt-1">Only letters allowed</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Pet Name"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={formData.petName}
              onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
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