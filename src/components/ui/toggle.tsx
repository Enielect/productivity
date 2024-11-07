"use client";

import React, { useEffect, useState } from "react";

const Toggle = () => {
  const [isClient, setIsClient] = useState(false);
  const [theme, setTheme] = useState<string>("");
  useEffect(() => {
    setIsClient(true);
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    document.documentElement.classList.toggle(
      "dark",
      theme === "light" || theme === "dark"
        ? localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
              window.matchMedia("(prefers-color-scheme: dark)").matches)
        : window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
    if (theme.length === 0) {
      setTheme((localStorage.theme as string) || "system");
    }
  }, [theme]);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);
  if (!isClient) return null;
  return (
    <div className="grid w-fit grid-cols-[1fr_1fr_1fr] gap-1 rounded-full border border-black/[0.3] p-1 dark:border-white/[0.3]">
      <Light setTheme={setTheme} theme={theme} />
      <System setTheme={setTheme} theme={theme} />
      <Moon setTheme={setTheme} theme={theme} />
    </div>
  );
};

function Moon({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <button
      onClick={() => {
        localStorage.theme = "dark";
        setTheme("dark");
      }}
    >
      <svg
        className={`justify-self-center p-[0.25rem] ${theme === "dark" && "rounded-full bg-black/[15%] dark:bg-white/[35%]"}`}
        data-testid="geist-icon"
        fill="none"
        height="24"
        shape-rendering="geometricPrecision"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="24"
        style={{ color: "currentcolor", width: "26px", height: "26px" }}
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
      </svg>
    </button>
  );
}

function Light({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <button
      onClick={() => {
        localStorage.theme = "light";
        setTheme("light");
      }}
    >
      <svg
        className={`justify-self-center p-[0.25rem] ${theme === "light" && "rounded-full bg-black/[15%] dark:bg-white/[35%]"}`}
        data-testid="geist-icon"
        fill="none"
        height="24"
        shape-rendering="geometricPrecision"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="24"
        style={{ color: "currentcolor", width: "26px", height: "26px" }}
      >
        <circle cx="12" cy="12" r="5"></circle>
        <path d="M12 1v2"></path>
        <path d="M12 21v2"></path>
        <path d="M4.22 4.22l1.42 1.42"></path>
        <path d="M18.36 18.36l1.42 1.42"></path>
        <path d="M1 12h2"></path>
        <path d="M21 12h2"></path>
        <path d="M4.22 19.78l1.42-1.42"></path>
        <path d="M18.36 5.64l1.42-1.42"></path>
      </svg>
    </button>
  );
}

function System({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <button
      onClick={() => {
        localStorage.theme = "system";
        setTheme("system");
      }}
    >
      <svg
        className={`justify-self-center p-[0.25rem] ${theme === "system" && "rounded-full bg-black/[15%] dark:bg-white/[35%]"}`}
        data-testid="geist-icon"
        fill="none"
        height="24"
        shape-rendering="geometricPrecision"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="24"
        style={{ color: "currentcolor", width: "26px", height: "26px" }}
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M8 21h8"></path>
        <path d="M12 17v4"></path>
      </svg>
    </button>
  );
}

export default Toggle;
