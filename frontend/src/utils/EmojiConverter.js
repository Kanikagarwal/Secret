import { emojiMap, reverseEmojiMap } from "../Components/EmojiMap";
import GraphemeSplitter from "grapheme-splitter";

export function base64ToEmoji(base64Str) {
  return base64Str.split("").map(c => emojiMap[c] || "❓").join("");
}

export function emojiToBase64(emojiStr) {
  const splitter = new GraphemeSplitter();
  const graphemes = splitter.splitGraphemes(emojiStr);

  const base64 = graphemes.map((emoji, index) => {
    const normalized = emoji.normalize("NFC"); // Normalize emoji to fix mobile/desktop differences
    const char = reverseEmojiMap[normalized];

    if (!char) {
      console.error(`❌ Unknown emoji at position ${index}: '${emoji}' (normalized: '${normalized}')`);
      throw new Error(`❌ Unknown emoji '${emoji}' found. Decryption aborted.`);
    }

    return char;
  }).join("");

  console.log("✅ Emoji to base64 conversion completed:");
  console.log("  Original input:", emojiStr);
  console.log("  Graphemes:", graphemes);
  console.log("  Output base64:", base64);

  return base64;
}
