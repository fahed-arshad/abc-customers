import { useRouter } from '@/i18n/routing';

import { Steps, useJobFormStore } from './useJobFormStore';

function useJobForm() {
  const router = useRouter();

  const currentStep = useJobFormStore((state) => state.currentStep);
  const setCurrentStep = useJobFormStore((state) => state.setCurrentStep);
  const reset = useJobFormStore((state) => state.reset);

  const goTo = (stepIndex: number) => {
    const step = Steps[stepIndex];
    setCurrentStep(step);
    router.push(step.href);
  };

  const goToNextStep = () => {
    // Prevent going to the next step if the current step
    if (currentStep.index === Steps.length - 1) {
      return;
    }
    const nextStep = Steps[currentStep.index + 1];
    setCurrentStep(nextStep);
    router.push(nextStep.href);
  };

  const goToPrevStep = () => {
    // Prevent going to the previous step if the current step
    if (currentStep.index === 0) {
      return;
    }
    const prevStep = Steps[currentStep.index - 1];
    setCurrentStep(prevStep);
    router.push(prevStep.href);
  };

  const getProgress = () => {
    return (currentStep.index / (Steps.length - 1)) * 100;
  };

  const resetForm = () => {
    reset();
    setCurrentStep(Steps[0]);
    router.push(Steps[0].href);
  };

  return { goTo, goToNextStep, goToPrevStep, getProgress, resetForm };
}

export default useJobForm;
