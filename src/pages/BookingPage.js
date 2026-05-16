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

  const leftTopTables = [
    "L1","L2","L3","L4",
    "L5","L6","L7","L8",
    "L9","L10","L11","L12",
    "L13","L14","L15","L16",
  ];

  const rightTopTables = [
    "R1","R2","R3","R4",
    "R5","R6","R7","R8",
    "R9","R10","R11","R12",
    "R13","R14","R15","R16",
  ];

  const leftBottomTables = [
    "L17","L18","L19","L20",
    "L21","L22","L23","L24",
  ];

  const rightBottomTables = [
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

  const [showTicket, setShowTicket] =
    useState(false);

  const [ticketData, setTicketData] =
    useState(null);

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

      const bookingData = {

        table: selectedTable,
        customerName: name,
        phone: phone,
        guests: Number(guests),

        totalPrice:
          Number(guests) *
          PRICE_PER_PERSON,

        createdAt: new Date(),

      };

      await addDoc(
        collection(db, "bookings"),
        bookingData
      );

      setTicketData(bookingData);

      setShowTicket(true);

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

          width: isMobile ? 30 : 70,
          height: isMobile ? 30 : 70,

          minWidth: isMobile ? 30 : 70,

          borderRadius: 10,

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          cursor:
            isBooked
              ? "not-allowed"
              : "pointer",

          fontWeight: "bold",

          fontSize:
            isMobile ? 9 : 18,

          color:
            selectedTable === table
              ? "#000"
              : "white",

          background:
            selectedTable === table
              ? "#ffffff"
              : isBooked
              ? "#b80d0d"
              : "#0c0844",

          border: `2px solid ${
            selectedTable === table
              ? "#ffffff"
              : isBooked
              ? "#cc0a0a"
              : "#30099c"
          }`,

          boxShadow:
            selectedTable === table
              ? "0 0 12px gold"
              : isBooked
              ? "0 0 8px red"
              : "0 0 8px #7014da",
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
          ? "8px"
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
          padding: isMobile ? 12 : 30,

          display: "flex",

          flexDirection:
            isMobile
              ? "column"
              : "row",

          gap: 22,

          alignItems: "center",

          justifyContent: "center",

          marginBottom: 20,
        }}
      >

        <img
          src="/logomusicno1.png"
          alt=""
          style={{
            width:
              isMobile
                ? "82%"
                : 320,

            height:
              isMobile
                ? 170
                : 220,

            objectFit: "contain",

            background: "#000",

            borderRadius: 22,

            padding: 18,

            display: "block",

            margin: "0 auto",

            alignSelf: "center",

            border: "1px solid #1f1f1f",
          }}
        />

        <div
          style={{
            width: "100%",
          }}
        >

          <h1
            style={{
              fontSize:
                isMobile
                  ? 26
                  : 55,

              lineHeight: 1.2,

              marginBottom: 15,
            }}
          >
            Music No.1 girls Party
          </h1>

          <p style={infoStyle}>
            📅 Friday, 29 May 2026
          </p>

          <p style={infoStyle}>
            🕒 07:00 PM - 11:00 PM
          </p>

          <p style={infoStyle}>
            📍 اغصان الزيتون-قاعة جواهر
          </p>

          <p
            style={{
              fontSize:
                isMobile
                  ? 16
                  : 32,

              color: "#39ff14",

              fontWeight: "bold",

              marginTop: 15,
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

          padding:
            isMobile
              ? 6
              : 25,

          marginBottom: 20,

          

          overflowY: "hidden",
        }}
      >

        {/* STAGE */}

        <div
          style={{
            width:
              isMobile
                ? "88%"
                : "55%",

            margin: "0 auto",

            padding: 14,

            borderRadius: 20,

            border:
              "2px solid #fa0909",

            textAlign: "center",

            fontSize:
              isMobile
                ? 18
                : 40,

            fontWeight: "bold",

            marginBottom: 20,

            background: "#e00b0b",
          }}
        >
          STAGE
        </div>

        {/* TOP */}

        <div
          style={{
            display: "flex",

            justifyContent: "center",

            gap:
              isMobile
                ?20 
                : 120,

            marginBottom: 25,
          }}
        >

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(4,1fr)",

              gap:
                isMobile
                  ? 10
                  : 22,
            }}
          >
            {leftTopTables.map(renderTable)}
          </div>

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(4,1fr)",

              gap:
                isMobile
                  ? 10
                  : 22,
            }}
          >
            {rightTopTables.map(renderTable)}
          </div>

        </div>

        {/* ENTRANCE */}

        <div
          style={{
            textAlign: "center",

            margin: "25px 0",

            fontSize:
              isMobile
                ? 20
                : 40,

            color: "#ff0000",

            fontWeight: "bold",

            borderTop:
              "2px solid #ff0000",

            borderBottom:
              "2px solid #ff0000",

            padding: 12,
          }}
        >
          ENTRANCE
        </div>

        {/* BOTTOM */}

        <div
          style={{
            display: "flex",

            justifyContent: "center",

            gap:
              isMobile
                ? 20
                : 120,
          }}
        >

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(4,1fr)",

              gap:
                isMobile
                  ? 10
                  : 22,
            }}
          >
            {leftBottomTables.map(renderTable)}
          </div>

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(4,1fr)",

              gap:
                isMobile
                  ? 10
                  : 22,
            }}
          >
            {rightBottomTables.map(renderTable)}
          </div>

        </div>

      </div>

      {/* BOOKING */}

      <div
        style={{
          background: "#0b0b0b",
          borderRadius: 25,
          border: "1px solid #1f1f1f",
          padding:
            isMobile
              ? 18
              : 35,
        }}
      >

        <h2
          style={{
            fontSize:
              isMobile
                ? 22
                : 45,

            marginBottom: 25,
          }}
        >
          Booking Summary
        </h2>

        <div
          style={{
            border:
              "1px solid #39ff14",

            borderRadius: 15,

            padding: 14,

            marginBottom: 20,

            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",
          }}
        >

          <span
            style={{
              fontSize:
                isMobile
                  ? 13
                  : 22,
            }}
          >
            🪑 Selected Table:
          </span>

          <span
            style={{
              color: "#39ff14",
              fontWeight: "bold",

              fontSize:
                isMobile
                  ? 15
                  : 24,
            }}
          >
            {selectedTable || "--"}
          </span>

        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          style={inputStyle}
        />

        {/* GUESTS */}

        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 20,
          }}
        >

          <button
            onClick={() => {

              if (guests > 1) {
                setGuests(guests - 1);
              }

            }}
            style={countBtn}
          >
            -
          </button>

          <div
            style={{
              flex: 1,

              background: "#111",

              border:
                "1px solid #333",

              borderRadius: 15,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              fontSize: 22,
            }}
          >
            {guests}
          </div>

          <button
            onClick={() =>
              setGuests(guests + 1)
            }
            style={countBtn}
          >
            +
          </button>

        </div>

        <textarea
          rows="4"
          placeholder="Notes"
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          style={{
            ...inputStyle,
            resize: "none",
          }}
        />

        {/* PRICE */}

        <div
          style={{
            background: "#111",

            borderRadius: 20,

            padding: 18,

            display: "flex",

            justifyContent:
              "space-between",

            marginBottom: 25,
          }}
        >

          <div>

            <p
              style={{
                color: "#aaa",
                marginBottom: 10,
                fontSize: isMobile ? 12 : 18,
              }}
            >
              Price Per Person
            </p>

            <h2
              style={{
                fontSize: isMobile ? 16 : 30,
              }}
            >
              35,000 IQD
            </h2>

          </div>

          <div>

            <p
              style={{
                color: "#aaa",
                marginBottom: 10,
                fontSize: isMobile ? 12 : 18,
              }}
            >
              Total Price
            </p>

            <h2
              style={{
                color: "#39ff14",
                fontSize: isMobile ? 16 : 30,
              }}
            >
              {guests *
                PRICE_PER_PERSON}
              {" "}
              IQD
            </h2>

          </div>

        </div>

        <button
          onClick={handleBooking}
          style={{
            width: "100%",

            padding: 16,

            borderRadius: 18,

            border: "none",

            background:
              "linear-gradient(90deg,#d4a017,#f5c542)",

            color: "#000",

            fontSize:
              isMobile
                ? 17
                : 26,

            fontWeight: "bold",

            cursor: "pointer",
          }}
        >
          Confirm Booking
        </button>

      </div>

      {/* QR POPUP */}

      {showTicket && ticketData && (

        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "12px",
            boxSizing: "border-box",
            overflowY: "auto",
          }}
        >

          <div
            style={{
              width: "100%",
              maxWidth: 340,
              background: "#050505",
              borderRadius: 26,
              padding: 18,
              textAlign: "center",
              border: "1px solid #222",
            }}
          >

            <div
              style={{
                fontSize: 60,
                marginBottom: 10,
              }}
            >
              ✅
            </div>

            <h1
              style={{
                color: "#f0f3f0",
                fontSize: isMobile ? 30 : 40,
                marginBottom: 20,
              }}
            >
              Thank You!
            </h1>

            <p
              style={{
                color: "white",
                fontSize: isMobile ? 18 : 22,
                marginBottom: 10,
              }}
            >
              نتمنى لكم حفلة جميلة
            </p>

            <p
              style={{
                color: "#ff1414",
                fontSize: isMobile ? 15 : 18,
                marginBottom: "0 auto 18px",
                direction: "rtl",
                textAlign:"center",
              }}
            >
             عند الدخول يرجى إظهار QR Code

            </p>

            <div
              style={{
                background: "white",
                padding: 15,
                borderRadius: 25,
                width: "fit-content",
                margin: "0 auto 25px",
              }}
            >

              <QRCodeCanvas
                value={JSON.stringify(ticketData)}
                size={130}
              />

            </div>

            <p style={ticketText}>
              👤 {ticketData.customerName}
            </p>

            <p style={ticketText}>
              🪑 {ticketData.table}
            </p>

            <p style={ticketText}>
              👥 {ticketData.guests}
            </p>

            <button
              onClick={() =>
                setShowTicket(false)
              }
              style={{
                width: "100%",
                padding: 13,
                borderRadius: 18,
                border: "none",
                background: "#d4a017",
                color: "#000",
                fontSize: 20,
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: 16,
              }}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

const infoStyle = {
  fontSize: 16,
  color: "#ccc",
  marginBottom: 10,
};

const ticketText = {
  fontSize: 16,
  color: "#ddd",
  marginBottom: 10,
};

const inputStyle = {

  width: "100%",

  padding: "15px",

  marginBottom: "20px",

  borderRadius: "15px",

  border: "1px solid #333",

  background: "#111",

  color: "white",

  fontSize: "15px",

  outline: "none",

  boxSizing: "border-box",
};

const countBtn = {

  width: 55,

  height: 50,

  borderRadius: 15,

  border: "1px solid #c14cff",

  background: "#1a1025",

  color: "white",

  fontSize: 24,

  cursor: "pointer",
};