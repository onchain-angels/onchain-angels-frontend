export interface WalletProfile {
    id: number;
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

export interface SaveWalletData {
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

export interface UpdateWalletData {
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

export async function getWalletProfile(address: string): Promise<WalletProfile | null> {
    try {
        const timestamp = Date.parse(new Date().toString());
        const response = await fetch(`/api/wallets/profile/${address}?timestamp=${timestamp}`, { cache: 'no-store' });

        if (response.status === 404) {
            return null;
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching wallet profile:', error);
        throw error;
    }
}

export const deleteWalletProfile = async (id: number) => {
    const response = await fetch(`/api/wallets/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Falha ao deletar perfil');
    }

    return response.json();
};

export async function updateWalletProfile(id: number, data: UpdateWalletData) {
    try {
        const response = await fetch(`/api/wallets/${id}`, {
            method: 'PATCH',
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
        console.error('Error updating wallet profile:', error);
        throw error;
    }
} 