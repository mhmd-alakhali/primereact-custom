import { Card } from "primereact/card";
import { useState } from "react";
import Dropdown from "../components/Dropdown";

const options = [
  { label: "First", value: "first" },
  { label: "Second", value: "second" },
  { label: "Third", value: "third" },
];

export default function DropdownDoc() {
  const [value, setValue] = useState<string>();

  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg"> Dropdown </h1>
      <Card className="w-[400px]">
        <div className="space-y-8">
          <div className="flex gap-4 items-center">
            <h1 className="w-16 font-bold"> Outlined </h1>
            <Dropdown
              placeHolder="Select"
              options={options}
              variant="outlined"
              onChange={(event) => setValue(event.value)}
              value={value}
            />
          </div>
          <div className="flex gap-4 items-center">
            <h1 className="w-16 font-bold"> Text </h1>
            <Dropdown
              placeHolder="Select"
              options={options}
              variant="text"
              onChange={(event) => setValue(event.value)}
              value={value}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
