import React, { useState } from 'react';
import { LoadingSpinner } from './ui/loading-spinner';
import { useDepositValidation } from '../hooks/useDepositValidation';

export const MobileDepositForm: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [lockDays, setLockDays] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { isValid, errors } = useDepositValidation(amount, lockDays);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    
    setIsSubmitting(true);
    try {
      // Deposit logic here
      console.log('Depositing:', { amount, lockDays });
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-center">Make a Deposit</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Amount (STX)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter amount"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Lock Period: {lockDays} days
          </label>
          <input
            type="range"
            min="1"
            max="365"
            value={lockDays}
            onChange={(e) => setLockDays(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            disabled={isSubmitting}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 day</span>
            <span>365 days</span>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            {errors.map((error, index) => (
              <p key={index} className="text-red-600 text-sm">{error}</p>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Processing...
            </>
          ) : (
            'Deposit STX'
          )}
        </button>
      </form>
    </div>
  );
};
