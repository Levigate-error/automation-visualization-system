import { FC, useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from "@/store";
import { redo, undo } from "@/store/automation";

const GlobalFunctionality: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASE_URL || "";

    const handleKeyDown = (event: KeyboardEvent) => {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;

      if (isCtrlOrCmd && event.key.toLowerCase() === "z") {
        if (event.shiftKey) {
          dispatch(redo());
        } else {
          dispatch(undo());
        }
        event.preventDefault();
      }
    };

    // Add event listener for keydown
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
};

export default GlobalFunctionality;
