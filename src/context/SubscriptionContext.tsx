import React, { createContext, useContext } from 'react';

interface SubscriptionContextType {
  isPro: boolean;
  selectedPlan: 'monthly' | 'yearly' | 'lifetime';
  setSelectedPlan: (plan: 'monthly' | 'yearly' | 'lifetime') => void;
  isUpgradeModalOpen: boolean;
  upgradeFeatureName: string;
  openUpgradeModal: (featureName?: string, defaultPlan?: 'monthly' | 'yearly' | 'lifetime') => void;
  closeUpgradeModal: () => void;
  activatePro: (plan?: 'monthly' | 'yearly' | 'lifetime') => void;
  deactivatePro: () => void;
  toggleProTestMode: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value: SubscriptionContextType = {
    isPro: true,
    selectedPlan: 'yearly',
    setSelectedPlan: () => {},
    isUpgradeModalOpen: false,
    upgradeFeatureName: '',
    openUpgradeModal: () => {},
    closeUpgradeModal: () => {},
    activatePro: () => {},
    deactivatePro: () => {},
    toggleProTestMode: () => {},
  };
  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error('useSubscription must be used within a SubscriptionProvider');
  return context;
};
