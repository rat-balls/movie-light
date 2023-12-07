import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import './HomePage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HomePage() {

  const queryParams = useParams();

  type movieType = {
      adult: boolean,
      backdrop_path: string,
      genre_ids: number[],
      id: number,
      original_language: string,
      original_title: string,
      overview: string,
      popularity: number,
      poster_path: string,
      release_date: string,
      title: string,
      video: boolean,
      vote_average: number,
      vote_count: number
  }

  const mvList: movieType[] = [];

  const [movieList, setMovieList] = useState(mvList)
  const [filteredMovieList, setFilteredMovieList] = useState(mvList)

  const API_KEY='1321ab72499d42466b65c40a21df1192'
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`

  useEffect(() => {
    async function fetchInfo() { 
      const res = await fetch(url)
      const d = await res.json()
      d.results.filter((movie: movieType) => (movie.title == 'Napoleon' ? movie.title = 'Nabileon' : movie.title = movie.title))
      setMovieList(d.results)
    }
    fetchInfo();
  }, [url])


  return (
    <div className="home-page">
      {movieList.length > 0 && (
      <div 
        className="featured-movie" 
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieList[0].poster_path})` }}
      >
        <div className="overlay">
          <p className='TitleOverlay'>{movieList[0].title}</p>
          <p className='OverviewOverlay'>{movieList[0].overview.substring(0, 225).concat('...')}</p>
          <p className='OptionOverlay'>
            <span className="bubble">{movieList[0].release_date}</span>
          </p>
        </div>
      </div>
    )}
      <form className='FormSearch'>
        <div className="search-bar">
          <span className="search-icon"><FontAwesomeIcon icon={faSearch} /></span>
          <input
            type="text"
            placeholder="Search"
            name="query"
          />
        </div>
      </form>
     <div className="movie-list">
      {movieList.map((movie: movieType, index) => (
        <div className="movie-item">
          <img className="movie-image" src={'https://image.tmdb.org/t/p/w500/' + movie.poster_path}></img>
          <p className='TitleMovie'>
            {movie.title.length > 22 ? movie.title.substring(0,22).concat('...') : movie.title}
          </p>
        </div>
       ))}
      </div>
    </div>
  )
}

export default HomePage;