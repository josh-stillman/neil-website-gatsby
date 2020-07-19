import React, { useState } from 'react';
import styled from 'styled-components';

import Player from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Wrapper = styled.div`
  width: 375px;
  .rhap_container {
    background-color: unset;
  }
`;

const Header = styled.div`
  font-size: 20px;
`;

const SONGS = [
  'Electric Neil - Neil Theme (live 2019).mp3',
  'Electric Neil - Dream Zone (live 2019).mp3',
  "Electric Neil - Can't Hardly Wait (live cover 2019).mp3",
  'Electric Neil - Low (live cover 2019).mp3',
];

export const AudioPlayer = () => {
  const [currentSong, setCurrentSong] = useState<number>(0);

  const nextSong = () => {
    setCurrentSong((currentSong + 1) % SONGS.length);
  };

  const prevSong = () => {
    const nextIndex = currentSong === 0 ? SONGS.length - 1 : currentSong - 1;
    setCurrentSong(nextIndex % SONGS.length);
  };

  const getHeaderText = () =>
    // eslint-disable-next-line no-useless-escape
    `${SONGS[currentSong].replace(/\.mp3/, '')} (${currentSong + 1}/${
      SONGS.length
    })`;

  return (
    <Wrapper>
      <Player
        header={<Header>{getHeaderText()}</Header>}
        src={SONGS[currentSong]}
        showSkipControls
        showJumpControls={false}
        onEnded={nextSong} // autoplay next song
        onClickNext={nextSong}
        onClickPrevious={prevSong}
      />
    </Wrapper>
  );
};
