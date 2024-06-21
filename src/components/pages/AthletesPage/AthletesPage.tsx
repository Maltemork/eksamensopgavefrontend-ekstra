import { useEffect } from "react";
import { getAthletes, getDisciplines } from "../../../services/apiFacade";
import { Athlete, Discipline } from "../../../Types";
import { useState } from "react";
import FullTable from "../../table/FullTable";
import CheckboxDropdown from "../../DropdownCheckboxes/DropdownCheckboxes";

export default function AthletesPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
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
    if (selectedDisciplines.length === 0) return true;
    return athlete.disciplines.some((discipline: Discipline) =>
      selectedDisciplines.includes(discipline.name)
    );
  };

  return (
    <div>
      <h1>Athletes</h1>
      <CheckboxDropdown
        options={disciplines.map((discipline) => discipline.name)}
        selectedOptions={selectedDisciplines}
        setSelectedOptions={setSelectedDisciplines}
      />
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
