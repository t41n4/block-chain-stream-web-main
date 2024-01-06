"use client";

import { InputProps } from "@components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import * as React from "react";
import useCurrentWidth from "@lib/hook/use-current-width";
import { cn } from "@lib/utils";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, ...rest }, ref) => {
    const [searchValue, setSearchValue] = useState("");
    const [placeholderValue, setPlaceholderValue] = useState(placeholder);
    const currentWidth = useCurrentWidth();
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (currentWidth < 768) {
        setPlaceholderValue("");
      }
      else {
        setPlaceholderValue(placeholder);
      }
    }, [currentWidth]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    };

    return (

      <div className={cn("flex flex-row h-[60%] w-full ", className)}>
        <input
          {...rest}
          placeholder={placeholderValue}
          ref={inputRef}
          className="h-full w-full text-navigate md:text-sm focus-visible:ring-0 focus-visible:outline-none rounded-l-[5px] px-2 relative border border-beta bg-beta flex flex-row items-center justify-between text-left ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2"
          value={searchValue}
          onChange={handleSearchChange}
          aria-label="searchValue"
        />
        <div className="px-1 bg-beta rounded-r-[10px] border border-beta border-l-0">
          <SearchIcon className="relative object-cover h-full" strokeWidth={2} />
        </div>
      </div>


    );
  }
);

InputSearch.displayName = "Search";

export default InputSearch;
