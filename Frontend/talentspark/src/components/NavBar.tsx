type Props = {
    currentPage: string;
    onNavigate: (page: string) => void;
}

function NavBar({ currentPage, onNavigate }: Props) {
    return (
        <nav>
            <div className="logo-container" style={{ cursor: "pointer" }} onClick={() => onNavigate("home")}>
                TalentSpark
                <span className="logo-dot"></span>
            </div>
            <div className="nav-links">
                <button className={currentPage === "home" ? "active" : ""} onClick={() => onNavigate("home")}>Home</button>
                <button className={currentPage === "chat" ? "active" : ""} onClick={() => onNavigate("chat")}>Chat</button>
                <button className={currentPage === "resume" ? "active" : ""} onClick={() => onNavigate("resume")}>Resume</button>
                <button className={currentPage === "jobmatch" ? "active" : ""} onClick={() => onNavigate("jobmatch")}>Job Match</button>
                <button
                    className="danger"
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }}
                    style={{ marginLeft: "10px" }}
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default NavBar