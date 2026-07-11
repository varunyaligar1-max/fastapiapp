import { useState } from "react";
import { matchJobs, embedJobs, semanticSearch } from "../Services/RagService";
import type { JobMatchResult, SemanticSearchResult } from "../types/rag";

function JobMatch() {
    const [skills, setSkills] = useState("");
    const [experience, setExperience] = useState("");
    const [matches, setMatches] = useState<JobMatchResult[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SemanticSearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [embedMsg, setEmbedMsg] = useState("");

    const handleEmbed = async () => {
        setLoading(true);
        setEmbedMsg("");
        try {
            const result = await embedJobs();
            setEmbedMsg(result.message);
        } catch {
            setEmbedMsg("Failed to embed jobs. Is Qdrant running?");
        } finally {
            setLoading(false);
        }
    };

    const handleMatch = async () => {
        if (!skills.trim()) return;
        setLoading(true);
        setMatches([]);
        try {
            const result = await matchJobs(skills, experience);
            setMatches(result.matches);
        } catch {
            setMatches([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        setSearchResults([]);
        try {
            const result = await semanticSearch(searchQuery);
            setSearchResults(result.results);
        } catch {
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="panel-card" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "15px", marginBottom: "25px" }}>
                <h2 style={{ margin: 0 }}>Smart Job Match</h2>
                <span className="badge accent">Vector RAG Search</span>
            </div>

            {/* Step 1: Embed Jobs */}
            <div style={{ marginBottom: "25px", padding: "20px", border: "1px solid var(--border)", borderRadius: "10px", background: "var(--code-bg)" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
                    <span className="badge accent" style={{ width: "24px", height: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 0, borderRadius: "50%", fontWeight: "bold" }}>1</span>
                    <h3 style={{ fontSize: "18px", margin: 0 }}>Sync Database to Vector Store</h3>
                </div>
                <p style={{ fontSize: "14px", color: "var(--text)", marginBottom: "12px" }}>Sync all active job postings to Qdrant Vector database for semantic and LLM matchmaking capability.</p>
                <button className="primary" onClick={handleEmbed} disabled={loading} style={{ padding: "8px 16px" }}>
                    {loading ? "Embedding..." : "Sync & Embed All Jobs"}
                </button>
                {embedMsg && <p style={{ marginTop: "12px", color: "#10b981", fontWeight: "600", fontSize: "14px" }}>✓ {embedMsg}</p>}
            </div>

            {/* Step 2: Semantic Job Search */}
            <div style={{ marginBottom: "25px", padding: "20px", border: "1px solid var(--border)", borderRadius: "10px", background: "var(--code-bg)" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
                    <span className="badge accent" style={{ width: "24px", height: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 0, borderRadius: "50%", fontWeight: "bold" }}>2</span>
                    <h3 style={{ fontSize: "18px", margin: 0 }}>Semantic Job Search</h3>
                </div>
                <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by keywords or intent... e.g. 'remote javascript dev'"
                        style={{ flexGrow: 1 }}
                    />
                    <button className="primary" onClick={handleSearch} disabled={loading || !searchQuery.trim()}>
                        Search
                    </button>
                </div>
                {searchResults.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
                        {searchResults.map((r, i) => (
                            <div key={i} className="list-item-card" style={{ background: "var(--bg)", margin: 0 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                                    <strong style={{ fontSize: "16px", color: "var(--text-h)" }}>{r.title}</strong>
                                    <span className="badge success">Match Score: {Math.round(r.score * 100)}%</span>
                                </div>
                                <p style={{ fontSize: "14px", margin: "5px 0" }}>{r.description}</p>
                                <small style={{ color: "var(--text)", fontWeight: "500" }}>💰 Salary: {r.salary != null ? r.salary.toLocaleString() : "N/A"}</small>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Step 3: Match Profile */}
            <div style={{ padding: "20px", border: "1px solid var(--border)", borderRadius: "10px", background: "var(--code-bg)" }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
                    <span className="badge accent" style={{ width: "24px", height: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 0, borderRadius: "50%", fontWeight: "bold" }}>3</span>
                    <h3 style={{ fontSize: "18px", margin: 0 }}>Match Your Professional Profile</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "15px" }}>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="Your Key Skills... e.g. 'Python, FastAPI, Docker, SQL'"
                        style={{ width: "100%" }}
                    />
                    <input
                        type="text"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="Experience Summary... e.g. '3 years of building backend APIs'"
                        style={{ width: "100%" }}
                    />
                </div>
                <button className="primary" onClick={handleMatch} disabled={loading || !skills.trim()}>
                    {loading ? "Matching..." : "Find Matching Jobs"}
                </button>
                {matches.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                        <h4 style={{ fontSize: "16px", margin: "0 0 5px 0" }}>Top Profiles Match Results</h4>
                        {matches.map((m, i) => (
                            <div key={i} className="list-item-card" style={{ background: "var(--bg)", margin: 0 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                                    <strong style={{ fontSize: "16px", color: "var(--text-h)" }}>{m.title}</strong>
                                    <span className="badge success" style={{ background: "rgba(16, 185, 129, 0.15)" }}>
                                        {m.match_score}% Match
                                    </span>
                                </div>
                                <p style={{ fontSize: "14px", margin: "5px 0" }}>{m.description}</p>
                                <small style={{ color: "var(--text)", fontWeight: "500" }}>💰 Salary: {m.salary != null ? m.salary.toLocaleString() : "N/A"}</small>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default JobMatch;