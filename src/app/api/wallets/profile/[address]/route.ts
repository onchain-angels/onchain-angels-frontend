import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_TOKEN = process.env.API_TOKEN;

export async function GET(
    request: Request,
    { params }: { params: { address: string } }
) {
    try {
        const response = await fetch(`${API_URL}/wallets/address/${params.address}`, {
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`,
            },
        });

        if (response.status === 404) {
            return NextResponse.json(null, { status: 404 });
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching wallet profile:', error);
        return NextResponse.json(
            { error: 'Falha ao buscar o perfil da carteira' },
            { status: 500 }
        );
    }
} 