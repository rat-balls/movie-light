import { useParams } from 'react-router-dom';
import './Detail.scss';
import { useEffect, useState } from 'react';

function Detail() {

    type seriesType = {
        adult:                boolean;
        backdrop_path:        string;
        created_by:           CreatedBy[];
        episode_run_time:     number[];
        first_air_date:       Date;
        genres:               Genre[];
        homepage:             string;
        id:                   number;
        in_production:        boolean;
        languages:            string[];
        last_air_date:        Date;
        last_episode_to_air:  TEpisodeToAir;
        name:                 string;
        next_episode_to_air:  TEpisodeToAir;
        networks:             Network[];
        number_of_episodes:   number;
        number_of_seasons:    number;
        origin_country:       string[];
        original_language:    string;
        original_name:        string;
        overview:             string;
        popularity:           number;
        poster_path:          string;
        production_companies: Network[];
        production_countries: ProductionCountry[];
        seasons:              Season[];
        spoken_languages:     SpokenLanguage[];
        status:               string;
        tagline:              string;
        type:                 string;
        vote_average:         number;
        vote_count:           number;
        clicked:              boolean;  
    }
    
    type CreatedBy = {
        id:           number;
        credit_id:    string;
        name:         string;
        gender:       number;
        profile_path: string;
    }

    type Genre = {
        id:   number;
        name: string;
    }
    
    type TEpisodeToAir = {
        id:              number;
        name:            string;
        overview:        string;
        vote_average:    number;
        vote_count:      number;
        air_date:        Date;
        episode_number:  number;
        episode_type:    string;
        production_code: string;
        runtime:         null;
        season_number:   number;
        show_id:         number;
        still_path:      null | string;
    }
    
    type Network = {
        id:             number;
        logo_path:      string;
        name:           string;
        origin_country: string;
    }
    
    type ProductionCountry = {
        iso_3166_1: string;
        name:       string;
    }
    
    type Season = {
        air_date:      Date | null;
        episode_count: number;
        id:            number;
        name:          string;
        overview:      string;
        poster_path:   null | string;
        season_number: number;
        vote_average:  number;
    }
    
    type SpokenLanguage = {
        english_name: string;
        iso_639_1:    string;
        name:         string;
    }

    type DetailedSeasons = {
        _id:           string;
        air_date:      null;
        episodes:      Episode[];
        name:          string;
        overview:      string;
        id:            number;
        poster_path:   string;
        season_number: number;
        vote_average:  number;
    }
    
    type Episode = {
        air_date:        null;
        episode_number:  number;
        episode_type:    string;
        id:              number;
        name:            string;
        overview:        string;
        production_code: string;
        runtime:         number;
        season_number:   number;
        show_id:         number;
        still_path:      null;
        vote_average:    number;
        vote_count:      number;
        crew:            any[];
        guest_stars:     any[];
    }
    
    
    const params = useParams();    
    const [seriesList, setSeriesList] = useState<seriesType[]>([])
    const [seasonList, setSeasonList] = useState<DetailedSeasons[]>([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const API_KEY = 'f5ae756784f8ca7c4c68e131ad43b02c'
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/tv/${params.series_id}?api_key=${API_KEY}`)

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWFlNzU2Nzg0ZjhjYTdjNGM2OGUxMzFhZDQzYjAyYyIsInN1YiI6IjY1NzJlMDc4Y2FhYjZkMDBlYWQ0NjdlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sBQ4NTP0TvNAgTw1rn8MdtooQz-WAyhhWFFSL6ENE4E'
            }
        };
        async function fetchInfo() {
            try {
                const res = await fetch(url, options);
                const d = await res.json();
                setSeriesList(oldList => [oldList, d]);
                d.seasons.forEach(async (season: Season) => {
                    console.log(season.season_number)
                    fetch(`https://api.themoviedb.org/3/tv/${params.series_id}/season/${season.season_number}?${API_KEY}`, options)
                        .then(res => res.json())
                        .then(d => {setSeasonList(oldList => [...oldList, d]); console.log(d)})
                        .catch(err => console.error(err));
                });
            } catch (error) {
                console.log(error);
            }
        }
        fetchInfo();
    }, [url])

    const handleAdd = (serieId: number) => {
        const updatedSeries = seriesList.map((serie: seriesType) => {
            if (serie.id === serieId) {
                return { ...serie, clicked: !serie.clicked };
            }
            return serie;
        });
        setSeriesList(updatedSeries);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const handleRatingChange = (value: number) => {
        setRating(value);
    };

    const submitComment = () => {
        setComment('');
        setRating(0);
    };

    return (
        <div className="home-page">
            {( seriesList !== undefined && seriesList.length > 0) && (
                <div
                    className="featured-serie"
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${seriesList[1].poster_path})` }}
                >
                    <div className="gradient-overlay"></div>
                    <div className="text-content">
                        <div className="overlay">
                            <p className='TitleOverlay'>{seriesList[1].name}</p>
                            <button
                                className={`add-button-featured ${seriesList[1].clicked ? 'clicked' : ''}`}
                                onClick={() => handleAdd(seriesList[1].id)}
                            >
                                {seriesList[1].clicked ? '✓' : '+'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {( seriesList !== undefined && seriesList.length > 0) && (
                <div className="episode-grid-container">
                    {(seasonList !== undefined && seasonList.length > 0) && seasonList.map((season) => (
                        <div key={season._id} className="season-container">
                            <h3 className='Saison'>Season {season.season_number}</h3>
                            <div className="episode-inner-grid">
                                {season.episodes.map((episode) => (
                                    <div key={episode.episode_number} className="episode-item">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200/${episode.still_path}`}
                                            alt={`Episode ${episode.episode_number}`}
                                        />
                                        <p>Episode {episode.episode_number}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="comment-section">
                <h2>Comments</h2>
                <textarea
                    placeholder="Write your comment..."
                    value={comment}
                    onChange={handleCommentChange}
                />
                <div className="rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} onClick={() => handleRatingChange(star)}>
                            {star <= rating ? '★' : '☆'}
                        </span>
                    ))}
                </div>
                <button onClick={submitComment}>Submit</button>
            </div>
        </div>
    );
       
}

export default Detail;
