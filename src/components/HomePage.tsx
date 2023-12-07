import { useEffect, useState} from 'react';
import { faSearch, } from '@fortawesome/free-solid-svg-icons';
import './HomePage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState('All');

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
      clicked : boolean
  }

  const srList: seriesType[] = [];

  const [seriesList, setSeriesList] = useState(srList)
  const [query, setQuery] = useState('')

  const API_KEY='1321ab72499d42466b65c40a21df1192'
  const [url, setUrl] = useState(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`)

  useEffect(() => {
    async function fetchInfo() { 
      if(query !== '') {
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

  const handleAdd = (serieId: number) => {
    const updatedSeries = seriesList.map((serie: seriesType) => {
      if (serie.id === serieId) {
        return { ...serie, clicked: !serie.clicked };
      }
      return serie;
    });
    setSeriesList(updatedSeries);
  };

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
  };


  return (
    <div className="home-page">
      {seriesList.length > 0 && (
        <div 
          className="featured-serie" 
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${seriesList[0].poster_path})` }}
        >
          <div className="gradient-overlay"></div>
          <div className="text-content">
            <div className="overlay">
              <p className='TitleOverlay'>{seriesList[0].name}</p>
              <p className='OverviewOverlay'>{seriesList[0].overview.substring(0, 225).concat('...')}</p>
              <p className='OptionOverlay'>
                <span className="bubble">{'Rating' + '  ' + seriesList[0].vote_average}</span>
              </p>
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
      <form className='FormSearch'>
        <div className="search-bar">
          <span className="search-icon"><FontAwesomeIcon icon={faSearch} /></span>
          <input
            type="text"
            placeholder="Search"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>
      <div className='Filter'>
          <button
            className={`filter-button ${selectedFilter === 'All' ? 'selected' : ''}`}
            onClick={() => handleFilter('All')}
          >
            All
          </button>
          <button
            className={`filter-button ${selectedFilter === 'sci-Fi & Fantasy' ? 'selected' : ''}`}
            onClick={() => handleFilter('sci-Fi & Fantasy')}
          >
            Sci-Fi & Fantasy
          </button>
          <button
            className={`filter-button ${selectedFilter === 'Drama' ? 'selected' : ''}`}
            onClick={() => handleFilter('Drama')}
          >
            Drama
          </button>
          <button
            className={`filter-button ${selectedFilter === 'Crime' ? 'selected' : ''}`}
            onClick={() => handleFilter('Crime')}
          >
            Crime
          </button>
          <button
            className={`filter-button ${selectedFilter === 'Animation' ? 'selected' : ''}`}
            onClick={() => handleFilter('Animation')}
          >
            Animation
          </button>
          <button
            className={`filter-button ${selectedFilter === 'Comedy' ? 'selected' : ''}`}
            onClick={() => handleFilter('Comedy')}
          >
            Comedy
          </button>
          <button
            className={`filter-button ${selectedFilter === 'Documentary' ? 'selected' : ''}`}
            onClick={() => handleFilter('Documentary')}
          >
            Documentary
          </button>
          <button
            className={`filter-button ${selectedFilter === 'Action & Adventure' ? 'selected' : ''}`}
            onClick={() => handleFilter('Action & Adventure')}
          >
            Action & Adventure
          </button>
        </div>
    <div className="serie-list">
      {seriesList.map((serie: seriesType, index) => (
        <div className="serie-item" key={index}>
          <div className="serie-poster">
            <img className="serie-image" src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`} alt={serie.name} />
            <button
                className={`add-button ${serie.clicked ? 'clicked' : ''}`}
                onClick={() => handleAdd(serie.id)}>
                {serie.clicked ? '✓' : '+'}
              </button>
              <p className="TitleSerie">{serie.name}</p>
              <p className="bubble">{'Rating' + '  ' + serie.vote_average}</p>
          </div>
        </div>
    ))}
        </div>
      </div>
    );
}


export default HomePage;