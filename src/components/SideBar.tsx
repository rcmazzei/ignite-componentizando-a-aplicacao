import { useEffect, useState } from "react";
import { useGenre } from "../hooks/useGenre";
import { api } from "../services/api";
import { Button } from "./Button";
export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  setSelectedGenre: (genre: GenreResponseProps) => void;
}

export function SideBar() {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const { selectedGenre, setSelectedGenreId } = useGenre();
  // const [selectedGenreId, setSelectedGenreId] = useState(1);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  // useEffect(() => {
  //   api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
  //     setSelectedGenre(response.data);
  //   })
  // }, [selectedGenreId]);

  return (
    <>
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenre.id === genre.id}
            />
          ))}
        </div>
      </nav>
    </>
  )
}