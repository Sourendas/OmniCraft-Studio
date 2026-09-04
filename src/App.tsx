import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SubscriptionProvider } from './context/SubscriptionContext';
import { AmbientBackground } from './components/layout/AmbientBackground';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AbDebugPanel } from './experiments';
import { Seo } from './components/Seo';
import { HomePage } from './pages/HomePage';

const ResumeBuilderPage = lazy(() => import('./pages/tools/ResumeBuilderPage').then((m) => ({ default: m.ResumeBuilderPage })));
const PdfSuitePage = lazy(() => import('./pages/tools/PdfSuitePage').then((m) => ({ default: m.PdfSuitePage })));
const FileConverterPage = lazy(() => import('./pages/tools/FileConverterPage').then((m) => ({ default: m.FileConverterPage })));
const ImageOptimizerPage = lazy(() => import('./pages/tools/ImageOptimizerPage').then((m) => ({ default: m.ImageOptimizerPage })));
const CurrencyCryptoPage = lazy(() => import('./pages/tools/CurrencyCryptoPage').then((m) => ({ default: m.CurrencyCryptoPage })));
const DevToolsPage = lazy(() => import('./pages/tools/DevToolsPage').then((m) => ({ default: m.DevToolsPage })));
const QrGeneratorPage = lazy(() => import('./pages/tools/QrGeneratorPage').then((m) => ({ default: m.QrGeneratorPage })));
const SocialStudioPage = lazy(() => import('./pages/tools/SocialStudioPage').then((m) => ({ default: m.SocialStudioPage })));
const HealthCalcPage = lazy(() => import('./pages/tools/HealthCalcPage').then((m) => ({ default: m.HealthCalcPage })));
const MarkdownEditorPage = lazy(() => import('./pages/tools/MarkdownEditorPage').then((m) => ({ default: m.MarkdownEditorPage })));
const SvgStudioPage = lazy(() => import('./pages/tools/SvgStudioPage').then((m) => ({ default: m.SvgStudioPage })));
const TextDiffPage = lazy(() => import('./pages/tools/TextDiffPage').then((m) => ({ default: m.TextDiffPage })));
const AboutPage = lazy(() => import('./pages/About').then((m) => ({ default: m.AboutPage })));
const GuidesPage = lazy(() => import('./pages/Guides').then((m) => ({ default: m.GuidesPage })));
const GuideArticlePage = lazy(() => import('./pages/guides/GuideArticle').then((m) => ({ default: m.GuideArticlePage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/legal/LegalPages').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/legal/LegalPages').then((m) => ({ default: m.TermsPage })));
const CookiePolicyPage = lazy(() => import('./pages/legal/LegalPages').then((m) => ({ default: m.CookiePolicyPage })));
const DisclaimerPage = lazy(() => import('./pages/legal/LegalPages').then((m) => ({ default: m.DisclaimerPage })));
const ContactPage = lazy(() => import('./pages/legal/LegalPages').then((m) => ({ default: m.ContactPage })));

const RouteFallback = () => (
  <div className="max-w-lg mx-auto px-4 py-16 text-center text-sm font-medium text-slate-600">Loading…</div>
);

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
        <div className="relative min-h-screen min-w-0 max-w-[100vw] bg-[#F6FAFC]/80 text-[#0A2540] selection:bg-[#00A3AD]/25 selection:text-[#006066] overflow-x-clip font-sans flex flex-col justify-between">
          <AmbientBackground />
          <ScrollToTop />
          <Seo />
          <Navbar />
          <main className="flex-grow min-w-0 w-full">
            <Suspense fallback={<RouteFallback />}>
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
                <Route path="/guides/:slug" element={<GuideArticlePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <AbDebugPanel />
          <Analytics />
        </div>
      </BrowserRouter>
    </SubscriptionProvider>
  );
}
