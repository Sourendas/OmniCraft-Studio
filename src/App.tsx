import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { AmbientBackground } from './components/layout/AmbientBackground';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AbDebugPanel } from './experiments';

import { HomePage } from './pages/HomePage';
import { ResumeBuilderPage } from './pages/tools/ResumeBuilderPage';
import { PdfSuitePage } from './pages/tools/PdfSuitePage';
import { FileConverterPage } from './pages/tools/FileConverterPage';
import { ImageOptimizerPage } from './pages/tools/ImageOptimizerPage';
import { CurrencyCryptoPage } from './pages/tools/CurrencyCryptoPage';
import { DevToolsPage } from './pages/tools/DevToolsPage';
import { QrGeneratorPage } from './pages/tools/QrGeneratorPage';
import { SocialStudioPage } from './pages/tools/SocialStudioPage';
import { HealthCalcPage } from './pages/tools/HealthCalcPage';
import { MarkdownEditorPage } from './pages/tools/MarkdownEditorPage';
import { SvgStudioPage } from './pages/tools/SvgStudioPage';
import { TextDiffPage } from './pages/tools/TextDiffPage';

import {
  PrivacyPolicyPage,
  TermsPage,
  CookiePolicyPage,
  DisclaimerPage,
  ContactPage
} from './pages/legal/LegalPages';
import { AboutPage } from './pages/About';
import { GuidesPage } from './pages/Guides';
import { NotFoundPage } from './pages/NotFoundPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <SubscriptionProvider>
      <BrowserRouter>
        <div className="relative min-h-screen bg-[#F6FAFC]/80 text-[#0A2540] selection:bg-[#00A3AD]/25 selection:text-[#006066] overflow-x-hidden font-sans flex flex-col justify-between">
          <AmbientBackground />
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resume-builder" element={<ResumeBuilderPage />} />
              <Route path="/pdf-suite" element={<PdfSuitePage />} />
              <Route path="/file-converter" element={<FileConverterPage />} />
              <Route path="/image-optimizer" element={<ImageOptimizerPage />} />
              <Route path="/currency-crypto" element={<CurrencyCryptoPage />} />
              <Route path="/dev-tools" element={<DevToolsPage />} />
              <Route path="/qr-generator" element={<QrGeneratorPage />} />
              <Route path="/social-studio" element={<SocialStudioPage />} />
              <Route path="/health-calc" element={<HealthCalcPage />} />
              <Route path="/markdown-editor" element={<MarkdownEditorPage />} />
              <Route path="/svg-editor" element={<SvgStudioPage />} />
              <Route path="/text-diff" element={<TextDiffPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/terms-of-service" element={<TermsPage />} />
              <Route path="/cookie-policy" element={<CookiePolicyPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <AbDebugPanel />
        </div>
      </BrowserRouter>
    </SubscriptionProvider>
  );
}
