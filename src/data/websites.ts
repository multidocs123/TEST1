import { read, utils } from 'xlsx';

export interface Website {
  id: string;
  creator: string;
  title: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  link:string;
  createdAt: string;
}

export const loadWebsites = async (): Promise<Website[]> => {
  try {
    const response = await fetch('/data/websites.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = read(arrayBuffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = utils.sheet_to_json(worksheet) as any[];

    return data.map(row => ({
      id: row.ID.toString(),
      creator: row.Creator,
      title: row.Title,
      image1: row.Image1,
      image2: row.Image2,
      image3: row.Image3,
      image4: row.Image4,
      link: row.link,
      createdAt: row.CreatedAt
    }));
  } catch (error) {
    console.error('Error loading websites data:', error);
    return [];
  }
};