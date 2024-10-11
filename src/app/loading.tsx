import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center h-screen justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Loader;