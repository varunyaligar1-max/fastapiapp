import React, { useState, useRef, useEffect } from "react";
import { askCareerChat } from "../Services/ChatService";
import type { ChatMessage } from "../types/chat";

function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sessionId] = useState(() => "session_" + Date.now());
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to the bottom of the chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: ChatMessage = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await askCareerChat(input, sessionId);
            const botMessage: ChatMessage = { role: "bot", content: response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: ChatMessage = { role: "bot", content: "I encountered an issue getting that response. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="panel-card" style={{ display: "flex", flexDirection: "column", height: "650px", maxWidth: "700px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "15px", marginBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }}></div>
                    <h2 style={{ margin: 0, fontSize: "20px" }}>AI Career Advisor</h2>
                </div>
                <span className="badge success">Active Session</span>
            </div>

            {/* Chat Messages */}
            <div style={{
                flexGrow: 1,
                overflowY: "auto",
                paddingRight: "10px",
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
            }}>
                {messages.length === 0 && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text)", textAlign: "center", padding: "40px" }}>
                        <div style={{ fontSize: "40px", marginBottom: "15px" }}>💬</div>
                        <h3 style={{ margin: "0 0 10px 0", fontSize: "18px" }}>How can I help you today?</h3>
                        <p style={{ margin: 0, fontSize: "14px", maxWidth: "320px" }}>Ask me questions about resume formatting, interview prep, career transitions, or path recommendations.</p>
                    </div>
                )}
                {messages.map((msg, i) => {
                    const isUser = msg.role === "user";
                    return (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                justifyContent: isUser ? "flex-end" : "flex-start",
                                width: "100%"
                            }}
                        >
                            <div style={{
                                maxWidth: "75%",
                                padding: "12px 16px",
                                borderRadius: isUser ? "18px 18px 2px 18px" : "18px 18px 18px 2px",
                                background: isUser ? "var(--accent)" : "var(--code-bg)",
                                color: isUser ? "#fff" : "var(--text-h)",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.02)",
                                fontSize: "15px",
                                lineHeight: "1.5"
                            }}>
                                <div style={{ fontWeight: "bold", fontSize: "11px", marginBottom: "4px", opacity: isUser ? 0.8 : 0.6 }}>
                                    {isUser ? "YOU" : "AI CAREER BOT"}
                                </div>
                                <p style={{ margin: 0 }}>{msg.content}</p>
                            </div>
                        </div>
                    );
                })}
                {loading && (
                    <div style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
                        <div style={{
                            maxWidth: "75%",
                            padding: "12px 16px",
                            borderRadius: "18px 18px 18px 2px",
                            background: "var(--code-bg)",
                            color: "var(--text)",
                            fontSize: "15px"
                        }}>
                            <div style={{ fontWeight: "bold", fontSize: "11px", marginBottom: "4px", opacity: 0.6 }}>AI CAREER BOT</div>
                            <span style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
                                Thinking
                                <span style={{ animation: "pulse 1.5s infinite" }}>...</span>
                            </span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} style={{ display: "flex", gap: "10px", borderTop: "1px solid var(--border)", paddingTop: "15px" }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question (e.g. 'How do I prepare for a senior React role?')..."
                    style={{ flexGrow: 1 }}
                    disabled={loading}
                />
                <button type="submit" className="primary" disabled={loading || !input.trim()} style={{ whiteSpace: "nowrap" }}>
                    Send Message
                </button>
            </form>
        </div>
    );
}

export default Chat;