"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const isFirstrendition = React.useRef(true);
  const searchValue = searchParams.get("search") ?? "";

  const [inputValue, setInputValue] = useState(searchValue); // Local state for input value

  // Debounce handler
  useEffect(() => {
    if (isFirstrendition.current) {
      isFirstrendition.current = false;
      return;
    }
    const padUrl = (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    };
    // const handler = setTimeout(() => {
      if (inputValue !== searchValue) {
        router.push(pathName + "?" + padUrl("search", inputValue));
      }
    // }, 100); // 500ms debounce

    // return () => clearTimeout(handler); // Cleanup the timeout on every change
  }, [inputValue, pathName, searchValue, router, searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toLowerCase()); // Update local input value state
  };

  return (
    <Input
      type="search"
      className="ml-10"
      placeholder="Search..."
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;
