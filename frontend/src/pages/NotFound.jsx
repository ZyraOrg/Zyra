import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight:      "100vh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        background:     "#0a0f1e",
        color:          "#ffffff",
        textAlign:      "center",
        padding:        "24px",
        fontFamily:     "Inter, sans-serif",
      }}
    >
      {/* 404 number */}
      <h1
        style={{
          fontSize:      "clamp(80px, 20vw, 180px)",
          fontWeight:    700,
          lineHeight:    1,
          background:    "linear-gradient(135deg, #8B5CF6, #22D3EE)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor:  "transparent",
          margin:        0,
        }}
      >
        404
      </h1>

      {/* Message */}
      <h2
        style={{
          fontSize:   "clamp(20px, 4vw, 32px)",
          fontWeight: 600,
          margin:     "16px 0 12px",
          color:      "#F0EDE8",
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          fontSize:  "16px",
          color:     "rgba(255,255,255,0.5)",
          maxWidth:  "400px",
          lineHeight: 1.6,
          margin:    "0 0 40px",
        }}
      >
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Actions */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding:      "12px 28px",
            borderRadius: "100px",
            border:       "1px solid rgba(255,255,255,0.15)",
            background:   "transparent",
            color:        "#F0EDE8",
            fontSize:     "14px",
            fontWeight:   500,
            cursor:       "pointer",
            transition:   "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#22D3EE";
            e.currentTarget.style.color       = "#22D3EE";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.color       = "#F0EDE8";
          }}
        >
          ← Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            padding:      "12px 28px",
            borderRadius: "100px",
            border:       "none",
            background:   "linear-gradient(135deg, #8B5CF6, #22D3EE)",
            color:        "#ffffff",
            fontSize:     "14px",
            fontWeight:   600,
            cursor:       "pointer",
            boxShadow:    "0 0 24px rgba(139,92,246,0.4)",
            transition:   "opacity 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}