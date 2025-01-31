"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { BuyerInfoForm } from "../types/checkout";
import { useLanguage } from "../../app/context/LanguageContext";

export const BuyerForm: React.FC<BuyerInfoForm> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        country: initialData.country || "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormEmpty = Object.values(formData).every(value => value === "");
    if (isFormEmpty) {
      onSubmit({
        firstName: t('forms.buyerForm.defaults.firstName'),
        lastName: t('forms.buyerForm.defaults.lastName'),
        email: t('forms.buyerForm.defaults.email'),
        phone: t('forms.buyerForm.defaults.phone'),
        country: t('forms.buyerForm.defaults.country')
      });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">
          {initialData 
            ? t('forms.buyerForm.title.edit')
            : t('forms.buyerForm.title.add')
          }
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={t('forms.buyerForm.placeholders.firstName')}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={t('forms.buyerForm.placeholders.lastName')}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('forms.buyerForm.placeholders.email')}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('forms.buyerForm.placeholders.phone')}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder={t('forms.buyerForm.placeholders.country')}
              className="w-full p-2 bg-gray-700 text-white rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
            >
              {t('forms.buyerForm.buttons.cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {initialData 
                ? t('forms.buyerForm.buttons.submit.edit')
                : t('forms.buyerForm.buttons.submit.add')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};