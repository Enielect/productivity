import { Loader2 } from "lucide-react";
import React from "react";

const UserFacingPageLoader = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default UserFacingPageLoader;
