import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface SubscriptionContextType {
  isPro: boolean;
  isUpgradeModalOpen: boolean;
  upgradeFeatureName: string;
  openUpgradeModal: (featureName?: string) => void;
  closeUpgradeModal: () => void;
  activatePro: () => void;
  deactivatePro: () => void;
  toggleProTestMode: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const PRO_STORAGE_KEY = 'omnicraft_pro_member_v1';

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPro, setIsPro] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(PRO_STORAGE_KEY);
      return stored === 'true';
    } catch {
      return false;
    }
  });

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);
  const [upgradeFeatureName, setUpgradeFeatureName] = useState<string>('Pro Suite');

  useEffect(() => {
    try {
      localStorage.setItem(PRO_STORAGE_KEY, String(isPro));
    } catch (e) {
      console.warn('LocalStorage not available', e);
    }
  }, [isPro]);

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#8b5cf6', '#3b82f6', '#ec4899', '#10b981']
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }
  };

  const openUpgradeModal = (featureName = 'Pro Utility') => {
    setUpgradeFeatureName(featureName);
    setIsUpgradeModalOpen(true);
  };

  const closeUpgradeModal = () => {
    setIsUpgradeModalOpen(false);
  };

  const activatePro = () => {
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
