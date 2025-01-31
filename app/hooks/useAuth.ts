import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginFormData, LoginError } from "../types/auth";
import { AUTH_MESSAGES } from "../utils/constants";

export const useAuth = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const validateCredentials = (data: LoginFormData): LoginError | null => {
    const { username, password } = data;

    if (!username && !password)
      return { message: AUTH_MESSAGES.MISSING_CREDENTIALS };
    if (!username) return { message: AUTH_MESSAGES.MISSING_USERNAME };
    if (!password) return { message: AUTH_MESSAGES.MISSING_PASSWORD };

    return null;
  };

  const handleSession = () => {
    if (typeof window !== "undefined") {
      const loginTime = new Date().getTime();
      localStorage.setItem("loginTime", loginTime.toString());
      const sessionDuration = 20 * 60 * 1000; 

      const checkSession = () => {
        const storedTime = localStorage.getItem("loginTime");
        if (storedTime && new Date().getTime() - Number(storedTime) > sessionDuration) {
          localStorage.clear(); 
          router.push("/orbit-labs"); 
        }
      };

      const intervalId = setInterval(checkSession, 60 * 1000); 

      return () => clearInterval(intervalId);
    }
  };

  const login = (data: LoginFormData) => {
    const validationError = validateCredentials(data);
    if (validationError) {
      setError(validationError.message);
      return;
    }

    const lowerCaseUsername = data.username.toLowerCase();

    if (lowerCaseUsername === "admin" && data.password === "upex2025") {
      try {
        if (typeof window !== "undefined") {
          localStorage.clear(); 
          handleSession(); 
          router.push("/orbit-labs/inventory"); 
        }
      } catch (error) {
        console.error("Error en login:", error);
      }
      return;
    }

    if (lowerCaseUsername === "admin" && data.password === "admin") {
      setError(AUTH_MESSAGES.INVALID_CREDENTIALS);
      return;
    }

    const customMessage =
      AUTH_MESSAGES.CUSTOM_MESSAGES[
        lowerCaseUsername as keyof typeof AUTH_MESSAGES.CUSTOM_MESSAGES
      ];
    if (customMessage) {
      setError(customMessage);
      return;
    }

    if (lowerCaseUsername === "admin") {
      setError(AUTH_MESSAGES.USER_LOCKED);
      return;
    }

    setError(AUTH_MESSAGES.INVALID_CREDENTIALS);
  };

  return { login, error };
};