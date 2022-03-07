import React from "react";

interface IShowAt {
  at: boolean;
  children: React.ReactElement[] | React.ReactElement;
}

export default function ShowAt({ children, at }: IShowAt) {
  return <>{at && children}</>;
}
