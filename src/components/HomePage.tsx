import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { faSearch, } from '@fortawesome/free-solid-svg-icons';
import './HomePage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HomePage() {

  const queryParams = useParams();

  const [clicked, setClicked] = useState(false);

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
  const [filteredSeriesList, setFilteredSeriesList] = useState(srList)

  const API_KEY='1321ab72499d42466b65c40a21df1192'
  const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`

  useEffect(() => {
    async function fetchInfo() { 
      try {
        const res = await fetch(url);
        const d = await res.json();
        setSeriesList(d.results);
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
              <span className="bubble">{seriesList[0].popularity}</span>
            </p>
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
            />
          </div>
        </form>
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
            </div>
            <p className="TitleSerie">
              {serie.name.length > 22 ? serie.name.substring(0, 22).concat('...') : serie.name}
            </p>
          </div>
        ))}
        </div>
      </div>
    );
}


export default HomePage;