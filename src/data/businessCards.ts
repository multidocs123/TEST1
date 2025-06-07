import { read, utils } from 'xlsx';

export interface BusinessCard {
  id: string;
  creator: string;
  title: string;
  imageUrl: string;
  createdAt: string;
}

export const loadBusinessCards = async (): Promise<BusinessCard[]> => {
  try {
    const response = await fetch('/data/business cards.xlsx');
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
    console.error('Error loading business cards data:', error);
    return [];
  }
};