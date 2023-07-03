import React, { useState } from 'react';

interface Game {
  checksum: string;
  name: string;
  platforms: string[];
  url: string;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const urlAuthorization = 'https://id.twitch.tv/oauth2/token';
      const urlLookup = 'https://api.igdb.com/v4/games';
      const clientID = 'kk71m14tusl34ammlusj7soam1yju2';
      const clientSecret = 'xfocg1v5jrdh8l06drgu91bc7nvg3h';

      const authorization = await fetch(`${urlAuthorization}?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`, {
        method: 'POST'
      });

      const authRes = await authorization.json();
      const accessToken = authRes.access_token;

      const response = await fetch(urlLookup, {
        method: 'POST',
        headers: {
          'Client-ID': clientID,
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          search: searchTerm,
          fields: 'id,name,platforms,url'
        }),
      });

      const data = await response.json();
      console.log("Response: " + JSON.stringify(data));
      setSearchResults(data);
    }
    catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch} disabled={loading}>Search</button>

      {loading && <p>Loading...</p>}

      {searchResults.map((game) => (
        <div key={game.checksum}></div>
      ))}
    </div>
  )
}

export default Search;
