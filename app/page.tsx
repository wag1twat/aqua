import ClientDinamicSSR from '@/Client/ClientDynamicSSR';

export default async function Page() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/db`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const db = await response.json();
        return <ClientDinamicSSR data={db} />;
    } catch {
        return null;
    }
}
