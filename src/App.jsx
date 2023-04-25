import React from 'react'
import styles from './style'
import { Business, Navbar, Hero } from "./components";
import onepercent from './blockchain/onepercent'
import Web3 from 'web3'
import { useState } from 'react'



function App() {

  const [currentAccount, setCurrentAccount] = useState(null)
  let [web3, setWeb3] = useState(null) //variabile per contenere dati web3, andiamo poi a riempirla in connetwallethandler quando connettiamo metamask
  const [abiContract, setAbiContract] = useState(null) 

  const connectWalletHandler = async () => {
    //verifichiamo che l'utente abbia metamask installato, altrimenti messaggio errore
    if(typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try{
            await window.ethereum.request({ method: "eth_requestAccounts"}) //comando per far aprire metamask

            web3 = new Web3(window.ethereum)
            setWeb3(web3)
            const account = await web3.eth.getAccounts() //prendiamo lista account (quello in uso è account[0])
            setCurrentAccount(account[0]) //settiamo quello in uso
           

            const vm = onepercent(web3) 
            setAbiContract(vm)

            

        } catch(err) {
            console.log(err.message)
            
        }//try connessione metamask catch error altrimenti
    } 
    else{
        console.log("Please install Metamask")
    }
}  

console.log(currentAccount)


const [result, setResult] = useState("");
const handleIsLegit = async (qrValue) => {
  // fa qualcosa con qrValue e imposta il risultato in uno stato
  const originale = await abiContract.methods.verifyCode(qrValue).call()
  console.log(originale)
  setResult(originale)
};

const handleAdding = async (qrValue) => {
  await abiContract.methods.addCode(qrValue).send({  
    from: currentAccount,
  })
  console.log("added qr")
}


if(currentAccount==null){return (<section className={`flex md:flex-row flex-col ${styles.paddingY}`}> 
<div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

    <div className="flex flex-row justify-between items-center w-full">
      <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
        <span className="text-gradient ">BCPIS</span> 
      </h1>   
    </div>
    <br/>
    <button type="button" onClick={connectWalletHandler} className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none  ${styles}`}>
    Connect
  </button>
    
  </div>
</section>)}
else if(currentAccount=='0x4C46AAb1e14A2973b94f0CAF2f7B4AfEb0F3C7B4'){
  return (

  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero result={result} isLegit={handleIsLegit}/>
      </div>
    </div>
    
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Business adding={handleAdding}/>
      </div>
    </div>
  </div>
)}
else{ return (
<div className="bg-primary w-full overflow-hidden">
<div className={`bg-primary ${styles.flexStart}`}>
  <div className={`${styles.boxWidth}`}>
    <Hero result={result} isLegit={handleIsLegit}/>
  </div>
</div>
</div>

)}}

export default App;
