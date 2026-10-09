import React, { useState } from 'react';
import { CareerPilotProvider, useCareerPilot } from './context/CareerPilotContext';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ProductTour } from './components/ProductTour';
import { AuthModal } from './components/AuthModal';
import { LogoutConfirmModal } from './components/LogoutConfirmModal';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CareerRecommendationsPage } from './pages/CareerRecommendationsPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AssistantPage } from './pages/AssistantPage';
import { ProgressPage } from './pages/ProgressPage';
import { HelpPage } from './pages/HelpPage';
import { SettingsPage } from './pages/SettingsPage';
import { Loader2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, isLoading } = useCareerPilot();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // If user is on the public landing page, render standalone landing without dashboard sidebar
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen relative overflow-x-hidden selection:bg-emerald-500 selection:text-white">
        {/* Ambient background refraction orbs */}
        <div className="ambient-bg" aria-hidden="true">
          <div className="ambient-orb ambient-orb-1" />
          <div className="ambient-orb ambient-orb-2" />
          <div className="ambient-orb ambient-orb-3" />
        </div>

        <LandingPage />

        {/* Global Modals */}
        <AuthModal />
        <ProductTour />
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'onboarding':
        return <OnboardingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'recommendations':
        return <CareerRecommendationsPage />;
      case 'skillgap':
        return <SkillGapPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'assistant':
        return <AssistantPage />;
      case 'progress':
        return <ProgressPage />;
      case 'help':
        return <HelpPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Ambient background refraction orbs */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      {/* Floating Glass Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main App Container */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Sticky Glass Top Navigation Bar */}
        <TopBar
          isCollapsed={isCollapsed}
          onOpenMobile={() => setIsMobileOpen(true)}
        />

        {/* Global Loading Banner */}
        {isLoading && (
          <div className="sticky top-20 z-20 bg-emerald-600/90 text-white text-xs py-2 px-4 text-center flex items-center justify-center gap-2 backdrop-blur-md shadow-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Cooperating Agents are evaluating data & calculating fit scores...</span>
          </div>
        )}

        {/* Page Main Content Area */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderActiveTab()}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Global Modals */}
      <AuthModal />
      <LogoutConfirmModal />
      <ProductTour />
    </div>
  );
};

export function App() {
  return (
    <CareerPilotProvider>
      <MainContent />
    </CareerPilotProvider>
  );
}

export default App;
