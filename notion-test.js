const { Client } = require("@notionhq/client");

// Notionクライアントを初期化
const notion = new Client({ auth: "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" });

// データベースID
const databaseId = "1b4668bb-e8f9-805d-a532-dc60e8177967";

// データベースからデータを取得する関数
async function fetchStudyData() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    return response.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// データを取得して表示
fetchStudyData().then(data => {
  console.log("Fetched data:", JSON.stringify(data, null, 2)); // JSON形式で整形して表示
}).catch(error => {
  console.error("Error:", error);
});