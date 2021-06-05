import { useState } from 'react';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { GenreResponseProps, SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { GenreProvider } from './hooks/useGenre';


export function App() {
  // const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <GenreProvider>
        <SideBar
        // setSelectedGenre={setSelectedGenre}
        />
        <Content
        //  selectedGenre={selectedGenre} 
        />
      </GenreProvider>

    </div>
  )
}