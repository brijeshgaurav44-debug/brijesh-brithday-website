// Netlify Function: stores responses in Netlify Blobs.
// Enable Netlify Blobs for the site (supported on Netlify-hosted deployments).
const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };

  let data;
  try { data = JSON.parse(event.body || "{}"); }
  catch { return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) }; }

  const name = String(data.name || "").replace(/\s+/g, " ").trim().slice(0, 80);
  const party = String(data.party || "").trim();
  if (!name) return { statusCode: 400, headers, body: JSON.stringify({ error: "Please enter your name." }) };
  if (!["Yes", "No"].includes(party)) return { statusCode: 400, headers, body: JSON.stringify({ error: "Choose Yes or No." }) };

  try {
    const store = getStore("brijesh-birthday-responses");
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const record = { id, timestamp: new Date().toISOString(), name, party };
    await store.setJSON(id, record);
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (error) {
    console.error("Could not save birthday response", error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Storage is not configured or unavailable." }) };
  }
};
