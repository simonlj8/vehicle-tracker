import CarList from "../components/CarList";
import BookingForm from "../components/BookingForm";

const Home = () => {
    return (
        <div className="container">
        <h1>Fordonsöversikt</h1>
        <BookingForm />
        <CarList />
        </div>
    );
};

export default Home;