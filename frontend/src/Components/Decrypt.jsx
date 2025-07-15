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

const Wrapper = styled.form`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 12px;

  .btn {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .emojiContainer {
    position: relative;
    width: 100%;
    margin-top: 16px;
  }

  .encryptedShow {
    background-color: #2f2f2f;
    width: 100%;
    font-size: 1.1rem;
    text-align: center;
    border: 1px solid white;
    max-height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    padding: 8px 40px 8px 8px;
    border-radius: 4px;
    white-space: pre-wrap;
    word-break: break-word;
  }

  @media (max-width: 600px) {
    padding: 10px;

    .encryptedShow {
      font-size: 1.2rem;
      height: auto;
      min-height: 100px;
      padding: 8px 36px 8px 8px;
    }
  }
`;

const Label = styled.label`
  color: white;
  font-size: 1.25rem;
  display: block;
  margin-bottom: 10px;
  font-weight: normal;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 60px;
  background-color: #2f2f2f;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: white;
  }

  @media (max-width: 600px) {
    height: 50px;
    font-size: 0.9rem;
  }
`;

const CopyButton = styled.button`
  position: absolute;
  top: 2px;
  right: 1px;
  background-color: #444;
  color: black;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #666;
  }

  @media (max-width: 600px) {
    padding: 5px 8px;
    font-size: 12px;
  }
`;

