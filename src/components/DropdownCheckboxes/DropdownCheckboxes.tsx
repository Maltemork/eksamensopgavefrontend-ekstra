import { useState } from "react";
import "./DropdownCheckboxes.css";

type Option = string; // Replace 'string' with the actual type of 'options' if it's not a string array

interface CheckboxDropdownProps {
  options: Option[];
  selectedOptions: Option[];
  setSelectedOptions: (options: Option[]) => void;
}

export default function CheckboxDropdown({
  options,
  selectedOptions,
  setSelectedOptions,
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
    <div className="checkbox-dropdown">
      <button onClick={toggleDropdown}>Select Disciplines</button>
      {isOpen && (
        <div>
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
