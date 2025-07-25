import React, { useState } from 'react';
import { GameProvider } from './context/GameContext';
import Header from './components/Header';
import TapScreen from './components/TapScreen';
import ShopScreen from './components/ShopScreen';
import ProfileScreen from './components/ProfileScreen';
import WithdrawScreen from './components/WithdrawScreen';
import ReferralScreen from './components/ReferralScreen';
import DailyRewardScreen from './components/DailyRewardScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import Footer from './components/Footer';

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
        
        <Footer />
      </div>
    </GameProvider>
  );
}

export default App;
