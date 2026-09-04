import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Hero } from '../components/home/Hero';

const ToolGrid = lazy(() => import('../components/home/ToolGrid').then((m) => ({ default: m.ToolGrid })));
const WorkflowPresets = lazy(() => import('../components/home/WorkflowPresets').then((m) => ({ default: m.WorkflowPresets })));
const SecurityArchitecture = lazy(() => import('../components/home/SecurityArchitecture').then((m) => ({ default: m.SecurityArchitecture })));
const LiveSystemDiagnostics = lazy(() => import('../components/home/LiveSystemDiagnostics').then((m) => ({ default: m.LiveSystemDiagnostics })));
const FaqSection = lazy(() => import('../components/home/FaqSection').then((m) => ({ default: m.FaqSection })));
const AdBanner = lazy(() => import('../components/layout/AdBanner').then((m) => ({ default: m.AdBanner })));

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showRest, setShowRest] = useState(false);

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof win.requestIdleCallback === 'function') {
      const id = win.requestIdleCallback(() => setShowRest(true), { timeout: 1200 });
      return () => win.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setShowRest(true), 50);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {showRest ? (
        <Suspense fallback={<div id="tools-grid" className="h-24" />}>
          <ToolGrid
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
          <WorkflowPresets />
          <SecurityArchitecture />
          <LiveSystemDiagnostics />
          <div className="px-4 max-w-7xl mx-auto w-full">
            <AdBanner type="in-content" />
          </div>
          <FaqSection />
        </Suspense>
      ) : (
        <div id="tools-grid" className="h-24" />
      )}
    </div>
  );
};
