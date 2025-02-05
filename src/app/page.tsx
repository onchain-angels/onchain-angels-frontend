'use client';
import { useAccount } from 'wagmi';
import Footer from 'src/components/Footer';
import IdentityWrapper from 'src/components/IdentityWrapper';
import LoginButton from 'src/components/LoginButton';
import { FaXTwitter } from "react-icons/fa6";
import { SiFarcaster } from "react-icons/si";
import { useState, useEffect } from 'react';
import RiskProfileForm, { defaultRiskProfile, RiskProfile } from 'src/components/RiskProfileForm';
import { saveWalletProfile, updateWalletProfile, type WalletProfile, getWalletProfile, deleteWalletProfile } from 'src/services/api';
import { toast } from 'react-hot-toast';

export default function Page() {
  const { isConnected, address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [twitterHandle, setTwitterHandle] = useState('');
  const [farcasterHandle, setFarcasterHandle] = useState('');
  const [totalRiskPercentage, setTotalRiskPercentage] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [riskProfile, setRiskProfile] = useState<RiskProfile>(defaultRiskProfile);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);
  const [profileData, setProfileData] = useState<WalletProfile | null>(null);

  useEffect(() => {
    async function loadWalletProfile() {
      if (!address) return;

      try {
        setIsLoading(true);
        const profile = await getWalletProfile(address);
        if (profile) {
          setProfileData(profile);
          setTwitterHandle(profile.twitter_handle);
          setFarcasterHandle(profile.farcaster_handle);
          setRiskProfile(profile.portfolio);
          setHasExistingProfile(true);
          setTotalRiskPercentage(
            Object.values(profile.portfolio).reduce((acc, curr) => acc + curr, 0)
          );
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast.error('Error loading profile');
      } finally {
        setIsLoading(false);
      }
    }

    loadWalletProfile();
  }, [address]);

  const isFormValid = twitterHandle.trim() !== '' &&
    farcasterHandle.trim() !== '' &&
    totalRiskPercentage === 100;

  const handleSubmit = async () => {
    if (!isFormValid || !address) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const data = {
        address,
        twitter_handle: twitterHandle,
        farcaster_handle: farcasterHandle,
        portfolio: riskProfile
      };

      if (hasExistingProfile && profileData?.id) {
        // Atualizar perfil existente
        const updatedProfile = await updateWalletProfile(profileData.id, data);
        setProfileData(updatedProfile);
        toast.success('Profile updated successfully!');
      } else {
        // Criar novo perfil
        const newProfile = await saveWalletProfile(data);
        setProfileData(newProfile);
        setHasExistingProfile(true);
        toast.success('Profile created successfully!');
      }
    } catch (error) {
      setSubmitError('Failed to save profile. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!profileData?.id) return;

    try {
      setIsSubmitting(true);
      await deleteWalletProfile(profileData.id);
      // Limpar os estados
      setProfileData(null);
      setTwitterHandle('');
      setFarcasterHandle('');
      setRiskProfile(defaultRiskProfile);
      setHasExistingProfile(false);
      toast.success('Profile deleted successfully!');
    } catch (error) {
      console.error('Error deleting profile:', error);
      toast.error('Error deleting profile');
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

  const handleProfileUpdate = ({
    total,
    profile,
  }: {
    total: number;
    profile: RiskProfile;
  }) => {
    setTotalRiskPercentage(total);
    setRiskProfile(profile);
  };

  return (
    <div className='flex h-full w-96 max-w-full flex-col px-1 font-sans md:w-[1008px]'>
      <section className='mt-4 mb-4 flex w-full flex-col md:flex-row'>
        <div className='flex w-full flex-row items-center justify-between gap-2 md:gap-0'>
          <span className="text-4xl font-bold dark:text-white text-black">
            👼 OnchainAngels
          </span>
          <div className="flex items-center gap-3">
            <LoginButton />
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

              {address && (
                <RiskProfileForm
                  onProfileUpdate={handleProfileUpdate}
                  initialProfile={riskProfile}
                  isLoading={isLoading}
                />
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleSubmit}
                  className={`rounded-lg px-4 py-2 text-white grow ${isFormValid && !isSubmitting
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting
                    ? 'Saving...'
                    : hasExistingProfile
                      ? 'Update Profile'
                      : 'Create Profile'
                  }
                </button>

                {hasExistingProfile && (
                  <button
                    onClick={handleDelete}
                    className={`rounded-lg px-4 py-2 text-white bg-red-500 hover:bg-red-600 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Deleting...' : 'Delete Profile'}
                  </button>
                )}
              </div>

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
