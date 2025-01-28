import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  courseUrl: string;
}

export interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}