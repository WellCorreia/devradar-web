import React, { useEffect, useState } from 'react';

function DevForm(props) {
    const { dev, onSubmit } = props
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [techs, setTechs] = useState('');
    const [github_username, setGithubUsername] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
        },
        (err) => {
            console.log(err);
        }, 
        {
            timeout: 30000,
        }
        )
    }, []);

    async function handleSubmit(e){
        e.preventDefault();
        await onSubmit({
            github_username,
            techs,
            longitude,
            latitude
        });

        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input
              type="text"
              name="github_username"
              id="github_username"
              onChange = {e => setGithubUsername(e.target.value)} 
              required
            />
          </div>
            
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              type="text"
              name="techs"
              id="techs"
              onChange = {e => setTechs(e.target.value)} 
              required
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number"
                name="latitude"
                id="latitude"
                value={latitude}
                onChange = {e => setLongitude(e.target.value)}
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number"
                name="longitude"
                id="longitude"
                value={longitude}
                onChange = {e => setLongitude(e.target.value)} 
                required
              />
            </div>
            <button type="submit">Salvar</button>
          </div>
        </form>
    )
}

export default DevForm;