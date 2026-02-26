import React, { useState, useMemo } from 'react';

export const APYCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('1000');
  const [lockDays, setLockDays] = useState<string>('30');
  const [baseRate, setBaseRate] = useState<string>('10');

  const calculations = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const days = parseInt(lockDays) || 0;
    const rate = parseFloat(baseRate) || 0;

    // Time bonus calculation
    const timeBonus = days >= 90 ? 5 : days >= 30 ? 3 : days >= 10 ? 1.5 : 0;
    const totalRate = rate + timeBonus;
    
    // Simple interest calculation
    const reward = (p * totalRate * days) / (365 * 100);
    const total = p + reward;
    const apy = ((total / p) ** (365 / days) - 1) * 100;

    return {
      reward: reward.toFixed(2),
      total: total.toFixed(2),
      apy: apy.toFixed(2),
      timeBonus: timeBonus.toFixed(1)
    };
  }, [principal, lockDays, baseRate]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">APY Calculator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Principal (STX)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="1000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Lock Period (Days)</label>
          <input
            type="number"
            value={lockDays}
            onChange={(e) => setLockDays(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="30"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Base Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={baseRate}
            onChange={(e) => setBaseRate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="10"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-2xl font-bold text-blue-600">{calculations.reward}</div>
          <div className="text-sm text-gray-600">Reward (STX)</div>
        </div>
        
        <div className="bg-green-50 p-3 rounded">
          <div className="text-2xl font-bold text-green-600">{calculations.total}</div>
          <div className="text-sm text-gray-600">Total (STX)</div>
        </div>
        
        <div className="bg-purple-50 p-3 rounded">
          <div className="text-2xl font-bold text-purple-600">{calculations.apy}%</div>
          <div className="text-sm text-gray-600">APY</div>
        </div>
        
        <div className="bg-yellow-50 p-3 rounded">
          <div className="text-2xl font-bold text-yellow-600">+{calculations.timeBonus}%</div>
          <div className="text-sm text-gray-600">Time Bonus</div>
        </div>
      </div>
    </div>
  );
};
