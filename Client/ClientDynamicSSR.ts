'use client';

import dynamic from 'next/dynamic';

const ClientDinamicSSR = dynamic(() => import('./Client').then((module) => module.Client), {
    ssr: false,
});

export default ClientDinamicSSR;
