import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Adds a new booking document to Firestore with the user and cart info.
    await addDoc(collection(db, "bookings"), {
      userId: user.uid,
      items: cart,
      total: totalPrice,
      createdAt: Timestamp.now(),
    });
    clearCart();
    navigate("/success");
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty.</p> : (
        <div>
          {cart.map(item => (
            <div key={item.id}>
              <span>{item.title}</span>
              <input type="number" value={item.quantity}
                onChange={e => updateQuantity(item.id, Number(e.target.value))} min={1} />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${totalPrice}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
}
export default CartPage;