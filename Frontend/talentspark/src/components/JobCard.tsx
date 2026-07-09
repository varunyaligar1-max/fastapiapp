import type { Job } from "../types/job";
import type { Company } from "../types/company";
import { useState } from "react";

type Props = {
    jobs: Job[];
    companies: Company[];
    onEdit: (job: Job) => void;
    onDelete: (id: number) => void;
    onAdd: (job: Job) => void;
};

function JobCard({ jobs, companies, onEdit, onDelete, onAdd }: Props) {
    const [editJobId, setEditJobId] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [addform, setAddform] = useState<Job>({
        id: 0,
        title: "",
        description: "",
        salary: 0,
        company_id: companies[0]?.id || 0,
    });
    const [editform, setEditform] = useState<Job>({
        id: 0,
        title: "",
        description: "",
        salary: 0,
        company_id: 0
    });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(addform);
        setAddform({
            id: 0,
            title: "",
            description: "",
            salary: 0,
            company_id: companies[0]?.id || 0
        });
        setIsAdding(false);
    }

    const handleSave = () => {
        onEdit(editform);
        setEditJobId(null);
    }

    const handleCancel = () => {
        setEditJobId(null);
    }

    return (
        <div className="panel-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ margin: 0 }}>Jobs</h2>
                <button className="primary" onClick={() => setIsAdding(!isAdding)} disabled={companies.length === 0}>
                    {isAdding ? "Close Form" : "+ Add Job"}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAdd} style={{
                    background: "var(--code-bg)",
                    border: "1px dashed var(--accent-border)",
                    borderRadius: "10px",
                    padding: "20px",
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                }}>
                    <h3 style={{ fontSize: "18px", margin: "0 0 8px 0" }}>Add New Job</h3>
                    <input type="text" value={addform.title} onChange={(e) => setAddform({ ...addform, title: e.target.value })} placeholder="Job Title" required />
                    <textarea value={addform.description} onChange={(e) => setAddform({ ...addform, description: e.target.value })} placeholder="Description" rows={3} required />
                    <input type="number" value={addform.salary} onChange={(e) => setAddform({ ...addform, salary: Number(e.target.value) })} placeholder="Salary (USD/year)" required />
                    <div>
                        <label htmlFor="add-company-select" style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Company</label>
                        <select
                            id="add-company-select"
                            value={addform.company_id}
                            onChange={(e) => setAddform({ ...addform, company_id: Number(e.target.value) })}
                            style={{ width: "100%" }}
                            required
                        >
                            {companies.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                        <button type="submit" className="primary">Add Job</button>
                        <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </form>
            )}

            <div style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "5px" }}>
                {companies.length === 0 ? (
                    <p style={{ color: "var(--text)", textAlign: "center", padding: "20px" }}>Please create a company first before adding a job.</p>
                ) : jobs.length === 0 ? (
                    <p style={{ color: "var(--text)", textAlign: "center", padding: "20px" }}>No jobs found. Add one above!</p>
                ) : (
                    jobs.map((job) => (
                        <div key={job.id} className="list-item-card">
                            {editJobId === job.id ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <h4 style={{ margin: "0 0 4px 0" }}>Edit Job</h4>
                                    <input type="text" value={editform.title} onChange={(e) => setEditform({ ...editform, title: e.target.value })} placeholder="Title" />
                                    <textarea value={editform.description} onChange={(e) => setEditform({ ...editform, description: e.target.value })} placeholder="Description" rows={3} />
                                    <input type="number" value={editform.salary} onChange={(e) => setEditform({ ...editform, salary: Number(e.target.value) })} placeholder="Salary" />
                                    <div>
                                        <label htmlFor="edit-company-select" style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>Company</label>
                                        <select
                                            id="edit-company-select"
                                            value={editform.company_id}
                                            onChange={(e) => setEditform({ ...editform, company_id: Number(e.target.value) })}
                                            style={{ width: "100%" }}
                                        >
                                            {companies.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="action-row">
                                        <button className="primary" onClick={handleSave}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                                        <h3 style={{ margin: 0, fontSize: "20px" }}>{job.title}</h3>
                                        <div style={{ display: "flex", gap: "6px" }}>
                                            <span className="badge success">${job.salary.toLocaleString()}/yr</span>
                                            <span className="badge accent">
                                                🏢 {companies.find(c => c.id === job.company_id)?.name || "Unknown"}
                                            </span>
                                        </div>
                                    </div>
                                    <p style={{ margin: "10px 0", fontSize: "15px", color: "var(--text)" }}>{job.description}</p>
                                    <div className="action-row">
                                        <button
                                            onClick={() => {
                                                setEditJobId(job.id);
                                                setEditform({
                                                    id: job.id,
                                                    title: job.title,
                                                    description: job.description,
                                                    salary: job.salary,
                                                    company_id: job.company_id,
                                                });
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button className="danger" onClick={() => onDelete(job.id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default JobCard;