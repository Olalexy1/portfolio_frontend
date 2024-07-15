import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { urlFor, client } from '../client';

interface AboutData {
  _type: string;
  title: string;
  imgUrl: string;
  description: string;
}

const fetchAbouts = async () => {
  const query = '*[_type == "about"] | order(_createdAt asc)';
  const data = await client.fetch<AboutData[]>(query);
  return data;
};

const useFindAllAbouts = () => {
  const [abouts, setAbouts] = useState<AboutData[]>([]);

  const { isLoading, error, data } = useQuery('about', fetchAbouts);

  useEffect(() => {
    if (data) {
      setAbouts(data);
    }
  }, [data]);

  return { isLoading, error, abouts };
};

export default useFindAllAbouts;
