import { useState } from "react";

import { QrReader } from "react-qr-reader";

export default function QRScannerPage() {

  const [ticketData, setTicketData] =
    useState(null);

  const [invalidQR, setInvalidQR] =
    useState(false);

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

      {/* TITLE */}

      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "45px",
          fontWeight: "bold",
        }}
      >
        QR Ticket Scanner
      </h1>

      {/* SCANNER BOX */}

      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          background: "#111",
          padding: "20px",
          borderRadius: "25px",
          border: "1px solid #1f1f1f",
          overflow: "hidden",
        }}
      >

        <QrReader

          constraints={{
            facingMode: "environment",
          }}

          onResult={(result) => {

            if (!!result) {

              try {

                const parsedData =
                  JSON.parse(result?.text);

                setTicketData(parsedData);

                setInvalidQR(false);

              } catch (error) {

                setInvalidQR(true);

              }

            }

          }}

          style={{
            width: "100%",
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
            padding: "25px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >

          <h2
            style={{
              color: "red",
            }}
          >
            Invalid QR Code ❌
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
            border: "1px solid #1f1f1f",
          }}
        >

          <h2
            style={{
              marginBottom: "25px",
              color: "#39ff14",
              fontSize: "38px",
              textAlign: "center",
            }}
          >
            VALID TICKET ✅
          </h2>

          <div style={infoBox}>
            👤 Name:
            {" "}
            {ticketData.customerName}
          </div>

          <div style={infoBox}>
            🪑 Table:
            {" "}
            {ticketData.table}
          </div>

          <div style={infoBox}>
            👥 Guests:
            {" "}
            {ticketData.guests}
          </div>

          <div style={infoBox}>
            📞 Phone:
            {" "}
            {ticketData.phone}
          </div>

          <div style={infoBox}>
            💰 Total:
            {" "}
            {ticketData.totalPrice}
            {" "}
            IQD
          </div>

          <div style={infoBox}>
            📝 Notes:
            {" "}
            {ticketData.notes || "No Notes"}
          </div>

        </div>

      )}

    </div>

  );

}

const infoBox = {

  background: "#0b0b0b",

  border: "1px solid #222",

  borderRadius: "15px",

  padding: "18px",

  marginBottom: "15px",

  fontSize: "22px",

  color: "#ddd",

};