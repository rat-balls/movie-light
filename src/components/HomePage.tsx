import React, { useEffect, useState } from 'react';

interface Episode {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=4d972c585f2eb70fe0193346f16af1b7";

export default function HomePage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setEpisodes(data.results);
        console.log(data.results);
      });
  }, []);

  if (episodes.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>HomePage</div>
      <div>
        {episodes.map((episode, i) => (
          <div key={i}>
            <p>Title: {episode.title}</p>
            <p>Overview: {episode.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
