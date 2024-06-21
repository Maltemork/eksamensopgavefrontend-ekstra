import { useNavigate, useParams } from "react-router-dom";
import { Discipline, ResultAPIWithId } from "../../../../../Types";
import { useEffect, useState } from "react";
import {
  deleteResult,
  getDisciplines,
  getResult,
  updateResult,
} from "../../../../../services/apiFacade";

export default function DisciplineEditResult() {
  const navigate = useNavigate();
  const { athleteId, resultId } = useParams();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultAPIWithId>({
    id: 0,
    athleteId: Number(athleteId),
    disciplineId: 0,
    result: 0,
    resultType: "",
    date: new Date("01/01/2021"),
    location: "",
    competition: "",
    placement: "",
    comment: "",
  });

  useEffect(() => {
    getResult(Number(resultId)).then((data) => {
      if (data !== null) {
        setResult(data);
      } else {
        setError("Error fetching result");
      }
    });
  }, [athleteId, resultId]);

  useEffect(() => {
    getDisciplines().then((data) => setDisciplines(data));
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value =
      event.target.name === "date"
        ? new Date(event.target.value)
        : event.target.value;
    setResult({ ...result, [event.target.name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    console.log(result);
    event.preventDefault();
    updateResult(result);
    window.setTimeout(() => navigate(-1), 200);
  };

  const handleDeleteClicked = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this result?"
    );

    if (confirmation) {
      deleteResult(result.id);
      window.setTimeout(
        () => navigate(`/disciplines/${result.disciplineId}`),
        200
      );
    }
  };

  return (
    <div>
      <h1>ResultEdit</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Result ID:
          <input
            name="id"
            value={result.id || ""}
            onChange={handleChange}
            disabled
          />
        </label>
        <label>
          Athlete ID:
          <input
            name="athleteId"
            value={result.athleteId || ""}
            onChange={handleChange}
            disabled
          />
        </label>
        <label>
          Discipline:
          <select
            name="disciplineId"
            value={result.disciplineId || ""}
            onChange={handleChange}
            required
          >
            {disciplines.map((discipline) => (
              <option key={discipline.id} value={discipline.id}>
                {discipline.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Result:
          <input
            type="number"
            name="result"
            value={result.result || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Result Type:
          <select
            name="resultType"
            value={result.resultType || ""}
            onChange={handleChange}
          >
            <option value="DISTANCE">Distance</option>
            <option value="TIME">Time</option>
          </select>
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={new Date(result.date).toISOString().split("T")[0]}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={result.location || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Competition:
          <input
            type="text"
            name="competition"
            value={result.competition || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Placement:
          <input
            type="text"
            name="placement"
            value={result.placement || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Comment:
          <input
            type="text"
            name="comment"
            value={result.comment || ""}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Result</button>
        <button
          onClick={handleDeleteClicked}
          style={{ backgroundColor: "red" }}
        >
          Delete Result
        </button>
      </form>
    </div>
  );
}
