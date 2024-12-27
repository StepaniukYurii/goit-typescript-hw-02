export type Image = {
  id: string;
  alt_description: string | null;
  urls: {
    full: string;
    thumb: string;
  };
};
