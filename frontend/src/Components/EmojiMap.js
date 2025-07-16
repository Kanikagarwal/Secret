// emojiMap.js
const emojiMap = {
  // Lowercase Letters
  a: "🍎",
  b: "🐝",
  c: "🐈",
  d: "🐕",
  e: "🦅",
  f: "🐸",
  g: "🦒",
  h: "🏠",
  i: "🍦",
  j: "🎮",     // replaced 🕹️
  k: "🔑",
  l: "🦁",
  m: "🌝",
  n: "👃",
  o: "🐙",
  p: "🥁",     // replaced 🅿️
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

  // Capital Letters
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
  R: "🌟",
  S: "🎯",
  T: "🧵",
  U: "🧠",     // replaced 🎮 used already for j
  V: "🪄",
  W: "📐",
  X: "⚔️",     // replaced 🪀
  Y: "🦓",
  Z: "🐬",

  // Space
  " ": "⬜",

  // Numbers (replaced emoji keycaps with plain digits or symbols)
  0: "🍩",
  1: "🥇",
  2: "🥈",
  3: "🥉",
  4: "🍀",
  5: "🖐️",
  6: "🎱",
  7: "🌈",
  8: "🎱", // intentionally duplicated for demonstration, you may replace
  9: "🐾",

  // Symbols (safe versions)
  "!": "❗",
  "?": "❓",
  ".": "🔸",
  ",": "🔹",
  "@": "📧",
  "#": "🎯",     // replaced #️⃣
  "$": "💲",
  "%": "💯",
  "^": "🆙",
  "&": "🤝",     // replaced ➕
  "*": "✨",
  "(": "🔘",
  ")": "⚫",
  "-": "➖",
  "_": "🧷",     // safe emoji
  "+": "➕",
  "=": "🧮",     // replaced ➗
  "/": "⏰",
  ":": "🔕",
  ";": "📝",
  "'": "🔒",
  '"': "🟥",
  "[": "🟩",
  "]": "🟦",
  "{": "🟨",
  "}": "◀",      // removed variation
  "<": "▶",      // removed variation
  ">": "📏",
  "|": "🪞",
  "\\": "🎛",    // removed variation
  "`": "🌪",
  "~": "🛡"
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
