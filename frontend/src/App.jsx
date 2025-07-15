import { useState } from 'react'
import Commom from './Components/Commom'
import styled from 'styled-components'
import Encrypt from './Components/Encrypt'
import Decrypt from './Components/Decrypt'
import { EncryptionProvider } from './EncryptContext'

function App() {
  const [mode,setMode] = useState("encrypt");
const encryptFunc = ()=>setMode("encrypt");
const decryptFunc = ()=>setMode("decrypt");
  return (
    <EncryptionProvider>

    <Container>
     <Form>
      <div className="underForm">
      <Commom onClick={encryptFunc} title="Encrypt Text" icon={<i className="fa fa-lock" aria-hidden="true"></i>}/>
      <Commom onClick={decryptFunc} title="Decrypt Emoji" icon={<i className="fa fa-unlock"></i>}/>
      </div>
      {mode=="encrypt"?<Encrypt/>:<Decrypt/>}
     </Form>
    </Container>
    </EncryptionProvider>
  )
}

export default App
const Container = styled.div`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  /* Add some padding on smaller screens */
  padding: 10px;

  @media (max-width: 768px) {
    height: auto; /* let content dictate height */
    padding: 20px 10px;
    align-items: flex-start; /* so it starts from top on smaller */
  }
`;

const Form = styled.div`
  background-color: rgba(22, 22, 22, 0.922);
  width: 35%;
  height: 70%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  font-weight: bold;
  padding: 20px;

  .underForm {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 10vh;
    justify-content: space-evenly;
    align-items: start;
    margin-bottom: 20px;

    /* On smaller screens, stack buttons vertically */
    @media (max-width: 600px) {
      flex-direction: column;
      height: auto;
      gap: 10px;
      align-items: stretch; /* buttons take full width */
    }
  }

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    width: 60%;
    height: 80vh;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: auto; /* content controls height */
    padding: 15px;
  }
`;
