import { useEffect, useState } from "react";
import { getResults } from "../../../../services/apiFacade";
import { Result } from "../../../../Types";
import FullTable from "../../../table/FullTable";

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getResults()
      .then((data) => setResults(data))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <div>
      <h1>Results</h1>
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
            type: "number",
            searchByValue: true,
          },
          {
            header: "Result Type",
            accessorKey: "resultType",
            type: "string",
            searchByValue: true,
          },
          {
            header: "Discipline",
            accessorKey: "discipline.name",
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
          "discipline.name": item.discipline.name,
          "athlete.name": item.athlete.name,
          "athlete.gender": item.athlete.gender,
          result:
            item.resultType === "TIME"
              ? item.result.toFixed(2).toString().replace(".", ",") + " sec"
              : item.result.toFixed(2).toString().replace(".", ",") + " m",
        }))}
        itemsPerPage={5}
        createButton={true}
        clickableItems={true}
        error={error ? "No Data Found" : ""}
      />
    </div>
  );
}
