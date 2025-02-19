import { useEffect, useState } from "react";
import { getCars } from "../api";

const CarList = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
          try {
            const data = await getCars();
            setCars(data);
          } catch (error) {
            console.error("Error fetching cars:", error);
          }
        };
        fetchCars();
}, []);

return (
    <div className="container">
      <h2>Fordonslista</h2>
      <ul className="car-list">
        {cars.map((car) => (
          <li key={car.id} className="car-item">
            <span>{car.registration}</span>
            <span>{car.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );

};

export default CarList;