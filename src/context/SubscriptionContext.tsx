import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface SubscriptionContextType {
  isPro: boolean;
  selectedPlan: 'monthly' | 'yearly';
  setSelectedPlan: (plan: 'monthly' | 'yearly') => void;
  isUpgradeModalOpen: boolean;
  upgradeFeatureName: string;
  openUpgradeModal: (featureName?: string, defaultPlan?: 'monthly' | 'yearly') => void;
  closeUpgradeModal: () => void;
  activatePro: (plan?: 'monthly' | 'yearly') => void;
  deactivatePro: () => void;
  toggleProTestMode: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const PRO_STORAGE_KEY = 'omnicraft_pro_member_v1';
const PRO_PLAN_KEY = 'omnicraft_pro_plan_v1';

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPro, setIsPro] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(PRO_STORAGE_KEY);
      return stored === 'true';
    } catch {
      return false;
    }
  });

  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>(() => {
    try {
      const stored = localStorage.getItem(PRO_PLAN_KEY);
      return stored === 'yearly' ? 'yearly' : 'monthly';
    } catch {
      return 'yearly'; // Default to best-value yearly
    }
  });

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);
  const [upgradeFeatureName, setUpgradeFeatureName] = useState<string>('Pro Suite');

  useEffect(() => {
    try {
      localStorage.setItem(PRO_STORAGE_KEY, String(isPro));
      localStorage.setItem(PRO_PLAN_KEY, selectedPlan);
    } catch (e) {
      console.warn('LocalStorage not available', e);
    }
  }, [isPro, selectedPlan]);

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00A3AD', '#0FB5BA', '#0F4C81', '#FA6400', '#10b981']
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }
  };

  const openUpgradeModal = (featureName = 'Pro Utility', defaultPlan?: 'monthly' | 'yearly') => {
    setUpgradeFeatureName(featureName);
    if (defaultPlan) {
      setSelectedPlan(defaultPlan);
    }
    setIsUpgradeModalOpen(true);
  };

  const closeUpgradeModal = () => {
    setIsUpgradeModalOpen(false);
  };

  const activatePro = (plan?: 'monthly' | 'yearly') => {
    if (plan) setSelectedPlan(plan);
    setIsPro(true);
    setIsUpgradeModalOpen(false);
    fireConfetti();
  };

  const deactivatePro = () => {
    setIsPro(false);
  };

  const toggleProTestMode = () => {
    if (!isPro) {
      activatePro();
    } else {
      deactivatePro();
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isPro,
        selectedPlan,
        setSelectedPlan,
        isUpgradeModalOpen,
        upgradeFeatureName,
        openUpgradeModal,
        closeUpgradeModal,
        activatePro,
        deactivatePro,
        toggleProTestMode,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
