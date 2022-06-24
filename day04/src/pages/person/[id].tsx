import { useRouter } from 'next/router';
import useSWR from 'swr';
import { BillionDetailsResponse } from 'types/api';

function BillionDetails() {
  const router = useRouter();
  const { data } = useSWR<BillionDetailsResponse>(`/person/${router.query.id}`);

  return <div>{data?.name}</div>;
}

export default BillionDetails;
