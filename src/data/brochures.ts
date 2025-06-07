import { read, utils } from 'xlsx';

export interface Brochure {
  id: string;
  creator: string;
  title: string;
  imageUrl: string;
  createdAt: string;
}

export const loadBrochures = async (): Promise<Brochure[]> => {
  try {
    const response = await fetch('/data/brochures.xlsx');
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
    console.error('Error loading brochures data:', error);
    return [];
  }
};