import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    const studyData = response.results.map(page => ({
      date: page.properties["日付"].date.start,
      hours: page.properties["数値"].number,
    }));
    res.status(200).json(studyData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}