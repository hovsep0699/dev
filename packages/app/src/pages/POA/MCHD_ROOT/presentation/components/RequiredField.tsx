import React from "react";
import {Box} from "grommet";

interface RequiredFieldProps {
    content: string | React.ReactNode;
    required?: boolean;
    style?: object;
    height?: string;
    width?: string;
}

export const RequiredField: React.FC<RequiredFieldProps> = ({
  content,
  height,
  width,
  required,
  style
}: RequiredFieldProps) => {
    return (
        <Box direction={"row"} height={height} width={width}>
            {required === true ? (
                <span style={style}>{content}<span style={{color: "#e64f49"}}>*</span></span>
            ) : (<span style={style}>{content}</span>)}

        </Box>
    );
}