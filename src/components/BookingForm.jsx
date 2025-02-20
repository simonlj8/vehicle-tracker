import { useState, useEffect } from "react";
import { getCars, assignCar } from "../api";

const BookingForm = () => {
  const [cars, setCars] = useState([]);
  const [drivers, setDrivers] = useState([]); // Placeholder för chaufförer
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carData = await getCars();
        setCars(carData);

        // Placeholder: Simulerad lista av chaufförer
        setDrivers([
          { id: 1, name: "Karl Anka" },
          { id: 2, name: "Bat Man" },
          { id: 3, name: "Mars i Pulami " },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCar || !selectedDriver || !startTime || !endTime) {
      setMessage("Vänligen fyll i alla fält.");
      return;
    }

    try {
      await assignCar(selectedCar, selectedDriver);
      setMessage("Bilen har bokats!");
      setSelectedCar("");
      setSelectedDriver("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      setMessage("Fel vid bokning av bilen.");
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="container">
      <h2>Boka en bil</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Välj bil:</label>
          <select value={selectedCar} onChange={(e) => setSelectedCar(e.target.value)}>
            <option value="">-- Välj bil --</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.registration} - {car.status}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Välj chaufför:</label>
          <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
            <option value="">-- Välj chaufför --</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Starttid:</label>
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Sluttid:</label>
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>

        <button type="submit" className="button">Boka bil</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default BookingForm;
