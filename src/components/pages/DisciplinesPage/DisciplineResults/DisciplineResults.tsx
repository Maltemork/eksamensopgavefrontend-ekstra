import { useEffect, useState } from "react";
import { Discipline, Result } from "../../../../Types";
import { useParams } from "react-router-dom";
import {
  getDiscipline,
  getDisciplineResults,
} from "../../../../services/apiFacade";
import "./DisciplineResults.css";
import FullTable from "../../../table/FullTable";

export default function DisciplineResults() {
  const { id } = useParams<{ id: string }>();
  const [discipline, setDiscipline] = useState<Discipline>();
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

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
              ? item.result.toFixed(2).toString().replace(".", ",") + " sec"
              : item.result.toFixed(2).toString().replace(".", ",") + " m",
        }))}
        itemsPerPage={5}
        createButton={true}
        clickableItems={true}
        clickableItemsRoute="/results"
        error={error ? "No Data Found" : ""}
      />
    </div>
  );
}
