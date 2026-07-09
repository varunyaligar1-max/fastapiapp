function Footer() {
    return (
        <footer style={{ marginTop: "auto", padding: "24px 0", borderTop: "1px solid var(--border)", color: "var(--text)", fontSize: "14px" }}>
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} TalentSpark. All rights reserved.</p>
        </footer>
    );
}

export default Footer;