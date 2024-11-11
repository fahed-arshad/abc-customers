import { useRouter } from 'next/navigation';

import { Steps, useJobFormStore } from './useJobFormStore';

function useJobForm() {
  const router = useRouter();

  const currentStep = useJobFormStore((state) => state.currentStep);
  const setCurrentStep = useJobFormStore((state) => state.setCurrentStep);

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

  return { goToNextStep, goToPrevStep };
}

export default useJobForm;
