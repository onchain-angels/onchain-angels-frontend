'use client';
import { useAccount } from 'wagmi';
import Footer from 'src/components/Footer';
import IdentityWrapper from 'src/components/IdentityWrapper';
import LoginButton from 'src/components/LoginButton';
import { FaXTwitter } from "react-icons/fa6";
import { FaShieldAlt, FaBrain, FaChartPie } from "react-icons/fa";
import { SiFarcaster } from "react-icons/si";
import { useState, useEffect } from 'react';
import RiskProfileForm, { defaultRiskProfile, RiskProfile } from 'src/components/RiskProfileForm';
import { saveWalletProfile, updateWalletProfile, type WalletProfile, getWalletProfile, deleteWalletProfile } from 'src/services/api';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function Page() {
  const { isConnected, address } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [socialType, setSocialType] = useState<'twitter' | 'farcaster'>('farcaster');
  const [socialHandle, setSocialHandle] = useState('');
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
          if (profile.twitter_handle) {
            setSocialType('twitter');
            setSocialHandle(profile.twitter_handle);
          } else if (profile.farcaster_handle) {
            setSocialType('farcaster');
            setSocialHandle(profile.farcaster_handle);
          }
          setRiskProfile(profile.target_portfolio);
          setHasExistingProfile(true);
          setTotalRiskPercentage(
            Object.values(profile.target_portfolio).reduce((acc, curr) => acc + curr, 0)
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

  const isFormValid = socialHandle.trim() !== '' &&
    totalRiskPercentage === 100;

  const handleSubmit = async () => {
    if (!isFormValid || !address) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const data = {
        address,
        twitter_handle: socialType === 'twitter' ? socialHandle : null,
        farcaster_handle: socialType === 'farcaster' ? socialHandle : null,
        target_portfolio: riskProfile
      };

      if (hasExistingProfile && profileData?.id) {
        // Update existing profile
        const updatedProfile = await updateWalletProfile(profileData.id, data);
        setProfileData(updatedProfile);
        toast.success('Profile updated successfully!');
      } else {
        // Create new profile
        const newProfile = await saveWalletProfile(data);
        setProfileData(newProfile);
        setHasExistingProfile(true);
        toast.success('Profile created successfully!');
      }
    } catch (error: any) {
      console.error('Error saving profile:', error);
      let errorMessage = 'Failed to save profile. Please try again.';

      // If the API returned specific errors, format the message
      if (error && typeof error === 'object') {
        if (error.address) {
          errorMessage = "Address: " + error.address.join(' ');
        } else if (error.twitter_handle) {
          errorMessage = "Twitter handle: " + error.twitter_handle.join(' ');
        } else if (error.farcaster_handle) {
          errorMessage = "Farcaster handle: " + error.farcaster_handle.join(' ');
        } else if (error.error) {
          errorMessage = error.error;
        }
      }

      setSubmitError(errorMessage);
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
      setSocialHandle('');
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
    if (!socialHandle.trim())
      errors.push(`${socialType === 'twitter' ? 'Twitter' : 'Farcaster'} handle is required`);
    if (totalRiskPercentage !== 100)
      errors.push('Risk profile must total 100%');

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
              {/* Novo bloco de seleção de rede social */}
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="socialType"
                    value="farcaster"
                    checked={socialType === 'farcaster'}
                    onChange={() => setSocialType('farcaster')}
                    className="mr-2"
                  />
                  Farcaster
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="socialType"
                    value="twitter"
                    checked={socialType === 'twitter'}
                    onChange={() => setSocialType('twitter')}
                    disabled
                    className="mr-2"
                  />
                  X / Twitter<span className="text-gray-500">&nbsp;(soon)</span>
                </label>
              </div>

              {/* Novo campo único para entrada do identificador */}
              <div>
                <div className="relative">
                  {socialType === 'twitter' ? (
                    <FaXTwitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  ) : (
                    <SiFarcaster className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  )}
                  <span className="absolute inset-y-0 left-9 flex items-center text-gray-500">@</span>
                  <input
                    type="text"
                    id="social_handle"
                    value={socialHandle}
                    onChange={(e) => setSocialHandle(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 pl-14 pr-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder={`your_${socialType}_handle`}
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

              {!hasExistingProfile && (
                <p className="text-xs text-gray-600 text-center">
                  By creating a profile, you agree to our{' '}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Link>
                </p>
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
          <div className="flex flex-col min-h-screen items-center justify-center px-4">
            {/* Hero Section */}
            <section className="w-full max-w-3xl text-center py-8">
              <h1 className="text-4xl font-bold text-black dark:text-white"><u>AI-Powered Insights</u> from Your Onchain Crypto Activity to <u>Help You Trade Smarter</u></h1>
              <div className="mt-6 w-full max-w-2xl mx-auto">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/WFC4cG6w44s?si=2AcXdEknmIfzAB9c"
                  title="OnchainAngels Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full aspect-video rounded-lg shadow-lg"
                ></iframe>
              </div>
            </section>
    
            {/* Features Section */}
            <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-8">
              <div className="flex flex-col items-center">
                <FaShieldAlt className="text-5xl text-blue-500" />
                <h2 className="mt-4 text-xl font-semibold">Secure Profiles</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Define your investment risk profile and store it securely with Nillion.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <FaBrain className="text-5xl text-green-500" />
                <h2 className="mt-4 text-xl font-semibold">AI Working With You</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                Collaborate with AI to shape your agentic future with better decisions.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <FaChartPie className="text-5xl text-purple-500" />
                <h2 className="mt-4 text-xl font-semibold">Onchain Insights</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Get realtime insights for your Base transactions to stay ahead.
                </p>
              </div>
            </section>
    
            {/* CTA Section */}
            <section className="w-full max-w-3xl text-center py-8">
              <h2 className="text-3xl font-bold text-black dark:text-white">Ready to Get Started?</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Connect your wallet to create your risk profile and join the OnchainAngels community.
              </p>
              <div className="mt-6 flex justify-center">
                <LoginButton />
              </div>
            </section>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
