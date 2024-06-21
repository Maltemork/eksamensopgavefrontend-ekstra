import { useState } from "react";
import { AthleteAPI } from "../../../../Types";
import "./AddPage.css";
import { addAthlete } from "../../../../services/apiFacade";
import { useNavigate } from "react-router-dom";

export default function AddPage() {
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState<AthleteAPI>({
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
  });

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
    addAthlete(athlete)
      .catch((err) => console.log(err))
      .then(() => {
        navigate("/athletes");
      });
  };

  return (
    <div className="add-athlete-container">
      <h1>Add Athlete</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={athlete.name}
            onChange={handleInputChange}
            required
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
            <option value="">Select...</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={athlete.age}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={athlete.email}
            onChange={handleInputChange}
            required
          />
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
