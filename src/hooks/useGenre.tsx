import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

export interface Genre {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenreProviderProps {
  children: ReactNode;
}

interface GenreContextData {
  selectedGenre: Genre;
  setSelectedGenreId: (selectedGenreId: number) => void;
}

const GenreContext = createContext<GenreContextData>({} as GenreContextData);

export const GenreProvider = ({ children }: GenreProviderProps) => {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    api.get<Genre>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <GenreContext.Provider value={{ selectedGenre, setSelectedGenreId }}>
      {children}
    </GenreContext.Provider>
  )
}

export const useGenre = () => {
  const context = useContext(GenreContext);

  return context;
}