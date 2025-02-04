import { useState, useEffect, useRef } from 'react';
import { PiChartPieSliceFill } from "react-icons/pi";
import { saveWalletProfile, getWalletProfile, deleteWalletProfile } from '../services/api';
import type { WalletProfile, SaveWalletData } from '../services/api';
import { toast } from 'react-hot-toast';

export interface RiskProfile {
    majors: number;
    stables: number;
    alts: number;
    memes: number;
}

export const defaultRiskProfile: RiskProfile = {
    majors: 60,
    stables: 20,
    alts: 15,
    memes: 5
};

interface RiskProfileFormProps {
    onProfileUpdate: (data: {
        total: number,
        profile: RiskProfile,
    }) => void;
    initialProfile?: RiskProfile;
    isLoading?: boolean;
}

export default function RiskProfileForm({
    onProfileUpdate,
    initialProfile = defaultRiskProfile,
    isLoading = false
}: RiskProfileFormProps) {
    const [riskProfile, setRiskProfile] = useState<RiskProfile>(initialProfile);

    useEffect(() => {
        setRiskProfile(initialProfile);
    }, [initialProfile]);

    const handleSliderChange = (category: keyof RiskProfile, value: number) => {
        const newProfile = {
            ...riskProfile,
            [category]: value
        };
        setRiskProfile(newProfile);
        const total = Object.values(newProfile).reduce((acc, curr) => acc + curr, 0);
        onProfileUpdate({
            total,
            profile: newProfile,
        });
    };

    const totalPercentage = Object.values(riskProfile).reduce((acc, curr) => acc + curr, 0);

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="w-full">
            <div className="flex items-center gap-2 mb-4">
                <PiChartPieSliceFill className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-bold text-gray-900">Risk Profile</h3>
            </div>

            <div className="space-y-6">
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                            Major Coins (BTC, ETH, SOL)
                        </label>
                        <span className="text-sm text-gray-500">{riskProfile.majors}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={riskProfile.majors}
                        onChange={(e) => handleSliderChange('majors', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                            Stablecoins (USDC, USDT, DAI, etc)
                        </label>
                        <span className="text-sm text-gray-500">{riskProfile.stables}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={riskProfile.stables}
                        onChange={(e) => handleSliderChange('stables', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                            Altcoins (AVAX, BNB, etc)
                        </label>
                        <span className="text-sm text-gray-500">{riskProfile.alts}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={riskProfile.alts}
                        onChange={(e) => handleSliderChange('alts', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                            Memecoins (SHIB, DOGE, etc)
                        </label>
                        <span className="text-sm text-gray-500">{riskProfile.memes}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={riskProfile.memes}
                        onChange={(e) => handleSliderChange('memes', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>

                <div className={`text-sm font-medium ${totalPercentage === 100 ? 'text-green-600' : 'text-red-600'}`}>
                    Total: {totalPercentage}% {totalPercentage !== 100 && '(deve somar 100%)'}
                </div>
            </div>
        </div>
    );
} 