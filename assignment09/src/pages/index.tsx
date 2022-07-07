import Button from 'components/Button';
import NavBar from 'components/NavBar';
import React from 'react';
import useSWR from 'swr';

interface RandomDogResponse {
  url: string;
  isLiked: boolean;
}

export default () => {
  const { data, mutate } = useSWR<RandomDogResponse>('/', {
    revalidateOnFocus: false,
  });

  const handleReload = () => {
    mutate();
  };

  const handleLike = () => {
    if (!data) {
      return;
    }
    mutate({ ...data, isLiked: !data.isLiked }, false);
  };

  return (
    <>
      <NavBar />
      {data ? (
        <div className="max-w-xl mx-auto mt-8 flex flex-col justify-center items-center">
          <video src={data.url} autoPlay={true} loop={true} className="w-96" />
          <div className="flex text-center mt-4 space-x-2">
            <Button onClick={handleReload}>New Dog!</Button>
            <Button onClick={handleLike}>
              {data.isLiked ? 'Dislike' : 'Like'}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};
