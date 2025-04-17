import React from "react";
import { DnDProvider } from "@/context/dnd-context";
import { Board } from "./board/board";

const Main = () => {
  return (
    <DnDProvider>
      <Board />
    </DnDProvider>
  );
};

export { Main };
