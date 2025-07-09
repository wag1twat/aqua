import { Client } from '@/client/client';

export default async function Page() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/db`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const db = await response.json();

    return <Client data={db} />;
}
