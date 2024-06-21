import { useEffect, useState } from "react";
import { Athlete, Discipline, Result } from "../../../../Types";
import { Link, useParams } from "react-router-dom";
import {
  deleteAthlete,
  getAthlete,
  getAthleteResults,
} from "../../../../services/apiFacade";
import React from "react";
import "./AthleteDetails.css";
import FullTable from "../../../table/FullTable";

export default function AthleteDetails() {
  const { id } = useParams<{ id: string }>();
  const [athlete, setAthlete] = useState<Athlete>();
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getAthlete(Number(id))
        .then((data: Athlete) => {
          setAthlete(data);
        })
        .catch((err) => setError(err.message));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getAthleteResults(Number(id))
        .then((data: Result[]) => {
          setResults(data);
        })
        .catch((err) => setError(err.message));
    }
  }, [id]);

  useEffect(() => {
    console.log(athlete);
  }, [athlete]);

  const handleDelete = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this athlete?"
    );

    if (confirmation) {
      deleteAthlete(Number(id)).then(() => {
        window.location.href = "/athletes";
      });
    }
  };

  return (
    <div>
      <h1>{athlete ? athlete.name : "Athlete Details"}</h1>
      <Link to={`/athletes/${athlete?.id}/edit`} className="edit-button">
        Edit
      </Link>
      <button onClick={handleDelete} className="delete-button">
        Delete
      </button>
      <div className="user-details-container">
        {athlete ? (
          Object.keys(athlete).map((key) => (
            <React.Fragment key={key}>
              <div>{key}</div>
              <div>
                {key === "disciplines" &&
                Array.isArray(athlete[key as keyof Athlete])
                  ? (athlete[key as keyof Athlete] as Discipline[]).map(
                      (discipline, index) => (
                        <div key={index}>
                          {/* Replace 'property' with actual properties of Discipline */}
                          {discipline.name}
                        </div>
                      )
                    )
                  : String(athlete[key as keyof Athlete])}
              </div>
            </React.Fragment>
          ))
        ) : (
          <p>No athlete data</p>
        )}
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
          result:
            item.resultType === "TIME"
              ? item.result.toFixed(2).toString().replace(".", ",") + " sec"
              : item.result.toFixed(2).toString().replace(".", ",") + " m",
        }))}
        itemsPerPage={5}
        createButton={true}
        clickableItems={true}
        clickableItemsRoute="/result"
        error={error ? "No Data Found" : ""}
      />
    </div>
  );
}
