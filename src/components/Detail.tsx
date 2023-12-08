import './Detail.scss';
import { useEffect, useState } from 'react';

function Detail() {
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

    const handleAdd = (serieId: number) => {
        const updatedSeries = seriesList.map((serie: seriesType) => {
            if (serie.id === serieId) {
                return { ...serie, clicked: !serie.clicked };
            }
            return serie;
        });
        setSeriesList(updatedSeries);
    };

    const srList: seriesType[] = [];

    const [seriesList, setSeriesList] = useState(srList)
    const [query, setQuery] = useState('')
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

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

    const fakeSeasons = [
        { id: 1, season_number: 1, episodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
        { id: 2, season_number: 2, episodes: [1, 2, 3, 4, 5, 6,] },
        { id: 3, season_number: 3, episodes: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    ];

    return (
        <div className="detail-page">
            {seriesList.length > 0 && (
                <div
                    className="featured-serie"
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${seriesList[0].poster_path})` }}
                >
                    <div className="gradient-overlay"></div>
                    <div className="text-content">
                        <div className="overlay">
                            <p className='TitleOverlay'>{seriesList[0].name}</p>
                            <button
                                className={`add-button-featured ${seriesList[0].clicked ? 'clicked' : ''}`}
                                onClick={() => handleAdd(seriesList[0].id)}
                            >
                                {seriesList[0].clicked ? '✓' : '+'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {seriesList.length > 0 && (
                <div className="episode-grid-container">
                    {fakeSeasons.map((season) => (
                        <div key={season.id} className="season-container">
                            <h3 className='Saison'>Season {season.season_number}</h3>
                            <div className="episode-inner-grid">
                                {season.episodes.map((episodeNumber) => (
                                    <div key={episodeNumber} className="episode-item">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200/${seriesList[0].poster_path}`}
                                            alt={`Episode ${episodeNumber}`}
                                        />
                                        <p>Episode {episodeNumber}</p>
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
