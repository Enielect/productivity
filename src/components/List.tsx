import { MoreVertical } from "lucide-react";
import React from "react";

const List = () => {
  return (
    <div className="flex items-center">
      <div>
        <input id="list" type="checkbox" className="accent-blue-700" />
      </div>
      <span>Navigating flow for app watch</span>
      <MoreVertical />
    </div>
  );
};

export default List;
