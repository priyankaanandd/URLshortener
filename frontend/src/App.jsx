import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (data.id) {
        setShortId(data.id);
      } else {
        setError("Error generating URL");
      }
    } catch (err) {
      setError("Server Error");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>URL Shortener</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter your URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
          required
        />

        <button style={styles.button} disabled={loading}>
          {loading ? "Processing..." : "Shorten"}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {shortId && (
        <div style={styles.result}>
          <p>Short URL:</p>
          <a
            href={`http://localhost:3000/${shortId}`}
            target="_blank"
            rel="noreferrer"
            style={styles.shortUrl}
          >
            http://localhost:3000/{shortId}
          </a>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0B0E14",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px"
  },
  heading: {
    fontSize: "2.2rem",
    marginBottom: "1rem",
    fontWeight: "600",
    color: "#9CC4FF"
  },
  form: {
    display: "flex",
    gap: "10px",
    width: "100%",
    maxWidth: "450px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #333",
    fontSize: "1rem",
    background: "#141821",
    color: "white"
  },
  button: {
    padding: "12px 18px",
    fontSize: "1rem",
    background: "#4F75FF",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    color: "white",
  },
  result: {
    marginTop: "20px",
    background: "#141821",
    padding: "10px 15px",
    borderRadius: "6px",
    fontSize: "1rem"
  },
  shortUrl: {
    color: "#76A9FF",
    fontWeight: "bold",
    marginLeft: "5px"
  },
  error: {
    color: "#FF6B6B",
    marginTop: "10px",
    fontWeight: "bold"
  }
};

export default App;
