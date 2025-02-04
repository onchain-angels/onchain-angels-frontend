import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_TOKEN = process.env.API_TOKEN; // Note que removemos o NEXT_PUBLIC_

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const response = await fetch(`${API_URL}/wallets/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AUTH_TOKEN}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error saving wallet profile:', error);
        return NextResponse.json(
            { error: 'Falha ao salvar o perfil da carteira' },
            { status: 500 }
        );
    }
} 