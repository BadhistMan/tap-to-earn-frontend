import React, { useState, useEffect } from 'react';
import { GameProvider } from './context/GameContext';
import TapScreen from './components/TapScreen';
import ShopScreen from './components/ShopScreen';
import ProfileScreen from './components/ProfileScreen';
import WithdrawScreen from './components/WithdrawScreen';
import ReferralScreen from './components/ReferralScreen';
import DailyRewardScreen from './components/DailyRewardScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import Header from './components/Header';

function App() {
  const [activeTab, setActiveTab] = useState('tap');
  
  const renderScreen = () => {
    switch(activeTab) {
      case 'tap': return <TapScreen />;
      case 'shop': return <ShopScreen />;
      case 'profile': return <ProfileScreen />;
      case 'withdraw': return <WithdrawScreen />;
      case 'referral': return <ReferralScreen />;
      case 'daily': return <DailyRewardScreen />;
      case 'leaderboard': return <LeaderboardScreen />;
      default: return <TapScreen />;
    }
  };

  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="container mx-auto px-4 py-6">
          {renderScreen()}
        </main>
        
        <footer className="mt-10 py-6 text-center text-gray-600">
          <p>Created by Badhist Man 🇪🇹</p>
          <p className="mt-2">Join <a href="https://t.me/Freetech_1" className="text-blue-500">@Freetech_1</a> for updates</p>
        </footer>
      </div>
    </GameProvider>
  );
}

export default App;
