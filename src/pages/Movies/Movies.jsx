import { useState, useEffect } from 'react';
import { QueryForm } from 'components/QueryForm/QueryForm';
import { fetchMovieBySearchQuery } from 'services/requestsForMovies';
import { useSearchParams, Outlet } from 'react-router-dom';

import { MoviesList } from 'components/MoviesList/MoviesList';

export const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  useEffect(() => {
    if (!query) {
      return;
    }
    async function fetch() {
      const {
        data: { results },
      } = await fetchMovieBySearchQuery(query);

      setMovies(results);
    }
    fetch();
  }, [query]);
  return (
    <>
      <QueryForm />
      {movies && (
        <>
          <MoviesList movies={movies} />
          <Outlet />
        </>
      )}
    </>
  );
};
