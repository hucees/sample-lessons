import "./globals.css";

export const metadata = {
  title: "Open House Sample Curriculum",
  description: "A K-4 sample curriculum provider site for testing external curriculum discovery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="shell nav-row">
            <a className="brand" href="/">Open House Sample Curriculum</a>
            <nav aria-label="Primary navigation">
              <a href="/catalog">Catalog</a>
              <a href="/curriculum.json">JSON Catalog</a>
            </nav>
          </div>
        </header>
        <main className="shell main-content">{children}</main>
        <footer className="site-footer">
          <div className="shell">
            <p>Sample provider website for Open House curriculum repository testing.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
