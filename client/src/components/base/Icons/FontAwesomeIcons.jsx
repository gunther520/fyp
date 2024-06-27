import React from "react";
import { icons } from "./icons";

const FontAwesomeIcons = ({ icon, style }) => {
  return <i className={`${icons[icon] ? `${icons[icon]} ${style}` : `${icons["default"]} ${style}`}`}></i>;
};

export default FontAwesomeIcons;
