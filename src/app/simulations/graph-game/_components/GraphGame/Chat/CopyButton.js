import { useState } from "react";
import { Copy, Check } from "lucide-react";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} aria-label="Copy to clipboard">
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}

export default CopyButton;