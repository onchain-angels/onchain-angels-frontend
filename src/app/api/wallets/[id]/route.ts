import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_TOKEN = process.env.API_TOKEN;

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const response = await fetch(`${API_URL}/wallets/${params.id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting wallet profile:', error);
        return NextResponse.json(
            { error: 'Falha ao deletar o perfil da carteira' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json();
        const response = await fetch(`${API_URL}/wallets/${params.id}/`, {
            method: 'PATCH',
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
        console.error('Error updating wallet profile:', error);
        return NextResponse.json(
            { error: 'Falha ao atualizar o perfil da carteira' },
            { status: 500 }
        );
    }
} 