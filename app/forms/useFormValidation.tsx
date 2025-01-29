import { useState } from 'react';

interface ValidationErrors {
  firstName?: boolean;
  lastName?: boolean;
  email?: boolean;
  phone?: boolean;
  country?: boolean;
  cardNumber?: boolean;
  cardHolder?: boolean;
}

export const useFormValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateName = (value: string) => {
    const nameRegex = /^[A-Za-zÀ-ÿ\s]*$/;
    return nameRegex.test(value);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]*$/;
    return phoneRegex.test(phone) && phone.length === 10;
  };

  const validateCardNumber = (number: string) => {
    return /^\d{16}$/.test(number);
  };

  const validateCardHolder = (name: string) => {
    const nameRegex = /^[A-Za-zÀ-ÿ\s]*$/;
    return nameRegex.test(name);
  };

  return {
    errors,
    setErrors,
    validateName,
    validateEmail,
    validatePhone,
    validateCardNumber,
    validateCardHolder
  };
};