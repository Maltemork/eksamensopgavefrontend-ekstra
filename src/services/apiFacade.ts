import { Athlete, AthleteAPI, ResultAPI, ResultAPIWithId } from "../Types";
import { makeOptions, handleHttpErrors } from "./fetchUtils";

export async function getAthletes() {
  const headers = {
    "Content-Type": "application/json",
  };
  const options = makeOptions("GET", null, headers, false);
  return fetch("http://localhost:8080/athletes", options)
    .then((response: Response) => handleHttpErrors(response))
    .then((data: Athlete[]) =>
      data.map((athlete: Athlete) => ({
        ...athlete,
        id: athlete.id || 0,
        name: athlete.name || "",
        gender: athlete.gender || "",
        club: athlete.club || "",
        age: athlete.age || 0,
        weight: athlete.weight || 0,
        height: athlete.height || 0,
        email: athlete.email || "",
        phone: athlete.phone || "",
        address: athlete.address || "",
        city: athlete.city || "",
        postalCode: athlete.postalCode || "",
        comment: athlete.comment || "",
        disciplines: athlete.disciplines || [],
      }))
    );
}

export async function getAthlete(AthleteID: number) {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = makeOptions("GET", null, headers, false);
  return fetch(
    "http://localhost:8080/athletes/find-by-id/" + AthleteID,
    options
  )
    .then(handleHttpErrors)
    .then((athlete: Athlete) => ({
      ...athlete,
      id: athlete.id || 0,
      name: athlete.name || "",
      gender: athlete.gender || "",
      club: athlete.club || "",
      age: athlete.age || 0,
      weight: athlete.weight || 0,
      height: athlete.height || 0,
      email: athlete.email || "",
      phone: athlete.phone || "",
      address: athlete.address || "",
      city: athlete.city || "",
      postalCode: athlete.postalCode || "",
      comment: athlete.comment || "",
      disciplines: athlete.disciplines || [],
    }));
}

export async function getAthleteResults(AthleteID: number) {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = makeOptions("GET", null, headers, false);
  return fetch(
    "http://localhost:8080/athletes/" + AthleteID + "/results",
    options
  ).then(handleHttpErrors);
}

export async function addAthlete(athlete: AthleteAPI) {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = makeOptions("POST", athlete, headers, false);
  return fetch("http://localhost:8080/athletes", options).then(
    handleHttpErrors
  );
}

export async function updateAthlete(athlete: Athlete) {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = makeOptions("PUT", athlete, headers, false);
  return fetch("http://localhost:8080/athletes", options).then(
    handleHttpErrors
  );
}

export async function deleteAthlete(AthleteID: number) {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = makeOptions("DELETE", null, headers, false);
  return fetch("http://localhost:8080/athletes/" + AthleteID, options).then(
    handleHttpErrors
  );
}

export async function getDisciplines() {
  const headers = {
    "Content-Type": "application/json",
  };
  const options = makeOptions("GET", null, headers, false);
  return fetch("http://localhost:8080/disciplines", options).then(
    handleHttpErrors
  );
}

export async function addResult(result: ResultAPI) {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = makeOptions("POST", result, headers, false);
  return fetch(
    "http://localhost:8080/athletes/" + result.athleteId + "/results",
    options
  ).then(handleHttpErrors);
}

export async function getResult(resultId: number) {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = makeOptions("GET", null, headers, false);
  return fetch(
    "http://localhost:8080/athletes/results/find-by-id/" + resultId,
    options
  ).then(handleHttpErrors);
}

export async function updateResult(result: ResultAPIWithId) {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = makeOptions("PUT", result, headers, false);
  return fetch(
    "http://localhost:8080/athletes/results/" + result.id,
    options
  ).then(handleHttpErrors);
}

export async function getResults() {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = makeOptions("GET", null, headers, false);
  return fetch("http://localhost:8080/athletes/results", options).then(
    handleHttpErrors
  );
}

export async function getDiscipline(DisciplineID: number) {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = makeOptions("GET", null, headers, false);
  return fetch(
    "http://localhost:8080/disciplines/" + DisciplineID,
    options
  ).then(handleHttpErrors);
}

export async function getDisciplineResults(DisciplineID: number) {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = makeOptions("GET", null, headers, false);
  return fetch(
    "http://localhost:8080/disciplines/" + DisciplineID + "/results",
    options
  ).then(handleHttpErrors);
}

export async function deleteDiscipline(DisciplineID: number) {
  const headers = {
    "Content-Type": "application/json",
  };

  const options = makeOptions("DELETE", null, headers, false);
  return fetch(
    "http://localhost:8080/disciplines/" + DisciplineID,
    options
  ).then(handleHttpErrors);
}
