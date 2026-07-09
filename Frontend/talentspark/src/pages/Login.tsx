import React, { useState } from "react";
import { login } from "../Services/AuthService";

type Props = {
    onLogin: (token: string) => void;
    onSwitchToRegister: () => void;
}

function Login({ onLogin, onSwitchToRegister }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const result = await login({ email, password });
            if (result && result.access_token) {
                onLogin(result.access_token);
            } else {
                setError("Login failed. No token received.");
            }
        } catch (err: any) {
            console.error("Error during login:", err);
            setError(err.response?.data?.detail || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
            <form onSubmit={handleSubmit} style={{
                padding: "30px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                background: "var(--code-bg)",
                width: "100%",
                maxWidth: "400px",
                boxShadow: "var(--shadow)",
                textAlign: "left"
            }}>
                <h2 style={{ marginBottom: "20px" }}>Login</h2>
                {error && <div style={{ color: "#ef4444", marginBottom: "15px", fontSize: "14px" }}>{error}</div>}
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="email" style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        style={{ width: "100%", padding: "10px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid var(--border)" }}
                    />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="password" style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        style={{ width: "100%", padding: "10px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid var(--border)" }}
                    />
                </div>
                <button type="submit" disabled={loading} style={{
                    width: "100%",
                    padding: "12px",
                    background: "var(--accent)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold"
                }}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                <p style={{ marginTop: "20px", fontSize: "14px", textAlign: "center" }}>
                    Don't have an account?{" "}
                    <button type="button" onClick={onSwitchToRegister} style={{
                        background: "none",
                        border: "none",
                        color: "var(--accent)",
                        cursor: "pointer",
                        textDecoration: "underline",
                        padding: 0,
                        font: "inherit"
                    }}>
                        Register
                    </button>
                </p>
            </form>
        </div>
    );
}

export default Login;