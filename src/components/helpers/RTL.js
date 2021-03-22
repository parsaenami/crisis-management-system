import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import StylesProvider from '@material-ui/styles/StylesProvider';

// Configure JSS
const jss = create({plugins: [...jssPreset().plugins, rtl()]});

// Custom Material-UI class name generator.
const generateClassName = createGenerateClassName();

const RTL = (props) => {
  return (
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        {props.children}
      </StylesProvider>
  );
}

export default RTL;