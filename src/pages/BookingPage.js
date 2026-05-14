import { useState, useEffect } from "react";
import { db } from "../firebase";

import {
  collection,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

export default function BookingPage() {

  const MAX_CAPACITY = 200;
  const PRICE_PER_PERSON = 35000;

  const isMobile = window.innerWidth < 768;

  const tables = [
    "L1","L2","L3","L4",
    "L5","L6","L7","L8",
    "L9","L10","L11","L12",
    "L13","L14","L15","L16",

    "R1","R2","R3","R4",
    "R5","R6","R7","R8",
    "R9","R10","R11","R12",
    "R13","R14","R15","R16",

    "L17","L18","L19","L20",
    "L21","L22","L23","L24",

    "R17","R18","R19","R20",
    "R21","R22","R23","R24",
  ];

  const [selectedTable, setSelectedTable] =
    useState(null);

  const [bookedTables, setBookedTables] =
    useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState("");

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
    (sum, booking) =>
      sum + booking.guests,
    0
  );

  const remainingSeats =
    MAX_CAPACITY - totalGuests;

  const handleBooking = async () => {

    if (
      !name ||
      !phone ||
      !selectedTable
    ) {

      alert("Please fill all fields");
      return;

    }

    try {

      await addDoc(
        collection(db, "bookings"),
        {

          table: selectedTable,

          customerName: name,

          phone: phone,

          guests: Number(guests),

          notes: notes,

          totalPrice:
            Number(guests) *
            PRICE_PER_PERSON,

          createdAt: new Date(),

        }
      );

      alert("Booking Saved Successfully ✅");

      setName("");
      setPhone("");
      setGuests(1);
      setNotes("");
      setSelectedTable(null);

    } catch (error) {

      console.log(error);

      alert("Error saving booking");

    }

  };

  const renderTable = (table) => {

    const isBooked =
      bookedTables.some(
        (booking) =>
          booking.table === table
      );

    return (

      <div
        key={table}
        onClick={() => {

          if (!isBooked) {

            setSelectedTable(table);

          }

        }}
        style={{

          width: isMobile ? 38 : 70,
          height: isMobile ? 38 : 70,

          borderRadius: 12,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          cursor:
            isBooked
              ? "not-allowed"
              : "pointer",

          fontWeight: "bold",

          fontSize:
            isMobile ? 10 : 18,

          color: "white",

          background:
            selectedTable === table
              ? "#d4a017"
              : isBooked
              ? "#7a1010"
              : "#0d2b0d",

          border: `2px solid ${
            selectedTable === table
              ? "#ffd700"
              : isBooked
              ? "#ff0000"
              : "#39ff14"
          }`,

          boxShadow:
            selectedTable === table
              ? "0 0 15px gold"
              : isBooked
              ? "0 0 10px red"
              : "0 0 10px #39ff14",
        }}
      >
        {table}
      </div>

    );

  };

  return (

    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        color: "white",
        padding: isMobile
          ? "15px"
          : "25px",
        fontFamily: "Arial",
      }}
    >

      {/* EVENT CARD */}

      <div
        style={{
          background: "#0b0b0b",
          border: "1px solid #1f1f1f",
          borderRadius: 25,
          padding: isMobile
            ? 20
            : 30,

          display: "flex",

          flexDirection:
            isMobile
              ? "column"
              : "row",

          gap: 25,

          marginBottom: 25,
        }}
      >

        <img
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
          alt=""
          style={{
            width: isMobile
              ? "100%"
              : 160,

            height: isMobile
              ? 240
              : 230,

            objectFit: "cover",

            borderRadius: 20,
          }}
        />

        <div>

          <h1
            style={{
              fontSize: isMobile
                ? 38
                : 55,

              marginBottom: 20,
            }}
          >
            Music No1 VIP Party
          </h1>

          <p
            style={{
              fontSize:
                isMobile ? 18 : 28,
              color: "#ccc",
            }}
          >
            📅 Friday, 20 June 2026
          </p>

          <p
            style={{
              fontSize:
                isMobile ? 18 : 28,
              color: "#ccc",
            }}
          >
            🕒 10:00 PM - 3:00 AM
          </p>

          <p
            style={{
              fontSize:
                isMobile ? 18 : 28,
              color: "#ccc",
            }}
          >
            📍 Baghdad Grand Hall
          </p>

          <p
            style={{
              fontSize:
                isMobile ? 24 : 32,

              color: "#39ff14",

              fontWeight: "bold",

              marginTop: 20,
            }}
          >
            👥 Remaining Seats:
            {" "}
            {remainingSeats}
          </p>

        </div>

      </div>

      {/* HALL */}

      <div
        style={{
          background: "#0b0b0b",

          borderRadius: 25,

          border: "1px solid #1f1f1f",

          padding: isMobile ? 15 : 25,

          marginBottom: 25,

          overflow: "hidden",
        }}
      >

        {/* STAGE */}

        <div
          style={{
            width: isMobile
              ? "90%"
              : "50%",

            margin: "0 auto",

            padding: 20,

            borderRadius: 20,

            border:
              "2px solid #c14cff",

            textAlign: "center",

            fontSize:
              isMobile ? 24 : 40,

            fontWeight: "bold",

            marginBottom: 40,

            background: "#1a1025",
          }}
        >
          STAGE
        </div>

        {/* TOP TABLES */}

        <div
          style={{
            display: "flex",

            justifyContent: "center",

            alignItems: "flex-start",

            gap: isMobile ? 10 : 40,
          }}
        >

          {/* LEFT */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(4,1fr)",

              gap: isMobile ? 12 : 20,
            }}
          >
            {tables
              .filter((t) =>
                t.startsWith("L")
              )
              .slice(0, 16)
              .map(renderTable)}
          </div>

          {/* RIGHT */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(4,1fr)",

              gap: isMobile ? 12 : 20,
            }}
          >
            {tables
              .filter((t) =>
                t.startsWith("R")
              )
              .slice(0, 16)
              .map(renderTable)}
          </div>

        </div>

        {/* ENTRANCE */}

        <div
          style={{
            textAlign: "center",

            margin: "40px 0",

            fontSize:
              isMobile ? 28 : 40,

            color: "#c14cff",

            fontWeight: "bold",

            borderTop:
              "2px solid #c14cff",

            borderBottom:
              "2px solid #c14cff",

            padding: 15,
          }}
        >
          ENTRANCE
        </div>

        {/* BOTTOM TABLES */}

        <div
          style={{
            display: "flex",

            justifyContent: "center",

            alignItems: "flex-start",

            gap: isMobile ? 10 : 40,
          }}
        >

          {/* LEFT */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(4,1fr)",

              gap: isMobile ? 12 : 20,
            }}
          >
            {tables
              .filter((t) =>
                t.startsWith("L")
              )
              .slice(16)
              .map(renderTable)}
          </div>

          {/* RIGHT */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(4,1fr)",

              gap: isMobile ? 12 : 20,
            }}
          >
            {tables
              .filter((t) =>
                t.startsWith("R")
              )
              .slice(16)
              .map(renderTable)}
          </div>

        </div>

      </div>

    </div>

  );

}

const inputStyle = {

  width: "100%",

  padding: "18px",

  marginBottom: "20px",

  borderRadius: "15px",

  border: "1px solid #333",

  background: "#111",

  color: "white",

  fontSize: "18px",

  outline: "none",

  boxSizing: "border-box",
};

const countBtn = {

  width: 70,

  height: 60,

  borderRadius: 15,

  border: "1px solid #c14cff",

  background: "#1a1025",

  color: "white",

  fontSize: 30,

  cursor: "pointer",
};