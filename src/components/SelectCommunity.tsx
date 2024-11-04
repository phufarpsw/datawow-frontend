"use client";

import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

const optionCommunity = createListCollection({
  items: [
    { label: "History", value: "History" },
    { label: "Food", value: "Food" },
    { label: "Pets", value: "Pets" },
    { label: "Health", value: "Health" },
    { label: "Fashion", value: "Fashion" },
    { label: "Exercise", value: "Exercise" },
    { label: "Others", value: "Others" },
  ],
});

interface SelectCommunityProps {
  value: string[];
  onChange: (e:any) => void;
}

export const SelectCommunity = ({ value, onChange }: SelectCommunityProps) => {
  return (
    <SelectRoot
      collection={optionCommunity}
      value={value}
      onValueChange={onChange}
      size="md"
      maxW={"3xs"}
      minW={"max-content"}
    >
      <SelectTrigger clearable>
        <SelectValueText
          placeholder="Community"
          className="font-bold"
        />
      </SelectTrigger>
      <SelectContent zIndex={1402}>
        {optionCommunity.items.map((item) => (
          <SelectItem item={item} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
