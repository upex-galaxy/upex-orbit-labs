export const AUTH_MESSAGES = {
  MISSING_CREDENTIALS: "Fail: Username and password are required for login.",
  MISSING_USERNAME: "Fail: Username is required for login.",
  MISSING_PASSWORD: "Fail: Password is required for login.",
  INVALID_CREDENTIALS: "Fail: Invalid username or password.",
  USER_LOCKED: "You are Locked: Sorry, this user has been locked out.",
  CUSTOM_MESSAGES: {
    barbie: "Hola Jefa, no tiene cuenta todavía",
    kenny: "aburrido de lolcito? no tienes usuario acá usa el que te pasaron",
    ely: "Aquí no hay Helado! entra con el otro usuario",
    yeyu: "Hola amor, estoy practicando <3",
  },
} as const;

export const CHECKOUT_STEPS = [
  { title: "pages.checkout.steps.0.title", isCompleted: false },
  { title: "pages.checkout.steps.1.title", isCompleted: false },
  { title: "pages.checkout.steps.2.title", isCompleted: false },
] as const;

export const CARD_TYPES = [
  "Visa",
  "MasterCard",
  "Visa Debit",
  "Maestro",
  "American Express",
  "Upex Gold Member",
] as const;

export const CHECKOUT_MESSAGES = {
  MISSING_CREDENTIALS: "Fail: Username and password are required for login.",
  MISSING_USERNAME: "Fail: Username is required for login.",
  MISSING_PASSWORD: "Fail: Password is required for login.",
  INVALID_CREDENTIALS: "Fail: Invalid username or password.",
  USER_LOCKED: "You are Locked: Sorry, this user has been locked out.",
  CUSTOM_MESSAGES: {
    barbie: "Hola Jefa, no tiene cuenta todavía",
    kenny: "aburrido de lolcito? no tienes usuario acá usa el que te pasaron",
    ely: "Aquí no hay Helado! entra con el otro usuario",
    yeyu: "Hola amor, estoy practicando <3",
  }
} as const;

export const createCheckoutSteps = () => [
  { title: "Buyer Information", isCompleted: false },
  { title: "Payment Method", isCompleted: false },
  { title: "Confirmation", isCompleted: false },
];

export const STORAGE_KEYS = {
  BUYER_INFO: 'orbitlabs_buyer_info',
  PAYMENT_METHODS: 'orbitlabs_payment_methods'
} as const;

const getLocalStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  }
  return defaultValue;
};

export const savedBuyerInfo = getLocalStorageItem(STORAGE_KEYS.BUYER_INFO, []);
export const savedPaymentMethods = getLocalStorageItem(STORAGE_KEYS.PAYMENT_METHODS, []);

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  courseUrl: string;
}