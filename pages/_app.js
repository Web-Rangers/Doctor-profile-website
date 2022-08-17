import React from 'react';
import 'styles/globals.css'
import "/styles/components/Inputs/select.css";
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'


function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);
    const queryClient = React.useRef(new QueryClient())

    return <QueryClientProvider client={queryClient.current}>
        <Hydrate state={pageProps.dehidratedState}>
            {getLayout(<Component {...pageProps} />)}
        </Hydrate>
    </QueryClientProvider>
}

export default MyApp
