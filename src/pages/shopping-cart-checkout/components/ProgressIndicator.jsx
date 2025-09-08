import React from 'react';
import { useTranslation } from '../../../utils/i18n.jsx';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ steps, currentStep, onStepClick }) => {
  const { t } = useTranslation();
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
              <li key={step?.id} className={`relative ${index !== steps?.length - 1 ? 'pr-12 sm:pr-24' : ''}`}>
                {/* Connector Line */}
                {index !== steps?.length - 1 && (
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={`h-1 w-full rounded-full shadow-md transition-all duration-500 ${
                      isStepCompleted(index) ? 'bg-gradient-to-r from-primary to-accent' : 'bg-muted-foreground/20'
                    }`} />
                  </div>
                )}

                {/* Step Button */}
                <button
                  onClick={() => isStepClickable(index) && onStepClick(step?.id)}
                  disabled={!isStepClickable(index)}
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-white shadow-xl transition-all duration-300 ${
                    isStepActive(step?.id)
                      ? 'bg-gradient-to-br from-primary to-accent text-white scale-110 ring-4 ring-primary/20'
                      : isStepCompleted(index)
                        ? 'bg-primary text-white opacity-80 hover:bg-primary/90'
                        : 'bg-muted text-muted-foreground opacity-60'
                  } ${
                    isStepClickable(index) ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                  style={{ boxShadow: isStepActive(step?.id) ? '0 4px 32px 0 rgba(80, 120, 255, 0.18)' : undefined }}
                >
                  {isStepCompleted(index) ? (
                    <Icon name="Check" size={22} />
                  ) : (
                    <Icon name={step?.icon} size={22} />
                  )}
                </button>

                {/* Step Label */}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className={`text-base font-semibold tracking-wide drop-shadow-md ${
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
            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg`}>
              <Icon name={steps?.find(s => s?.id === currentStep)?.icon} size={18} />
            </div>
            <div>
              <p className="text-base font-bold text-foreground">
                {t('checkout.step', { current: getCurrentStepIndex() + 1, total: steps?.length })}
              </p>
              <p className="text-sm text-muted-foreground">
                {steps?.find(s => s?.id === currentStep)?.label}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex-1">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-in-out"
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
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
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