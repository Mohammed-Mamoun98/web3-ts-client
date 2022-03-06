import React from "react";
import styled from "styled-components";

interface IBox {
  p?: string;
  m?: string;
  px?: string;
  py?: string;
  mx?: string;
  my?: string;
  bg?: string;
}

export const Box = styled.div`
  ${({ bg, p, px = "0", py = "0", m, mx = "0", my = "0" }: IBox) => `
    padding: ${p || `${py} ${px}`};
    margin: ${m || `${my} ${mx}`};
    background-color: ${bg};
`}
`;

interface IFlex {
  column?: boolean;
  gap?: string;
}

export const Flex = styled.div`
  display: flex;
  ${({ column, gap }: IFlex) => `
  flex-direction: ${(column && "column") || "row"};
  gap : ${gap}
`}
`;
