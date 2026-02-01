export interface Item {
  title: string;
  comment: string;
  media_type?: string; // Optional for display, required for creation
}

export interface CustomItem {
  title: string;
  comment: string;
  media_type: 'movie' | 'tv';
}
