import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import Commom from "./Commom";
import { emojiMap } from "./EmojiMap";
import { EncryptionContext } from "../EncryptContext";
import { encryptText } from "../utils/CryptoUtils.js";
import { base64ToEmoji } from "../utils/EmojiConverter.js"

function Encrypt() {
  const [encryptedEmoji, setEncryptedEmoji] = useState("");
  const emojiRef = useRef(null);
  const { setEncryptionData } = useContext(EncryptionContext);

  function handleCopy() {
    if (emojiRef.current) {
      navigator.clipboard
        .writeText(emojiRef.current.textContent)
        .then(() => {
          document
            .querySelector(".copy")
            .classList.replace("fa-clone", "fa-check");
        })
        .catch((e) => console.log(e));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const msg = e.target.msg.value;
    const password = e.target.password.value;

    if (!msg || !password) {
      alert("Both message and password are required.");
      return;
    }

    const encryptedBase64 = await encryptText(msg, password);
    const encryptedEmojiStr = base64ToEmoji(encryptedBase64);

    const obj = {
      msg,
      password,
      encryptedEmoji: encryptedEmojiStr,
    };

    setEncryptedEmoji(encryptedEmojiStr);
    setEncryptionData(obj);
  }

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Label htmlFor="msg">Type a message</Label>
      <Input type="text" name="msg" id="msg" placeholder="Type your message here..." />

      <Label htmlFor="password">Password</Label>
      <Input type="password" name="password" id="password" placeholder="Password" />

      <div className="btn">
        <Commom
          type="submit"
          title="Encrypt Text"
          icon={<i className="fa fa-lock" aria-hidden="true"></i>}
        />
      </div>

      {encryptedEmoji && (
        <div className="emojiContainer">
          <address className="encryptedShow" ref={emojiRef}>
            {encryptedEmoji}
          </address>
          <CopyButton type="button" onClick={handleCopy} title="Copy to clipboard">
            <i className="copy fa fa-clone" aria-hidden="true"></i>
          </CopyButton>
        </div>
      )}
    </Wrapper>
  );
}

export default Encrypt;

// Styled Components
const Wrapper = styled.form`
  width: 100%;
  max-width: 480px;   /* Limit width on large screens */
  margin: 0 auto;     /* Center horizontally */
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
    font-size: 1.1rem;  /* Scalable font size */
    text-align: center;
    border: 1px solid white;
    max-height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: auto;
    padding: 8px 40px 8px 8px; /* space for button */
    border-radius: 4px;
    white-space: pre-wrap;
    word-break: break-word;
  }

  /* Responsive adjustments */
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
