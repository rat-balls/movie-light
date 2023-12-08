import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear } from '@fortawesome/free-solid-svg-icons'
import './UserPage.scss'
import { getAuth, onAuthStateChanged, updateEmail, updatePassword } from 'firebase/auth';
import { app } from '..';

function UserPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const auth = getAuth(app);

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

  const [errorMsg, setErrorMsg] = useState('');

  const API_KEY = '1321ab72499d42466b65c40a21df1192'
  const [url] = useState(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`)

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
  }, [url]);


  const handleValidateSettings = () => {
    if(auth.currentUser) {
      updatePassword(auth.currentUser, password).catch((error) => {
        console.log(error)
        setErrorMsg(error.message);
      });
      updateEmail(auth.currentUser, email).catch((error) => {
        console.log(error)
        setErrorMsg(error.message);
      });
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user && user.displayName !== null) {
      setDisplayName(user.displayName);
    }
  })

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
    <div className="user-page">
      <div className="user-header">
        <div className="user-info">
          <FontAwesomeIcon icon={faUser} className="profile-icon" />
          <h1 className="user-name">{displayName}</h1>
        </div>
      </div>
      {(
        <div className="settings">
          <div className="settings-item">
            <p>Change email</p>
            <input
              type="email"
              placeholder="New Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="settings-item">
            <p>Change password</p>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMsg !== '' && <p>{errorMsg}</p>}
          <button className="validate-settings-button" onClick={handleValidateSettings}>
            Validate the settings
          </button>
        </div>
      )}
      <div className="user-movies">
        <p>My Favorite Shows</p>
        <hr className="divider" />
      </div>
      <div className="serie-list">
        {seriesList.slice(0, 5).map((serie: seriesType, index) => (
          <div className="serie-item" key={index}>
            <div className="serie-poster">
              <img
                className="serie-image"
                src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`}
                alt={serie.name}
              />
              <button
                className={`add-button ${serie.clicked ? 'clicked' : ''}`}
                onClick={() => handleAdd(serie.id)}
              >
                {serie.clicked ? '✓' : '+'}
              </button>
              <p className="TitleSerie">{serie.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPage;
