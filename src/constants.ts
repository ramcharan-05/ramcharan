import { Track } from './types';

export const TRACKS: Track[] = [
  {
    id: '1',
    title: 'SUBURBAN_DARKNESS.EXE',
    artist: 'NEURAL_LINK_v3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/cyber1/400/400'
  },
  {
    id: '2',
    title: 'NEURAL_DECAY.SYS',
    artist: 'VOID_SCANNER',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/cyber2/400/400'
  },
  {
    id: '3',
    title: 'POST_HUMAN_ECHO.LOG',
    artist: 'SILICON_SOUL',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/cyber3/400/400'
  }
];

export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
export const SPEED_INCREMENT = 2;
