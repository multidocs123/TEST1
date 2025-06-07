import { read, utils } from 'xlsx';

export interface Thumbnail {
  id: string;
  creator: string;
  title: string;
  imageUrl: string;
  createdAt: string;
}

export const loadThumbnails = async (): Promise<Thumbnail[]> => {
  try {
    const response = await fetch('/data/thumbnails.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = utils.sheet_to_json(worksheet) as any[];

    return data.map(row => ({
      id: row.ID.toString(),
      creator: row.Creator,
      title: row.Title,
      imageUrl: row.ImageURL,
      createdAt: row.CreatedAt
    }));
  } catch (error) {
    console.error('Error loading thumbnails data:', error);
    return [];
  }
};