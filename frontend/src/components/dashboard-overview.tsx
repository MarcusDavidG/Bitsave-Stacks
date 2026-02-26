import React from 'react';

export const DashboardOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Deposited</h3>
        <p className="text-3xl font-bold text-blue-600">1,234 STX</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Rewards Earned</h3>
        <p className="text-3xl font-bold text-green-600">123 STX</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Reputation Points</h3>
        <p className="text-3xl font-bold text-purple-600">12,340</p>
      </div>
    </div>
  );
};
