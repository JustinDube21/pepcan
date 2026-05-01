const { json, readJson, supabase } = require("../lib/utils");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });
  try {
    const body = await readJson(req);
    const email = String(body.email || "").trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) return json(res, 400, { error: "Valid email is required." });

    const record = {
      email,
      full_name: String(body.fullName || "").trim() || null,
      source: String(body.source || "research_updates"),
      page: String(body.page || ""),
      metadata: { userAgent: req.headers["user-agent"] || null }
    };

    const data = await supabase("subscribers?on_conflict=email", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(record)
    });

    return json(res, 200, { ok: true, record: Array.isArray(data) ? data[0] : data });
  } catch (error) {
    return json(res, 503, { error: error.message || "Unable to save subscriber." });
  }
};
