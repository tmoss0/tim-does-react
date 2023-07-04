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

      const urlLookup = 'https://fzxugulsv8.execute-api.us-west-2.amazonaws.com/production/v4/games';
      const awsAPIKey = process.env.REACT_APP_AWS_API_KEY;
      const localHost = 'http://localhost:5173/';
      const response = await fetch(urlLookup, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Access-Control-Allow-Origin': localHost,
          'Connection': 'Keep-Alive',
          'Content-Type': 'text/plain',
          'x-api-key': awsAPIKey
        },
        body: JSON.stringify({
          search: searchTerm,
          fields: 'screenshots'
        }),
      });

      const data = await response.json();
      console.log('Response: ' + JSON.stringify(data));
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
      <input type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={handleSearch} disabled={loading}>Search</button>

      {loading && <p>Loading...</p>}

      {searchResults.map((game) => (
        <div key={game.checksum}></div>
      ))}
    </div>
  )
}

export default Search;
