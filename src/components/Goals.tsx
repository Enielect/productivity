import React from "react";
import { Input } from "./ui/input";
import { PlusIcon } from "lucide-react";

const Goals = () => {
  return <div>
    <h1>Add the tasks you want to cover this week</h1>
    <AddGoalInput />
  </div>;
};

function AddGoalInput() {
  return (
    <div className="flex py-4 gap-4">
      <Input type="text" placeholder="Add a goal" />
      <button className="bg-blue-700 p-2 rounded-full flex justify-center items-center">
        <PlusIcon className="stroke-white" />
      </button>
    </div>
  );
}

export default Goals;
