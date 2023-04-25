import React from "react";

const Button = ({ styles }) => (
  <button type="submit" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none input-centered ${styles}`}>
    Check
  </button>
);

export default Button;