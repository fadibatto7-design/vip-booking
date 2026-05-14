import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import { db } from "../firebase";

import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

export default function AdminDashboard() {

  const [bookings, setBookings] = useState([]);

  const [tableId, setTableId] = useState("");

  const [guestCount, setGuestCount] =
    useState("");

  const isAuth =
    localStorage.getItem("adminAuth");

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

  const reserveTable = async () => {

    if (!tableId || !guestCount) {

      alert("Enter table ID and guests count");

      return;

    }

    try {

      await addDoc(collection(db, "bookings"), {

        table: tableId,

        customerName: "Reserved Manually",

        phone: "-",

        guests: Number(guestCount),

        notes: "Reserved From Admin",

        createdAt: new Date(),

      });

      alert("Table Reserved ✅");

      setTableId("");

      setGuestCount("");

    } catch (error) {

      console.log(error);

      alert("Error");

    }

  };

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

  const downloadPDF = () => {

    const docPDF = new jsPDF();

    docPDF.setFontSize(22);

    docPDF.text(
      "Music No1 Booking Report",
      14,
      20
    );

    const tableColumn = [
      "Table",
      "Customer",
      "Guests",
      "Phone",
      "Notes",
    ];

    const tableRows = [];

    bookings.forEach((booking) => {

      const bookingData = [

        booking.table,

        booking.customerName,

        booking.guests,

        booking.phone,

        booking.notes || "-",

      ];

      tableRows.push(bookingData);

    });

    autoTable(docPDF, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    docPDF.save("booking-report.pdf");

  };

  const logout = () => {

    localStorage.removeItem("adminAuth");

    window.location.href = "/login";

  };

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

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

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "50px",
              marginBottom: "15px",
            }}
          >
            Admin Dashboard
          </h1>

          <button
            onClick={downloadPDF}
            style={{
              padding: "12px 20px",
              background: "#d4a017",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Download PDF Report
          </button>

        </div>

        <button
          onClick={logout}
          style={{
            padding: "15px 25px",
            background: "#7a1010",
            color: "white",
            border: "none",
            borderRadius: "15px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>

      </div>

      {/* RESERVE TABLE */}

      <div
        style={{
          background: "#111",
          padding: "25px",
          borderRadius: "20px",
          marginBottom: "40px",
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >

        <input
          type="text"
          placeholder="Table ID (Example L5)"
          value={tableId}
          onChange={(e) =>
            setTableId(e.target.value)
          }
          style={{
            flex: 1,
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #333",
            background: "#1a1a1a",
            color: "white",
            fontSize: "18px",
            minWidth: "250px",
          }}
        />

        <input
          type="number"
          placeholder="Guests Count"
          value={guestCount}
          onChange={(e) =>
            setGuestCount(e.target.value)
          }
          style={{
            width: "220px",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #333",
            background: "#1a1a1a",
            color: "white",
            fontSize: "18px",
          }}
        />

        <button
          onClick={reserveTable}
          style={{
            padding: "15px 25px",
            background: "#d4a017",
            border: "none",
            borderRadius: "15px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          Reserve Table
        </button>

      </div>

      {/* BOOKINGS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
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
              👤 Name:
              {" "}
              {booking.customerName}
            </p>

            <p style={{ fontSize: "18px" }}>
              📞 Phone:
              {" "}
              {booking.phone}
            </p>

            <p style={{ fontSize: "18px" }}>
              👥 Guests:
              {" "}
              {booking.guests}
            </p>

            <p style={{ fontSize: "18px" }}>
              📝 Notes:
              {" "}
              {booking.notes || "No Notes"}
            </p>

            <button
              onClick={() =>
                deleteBooking(booking.id)
              }
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