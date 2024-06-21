export interface Athlete {
  id: number;
  name: string;
  gender: string;
  club: string;
  age: number;
  weight: number;
  height: number;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  comment: string;
  disciplines: Discipline[];
}

export interface AthleteAPI {
  name: string;
  gender: string;
  club: string;
  age: number;
  weight: number;
  height: number;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  comment: string;
}

export interface Discipline {
  id: number;
  name: string;
  description: string;
  results: Result[];
}

export interface Result {
  id: number;
  athlete: Athlete;
  discipline: Discipline;
  result: number;
  resultType: string;
  date: Date;
  location: string;
  competition: string;
  placement: string;
  comment: string;
  disciplineId: number;
}

export interface ResultAPI {
  athleteId: number;
  disciplineId: number;
  result: number;
  resultType: string;
  date: Date;
  location: string;
  competition: string;
  placement: string;
  comment: string;
}

export interface ResultAPIWithId {
  id: number;
  athleteId: number;
  disciplineId: number;
  result: number;
  resultType: string;
  date: Date;
  location: string;
  competition: string;
  placement: string;
  comment: string;
}
