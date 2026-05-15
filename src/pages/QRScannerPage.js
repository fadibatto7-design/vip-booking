import { useEffect, useState } from "react";

import { Html5QrcodeScanner }
from "html5-qrcode";

export default function QRScannerPage() {

  const [ticketData, setTicketData] =
    useState(null);

  const [invalidQR, setInvalidQR] =
    useState(false);

  useEffect(() => {

    const scanner =
      new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 250,
        },
        false
      );

    scanner.render(

      (decodedText) => {

        try {

          const parsed =
            JSON.parse(decodedText);

          setTicketData(parsed);

          setInvalidQR(false);

        } catch {

          setInvalidQR(true);

        }

      },

      (error) => {
        console.log(error);
      }

    );

    return () => {
      scanner.clear().catch(() => {});
    };

  }, []);

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        padding: "25px",
        fontFamily: "Arial",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          marginBottom: "30px",
        }}
      >
        QR Ticket Scanner
      </h1>

      {/* CAMERA */}

      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          background: "#111",
          padding: "20px",
          borderRadius: "25px",
          border: "1px solid #222",
        }}
      >

        <div
          id="reader"
          style={{
            width: "100%",
            overflow: "hidden",
            borderRadius: "20px",
          }}
        />

      </div>

      {/* INVALID */}

      {invalidQR && (

        <div
          style={{
            maxWidth: "500px",
            margin: "30px auto",
            background: "#2b0606",
            border: "1px solid red",
            padding: "20px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >

          <h2 style={{ color: "red" }}>
            Invalid QR ❌
          </h2>

        </div>

      )}

      {/* RESULT */}

      {ticketData && (

        <div
          style={{
            maxWidth: "600px",
            margin: "40px auto",
            background: "#111",
            padding: "35px",
            borderRadius: "25px",
            border: "1px solid #222",
          }}
        >

          <h2
            style={{
              color: "#39ff14",
              textAlign: "center",
              marginBottom: "25px",
              fontSize: "40px",
            }}
          >
            VALID TICKET ✅
          </h2>

          <div style={infoStyle}>
            👤 Name:
            {" "}
            {ticketData.customerName}
          </div>

          <div style={infoStyle}>
            🪑 Table:
            {" "}
            {ticketData.table}
          </div>

          <div style={infoStyle}>
            👥 Guests:
            {" "}
            {ticketData.guests}
          </div>

          <div style={infoStyle}>
            📞 Phone:
            {" "}
            {ticketData.phone}
          </div>

          <div style={infoStyle}>
            💰 Total:
            {" "}
            {ticketData.totalPrice}
            {" "}
            IQD
          </div>

        </div>

      )}

    </div>

  );

}

const infoStyle = {

  background: "#0b0b0b",

  padding: "18px",

  borderRadius: "15px",

  marginBottom: "15px",

  fontSize: "22px",

  border: "1px solid #222",

};