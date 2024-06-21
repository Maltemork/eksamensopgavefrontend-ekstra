import { useState } from "react";
import "./DropdownCheckboxes.css";

type Option = string; // Replace 'string' with the actual type of 'options' if it's not a string array

interface CheckboxDropdownProps {
  options: Option[];
  selectedOptions: Option[];
  setSelectedOptions: (options: Option[]) => void;
  title: string;
}

export default function CheckboxDropdown({
  options,
  selectedOptions,
  setSelectedOptions,
  title,
}: CheckboxDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const toggleOption = (option: Option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="dropdown-container">
      <button onClick={toggleDropdown}>{title}</button>
      {isOpen && (
        <div className="checkbox-dropdown">
          {options.map((option) => (
            <div key={option}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => toggleOption(option)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
