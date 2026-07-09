import type { Company } from "../types/company";
import type { Job } from "../types/job";
import { useState } from "react";

type Props = {
    companies: Company[];
    jobs: Job[];
    onEdit: (company: Company) => void;
    onDelete: (id: number) => void;
    onAdd: (company: Company) => void;
}

function CompanyCard({ companies, jobs, onAdd, onEdit, onDelete }: Props) {
    const [editCompanyId, setEditCompanyId] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [addform, setAddform] = useState<Company>({
        id: 0,
        name: "",
        email: "",
        phone: "",
        location: "",
        jobs: []
    });
    const [editform, setEditform] = useState<Company>({
        id: 0,
        name: "",
        email: "",
        phone: "",
        location: "",
        jobs: []
    });

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(addform);
        setAddform({
            id: 0,
            name: "",
            email: "",
            phone: "",
            location: "",
            jobs: []
        });
        setIsAdding(false);
    }

    const handleSave = () => {
        onEdit(editform);
        setEditCompanyId(null);
    }

    const handleCancel = () => {
        setEditCompanyId(null);
    }

    return (
        <div className="panel-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ margin: 0 }}>Companies</h2>
                <button className="primary" onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? "Close Form" : "+ Add Company"}
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
                    <h3 style={{ fontSize: "18px", margin: "0 0 8px 0" }}>Add New Company</h3>
                    <input type="text" value={addform.name} onChange={(e) => setAddform({ ...addform, name: e.target.value })} placeholder="Company Name" required />
                    <input type="email" value={addform.email} onChange={(e) => setAddform({ ...addform, email: e.target.value })} placeholder="Email" required />
                    <input type="text" value={addform.phone} onChange={(e) => setAddform({ ...addform, phone: e.target.value })} placeholder="Phone" required />
                    <input type="text" value={addform.location} onChange={(e) => setAddform({ ...addform, location: e.target.value })} placeholder="Location" required />
                    <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                        <button type="submit" className="primary">Add Company</button>
                        <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </form>
            )}

            <div style={{ maxHeight: "60vh", overflowY: "auto", paddingRight: "5px" }}>
                {companies.length === 0 ? (
                    <p style={{ color: "var(--text)", textAlign: "center", padding: "20px" }}>No companies found. Add one above!</p>
                ) : (
                    companies.map((company) => (
                        <div key={company.id} className="list-item-card">
                            {editCompanyId === company.id ? (
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <h4 style={{ margin: "0 0 4px 0" }}>Edit Company</h4>
                                    <input type="text" value={editform.name} onChange={(e) => setEditform({ ...editform, name: e.target.value })} placeholder="Name" />
                                    <input type="text" value={editform.email} onChange={(e) => setEditform({ ...editform, email: e.target.value })} placeholder="Email" />
                                    <input type="text" value={editform.phone} onChange={(e) => setEditform({ ...editform, phone: e.target.value })} placeholder="Phone" />
                                    <input type="text" value={editform.location} onChange={(e) => setEditform({ ...editform, location: e.target.value })} placeholder="Location" />
                                    <div className="action-row">
                                        <button className="primary" onClick={handleSave}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                                        <h3 style={{ margin: 0, fontSize: "20px" }}>{company.name}</h3>
                                        <span className="badge accent">
                                            {jobs.filter(j => j.company_id === company.id).length} Job Opening{jobs.filter(j => j.company_id === company.id).length === 1 ? '' : 's'}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: "14px", display: "flex", flexWrap: "wrap", gap: "15px", color: "var(--text)" }}>
                                        <span>📧 {company.email}</span>
                                        <span>📞 {company.phone}</span>
                                        <span>📍 {company.location}</span>
                                    </div>
                                    <div className="action-row">
                                        <button
                                            onClick={() => {
                                                setEditCompanyId(company.id);
                                                setEditform({
                                                    id: company.id,
                                                    name: company.name,
                                                    email: company.email,
                                                    phone: company.phone,
                                                    location: company.location,
                                                    jobs: company.jobs,
                                                });
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button className="danger" onClick={() => onDelete(company.id)}>Delete</button>
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

export default CompanyCard;