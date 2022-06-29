import BillionCard from 'components/billionCard';
import type { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';
import { BillionItem } from 'types/api';

const Home: NextPage = () => {
  const { data } = useSWR<BillionItem[]>('/');

  return (
    <div className="grid grid-cols-4 gap-4">
      <Head>
        <title>홈</title>
      </Head>
      {data?.map((billion) => (
        <BillionCard key={billion.id} {...billion} />
      ))}
    </div>
  );
};

export default Home;
