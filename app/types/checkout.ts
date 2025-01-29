export interface CheckoutStep {
  title: string;
  isCompleted: boolean;
}

export type PaymentFormProps = {
  initialData: PaymentMethod | null;
  onSubmit: (data: PaymentMethod) => void;
  onCancel: () => void;
};

export interface PaymentMethod {

  cardType: string;

  cardNumber: string;

  cardHolder: string;

  petName: string;

}

export interface BuyerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
}


export interface StepIndicatorProps {
  steps: CheckoutStep[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  allowNavigation?: boolean;
}

export type BuyerFormProps = {

  initialData: BuyerInfo | null;

  onSubmit: (data: BuyerInfo) => void;

  onCancel: () => void;

};

export interface BuyerFormPropsForm {

  initialData?: BuyerInfo | null;

  onSubmit: (data: BuyerInfo) => void;

  onCancel: () => void;

}
export interface BuyerInfoForm {
  initialData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
  };
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
  }) => void;
  onCancel: () => void;
}