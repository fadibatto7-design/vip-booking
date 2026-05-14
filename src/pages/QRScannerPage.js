import { useState } from "react";

import { QrReader } from "react-qr-reader";

export default function QRScannerPage() {

  const [scanResult, setScanResult] = useState("");

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
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "45px",
        }}
      >
        QR Ticket Scanner
      </h1>

      <div
        style={{
          maxWidth: "500px",
          margin: "auto",
          background: "#111",
          padding: "25px",
          borderRadius: "25px",
        }}
      >

        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result) => {

            if (!!result) {
              setScanResult(result?.text);
            }

          }}
          style={{ width: "100%" }}
        />

      </div>

      {scanResult && (

        <div
          style={{
            maxWidth: "600px",
            margin: "40px auto",
            background: "#111",
            padding: "30px",
            borderRadius: "25px",
            border: "1px solid #222",
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
              color: "#d4a017",
            }}
          >
            Ticket Information
          </h2>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "18px",
            }}
          >
            {scanResult}
          </pre>

        </div>

      )}

    </div>

  );
}