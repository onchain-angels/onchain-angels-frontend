interface SaveWalletData {
    address: string;
    twitter_handle: string;
    farcaster_handle: string;
    portfolio: {
        majors: number;
        stables: number;
        alts: number;
        memes: number;
    };
}

export async function saveWalletProfile(data: SaveWalletData) {
    try {
        const response = await fetch('/api/wallets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving wallet profile:', error);
        throw error;
    }
} 