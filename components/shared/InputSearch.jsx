"use client";

import React from "react";
import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

const InputSearch = ({ value, onChange }) => {
  return (
    <InputGroup>
      <InputGroupInput
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default InputSearch;
