import React, { useState } from "react";
import { register } from "../Services/AuthService";

type Props = {
    onSwitchToLogin: () => void;
}

function Register({ onSwitchToLogin }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await register({ name, email, password, role });
            alert("Registration successful! Please login.");
            onSwitchToLogin();
        } catch (err: any) {
            console.error("Error during registration:", err);
            setError(err.response?.data?.detail || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

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
                <h2 style={{ marginBottom: "20px" }}>Register</h2>
                {error && <div style={{ color: "#ef4444", marginBottom: "15px", fontSize: "14px" }}>{error}</div>}
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="name" style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        required
                        style={{ width: "100%", padding: "10px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid var(--border)" }}
                    />
                </div>
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
                <div style={{ marginBottom: "15px" }}>
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
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="role" style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Role</label>
                    <input
                        id="role"
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Role (e.g. Candidate, Recruiter)"
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
                    {loading ? "Registering..." : "Register"}
                </button>
                <p style={{ marginTop: "20px", fontSize: "14px", textAlign: "center" }}>
                    Already have an account?{" "}
                    <button type="button" onClick={onSwitchToLogin} style={{
                        background: "none",
                        border: "none",
                        color: "var(--accent)",
                        cursor: "pointer",
                        textDecoration: "underline",
                        padding: 0,
                        font: "inherit"
                    }}>
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
}

export default Register;