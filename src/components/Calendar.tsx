import React from 'react'
import { useEffect, useState } from 'react';
import './Calendar.scss'

export default function Calendar() {

    type seriesType = {
        adult: boolean,
        backdrop_path: string,
        first_air_date: string,
        genre_ids: number[],
        id: number,
        name: string,
        origin_country: string[],
        original_language: string,
        original_name: string,
        overview: string,
        popularity: number,
        poster_path: string,
        video: boolean,
        vote_average: number,
        vote_count: number,
        clicked: boolean
    }

    const srList: seriesType[] = [];

    const [seriesList, setSeriesList] = useState(srList)
    const [query, setQuery] = useState('')

    const API_KEY = '1321ab72499d42466b65c40a21df1192'
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`)

    useEffect(() => {
        async function fetchInfo() {
            if (query !== '') {
                setUrl(`https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${API_KEY}`);
            } else if (query === '') {
                setUrl(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`);
            }

            try {
                const res = await fetch(url);
                const d = await res.json();
                setSeriesList(d.results);
            } catch (error) {
                console.log(error);
            }
        }
        fetchInfo();
    }, [url, query])

    const Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className="calendar">
        <h1 className='title-page'>CALENDAR</h1>
          <div className="week-days">
            {Days.map((day, index) => (
              <div className="day" key={index}>
                <h3>{day}</h3>
                <div className="episodes">
                  {seriesList.length > 0 &&
                    seriesList
                      .slice(index * 6, index * 7 + 10)
                      .map((episode, idx) => (
                        <div className="episode" key={idx}>
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${episode.poster_path}`}

                            alt={`Episode ${idx + 1}`}
                          />
                        <p className="episodeSerie">{episode.name}</p>
                        </div>
                      ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }