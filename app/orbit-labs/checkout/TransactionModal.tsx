import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Brain, Rat, CreditCard, X } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { TransactionModalProps } from '../../../lib/utils';

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProgressing, setIsProgressing] = useState(false);

  const steps = [
    {
      text: "Validating data...",
      icon: <Brain className="animate-bounce" />,
      delay: 3000,
      className: "text-yellow-500"
    },
    {
      text: "Hmm... something suspicious here 🤔",
      icon: <AlertCircle className="animate-pulse" />,
      delay: 5000,
      className: "text-orange-500"
    },
    {
      text: "processing purchase... ❌ insufficient funds",
      icon: <Rat className="animate-spin" />,
      delay: 3000,
      className: "text-red-500"
    },
    {
      text: "Adding payment to UpexGalaxy corporate card, please wait...",
      icon: <CreditCard className="animate-pulse" />,
      delay: 5000,
      className: "text-blue-500"
    },
    {
      text: "Purchase successful!",
      icon: <CheckCircle2 className="animate-bounce" />,
      delay: 6000,
      className: "text-green-500"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsProgressing(true);
      
      let totalDelay = 0;
      const progressSteps = steps.map((step, index) => {
        const currentDelay = totalDelay;
        totalDelay += step.delay;
        
        return setTimeout(() => {
          setCurrentStep(index);
          
          if (index === steps.length - 1) {
            setTimeout(() => {
              setIsProgressing(false);
              onClose();
            }, step.delay);
          }
        }, currentDelay);
      });

      return () => {
        progressSteps.forEach(clearTimeout);
      };
    }
  }, [isOpen, onClose]);

  const handleCancel = () => {
    if (!isProgressing) {
      onClose();
    }
  };

  return (
    <DialogPrimitive.Root 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open && !isProgressing) {
          onClose();
        }
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
          // Prevent closing when clicking outside
          onClick={(e) => e.preventDefault()}
        />
        <DialogPrimitive.Content 
          className="bg-gray-900 text-white p-8 max-w-md w-full mx-auto fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg shadow-xl"
          // Prevent closing on Escape key when progressing
          onEscapeKeyDown={(e) => {
            if (isProgressing) {
              e.preventDefault();
            }
          }}
        >
          <div className="space-y-4 relative">
            {/* Cancel button */}
            {!isProgressing && (
              <button 
                onClick={handleCancel}
                className="absolute -top-2 -right-2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            )}

            {steps.map((step, index) => (
              <div
                key={index}
                className={`transition-all duration-500 flex items-center gap-3 
                  ${index === currentStep ? 'opacity-100 transform scale-100' : 
                    index < currentStep ? 'opacity-50 transform scale-95' : 'opacity-0 transform scale-90'}`}
              >
                <span className={step.className}>{step.icon}</span>
                <span className={`text-lg ${step.className}`}>{step.text}</span>
              </div>
            ))}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default TransactionModal;