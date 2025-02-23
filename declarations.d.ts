declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
declare module "*.scss" {
  const css: { [key: string]: string };
  export default css;
}
declare module "*.sass" {
  const css: { [key: string]: string };
  export default css;
}
declare module "react-markup";
declare module "*.webp";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
