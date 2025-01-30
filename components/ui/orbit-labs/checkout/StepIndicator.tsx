import { StepIndicatorProps } from "../../../../app/types/checkout";

export const StepIndicator = ({
  steps,
  currentStep,
  onStepClick,
  allowNavigation = true,
}: StepIndicatorProps) => (
  <div className="flex justify-between mb-8">
    {steps.map((step, index) => {
      const isClickable =
        allowNavigation && step.isCompleted && index !== currentStep;

      return (
        <div
          key={index}
          onClick={() => isClickable && onStepClick?.(index)}
          id={`step-${index}`}
          className={`
            w-full text-center p-6 
            ${
              currentStep === index
                ? "flex-1 bg-blue-500 text-white text-sm sm:text-lg px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                : step.isCompleted
                ? "flex-1 bg-green-600 text-white text-base sm:text-lg px-4 py-2 rounded hover:bg-green-600 transition-colors"
                : "flex-1 bg-gray-700 text-gray-300 text-base sm:text-lg px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            }
            ${
              isClickable ? "cursor-pointer hover:opacity-90" : "cursor-default"
            }
            transition-all duration-200
          `}
        >
          {step.title}
        </div>
      );
    })}
  </div>
);
