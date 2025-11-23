import React from 'react';

export type ScreenState = 'loading' | 'login' | 'desktop';

export interface DesktopIconProps {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface XPWindow {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  content: React.ReactNode;
  type: 'explorer' | 'browser' | 'system'; 
}

export interface FileTrack {
  title: string;
  artist: string;
  cover: string;
  type: 'file';
  url: string;
}

export interface YouTubeTrack {
  title: string;
  artist: string;
  cover: string;
  type: 'youtube';
  youtubeId: string;
}

export type MusicTrack = FileTrack | YouTubeTrack;
