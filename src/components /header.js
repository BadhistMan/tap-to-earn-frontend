import React from 'react';

const Header = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'tap', label: 'Tap', icon: '👆' },
    { id: 'shop', label: 'Shop', icon: '🛒' },
    { id: 'daily', label: 'Daily', icon: '🎁' },
    { id: 'referral', label: 'Refer', icon: '👥' },
    { id: 'leaderboard', label: 'Top', icon: '🏆' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'withdraw', label: 'Withdraw', icon: '💸' },
  ];
  
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-center mb-2">Tap to Earn</h1>
        
        <div className="flex justify-center space-x-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg ${
                activeTab === tab.id ? 'bg-indigo-700' : ''
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
