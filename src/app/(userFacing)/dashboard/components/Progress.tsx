type ProgressProp = { progress: number; completed: number; noOfTasks: number };

export function Progress({ progress, completed, noOfTasks }: ProgressProp) {
  return (
    <div className="flex flex-col items-start gap-3 py-5 sm:flex-row sm:items-center sm:gap-[80px]">
      <div className="">
        <ProgressBar progress={progress} />
      </div>
      <span>
        You have completed {completed} of the {noOfTasks} tasks planned today
      </span>
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="progress-bar relative h-[2rem] min-w-[300px] rounded-md bg-blue-200">
      <div
        className="progress h-full rounded-bl-md rounded-tl-md bg-blue-600 transition-all"
        style={{ width: `${isNaN(progress) ? 0 : progress}%` }}
      ></div>
      <span
        className={`absolute right-[4px] top-[4px] font-semibold ${progress > 90 ? "z-20 text-white" : "text-blue-600"}`}
      >
        {" "}
        {isNaN(progress) ? 0 : progress}%
      </span>
    </div>
  );
}
