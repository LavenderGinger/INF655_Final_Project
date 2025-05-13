import { useNavigate } from "react-router-dom";

export default function BookingSuccessPage() {
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Booking Successful!</h1>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}