import { useState } from "react";
import events from "../data/data";
import EventCard from "../components/EventCard";

function HomePage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  let filtered = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "date") filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <input placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} />
      <select onChange={e => setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="date">Date</option>
      </select>
      <div style={{display: "flex", flexWrap: "wrap"}}>
        {filtered.map(event => <EventCard key={event.id} event={event} />)}
      </div>
    </div>
  );
}
export default HomePage;