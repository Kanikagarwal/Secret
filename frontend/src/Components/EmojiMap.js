// emojiMap.js
const emojiMap = {
  // Lowercase Letters
  a: "🍎",
  b: "🐝",
  c: "🐈",   // changed from 🐱 to 🐈 (cat)
  d: "🐕",   // changed from 🐶 to 🐕 (dog)
  e: "🦅",
  f: "🐸",
  g: "🦒",
  h: "🏠",
  i: "🍦",
  j: "🕹️",
  k: "🔑",
  l: "🦁",
  m: "🌝",
  n: "👃",
  o: "🐙",
  p: "🅿️",
  q: "🍳",
  r: "🤖",
  s: "🐍",
  t: "🌴",
  u: "🦄",
  v: "🎻",
  w: "🌊",
  x: "❌",
  y: "🍸",
  z: "⚡",

  // Capital Letters - all unique emojis now
  A: "🧁",
  B: "🍌",
  C: "🌈",
  D: "🛸",
  E: "🥚",
  F: "🌻",
  G: "🦍",
  H: "🏰",
  I: "🧊",
  J: "🎷",
  K: "🪁",
  L: "🦞",
  M: "🌋",
  N: "🎶",
  O: "🧅",
  P: "🥞",
  Q: "👑",
  R: "🌟",   // changed from 🌈 to 🌟 (star)
  S: "🎯",
  T: "🧵",
  U: "🎮",
  V: "🪄",
  W: "📐",
  X: "🪀",
  Y: "🦓",
  Z: "🐬",   // changed from 🦓 to 🐬 (unique)

  // Space
  " ": "⬜",

  // Numbers
  0: "0️⃣",
  1: "1️⃣",
  2: "2️⃣",
  3: "3️⃣",
  4: "4️⃣",
  5: "5️⃣",
  6: "6️⃣",
  7: "7️⃣",
  8: "8️⃣",
  9: "9️⃣",

  // Symbols - all unique
  "!": "❗",
  "?": "❓",
  ".": "🔸",
  ",": "🔹",
  "@": "📧",
  "#": "#️⃣",
  "$": "💲",
  "%": "💯",
  "^": "🆙",
  "&": "➕",
  "*": "✨",
  "(": "🔘",
  ")": "⚫",
  "-": "➖",
  "_": "@",   // changed from ➖ to ➗ (different from -)
  "+": "🟰",   // changed from ➕ to 🟰 (different from &)
  "=": "➗",   // changed from 🟰 to ➗ (new)
  "/": "⏰",
  ":": "🔕",
  ";": "📝",
  "'": "🔒",
  '"': "🟥",
  "[": "🟩",
  "]": "🟦",
  "{": "🟨",
  "}": "◀️",
  "<": "▶️",
  ">": "📏",
  "|": "🪞",
  "\\": "🎛️",
  "`": "🌪️",
  "~": "🛡️"
};

// Auto-generate reverseEmojiMap
const reverseEmojiMap = {};
for (const [char, emoji] of Object.entries(emojiMap)) {
  const normalizedEmoji = emoji.normalize("NFC");
  if (reverseEmojiMap[normalizedEmoji]) {
    console.warn(`Duplicate emoji for ${char}: ${normalizedEmoji}`);
  } else {
    reverseEmojiMap[normalizedEmoji] = char;
  }
}

export { emojiMap, reverseEmojiMap };
