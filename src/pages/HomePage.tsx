import React, { useState } from 'react';
import { Hero } from '../components/home/Hero';
import { ToolGrid } from '../components/home/ToolGrid';
import { Testimonials } from '../components/home/Testimonials';
import { PricingSection } from '../components/home/PricingSection';
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

      <div className="px-4">
        <AdBanner type="leaderboard" />
      </div>

      <ToolGrid
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />

      <div className="px-4">
        <AdBanner type="in-content" />
      </div>

      <Testimonials />

      <PricingSection />

      <FaqSection />
    </div>
  );
};
