import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  const path = event.path.replace("/.netlify/functions/notion", "");
  const url = `https://api.notion.com${path}`;

  const response = await fetch(url, {
    method: event.httpMethod,
    headers: {
      "Authorization": `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: event.body ?? undefined,
  });

  const data = await response.json();

  return {
    statusCode: response.status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};

export { handler };