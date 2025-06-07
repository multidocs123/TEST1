import { read, utils } from 'xlsx';

export interface Logo {
  id: string;
  creator: string;
  title: string;
  imageUrl: string;
  createdAt: string;
}

export const loadLogos = async (): Promise<Logo[]> => {
  try {
    const response = await fetch('/data/logos.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = utils.sheet_to_json(worksheet) as any[];

    return data.map(row => ({
      id: row.ID.toString(),
      creator: row.Creator,
      title: row.Title,
      imageUrl: row.imageUrl,
      createdAt: row.CreatedAt
    }));
  } catch (error) {
    console.error('Error loading logos data:', error);
    return [];
  }
};