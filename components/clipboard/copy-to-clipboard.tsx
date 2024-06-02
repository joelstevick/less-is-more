import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CopyToClipboardProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ textareaRef }) => {
  const handleCopyClick = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      document.execCommand("copy");
      textareaRef.current.blur();
      toast.success("Text copied to clipboard!");
    }
  };

  return (
    <button
      onClick={handleCopyClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Copy to Clipboard
    </button>
  );
};

export default CopyToClipboard;
