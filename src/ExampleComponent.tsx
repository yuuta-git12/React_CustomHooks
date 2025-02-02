import React from "react";

type Props = {
  text: string;
};

export const ExampleComponent: React.FC<Props> = ({ text }) => {
  return <div data-testid="example-text">{text}</div>;
};
