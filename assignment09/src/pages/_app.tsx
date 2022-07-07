import axios from 'axios';
import { SWRConfig } from 'swr';
import 'styles/global.css';

const client = axios.create({
  baseURL: 'https://dogs-api.nomadcoders.workers.dev',
});

export default function App({ Component, pageProps }: any) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => client.get(url).then((res) => res.data),
      }}
    >
      <div className="w-full">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
