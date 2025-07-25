import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard'>('home');

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header currentPage={currentPage} onPageChange={setCurrentPage} />
        
        <main>
          {currentPage === 'home' && <HomePage onPageChange={setCurrentPage} />}
          {currentPage === 'dashboard' && <Dashboard />}
        </main>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;