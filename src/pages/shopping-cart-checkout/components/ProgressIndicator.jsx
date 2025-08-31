import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ steps, currentStep, onStepClick }) => {
  const getCurrentStepIndex = () => {
    return steps?.findIndex(step => step?.id === currentStep);
  };

  const isStepCompleted = (stepIndex) => {
    return stepIndex < getCurrentStepIndex();
  };

  const isStepActive = (stepId) => {
    return stepId === currentStep;
  };

  const isStepClickable = (stepIndex) => {
    return stepIndex <= getCurrentStepIndex();
  };

  return (
    <div className="w-full">
      {/* Desktop Progress */}
      <div className="hidden md:block">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps?.map((step, index) => (
              <li key={step?.id} className={`relative ${index !== steps?.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                {/* Connector Line */}
                {index !== steps?.length - 1 && (
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={`h-0.5 w-full ${
                      isStepCompleted(index) ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`} />
                  </div>
                )}
                
                {/* Step Button */}
                <button
                  onClick={() => isStepClickable(index) && onStepClick(step?.id)}
                  disabled={!isStepClickable(index)}
                  className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                    isStepActive(step?.id)
                      ? 'bg-primary text-primary-foreground'
                      : isStepCompleted(index)
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-muted text-muted-foreground'
                  } ${
                    isStepClickable(index) ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                >
                  {isStepCompleted(index) ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step?.icon} size={16} />
                  )}
                </button>
                
                {/* Step Label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className={`text-sm font-medium ${
                    isStepActive(step?.id) ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {step?.label}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Mobile Progress */}
      <div className="md:hidden">
        <div className="flex items-center space-x-4">
          {/* Current Step Info */}
          <div className="flex items-center space-x-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground`}>
              <Icon name={steps?.find(s => s?.id === currentStep)?.icon} size={14} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Step {getCurrentStepIndex() + 1} of {steps?.length}
              </p>
              <p className="text-xs text-muted-foreground">
                {steps?.find(s => s?.id === currentStep)?.label}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex-1">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-in-out"
                style={{
                  width: `${((getCurrentStepIndex() + 1) / steps?.length) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Step Dots */}
        <div className="flex items-center justify-center space-x-2 mt-4">
          {steps?.map((step, index) => (
            <div
              key={step?.id}
              className={`h-2 w-2 rounded-full transition-colors ${
                index <= getCurrentStepIndex() ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;