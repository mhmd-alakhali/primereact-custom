import { IconCheck, IconChevronDown, IconSearch } from "@tabler/icons-react";
import { InputText } from "primereact/inputtext";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";

type Props = {
  readonly onChange?: (event: { item?: object; value?: string }) => void;
  readonly onClear?: () => void;
  readonly onFilter?: (event: { value: string }) => void;
  readonly onHide?: () => void;
  readonly options: Array<{ label: string; value: object | string }>;
  readonly placeHolder?: string;
  readonly showClear?: boolean;
  readonly showFilter?: boolean;
  readonly value?: string;
  readonly variant?: "outlined" | "text";
  readonly bodyTemplate?: JSX.Element | undefined;
  readonly footerTemplate?: JSX.Element | undefined;
  readonly className?: string;
};

export default function Dropdown({
  bodyTemplate,
  options,
  variant = "text",
  footerTemplate,
  className,
  value,
  showFilter,
  showClear,
  placeHolder,
  onChange,
  onClear,
  onFilter,
  onHide,
}: Props) {
  const menu = useRef<Menu>(null);
  const [chevron, setChevron] = useState("down");
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: object | string;
  }>();

  useEffect(() => {
    setSelectedOption(
      options.find((obj) => JSON.stringify(obj.value) === JSON.stringify(value))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const menuTemplate = [
    {
      template: (
        <div className="flex flex-col items-end">
          {showFilter && (
            <div className="flex flex-row gap-2 w-full p-4 bg-gray-200 hover:cursor-text">
              <IconSearch className="text-gray-400" />
              <InputText
                className="border-none bg-gray-200 w-full rounded-none focus:ring-0"
                onChange={(event) => onFilter?.(event.target)}
                placeholder="Search"
              />
            </div>
          )}
          {showClear && (
            <span
              className={`font-bold text-gray-400 ${
                value ? "cursor-pointer color-purple" : "color-gray-300"
              } p-4`}
              onClick={onClear}
            >
              Clear
            </span>
          )}
        </div>
      ),
    },
    { template: showClear ? <> </> : <br /> },
    ...options.map((obj) => ({
      command: (event: { item: object }) => onChange?.(event.item),
      ...obj,
      icon: selectedOption?.value === obj.value && (
        <IconCheck className="p-1" />
      ),
    })),
    { template: bodyTemplate ?? <> </> },
    { template: <br /> },
    { template: footerTemplate ?? <> </> },
  ];

  return (
    <>
      <div
        className={`flex items-center justify-between 
        cursor-pointer color-gray 
        space-x-2 ${className} ${
          variant === "outlined" &&
          "border-2 border-solid rounded-md space-x-20 p-2"
        }`}
        onClick={(event) => menu.current?.toggle(event)}
        onKeyDown={(event) => {
          if (event.key === "Enter") menu.current?.toggle(event);
        }}
        tabIndex={0}
      >
        <span className="max-w-21 truncate">
          {selectedOption?.label ?? placeHolder}{" "}
        </span>
        {chevron === "up"}
        <IconChevronDown
          className={`mt-1 duration-200 ${
            chevron === "up" && "rotate-180"
          } p-1`}
        />
      </div>
      <Menu
        className="p-0"
        model={menuTemplate}
        onBlur={(event) => menu.current?.toggle(event)}
        onHide={() => {
          setChevron("down");
          onHide?.();
        }}
        onShow={() => setChevron("up")}
        popup
        ref={menu}
      />
    </>
  );
}
