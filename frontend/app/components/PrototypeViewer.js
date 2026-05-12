import { useState } from 'react';
import { MobilePrototype } from '../prototypes/MobilePrototype';
import { TabletPrototype } from '../prototypes/TabletPrototype';
import { DesktopPrototype } from '../prototypes/DesktopPrototype';

export function PrototypeViewer({ onBack }) {
  const [activeView, setActiveView] = useState('mobile');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
      <div className="shadow-lg sticky top-0 z-50" style={{ backgroundColor: '#030213', color: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-4 py-2 rounded-lg transition-colors flex items-center gap-2 hover:opacity-80"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Voltar ao App
                </button>
              )}
              <h1 className="text-xl sm:text-2xl">Protótipos Visuais - Sistema de Cadastro</h1>
            </div>
            <div className="flex gap-2 p-1 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <button
                onClick={() => setActiveView('mobile')}
                className="px-4 py-2 rounded-md transition-colors"
                style={
                  activeView === 'mobile'
                    ? { backgroundColor: '#ffffff', color: '#030213' }
                    : { backgroundColor: 'transparent' }
                }
              >
                Mobile
              </button>
              <button
                onClick={() => setActiveView('tablet')}
                className="px-4 py-2 rounded-md transition-colors"
                style={
                  activeView === 'tablet'
                    ? { backgroundColor: '#ffffff', color: '#030213' }
                    : { backgroundColor: 'transparent' }
                }
              >
                Tablet
              </button>
              <button
                onClick={() => setActiveView('desktop')}
                className="px-4 py-2 rounded-md transition-colors"
                style={
                  activeView === 'desktop'
                    ? { backgroundColor: '#ffffff', color: '#030213' }
                    : { backgroundColor: 'transparent' }
                }
              >
                Desktop
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        {activeView === 'mobile' && <MobilePrototype />}
        {activeView === 'tablet' && <TabletPrototype />}
        {activeView === 'desktop' && <DesktopPrototype />}
      </div>
    </div>
  );
}
