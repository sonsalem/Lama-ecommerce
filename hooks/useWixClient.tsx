"use clinet";
import { useContext } from "react";
import { WixClientContext } from "@/Context/wixContext";

export const useWixClient = () => {
  return useContext(WixClientContext);
};
