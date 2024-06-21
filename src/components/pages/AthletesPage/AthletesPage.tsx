import { useEffect } from "react";
import { getAthletes, getDisciplines } from "../../../services/apiFacade";
import { Athlete, Discipline } from "../../../Types";
import { useState } from "react";
import FullTable from "../../table/FullTable";
import CheckboxDropdown from "../../DropdownCheckboxes/DropdownCheckboxes";
import "./AthletesPage.css";

export default function AthletesPage() {
  const ageRanges = [
    "0 - 5",
    "6 - 9",
    "10 - 13",
    "14 - 22",
    "23 - 40",
    "41 - 120",
  ];
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAthletes()
      .then((data: Athlete[]) => {
        setAthletes(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    getDisciplines()
      .then((data: Discipline[]) => {
        setDisciplines(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  const filterFunction = (athlete: Athlete) => {
    if (
      selectedDisciplines.length > 0 &&
      !athlete.disciplines.some((discipline: Discipline) =>
        selectedDisciplines.includes(discipline.name)
      )
    )
      return false;
    if (selectedGenders.length > 0 && !selectedGenders.includes(athlete.gender))
      return false;
    if (selectedClubs.length > 0 && !selectedClubs.includes(athlete.club))
      return false;
    if (selectedAgeRanges.length > 0) {
      const isInSelectedAgeRange = selectedAgeRanges.some((range) => {
        const [min, max] = range.split(" - ").map(Number);
        return athlete.age >= min && athlete.age <= max;
      });

      if (!isInSelectedAgeRange) return false;
    }

    return true;
  };

  return (
    <div>
      <div className="header-flex-list">
        <h1>Athletes</h1>
        <p>Filter By:</p>
        <CheckboxDropdown
          options={disciplines.map((discipline) => discipline.name)}
          selectedOptions={selectedDisciplines}
          setSelectedOptions={setSelectedDisciplines}
          title="Disciplines"
        />
        <CheckboxDropdown
          options={Array.from(
            new Set(athletes.map((athlete) => athlete.gender))
          )}
          selectedOptions={selectedGenders}
          setSelectedOptions={setSelectedGenders}
          title="Gender"
        />
        <CheckboxDropdown
          options={ageRanges}
          selectedOptions={selectedAgeRanges}
          setSelectedOptions={setSelectedAgeRanges}
          title="Age Range"
        />
        <CheckboxDropdown
          options={Array.from(new Set(athletes.map((athlete) => athlete.club)))}
          selectedOptions={selectedClubs}
          setSelectedOptions={setSelectedClubs}
          title="Club"
        />
      </div>

      <FullTable
        schema={[
          {
            header: "ID",
            accessorKey: "id",
            type: "number",
            searchByValue: true,
          },
          {
            header: "Name",
            accessorKey: "name",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Gender",
            accessorKey: "gender",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Age",
            accessorKey: "age",
            type: "number",
            searchByValue: true,
          },
          {
            header: "Disciplines",
            accessorKey: "disciplinesText",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Club",
            accessorKey: "club",
            type: "string",
            searchByValue: true,
          },
          {
            header: "E-mail",
            accessorKey: "email",
            type: "string",
            searchByValue: false,
          },
          {
            header: "Phone",
            accessorKey: "phone",
            type: "string",
            searchByValue: false,
          },
          {
            header: "Country",
            accessorKey: "country",
            type: "string",
            searchByValue: false,
          },
        ]}
        data={athletes.map((item) => ({
          ...item,
          id: item.id,
          disciplinesText: item.disciplines
            .map((discipline: Discipline) => discipline.name)
            .join(", "),
        }))}
        createButton={true}
        clickableItems={true}
        error={error || ""}
        filterFunction={filterFunction}
      />
    </div>
  );
}
