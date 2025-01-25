"use client";

import { useState } from "react";
import TextBox from "@/components/ui/text-box";

interface FormData {
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}

interface FormErrors {
  email?: string;
}

export default function TextBoxPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    currentAddress: "",
    permanentAddress: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.email.includes("@")) {
      newErrors.email = "Please include an '@' in the email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedData(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Text Box Practice UPEX</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextBox
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          type="text"
          placeholder="Full Name"
          autoComplete="off"
          id="userName"
        />

        <TextBox
          placeholder="Email"
          id="email"
          autoComplete="off"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <TextBox
          placeholder="Current Address"
          id="currentAddress"
          autoComplete="off"
          label="Current Address"
          name="currentAddress"
          value={formData.currentAddress}
          onChange={handleChange}
          isTextArea
        />

        <TextBox
          placeholder="Permanent Address"
          id="permanentAddress"
          autoComplete="off"
          label="Permanent Address"
          name="permanentAddress"
          value={formData.permanentAddress}
          onChange={handleChange}
          isTextArea
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="mt-8 p-6 border rounded bg-blue-900 text-white space-y-3">
          <h2 className="text-xl font-semibold mb-4">Form Submission</h2>
          <p>
            <span className="font-medium">Name:</span> {submittedData.fullName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {submittedData.email}
          </p>
          <p className="truncate">
            <span className="font-medium">Current Address:</span>{" "}
            {submittedData.currentAddress}
          </p>
          <p className="truncate">
            <span className="font-medium">Permanent Address:</span>{" "}
            {submittedData.permanentAddress}
          </p>
        </div>
      )}
    </div>
  );
}
