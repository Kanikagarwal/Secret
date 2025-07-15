import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import Commom from "./Commom";
import { EncryptionContext } from "../EncryptContext";
import { decryptText } from "../utils/CryptoUtils.js";
import { reverseEmojiMap } from "./EmojiMap";
import GraphemeSplitter from "grapheme-splitter";

// --- Updated emojiToBase64 ---
function emojiToBase64(emojiStr) {
  const splitter = new GraphemeSplitter();
  const graphemes = splitter.splitGraphemes(emojiStr);

  const base64 = graphemes.map((emoji) => {
    const char = reverseEmojiMap[emoji];
    if (!char) {
      throw new Error(`❌ Unknown emoji '${emoji}' found. Decryption aborted.`);
    }
    return char;
  }).join("");

  return base64;
}

// --- Optional: base64 validation function ---
function isValidBase64(str) {
  const base64Regex = /^[A-Za-z0-9+/=]+$/;
  return base64Regex.test(str) && str.length % 4 === 0;
}

function Decrypt() {
  const msgRef = useRef(null);
  const [msgToShow, setMsgToShow] = useState("");
  const { encryptionData } = useContext(EncryptionContext);

  function handleCopy() {
    if (msgRef.current) {
      navigator.clipboard
        .writeText(msgRef.current.textContent)
        .then(() => {
          document.querySelector(".copy").classList.replace("fa-clone", "fa-check");
        })
        .catch((e) => console.log(e));
    }
  }

  async function handleDecryption(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const emojiStr = formData.get("msg")?.trim();
    const password = formData.get("password")?.trim();

    if (!emojiStr || !password) {
      alert("Both encrypted emoji and password are required.");
      return;
    }

    try {
      const base64 = emojiToBase64(emojiStr);
      if (!isValidBase64(base64)) {
        throw new Error("❌ Converted base64 is invalid. Possibly incorrect emojis.");
      }

      const decrypted = await decryptText(base64, password);
      setMsgToShow(decrypted);
    } catch (error) {
      console.error("Decryption error:", error);
      alert(error.message || "❌ Decryption failed: incorrect password or invalid input.");
      setMsgToShow("");
    }
  }

  return (
    <Wrapper onSubmit={handleDecryption}>
      <Label htmlFor="msg">Paste Encrypted Emoji Text</Label>
      <Input
        type="text"
        name="msg"
        id="msg"
        placeholder="🔐 Encrypted emoji here..."
        spellCheck="false"
        autoComplete="off"
      />

      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        autoComplete="off"
      />

      <div className="btn">
        <Commom
          type="submit"
          title="Decrypt Text"
          icon={<i className="fa fa-unlock" aria-hidden="true"></i>}
        />
      </div>

      {msgToShow && (
        <div className="emojiContainer">
          <address className="encryptedShow" ref={msgRef}>
            {msgToShow}
          </address>
          <CopyButton onClick={handleCopy} title="Copy to clipboard">
            <i className="copy fa fa-clone" aria-hidden="true"></i>
          </CopyButton>
        </div>
      )}
    </Wrapper>
  );
}

export default Decrypt;
