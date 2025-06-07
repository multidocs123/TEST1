import { read, utils } from 'xlsx';

export interface Poster {
  id: string;
  title: string;
  creator: string;
  imageUrl: string;
  description?: string;
  category?: string;
  dateCreated?: string;
}

export const loadPosters = async (): Promise<Poster[]> => {
  try {
    const response = await fetch('/data/posters.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = utils.sheet_to_json(worksheet) as any[];

    return data.map(row => ({
      id: row.ID.toString(),
      title: row.Title,
      creator: row.Creator,
      imageUrl: row.imageUrl,
      description: row.Description,
      category: row.Category,
      dateCreated: row.DateCreated
    }));
  } catch (error) {
    console.error('Error loading posters data:', error);
    return [];
  }
};