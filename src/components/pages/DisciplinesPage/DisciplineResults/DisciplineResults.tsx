import { useEffect, useState } from "react";
import { Discipline, Result } from "../../../../Types";
import { useParams } from "react-router-dom";
import {
  getDiscipline,
  getDisciplineResults,
} from "../../../../services/apiFacade";
import "./DisciplineResults.css";
import FullTable from "../../../table/FullTable";
import CheckboxDropdown from "../../../DropdownCheckboxes/DropdownCheckboxes";

export default function DisciplineResults() {
  const ageRanges = [
    "0 - 5",
    "6 - 9",
    "10 - 13",
    "14 - 22",
    "23 - 40",
    "41 - 120",
  ];
  const { id } = useParams<{ id: string }>();
  const [discipline, setDiscipline] = useState<Discipline>();

  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      getDiscipline(Number(id))
        .then((data: Discipline) => {
          setDiscipline(data);
        })
        .catch((err) => setError(err.message));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getDisciplineResults(Number(id))
        .then((data: Result[]) => {
          setResults(data);
        })
        .catch((err: Error) => setError(err.message));
    }
  }, [id]);

  const filterFunction = (result: Result) => {
    if (
      selectedGenders.length > 0 &&
      !selectedGenders.includes(result.athlete.gender)
    )
      return false;
    if (selectedAgeRanges.length > 0) {
      const isInSelectedAgeRange = selectedAgeRanges.some((range) => {
        const [min, max] = range.split(" - ").map(Number);
        return result.athlete.age >= min && result.athlete.age <= max;
      });

      if (!isInSelectedAgeRange) return false;
    }

    return true;
  };

  return (
    <div>
      <h1>{discipline ? discipline.name : "Discipline Details"}</h1>
      <div>
        <p>Id: {discipline?.id}</p>
        <p>Name: {discipline?.name}</p>
        <p>Description: {discipline?.description}</p>
      </div>

      <hr />
      <h1>Results</h1>
      <div className="flex-list">
        <CheckboxDropdown
          options={Array.from(
            new Set(results.map((result) => result.athlete.gender))
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
            header: "Athlete",
            accessorKey: "athlete.name",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Date",
            accessorKey: "date",
            type: "date",
            searchByValue: true,
          },
          {
            header: "Result",
            accessorKey: "result",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Result Type",
            accessorKey: "resultType",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Location",
            accessorKey: "location",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Competition",
            accessorKey: "competition",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Placement",
            accessorKey: "placement",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Comment",
            accessorKey: "comment",
            type: "string",
            searchByValue: true,
          },
        ]}
        data={results.map((item) => ({
          ...item,
          id: item.id,
          "athlete.name": item.athlete.name,
          result:
            item.resultType === "TIME"
              ? parseFloat(item.result.toFixed(2))
              : parseFloat(item.result.toFixed(2)),
        }))}
        itemsPerPage={5}
        createButton={true}
        clickableItems={true}
        clickableItemsRoute="/results"
        filterFunction={filterFunction}
        error={error ? "No Data Found" : ""}
      />
    </div>
  );
}
