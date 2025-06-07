import { read, utils } from 'xlsx';

export interface Reel {
  id: string;
  creator: string;
  title: string;
  videoUrl: string;
  thumbnail?: string;
  createdAt: string;
}

export const loadReels = async (): Promise<Reel[]> => {
  try {
    const response = await fetch('/data/reels.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = utils.sheet_to_json(worksheet) as any[];

    return data.map(row => ({
      id: row.ID.toString(),
      creator: row.Creator,
      title: row.Title,
      videoUrl: row.VideoURL,
      thumbnail: row.Thumbnail,
      createdAt: row.CreatedAt
    }));
  } catch (error) {
    console.error('Error loading reels data:', error);
    return [];
  }
};