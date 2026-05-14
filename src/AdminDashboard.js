import { useEffect, useState } from "react";

import { db } from "./firebase";

import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AdminDashboard() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "bookings"),
      (snapshot) => {

        const data = snapshot.docs.map((docItem) => ({
          id: docItem.id,
          ...docItem.data(),
        }));

        setBookings(data);
      }
    );

    return () => unsubscribe();

  }, []);

  const deleteBooking = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this booking?"
    );

    if (!confirmDelete) return;

    try {

      await deleteDoc(doc(db, "bookings", id));

      alert("Booking Deleted ✅");

    } catch (error) {

      console.log(error);

      alert("Error deleting booking");

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      <h1
        style={{
          fontSize: "50px",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "25px",
        }}
      >

        {bookings.map((booking) => (

          <div
            key={booking.id}
            style={{
              background: "#111",
              border: "1px solid #222",
              borderRadius: "25px",
              padding: "25px",
            }}
          >

            <h2
              style={{
                marginBottom: "20px",
                color: "#d4a017",
              }}
            >
              🪑 Table {booking.table}
            </h2>

            <p style={{ fontSize: "18px" }}>
              👤 Name: {booking.customerName}
            </p>

            <p style={{ fontSize: "18px" }}>
              📞 Phone: {booking.phone}
            </p>

            <p style={{ fontSize: "18px" }}>
              👥 Guests: {booking.guests}
            </p>

            <p style={{ fontSize: "18px" }}>
              📝 Notes: {booking.notes || "No Notes"}
            </p>

            <button
              onClick={() => deleteBooking(booking.id)}
              style={{
                width: "100%",
                marginTop: "25px",
                padding: "15px",
                background: "#7a1010",
                color: "white",
                border: "none",
                borderRadius: "15px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Delete Booking
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}