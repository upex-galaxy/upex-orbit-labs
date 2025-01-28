import { useState } from 'react';
import { Card } from "@/components/ui/orbit-labs/card";
import { BuyerInfo,BuyerFormProps } from '../../app/types/checkout';
import { useFormValidation } from './useFormValidation';

export const BuyerForm = ({ onSubmit, onCancel }: BuyerFormProps) => {
    const {
      validateName,
      validateEmail,
      validatePhone,
      errors,
      setErrors
    } = useFormValidation();
  
    const [formData, setFormData] = useState<BuyerInfo>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: ""
    });
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validar todos los campos
      const newErrors = {
        firstName: !validateName(formData.firstName),
        lastName: !validateName(formData.lastName),
        email: !validateEmail(formData.email),
        phone: !validatePhone(formData.phone),
        country: !validateName(formData.country)
      };
  
      setErrors(newErrors);
  
      if (Object.values(newErrors).every(error => !error)) {
        onSubmit(formData);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <Card className="w-96 bg-gray-800 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Add Buyer Information</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="First Name"
                className={`w-full p-2 rounded ${
                  errors.firstName
                    ? "bg-red-200 text-red-900 border-red-500"
                    : "bg-gray-700 text-white"
                }`}
                value={formData.firstName}
                onChange={(e) => {
                  const value = e.target.value;
                  if (validateName(value)) {
                    setFormData({ ...formData, firstName: value });
                    setErrors({ ...errors, firstName: false });
                  }
                }}
                required
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">Only letters allowed</p>
              )}
            </div>
  
            <div>
              <input
                type="text"
                placeholder="Last Name"
                className={`w-full p-2 rounded ${
                  errors.lastName
                    ? "bg-red-200 text-red-900 border-red-500"
                    : "bg-gray-700 text-white"
                }`}
                value={formData.lastName}
                onChange={(e) => {
                  const value = e.target.value;
                  if (validateName(value)) {
                    setFormData({ ...formData, lastName: value });
                    setErrors({ ...errors, lastName: false });
                  }
                }}
                required
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">Only letters allowed</p>
              )}
            </div>
  
            <div>
              <input
                type="email"
                placeholder="Email"
                className={`w-full p-2 rounded ${
                  errors.email
                    ? "bg-red-200 text-red-900 border-red-500"
                    : "bg-gray-700 text-white"
                }`}
                value={formData.email}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, email: value });
                  setErrors({ ...errors, email: !validateEmail(value) });
                }}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Invalid email format</p>
              )}
            </div>
  
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className={`w-full p-2 rounded ${
                  errors.phone
                    ? "bg-red-200 text-red-900 border-red-500"
                    : "bg-gray-700 text-white"
                }`}
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[0-9]*$/.test(value) && value.length <= 10) {
                    setFormData({ ...formData, phone: value });
                    setErrors({ ...errors, phone: !validatePhone(value) });
                  }
                }}
                maxLength={10}
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">Invalid phone number</p>
              )}
            </div>
  
            <div>
              <input
                type="text"
                placeholder="Country"
                className={`w-full p-2 rounded ${
                  errors.country
                    ? "bg-red-200 text-red-900 border-red-500"
                    : "bg-gray-700 text-white"
                }`}
                value={formData.country}
                onChange={(e) => {
                  const value = e.target.value;
                  if (validateName(value)) {
                    setFormData({ ...formData, country: value });
                    setErrors({ ...errors, country: false });
                  }
                }}
                required
              />
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">Only letters allowed</p>
              )}
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