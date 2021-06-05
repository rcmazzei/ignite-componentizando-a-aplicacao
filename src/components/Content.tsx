import { useEffect, useState } from "react";
import { GenreResponseProps } from "../components/SideBar";
import { useGenre } from "../hooks/useGenre";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  selectedGenre: GenreResponseProps
}

export function Content() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const { selectedGenre } = useGenre();

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenre.id}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenre.id]);

  return (
    <>
      <div className="container">
        <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard
                key={movie.imdbID}
                title={movie.Title}
                poster={movie.Poster}
                runtime={movie.Runtime}
                rating={movie.Ratings[0].Value}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  )
}