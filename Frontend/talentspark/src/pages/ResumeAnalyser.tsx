import { useState } from "react";
import { analyseResume } from "../Services/RagService";

function ResumeAnalyser() {
    const [resumeText, setResumeText] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAnalyse = async () => {
        if (!resumeText.trim()) return;
        setLoading(true);
        setAnalysis("");
        try {
            const result = await analyseResume(resumeText);
            setAnalysis(result.analysis);
        } catch {
            setAnalysis("Failed to analyse resume. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="panel-card" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "15px", marginBottom: "20px" }}>
                <h2 style={{ margin: 0 }}>Resume Analyser</h2>
                <span className="badge accent">ATS & Skill Matcher</span>
            </div>
            
            <p style={{ color: "var(--text)", fontSize: "15px", marginBottom: "20px" }}>
                Paste the text of your resume below to evaluate your profile, find skill gaps, and get recommendations matching current job openings.
            </p>

            <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here (e.g. Experience, Skills, Education)..."
                rows={12}
                style={{ width: "100%", padding: "14px", resize: "vertical", fontSize: "14px", marginBottom: "15px" }}
                disabled={loading}
            />

            <button
                className="primary"
                onClick={handleAnalyse}
                disabled={loading || !resumeText.trim()}
                style={{ minWidth: "160px" }}
            >
                {loading ? "Analysing Profile..." : "Analyse Resume"}
            </button>

            {analysis && (
                <div style={{ 
                    marginTop: "30px", 
                    textAlign: "left", 
                    borderLeft: "4px solid var(--accent)", 
                    background: "var(--code-bg)", 
                    padding: "20px", 
                    borderRadius: "0 10px 10px 0",
                    boxShadow: "var(--shadow)"
                }}>
                    <h3 style={{ fontSize: "18px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                        📊 Analysis Report
                    </h3>
                    <p style={{ 
                        margin: 0, 
                        whiteSpace: "pre-wrap", 
                        fontSize: "15px", 
                        lineHeight: "1.7",
                        color: "var(--text-h)"
                    }}>
                        {analysis}
                    </p>
                </div>
            )}
        </div>
    );
}

export default ResumeAnalyser;