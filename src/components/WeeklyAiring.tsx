import React, { useEffect, useState } from 'react';

const API_KEY = '4d972c585f2eb70fe0193346f16af1b7';
const API_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&air_date.gte=2023-12-01&air_date.lte=2023-12-07`;

interface Episode {
  adult: boolean;
  backdropPath: string;
  genreIds: number[];
  id: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

const WeeklyAiringPage = () => {
  const [airingData, setAiringData] = useState<Episode[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setAiringData(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Log the data after the state is updated
    console.log(airingData);
  }, [airingData]);

  return (
    <div>
      <h1>Weekly Airing</h1>
      {airingData.map((item) => (
        <div key={item.id}>
          <h2>{item.originalTitle}</h2>
          <p>Release Date: {item.releaseDate}</p>
          <p>{item.overview}</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyAiringPage;
