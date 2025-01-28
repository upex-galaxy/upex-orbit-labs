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
          className={`
            flex-1 text-center p-4 
            ${
              currentStep === index
                ? "bg-blue-500 text-white"
                : step.isCompleted
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-gray-300"
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
