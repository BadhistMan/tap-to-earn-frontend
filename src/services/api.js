const API_BASE = process.env.REACT_APP_API_BASE || 'https://your-backend-url.onrender.com';

export const getUser = async (telegramId, initData) => {
  const response = await fetch(`${API_BASE}/api/user/${telegramId}`, {
    headers: {
      'X-Init-Data': initData
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  
  return await response.json();
};

export const tap = async (initData) => {
  const response = await fetch(`${API_BASE}/api/tap`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ init_data: initData })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Tap failed');
  }
  
  return await response.json();
};

export const upgrade = async (initData) => {
  const response = await fetch(`${API_BASE}/api/upgrade`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ init_data: initData })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Upgrade failed');
  }
  
  return await response.json();
};

// Similar functions for claimDaily, submitReferral, withdraw
