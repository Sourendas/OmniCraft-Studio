import React, { useState } from 'react';
import { Hero } from '../components/home/Hero';
import { ToolGrid } from '../components/home/ToolGrid';
import { WorkflowPresets } from '../components/home/WorkflowPresets';
import { SecurityArchitecture } from '../components/home/SecurityArchitecture';
import { LiveSystemDiagnostics } from '../components/home/LiveSystemDiagnostics';
import { FaqSection } from '../components/home/FaqSection';
import { AdBanner } from '../components/layout/AdBanner';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
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
    </div>
  );
};
