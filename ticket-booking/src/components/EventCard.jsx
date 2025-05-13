import { Link } from "react-router-dom";
function EventCard({ event }) {
  return (
    <div style={{border: "1px solid #ccc", margin: 10, width: 250}}>
      <img src={event.thumbnail} alt={event.title} style={{width: "100%"}} />
      <h3>{event.title}</h3>
      <p>{event.date} | {event.location}</p>
      <p>${event.price}</p>
      <Link to={`/event/${event.id}`}>View Details</Link>
    </div>
  );
}
export default EventCard;