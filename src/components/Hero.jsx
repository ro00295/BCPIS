import { backgroundimg } from "../assets";
import styles from "../style";
import React, { useState, useEffect } from 'react';
import QrReader from "modern-react-qr-reader";
import Button from "./Button";

const Hero = ({ isLegit, result }) => {

const [scannedValue, setScannedValue] = useState("");
const [qrValue, setQrValue] = useState("");

useEffect(() => {
setQrValue(scannedValue ? scannedValue : "");
}, [scannedValue]);

const handleScan = (data) => {
if(data){
setScannedValue(data);
}
};

const handleError = (err) => {
console.error(err);
};

const handleSubmit = (event) => {
event.preventDefault();
console.log(qrValue); 
isLegit(qrValue)
console.log(result)
};

const previewStyle = {
height: 240,
width: 320,
};

const [facingMode, setFacingMode] = useState("environment");
const handleCameraChange = (value) => {
setFacingMode(value);
};

return (
<section id="scan" className={`flex md:flex-row flex-col ${styles.paddingY}`}> 
<div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

    <div className="flex flex-row justify-between items-center w-full">
      <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
        Check the <span className="text-gradient">authenticity</span> of your dress.
      </h1>
    </div>
    <p className={`${styles.paragraph} max-w-[1920px] mt-5 font-semibold input-centered`}>
      CHECK YOUR QR CODE NOW!
    </p>

    <div className={`${styles.paragraph} max-w-[1920px] mt-5 input-centered`}>
      <QrReader
        delay={100}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        facingMode= {facingMode}
      />
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <select className="input-centered" value={facingMode} onChange={(event) => handleCameraChange(event.target.value)}>
      <option value="user">Front camera</option>
      <option value="environment">Back camera</option>
    </select>
    <br/>
    <p className={`${styles.paragraph} max-w-[1920px] mt-5 input-centered`}>
      Scan or insert your code
    </p>
    <form className="input-centered" onSubmit={handleSubmit} >
      <input value={qrValue} className={`max-w-[1920px] mt-5 font-semibold text-black`} onChange={event => setQrValue(event.target.value)} />
      <br/>
      <br/>
      <Button />
    </form>
    <br/>
    <p className={`${styles.paragraph} max-w-[1920px] mt-5 input-centered`}>
      {result.toString()}
    </p>
    <br/>
    <p className={`${styles.paragraph} max-w-[1920px] mt-5`}>
      This is a system that can determine whether a piece of clothing is authentic or counterfeit using the blockchain simply by scanning a qr code.
      The QR code is linked to the clothing's unique identifier on the blockchain, where its history of ownership and manufacturing can be tracked.
      This allows the system to verify its authenticity by confirming that it matches the information stored on the blockchain, thus preventing the sale of counterfeit items.
    </p>
    <img src={backgroundimg} alt="hoobank" className="w-[1920px] h-[480px]" />
  </div>
</section>
);
}

export default Hero;