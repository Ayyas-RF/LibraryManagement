import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "@material/web/button/filled-button.js";
import "@material/web/button/text-button.js";
import "@material/web/textfield/outlined-text-field.js";
import "@material/web/dialog/dialog.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isEmailEmpty = !email;
  const isDomainMissing = !isEmailEmpty && !email.split("@")[1]?.includes(".");
  const isEmailInvalid =
    !isEmailEmpty && (!email.includes("@") || isDomainMissing);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError(isEmailEmpty || isEmailInvalid);
    setPasswordError(!password);
    if (isEmailEmpty || isEmailInvalid || !password) return;

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data.success) {
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
      }
    } catch (error) {
      setDialogMessage(error.response?.data?.message || "Login Gagal");
      setIsDialogOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <header style={styles.header}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Login to the Library Management System</p>
        </header>
        <form onSubmit={handleLogin} style={styles.form}>
          <md-outlined-text-field
            placeholder="johndoe@address.com"
            type="email"
            value={email}
            error={emailError || null}
            error-text={
              !email
                ? "Please enter your email"
                : !email.includes("@")
                  ? "No @"
                  : "What Domain ?"
            }
            onInput={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(false);
            }}
            style={styles.input}
          ></md-outlined-text-field>
          <md-outlined-text-field
            placeholder="********"
            type="password"
            value={password}
            minLength={8}
            maxLength={16}
            error={passwordError || null}
            error-text="Please enter your password"
            onInput={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError(false);
            }}
            style={styles.input}
          ></md-outlined-text-field>
          <md-filled-button
            type="submit"
            disabled={loading || null}
            style={styles.button}
          >
            {loading ? "Signing in..." : "Login"}
          </md-filled-button>
        </form>
      </div>
      <md-dialog
        type="alert"
        open={isDialogOpen || null}
        onClose={() => setIsDialogOpen(false)}
      >
        <div slot="headline">Login Failed</div>
        <div slot="content">{dialogMessage}</div>
        <div slot="actions">
          <md-text-button onClick={() => setIsDialogOpen(false)}>
            Close
          </md-text-button>
        </div>
      </md-dialog>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "80vh",
    padding: "20px",
  },
  card: {
    backgroundColor: "var(--bg)",
    borderRadius: "28px",
    padding: "40px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "var(--shadow)",
    border: "1px solid var(--border)",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    transition:
      "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease",
  },
  header: {
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    margin: "0 0 8px 0",
    color: "var(--text-h)",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "14px",
    color: "var(--text)",
    opacity: 0.9,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  input: {
    width: "100%",
    "--md-outlined-text-field-input-text-color": "var(--text-h)",
    "--md-outlined-text-field-label-text-color": "var(--text)",
    "--md-outlined-text-field-hover-input-text-color": "var(--text-h)",
    "--md-outlined-text-field-hover-label-text-color": "var(--text)",
    "--md-outlined-text-field-focus-input-text-color": "var(--text-h)",
    "--md-outlined-text-field-focus-label-text-color": "var(--accent)",
    "--md-outlined-text-field-outline-color": "var(--border)",
    "--md-outlined-text-field-hover-outline-color": "var(--text)",
    "--md-outlined-text-field-focus-outline-color": "var(--accent)",
    "--md-outlined-text-field-error-input-text-color": "var(--text-h)",
    "--md-outlined-text-field-error-label-text-color": "#ffabb8ff",
    "--md-outlined-text-field-error-supporting-text-color": "#ffb4ab",
    "--md-outlined-text-field-error-outline-color": "#ffb4ab",
    "--md-outlined-text-field-error-hover-input-text-color": "var(--text-h)",
    "--md-outlined-text-field-error-hover-label-text-color": "#ffb4ab",
    "--md-outlined-text-field-error-focus-input-text-color": "var(--text-h)",
    "--md-outlined-text-field-error-focus-label-text-color": "#ffb4ab",
    "--md-outlined-text-field-error-focus-outline-color": "#ffb4ab",
  },
  button: {
    marginTop: "8px",
    "--md-filled-button-container-color": "var(--accent)",
    "--md-filled-button-label-text-color": "#ffffff",
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    fontSize: "14px",
    marginTop: "8px",
    color: "var(--text)",
  },
  link: {
    color: "var(--accent)",
    textDecoration: "none",
    fontWeight: "600",
  },
};
