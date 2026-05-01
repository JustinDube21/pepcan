const { json, requireAdmin, supabase } = require("../../lib/utils");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed." });
  if (!requireAdmin(req, res)) return;

  try {
    const records = await supabase("orders?select=*&order=created_at.desc&limit=200", { method: "GET" });
    return json(res, 200, { records });
  } catch (error) {
    return json(res, 503, { error: error.message || "Unable to load orders." });
  }
};
