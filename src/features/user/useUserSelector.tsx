import { useAppSelector } from "@/app";
import React from "react";

const useUserSelector = () => {
  return {
    user: useAppSelector((state) => state.user?.user),
    session: useAppSelector((state) => state.user?.user?.session),
  };
};

export default useUserSelector;
