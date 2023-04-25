import { adminbackground } from "../assets";
import styles from "../style";
import React, { useState, useEffect } from 'react';
import QrReader from "modern-react-qr-reader";
import Button2 from "./Button2";

const Business = ({ adding }) => {

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
adding(qrValue)
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
<section id="admin" className={`flex md:flex-row flex-col ${styles.paddingY}`}> 
<div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

    <div className="flex flex-row justify-between items-center w-full">
      <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
        Admin <span className="text-gradient">Area</span> 
      </h1>
    </div>
    <p className={`${styles.paragraph} max-w-[1920px] mt-5 font-semibold input-centered`}>
      INSERT NEW QR CODE!
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
      <Button2 />
    </form>
    <br/>
    <br/>
    <p className={`${styles.paragraph} max-w-[1920px] mt-5 input-centered`}>
      Only adminbackground can see this section, from here adminbackground can add new qr codes to the blockchain. 
    </p>
    <img src={adminbackground} alt="hoobank" className="w-[600px] h-[600px] input-centered" />
  </div>
</section>
);
}

export default Business;