import { emojiMap, reverseEmojiMap } from "../Components/EmojiMap"
import GraphemeSplitter from "grapheme-splitter";

export function base64ToEmoji(base64Str) {
  return base64Str.split("").map(c => emojiMap[c] || "❓").join("");
}

export function emojiToBase64(emojiStr) {
  const splitter = new GraphemeSplitter();
  const graphemes = splitter.splitGraphemes(emojiStr);

  const base64 = graphemes.map(emoji => {
    const char = reverseEmojiMap[emoji];
    if (!char) {
      throw new Error(`❌ Unknown emoji '${emoji}' found. Decryption aborted.`);
    }
    return char;
  }).join("");

  return base64;
}