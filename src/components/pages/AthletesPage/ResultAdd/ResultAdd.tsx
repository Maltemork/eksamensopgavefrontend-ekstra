import { useEffect, useState } from "react";
import { Discipline, ResultAPI } from "../../../../Types";
import "./ResultAdd.css";
import { addResult, getDisciplines } from "../../../../services/apiFacade";
import { useNavigate, useParams } from "react-router-dom";

export default function ResultAdd() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [err, setErr] = useState<string | null>(null);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [result, setResult] = useState<ResultAPI>({
    athleteId: Number(id),
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
    getDisciplines()
      .then((data) => setDisciplines(data))
      .catch((err) => setErr(err.message));
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    if (name === "date") {
      setResult({ ...result, [name]: new Date(value) });
    } else {
      setResult({ ...result, [name]: value });
    }
  };
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(result);
    addResult(result)
      .catch((err) => console.log(err))
      .then(() => {
        navigate("/athletes/" + id);
      });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Discipline (required):
          <select name="disciplineId" onChange={handleInputChange} required>
            {disciplines.map((discipline) => (
              <option key={discipline.id} value={discipline.id}>
                {discipline.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Result (required):
          <input
            type="number"
            name="result"
            value={result.result}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Result Type (required):
          <select
            name="resultType"
            onChange={handleInputChange}
            defaultValue={"TIME"}
            required
          >
            <option value="TIME">Time</option>
            <option value="DISTANCE">Distance</option>
          </select>
        </label>
        <label>
          Date (required):
          <input
            type="date"
            name="date"
            value={result.date.toISOString().split("T")[0]}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={result.location}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Competition:
          <input
            type="text"
            name="competition"
            value={result.competition}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Placement:
          <input
            type="text"
            name="placement"
            value={result.placement}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Comment:
          <textarea
            name="comment"
            value={result.comment}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {err && <p>{err}</p>}
    </div>
  );
}
