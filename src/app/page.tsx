'use client';
import { useAccount } from 'wagmi';
import Footer from 'src/components/Footer';
import IdentityWrapper from 'src/components/IdentityWrapper';
import WalletWrapper from 'src/components/WalletWrapper';
import { motion } from 'framer-motion';
import { FaXTwitter } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";
import { useState } from 'react';
import RiskProfileForm, { defaultRiskProfile, RiskProfile } from 'src/components/RiskProfileForm';
import { saveWalletProfile } from 'src/services/api';

export default function Page() {
  const { isConnected, address } = useAccount();
  const [twitterHandle, setTwitterHandle] = useState('');
  const [farcasterHandle, setFarcasterHandle] = useState('');
  const [totalRiskPercentage, setTotalRiskPercentage] = useState(100); // começa com 100 por causa do default
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [riskProfile, setRiskProfile] = useState<RiskProfile>(defaultRiskProfile);

  const isFormValid = twitterHandle.trim() !== '' &&
    farcasterHandle.trim() !== '' &&
    totalRiskPercentage === 100;

  const handleSubmit = async () => {
    if (!isFormValid || !address) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await saveWalletProfile({
        address,
        twitter_handle: twitterHandle,
        farcaster_handle: farcasterHandle,
        portfolio: riskProfile
      });

      console.log('Profile saved successfully!', response);

    } catch (error) {
      setSubmitError('Failed to save profile. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorMessage = () => {
    if (isFormValid) return '';

    const errors = [];
    if (!twitterHandle.trim()) errors.push('X handle is required');
    if (!farcasterHandle.trim()) errors.push('Farcaster handle is required');
    if (totalRiskPercentage !== 100) errors.push('Risk profile must total 100%');

    return errors.join(' • ');
  };

  const handleProfileChange = (total: number, profile: RiskProfile) => {
    setTotalRiskPercentage(total);
    setRiskProfile(profile);
  };

  console.log('Endereço da wallet:', address);

  return (
    <div className='flex h-full w-96 max-w-full flex-col px-1 font-sans md:w-[1008px]'>
      <section className='mt-6 mb-6 flex w-full flex-col md:flex-row'>
        <div className='flex w-full flex-row items-center justify-between gap-2 md:gap-0'>
          <span className="text-4xl font-bold dark:text-white text-black">
            👼 OnchainAngels
          </span>
          <div className="flex items-center gap-3">
            <WalletWrapper />
          </div>
        </div>
      </section>
      <section className="flex w-full flex-col items-center justify-center gap-4 rounded-xl px-2 py-4 md:grow">
        {isConnected ? (
          <>
            <IdentityWrapper />
            <div className="w-full max-w-md flex flex-col gap-4">
              <div>
                <div className="relative">
                  <FaXTwitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <span className="absolute inset-y-0 left-9 flex items-center text-gray-500">
                    @
                  </span>
                  <input
                    type="text"
                    id="twitter"
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 pl-14 pr-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="your_twitter_handle"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <SiFarcaster className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <span className="absolute inset-y-0 left-9 flex items-center text-gray-500">
                    @
                  </span>
                  <input
                    type="text"
                    id="farcaster"
                    value={farcasterHandle}
                    onChange={(e) => setFarcasterHandle(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 pl-14 pr-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="your_farcaster_handle"
                  />
                </div>
              </div>

              <RiskProfileForm onProfileChange={handleProfileChange} />

              <button
                onClick={handleSubmit}
                className={`rounded-lg px-4 py-2 text-white w-full ${isFormValid && !isSubmitting
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-gray-400 cursor-not-allowed'
                  }`}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>

              <div className="h-8">
                {!isFormValid && (
                  <p className="text-sm text-red-500 text-center">
                    {getErrorMessage()}
                  </p>
                )}
                {submitError && (
                  <p className="text-sm text-red-500 text-center">
                    {submitError}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-48 w-full max-w-md items-center justify-center rounded-lg bg-gray-100 p-6 text-center text-gray-600">
            Please connect your account to see your profile
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
