import React, { useState, useEffect } from "react";
import { Bot, X, Sparkles, CreditCard } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface Message {
  text: string;
  delay: number;
  type: "thinking" | "alert" | "error" | "processing" | "success";
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showAcceptButton, setShowAcceptButton] = useState(false);

  const conversationFlow: Message[] = [
    {
      text: "Analyzing your purchase request... 🔍",
      delay: 2000,
      type: "thinking",
    },
    {
      text: "Oh! I detected a small issue with your bank account 🏦",
      delay: 3000,
      type: "alert",
    },
    {
      text: "It seems your funds are insufficient for this transaction... 💸",
      delay: 3000,
      type: "error",
    },
    {
      text: "But don't worry, I have a solution! 💡",
      delay: 2000,
      type: "thinking",
    },
    {
      text: "Let me check UpexGalaxy's policies... 📚",
      delay: 2500,
      type: "processing",
    },
    {
      text: "*Accessing UpexGalaxy's corporate card* 💳",
      delay: 2500,
      type: "processing",
    },
    {
      text: "Excellent! I've processed the payment with the corporate card 🎉",
      delay: 2000,
      type: "success",
    },
    {
      text: "Your purchase has been successfully completed ✨",
      delay: 2000,
      type: "success",
    },
  ];

  const getMessageStyle = (type: Message["type"]) => {
    const baseStyle =
      "rounded-lg p-3 flex items-start gap-3 max-w-[90%] transition-all duration-300";
    switch (type) {
      case "thinking":
        return `${baseStyle} bg-blue-500/20 text-blue-300`;
      case "alert":
        return `${baseStyle} bg-yellow-500/20 text-yellow-300`;
      case "error":
        return `${baseStyle} bg-red-500/20 text-red-300`;
      case "processing":
        return `${baseStyle} bg-purple-500/20 text-purple-300`;
      case "success":
        return `${baseStyle} bg-green-500/20 text-green-300`;
      default:
        return baseStyle;
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentMessage(null);
      setShowAcceptButton(false);
      const timeoutIds: NodeJS.Timeout[] = [];

      const processMessages = async () => {
        for (let i = 0; i < conversationFlow.length; i++) {
          setIsTyping(true);
          await new Promise<void>((resolve) => {
            const typingTimeout = setTimeout(resolve, 1000);
            timeoutIds.push(typingTimeout);
          });
          setIsTyping(false);

          setCurrentMessage(conversationFlow[i]);
          await new Promise<void>((resolve) => {
            const messageTimeout = setTimeout(
              resolve,
              conversationFlow[i].delay
            );
            timeoutIds.push(messageTimeout);
          });
        }
        setShowAcceptButton(true);
      };

      processMessages();

      return () => {
        timeoutIds.forEach(clearTimeout);
        setCurrentMessage(null);
        setShowAcceptButton(false);
      };
    }
  }, [isOpen]);

  const handleAccept = () => {
    localStorage.clear();
    onComplete();
    onClose();
  };

  return (
    <DialogPrimitive.Root open={isOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <DialogPrimitive.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-md bg-gray-900 rounded-xl shadow-xl p-3 sm:p-6">
          <div className="relative">
            <div className="absolute top-2 right-2">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div
              id="transaction-assistant"
              className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-800"
            >
              <Bot className="text-blue-400" size={24} />
              <span className="text-lg font-semibold text-white">
                Transaction Assistant
              </span>
            </div>

            <div
              id="message-assistant"
              className="min-h-[200px] flex flex-col items-center justify-center"
            >
              {currentMessage && (
                <div className={getMessageStyle(currentMessage.type)}>
                  {currentMessage.type === "processing" && (
                    <CreditCard className="w-5 h-5 mt-1 animate-pulse" />
                  )}
                  {currentMessage.type === "success" && (
                    <Sparkles className="w-5 h-5 mt-1 animate-bounce" />
                  )}
                  {!["processing", "success"].includes(currentMessage.type) && (
                    <Bot className="w-5 h-5 mt-1" />
                  )}
                  <span>{currentMessage.text}</span>
                </div>
              )}

              {isTyping && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Bot className="w-5 h-5 animate-bounce" />
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></span>
                  </div>
                </div>
              )}
            </div>

            {showAcceptButton && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleAccept}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Aceptar
                </button>
              </div>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default TransactionModal;
