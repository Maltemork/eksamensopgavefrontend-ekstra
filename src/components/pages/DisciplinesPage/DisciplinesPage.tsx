import { useEffect } from "react";
import { getDisciplines } from "../../../services/apiFacade";
import { Discipline } from "../../../Types";
import { useState } from "react";
import FullTable from "../../table/FullTable";

export default function DisciplinesPage() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDisciplines()
      .then((data: Discipline[]) => {
        setDisciplines(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Disciplines</h1>
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
            header: "Description",
            accessorKey: "description",
            type: "string",
            searchByValue: false,
          },
        ]}
        data={disciplines.map((item) => ({
          ...item,
          id: item.id,
        }))}
        createButton={false}
        clickableItems={false}
        error={error || ""}
      />
    </div>
  );
}
