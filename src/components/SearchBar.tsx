"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const searchValue = searchParams.get("search") ?? "";

  // Initialize input value with searchValue
  const [inputValue, setInputValue] = useState(searchValue);

  const padUrl = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name); // Remove the parameter if value is empty
      }
      return params.toString();
    },
    [searchParams],
  );

  // Sync input value with URL when searchValue changes
  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  // Debounced URL update
  useEffect(() => {
    // Only update URL if input value is different from current search value
    if (inputValue === searchValue) return;

    const handler = setTimeout(() => {
      const queryString = padUrl("search", inputValue);
      const newUrl = pathName + (queryString ? `?${queryString}` : "");
      router.push(newUrl);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, pathName, searchValue, router, padUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toLowerCase());
  };

  return (
    <Input
      type="search"
      className="ml-10 min-w-[300px]"
      placeholder="Search..."
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;
