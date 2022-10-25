import React from 'react';
import 'styles/globals.css'
import "/styles/components/Inputs/select.css";
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
    const getLayout = Component.getLayout || ((page) => page);
    const queryClient = React.useRef(new QueryClient())

    return <SessionProvider session={session}>
        <QueryClientProvider client={queryClient.current}>
            <Hydrate state={pageProps.dehidratedState}>
                {getLayout(<Component {...pageProps} />)}
            </Hydrate>
        </QueryClientProvider>
    </SessionProvider>
}

export default MyApp
