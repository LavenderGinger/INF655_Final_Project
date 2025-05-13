import { useAuth } from "../contexts/AuthContext";
import { db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

function ProfilePage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      setBookings(querySnapshot.docs.map(doc => doc.data()));
    };
    if (user) fetchBookings();
  }, [user]);

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.displayName || "N/A"}</p>
      <p>Email: {user.email}</p>
      <h3>Booking History</h3>
      <ul>
        {bookings.map((b, i) => (
          <li key={i}>
            {b.items.map(item => (
              <span key={item.id}>{item.title} (x{item.quantity}) </span>
            ))}
            - ${b.total}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ProfilePage;