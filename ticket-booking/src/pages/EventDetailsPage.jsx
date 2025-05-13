import { useParams } from "react-router-dom";
import events from "../data/data";
import { useCart } from "../contexts/CartContext";

function EventDetailsPage() {
  const { eventId } = useParams();
  const event = events.find(e => e.id === Number(eventId));
  const { addToCart } = useCart();

  if (!event) return <div>Event not found.</div>;

  return (
    <div>
      <img src={event.thumbnail} alt={event.title} />
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Location: {event.location}</p>
      <p>Price: ${event.price}</p>
      <button onClick={() => addToCart(event)}>Add to Cart</button>
    </div>
  );
}
export default EventDetailsPage;