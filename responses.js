// Optional JSON endpoint for the host to retrieve records.
// IMPORTANT: Add authentication before enabling this endpoint on a public site.
const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  const headers = { "Content-Type": "application/json" };
  if (event.httpMethod !== "GET") return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  try {
    const store = getStore("brijesh-birthday-responses");
    const { blobs } = await store.list();
    const rows = [];
    for (const blob of blobs) {
      const item = await store.get(blob.key, { type: "json" });
      if (item) rows.push(item);
    }
    rows.sort((a,b) => (b.timestamp || "").localeCompare(a.timestamp || ""));
    return { statusCode: 200, headers, body: JSON.stringify({ count: rows.length, responses: rows }) };
  } catch (error) {
    console.error("Could not read birthday responses", error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Storage is not configured or unavailable." }) };
  }
};
