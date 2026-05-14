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

  const PRICE_PER_PERSON = 35000;

  const isMobile = window.innerWidth < 768;

  const tables = [

    { id: "L1", top: 180, left: 80 },
    { id: "L2", top: 180, left: 180 },
    { id: "L3", top: 180, left: 280 },
    { id: "L4", top: 180, left: 380 },

    { id: "L5", top: 300, left: 80 },
    { id: "L6", top: 300, left: 180 },
    { id: "L7", top: 300, left: 280 },
    { id: "L8", top: 300, left: 380 },

    { id: "L9", top: 420, left: 80 },
    { id: "L10", top: 420, left: 180 },
    { id: "L11", top: 420, left: 280 },
    { id: "L12", top: 420, left: 380 },

    { id: "L13", top: 540, left: 80 },
    { id: "L14", top: 540, left: 180 },
    { id: "L15", top: 540, left: 280 },
    { id: "L16", top: 540, left: 380 },

    { id: "R1", top: 180, left: 700 },
    { id: "R2", top: 180, left: 800 },
    { id: "R3", top: 180, left: 900 },
    { id: "R4", top: 180, left: 1000 },

    { id: "R5", top: 300, left: 700 },
    { id: "R6", top: 300, left: 800 },
    { id: "R7", top: 300, left: 900 },
    { id: "R8", top: 300, left: 1000 },

    { id: "R9", top: 420, left: 700 },
    { id: "R10", top: 420, left: 800 },
    { id: "R11", top: 420, left: 900 },
    { id: "R12", top: 420, left: 1000 },

    { id: "R13", top: 540, left: 700 },
    { id: "R14", top: 540, left: 800 },
    { id: "R15", top: 540, left: 900 },
    { id: "R16", top: 540, left: 1000 },

    { id: "L17", top: 820, left: 80 },
    { id: "L18", top: 820, left: 180 },
    { id: "L19", top: 820, left: 280 },
    { id: "L20", top: 820, left: 380 },

    { id: "L21", top: 940, left: 80 },
    { id: "L22", top: 940, left: 180 },
    { id: "L23", top: 940, left: 280 },
    { id: "L24", top: 940, left: 380 },

    { id: "R17", top: 820, left: 700 },
    { id: "R18", top: 820, left: 800 },
    { id: "R19", top: 820, left: 900 },
    { id: "R20", top: 820, left: 1000 },

    { id: "R21", top: 940, left: 700 },
    { id: "R22", top: 940, left: 800 },
    { id: "R23", top: 940, left: 900 },
    { id: "R24", top: 940, left: 1000 },

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

        const booked = snapshot.docs.map((doc) => ({
          table: doc.data().table,
          guests: Number(doc.data().guests),
        }));

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
          Number(guests) *
          PRICE_PER_PERSON,

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
        padding: isMobile ? "15px" : "30px",
        fontFamily: "Arial",
      }}
    >

      {/* EVENT INFO */}

      <div
        style={{
          background: "#0c0c0c",
          padding: isMobile ? "20px" : "30px",
          borderRadius: "25px",
          marginBottom: "30px",
          border: "1px solid #222",
        }}
      >

        <h1
          style={{
            fontSize:
              isMobile ? "35px" : "55px",
            marginBottom: "20px",
          }}
        >
          Music No1 VIP Party
        </h1>

        <p style={{ fontSize: "22px", color: "#ccc" }}>
          📅 Friday, 20 June 2026
        </p>

        <p style={{ fontSize: "22px", color: "#ccc" }}>
          📍 Baghdad Grand Hall
        </p>

        <p
          style={{
            fontSize: "28px",
            color: "#39ff14",
            marginTop: "20px",
            fontWeight: "bold",
          }}
        >
          👥 Remaining Seats:
          {" "}
          {remainingSeats}
        </p>

      </div>

      {/* HALL */}

      <div
        style={{
          width: "100%",
          overflowX: "auto",
          paddingBottom: "20px",
        }}
      >

        <div
          style={{
            position: "relative",
            width: "1200px",
            height: "1200px",
            margin: "0 auto",
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
              fontSize: "42px",
              fontWeight: "bold",
            }}
          >
            STAGE
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
                  width: 65,
                  height: 65,

                  background:
                    selectedTable?.id === table.id
                      ? "#d4a017"
                      : isBooked
                      ? "#8b0000"
                      : "#082d08",

                  border: `2px solid ${
                    selectedTable?.id === table.id
                      ? "#ffd700"
                      : isBooked
                      ? "#ff0000"
                      : "#39ff14"
                  }`,

                  borderRadius: "14px",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",

                  cursor:
                    isBooked
                      ? "not-allowed"
                      : "pointer",

                  fontWeight: "bold",

                  fontSize: "20px",

                  color: "white",
                }}
              >
                {table.id}
              </div>

            );

          })}

        </div>

      </div>

      {/* BOOKING FORM */}

      {selectedTable && !showQR && (

        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            margin: "40px auto",
            background: "#111",
            padding: "30px",
            borderRadius: "25px",
          }}
        >

          <h2
            style={{
              marginBottom: "30px",
              fontSize: "40px",
            }}
          >
            Booking Summary
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={{
              width: "100%",
              padding: "18px",
              marginBottom: "18px",
              borderRadius: "15px",
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
              padding: "18px",
              marginBottom: "18px",
              borderRadius: "15px",
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
              padding: "18px",
              marginBottom: "18px",
              borderRadius: "15px",
            }}
          />

          <textarea
            rows="4"
            placeholder="Notes"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            style={{
              width: "100%",
              padding: "18px",
              marginBottom: "20px",
              borderRadius: "15px",
            }}
          />

          <button
            onClick={handleBooking}
            style={{
              width: "100%",
              padding: "22px",
              background: "#d4a017",
              border: "none",
              borderRadius: "18px",
              fontSize: "24px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Confirm Booking
          </button>

        </div>

      )}

      {/* QR CODE */}

      {showQR && selectedTable && (

        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            margin: "40px auto",
            background: "#111",
            padding: "30px",
            borderRadius: "25px",
            textAlign: "center",
          }}
        >

          <h2 style={{ marginBottom: "20px" }}>
            Your Ticket
          </h2>

          <QRCodeCanvas
            value={`
Name: ${name}
Table: ${selectedTable.id}
Guests: ${guests}
`}
            size={220}
          />

        </div>

      )}

    </div>

  );

}