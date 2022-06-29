import '../styles/globals.css';

import axios from 'axios';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

const axiosInstance = axios.create({
  baseURL: 'https://billions-api.nomadcoders.workers.dev',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => {
          const response = await axiosInstance.get(url);
          return response.data;
        },
      }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
