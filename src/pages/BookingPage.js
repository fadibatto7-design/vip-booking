import { useState, useEffect } from "react";

import { db } from "../firebase";

import {
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import { QRCodeCanvas } from "qrcode.react";

export default function BookingPage() {

  const MAX_CAPACITY = 200;

  const tables = [

    { id: "L1", top: 180, left: 80, booked: false },
    { id: "L2", top: 180, left: 180, booked: false },
    { id: "L3", top: 180, left: 280, booked: false },
    { id: "L4", top: 180, left: 380, booked: false },

    { id: "L5", top: 300, left: 80, booked: false },
    { id: "L6", top: 300, left: 180, booked: false },
    { id: "L7", top: 300, left: 280, booked: false },
    { id: "L8", top: 300, left: 380, booked: false },

    { id: "L9", top: 420, left: 80, booked: false },
    { id: "L10", top: 420, left: 180, booked: false },
    { id: "L11", top: 420, left: 280, booked: false },
    { id: "L12", top: 420, left: 380, booked: false },

    { id: "L13", top: 540, left: 80, booked: false },
    { id: "L14", top: 540, left: 180, booked: false },
    { id: "L15", top: 540, left: 280, booked: false },
    { id: "L16", top: 540, left: 380, booked: false },

    { id: "R1", top: 180, left: 700, booked: false },
    { id: "R2", top: 180, left: 800, booked: false },
    { id: "R3", top: 180, left: 900, booked: false },
    { id: "R4", top: 180, left: 1000, booked: false },

    { id: "R5", top: 300, left: 700, booked: false },
    { id: "R6", top: 300, left: 800, booked: false },
    { id: "R7", top: 300, left: 900, booked: false },
    { id: "R8", top: 300, left: 1000, booked: false },

    { id: "R9", top: 420, left: 700, booked: false },
    { id: "R10", top: 420, left: 800, booked: false },
    { id: "R11", top: 420, left: 900, booked: false },
    { id: "R12", top: 420, left: 1000, booked: false },

    { id: "R13", top: 540, left: 700, booked: false },
    { id: "R14", top: 540, left: 800, booked: false },
    { id: "R15", top: 540, left: 900, booked: false },
    { id: "R16", top: 540, left: 1000, booked: false },

    { id: "L17", top: 820, left: 80, booked: false },
    { id: "L18", top: 820, left: 180, booked: false },
    { id: "L19", top: 820, left: 280, booked: false },
    { id: "L20", top: 820, left: 380, booked: false },

    { id: "L21", top: 940, left: 80, booked: false },
    { id: "L22", top: 940, left: 180, booked: false },
    { id: "L23", top: 940, left: 280, booked: false },
    { id: "L24", top: 940, left: 380, booked: false },

    { id: "R17", top: 820, left: 700, booked: false },
    { id: "R18", top: 820, left: 800, booked: false },
    { id: "R19", top: 820, left: 900, booked: false },
    { id: "R20", top: 820, left: 1000, booked: false },

    { id: "R21", top: 940, left: 700, booked: false },
    { id: "R22", top: 940, left: 800, booked: false },
    { id: "R23", top: 940, left: 900, booked: false },
    { id: "R24", top: 940, left: 1000, booked: false },

  ];

  const [selectedTable, setSelectedTable] = useState(null);

  const [bookedTables, setBookedTables] = useState([]);

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [guests, setGuests] = useState("");

  const [notes, setNotes] = useState("");

  const [showQR, setShowQR] = useState(false);

  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "bookings"),
      (snapshot) => {

        const booked = snapshot.docs.map(
          (doc) => ({
            table: doc.data().table,
            guests: Number(doc.data().guests),
          })
        );

        setBookedTables(booked);

      }
    );

    return () => unsubscribe();

  }, []);

  const totalGuests = bookedTables.reduce(
    (sum, booking) => sum + booking.guests,
    0
  );

  const remainingSeats =
    MAX_CAPACITY - totalGuests;

  const handleBooking = async () => {

    if (!name || !phone || !guests) {

      alert("Please fill all fields");

      return;

    }

    if (
      totalGuests + Number(guests) >
      MAX_CAPACITY
    ) {

      alert(
        `Only ${remainingSeats} seats remaining`
      );

      return;

    }

    try {

      await addDoc(collection(db, "bookings"), {

        table: selectedTable.id,

        customerName: name,

        phone: phone,

        guests: Number(guests),

        notes: notes,

        totalPrice:
          Number(guests) * 35000,

        createdAt: new Date(),

      });

      setShowQR(true);

      alert("Booking Saved Successfully ✅");

    } catch (error) {

      console.log(error);

      alert("Error Saving Booking");

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

      {/* EVENT INFO */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#0c0c0c",
          padding: "30px",
          borderRadius: "25px",
          marginBottom: "30px",
          border: "1px solid #222",
        }}
      >

        <div style={{ display: "flex", gap: "25px" }}>

          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
            alt="poster"
            style={{
              width: "220px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />

          <div>

            <h1
              style={{
                fontSize: "50px",
                marginBottom: "20px",
              }}
            >
              Music No1 VIP Party
            </h1>

            <p style={{ fontSize: "24px", color: "#ccc" }}>
              📅 Friday, 20 June 2026
            </p>

            <p style={{ fontSize: "24px", color: "#ccc" }}>
              🕒 10:00 PM - 3:00 AM
            </p>

            <p style={{ fontSize: "24px", color: "#ccc" }}>
              📍 Baghdad Grand Hall
            </p>

            <p style={{ fontSize: "24px", color: "#39ff14" }}>
              👥 Remaining Seats:
              {" "}
              {remainingSeats}
            </p>

          </div>

        </div>

      </div>

      {/* HALL */}

      <div
        style={{
          position: "relative",
          width: "1200px",
          height: "1200px",
          margin: "40px auto",
          background: "#0c0c0c",
          borderRadius: "30px",
          border: "2px solid #222",
        }}
      >

        <div
          style={{
            position: "absolute",
            top: 60,
            left: 250,
            width: 700,
            height: 90,
            background: "#1a1025",
            border: "2px solid #c14cff",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "45px",
            fontWeight: "bold",
          }}
        >
          STAGE
        </div>

        <div
          style={{
            position: "absolute",
            top: 690,
            left: 0,
            width: "100%",
            height: 80,
            background: "#151515",
            borderTop: "2px solid #c14cff",
            borderBottom: "2px solid #c14cff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "40px",
            color: "#c14cff",
            fontWeight: "bold",
          }}
        >
          ENTRANCE
        </div>

        {tables.map((table) => {

          const isBooked =
            bookedTables.some(
              (booking) =>
                booking.table === table.id
            );

          return (

            <div
              key={table.id}
              onClick={() => {

                if (!isBooked) {
                  setSelectedTable(table);
                  setShowQR(false);
                }

              }}
              style={{
                position: "absolute",
                top: table.top,
                left: table.left,
                width: 75,
                height: 75,

                background:
                  selectedTable?.id === table.id
                    ? "#d4a017"
                    : isBooked
                    ? "#7a1010"
                    : "#102c10",

                border: `2px solid ${
                  selectedTable?.id === table.id
                    ? "#ffd700"
                    : isBooked
                    ? "red"
                    : "#39ff14"
                }`,

                borderRadius: "12px",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                cursor:
                  isBooked
                    ? "not-allowed"
                    : "pointer",

                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              {table.id}
            </div>

          );

        })}

      </div>

      {/* BOOKING FORM */}

      {selectedTable && !showQR && (

        <div
          style={{
            width: "550px",
            margin: "40px auto",
            background: "#111",
            padding: "35px",
            borderRadius: "25px",
          }}
        >

          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              fontSize: "35px",
            }}
          >
            Booking Summary
          </h2>

          <p style={{ fontSize: "22px" }}>
            🪑 Table:
            <strong> {selectedTable.id}</strong>
          </p>

          <p style={{ fontSize: "22px" }}>
            💰 Price Per Person:
            <strong>
              {" "}
              35,000 IQD
            </strong>
          </p>

          <p style={{ fontSize: "22px" }}>
            🧾 Total Price:
            <strong>
              {" "}
              {Number(guests || 0) * 35000}
              {" "}
              IQD
            </strong>
          </p>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "20px",
              marginBottom: "15px",
              borderRadius: "12px",
            }}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "12px",
            }}
          />

          <input
            type="number"
            placeholder="Guests Count"
            value={guests}
            onChange={(e) =>
              setGuests(e.target.value)
            }
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "12px",
            }}
          />

          <textarea
            placeholder="Notes"
            rows="4"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "12px",
              resize: "none",
            }}
          />

          <button
            onClick={handleBooking}
            style={{
              width: "100%",
              padding: "18px",
              background: "#d4a017",
              border: "none",
              borderRadius: "15px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "20px",
              color: "#000",
            }}
          >
            Save Booking
          </button>

        </div>

      )}

      {/* QR CODE */}

      {showQR && selectedTable && (

        <div
          style={{
            width: "500px",
            margin: "40px auto",
            background: "#111",
            padding: "30px",
            borderRadius: "25px",
            textAlign: "center",
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
              fontSize: "35px",
            }}
          >
            Your Ticket
          </h2>

          <p
            style={{
              fontSize: "22px",
              marginBottom: "25px",
              color: "#ccc",
              lineHeight: "35px",
            }}
          >
            🎉 شكراً لحجزك معنا
            <br />
            يرجى إبراز رمز الدخول عند باب الحفل
          </p>

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "20px",
              display: "inline-block",
            }}
          >

            <QRCodeCanvas
              value={`
Name: ${name}
Table: ${selectedTable.id}
Guests: ${guests}
`}
              size={250}
            />

          </div>

          <div
            style={{
              marginTop: "30px",
              textAlign: "left",
              background: "#1a1a1a",
              padding: "20px",
              borderRadius: "18px",
            }}
          >

            <p style={{ fontSize: "20px" }}>
              👤 Name: {name}
            </p>

            <p style={{ fontSize: "20px" }}>
              🪑 Table: {selectedTable.id}
            </p>

            <p style={{ fontSize: "20px" }}>
              👥 Guests: {guests}
            </p>

            <p style={{ fontSize: "20px" }}>
              📞 Phone: {phone}
            </p>

          </div>

        </div>

      )}

    </div>

  );
}