import { translate } from "@vitalets/google-translate-api";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ error: 'Missing "text" field in request body' });
    }

    const { text: translation } = await translate(text, { to: "fr" });
    return res.status(200).json({ translation });
  } catch (error) {
    console.error("Error during translation:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
