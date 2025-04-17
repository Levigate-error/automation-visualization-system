import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { ENodeType } from "@/types/enums";

const DnDContext = createContext<
  [ENodeType | null, (val: ENodeType | null) => void]
>([null, () => {}]);

export const DnDProvider = ({ children }: PropsWithChildren) => {
  const [type, setType] = useState<ENodeType | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

export const useDnD = () => {
  return useContext(DnDContext);
};
