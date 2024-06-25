import { useEffect, useState } from "react";
import { Discipline, ResultAPI, ResultType } from "../../../../../Types";
import "./DisciplineAddResult.css";
import {
  addResult,
  getAthlete,
  getDisciplines,
} from "../../../../../services/apiFacade";
import { useNavigate, useParams } from "react-router-dom";

export default function ResultAdd() {
  const navigate = useNavigate();
  const { disciplineId } = useParams();
  const [athleteName, setAthleteName] = useState<string>("No Athlete Found");
  const [athleteFound, setAthleteFound] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [result, setResult] = useState<ResultAPI>({
    athleteId: 0,
    disciplineId: Number(disciplineId),
    result: 1,
    resultType: ResultType.TIME,
    date: new Date("01/01/2024"),
    location: "",
    competition: "",
    placement: "",
    comment: "",
  });

  useEffect(() => {
    console.log(result);
  }, [result]);

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
        window.setTimeout(() => {
          navigate("/disciplines/" + disciplineId);
        }, 500);
      });
  };

  const handleAthleteIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Cancel the previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    const newTimeoutId = setTimeout(() => {
      getAthlete(Number(e.target.value))
        .then((athlete) => {
          result.athleteId = athlete.id;
          setAthleteName(athlete.name);
          setAthleteFound(true);
        })
        .catch(() => {
          setAthleteFound(false);
        });
    }, 600);

    // Save the timeout ID
    setTimeoutId(newTimeoutId);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Discipline (required):
          <select
            name="disciplineId"
            onChange={handleInputChange}
            required
            disabled
          >
            {disciplines.map((discipline) => (
              <option key={discipline.id} value={discipline.id}>
                {discipline.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Athlete ID:
          <input name="athleteId" onChange={handleAthleteIdChange} />
          {athleteFound ? (
            <p style={{ color: "green" }}>Athlete found: {athleteName}</p>
          ) : (
            <p style={{ color: "red" }}>No athlete found</p>
          )}
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
            <option value={ResultType.TIME}>Time</option>
            <option value={ResultType.DISTANCE}>Distance</option>
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
        <button
          type="submit"
          disabled={!athleteFound}
          style={{ backgroundColor: athleteFound ? "green" : "red" }}
        >
          Submit
        </button>
      </form>
      {err && <p>{err}</p>}
    </div>
  );
}
