import { useState, useEffect } from "react";
import { db } from "../firebase";

import {
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import { QRCodeCanvas } from "qrcode.react";

export default function BookingPage() {

  const [selectedTable, setSelectedTable] =
    useState(null);

  const [bookedTables, setBookedTables] =
    useState([]);

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [guests, setGuests] = useState("");

  const [notes, setNotes] = useState("");

  const [showQR, setShowQR] = useState(false);

  const tables = [
    "L1","L2","L3","L4",
    "L5","L6","L7","L8",
    "L9","L10","L11","L12",
    "R1","R2","R3","R4",
    "R5","R6","R7","R8",
    "R9","R10","R11","R12",
  ];

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "bookings"),
      (snapshot) => {

        const booked =
          snapshot.docs.map(
            (doc) => doc.data().table
          );

        setBookedTables(booked);

      }
    );

    return () => unsubscribe();

  }, []);

  const handleBooking = async () => {

    if (
      !name ||
      !phone ||
      !guests
    ) {

      alert("Fill all fields");

      return;

    }

    try {

      await addDoc(
        collection(db, "bookings"),
        {

          table: selectedTable,

          customerName: name,

          phone: phone,

          guests: guests,

          notes: notes,

          createdAt: new Date(),

        }
      );

      setShowQR(true);

      alert("Booking Saved ✅");

    } catch (error) {

      console.log(error);

      alert("Error");

    }

  };

  return (

    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        VIP Booking
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4,1fr)",
          gap: "20px",
          maxWidth: "600px",
          margin: "auto",
        }}
      >

        {tables.map((table) => {

          const isBooked =
            bookedTables.includes(table);

          return (

            <div
              key={table}
              onClick={() => {

                if (!isBooked) {

                  setSelectedTable(table);

                  setShowQR(false);

                }

              }}
              style={{
                background:
                  selectedTable === table
                    ? "#d4a017"
                    : isBooked
                    ? "#7a1010"
                    : "#102c10",

                padding: "30px",

                borderRadius: "15px",

                textAlign: "center",

                cursor:
                  isBooked
                    ? "not-allowed"
                    : "pointer",

                fontWeight: "bold",
              }}
            >
              {table}
            </div>

          );

        })}

      </div>

      {selectedTable && !showQR && (

        <div
          style={{
            maxWidth: "600px",
            margin: "40px auto",
            background: "#111",
            padding: "30px",
            borderRadius: "20px",
          }}
        >

          <h2>
            Table:
            {" "}
            {selectedTable}
          </h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "20px",
              marginBottom: "15px",
            }}
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "15px",
            }}
          />

          <input
            type="number"
            placeholder="Guests"
            value={guests}
            onChange={(e) =>
              setGuests(e.target.value)
            }
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "15px",
            }}
          />

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "20px",
            }}
          />

          <button
            onClick={handleBooking}
            style={{
              width: "100%",
              padding: "18px",
              background: "#d4a017",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Confirm Booking
          </button>

        </div>

      )}

      {showQR && (

        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >

          <h2>Your Ticket</h2>

          <QRCodeCanvas
            value={`
Name: ${name}
Table: ${selectedTable}
Guests: ${guests}
`}
            size={250}
          />

        </div>

      )}

    </div>

  );

}