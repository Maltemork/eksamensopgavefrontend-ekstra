import { useState, useEffect } from "react";
import { Athlete } from "../../../../../Types";
import "./AthleteEdit.css";
import { updateAthlete, getAthlete } from "../../../../../services/apiFacade";
import { useNavigate, useParams } from "react-router-dom";

export default function AthleteEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [athlete, setAthlete] = useState<Athlete>({
    id: 0,
    name: "",
    gender: "",
    club: "",
    age: 0,
    weight: 0,
    height: 0,
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    comment: "",
    disciplines: [],
  });

  useEffect(() => {
    if (id !== undefined) {
      getAthlete(Number(id)).then((data) => {
        if (data !== null) {
          setAthlete(data);
        } else {
          setAthlete({
            id: 0,
            name: "",
            gender: "",
            club: "",
            age: 0,
            weight: 0,
            height: 0,
            email: "",
            phone: "",
            address: "",
            city: "",
            postalCode: "",
            comment: "",
            disciplines: [],
          });
        }
      });
    }
  }, [id]);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setAthlete({ ...athlete, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(athlete);
    updateAthlete(athlete)
      .catch((err) => console.log(err))
      .then(() => {
        navigate("/athletes");
      });
  };

  return (
    <div className="add-athlete-container">
      <h1>Edit Athlete</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={athlete.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={athlete.gender}
            onChange={handleInputChange}
            required
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </label>
        <label>
          Club:
          <input
            type="text"
            name="club"
            value={athlete.club}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={athlete.age}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            name="weight"
            value={athlete.weight}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            name="height"
            value={athlete.height}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={athlete.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={athlete.phone}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={athlete.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={athlete.city}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            name="postalCode"
            value={athlete.postalCode}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Comment:
          <textarea
            name="comment"
            value={athlete.comment}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
