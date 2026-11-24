"use client";

import { useCallback, useEffect, useState } from "react";
import { API_BASE } from "@/lib/config";

const TOKEN_KEY = "te_admin_token";

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function matchesQuery(record, query) {
  if (!query) return true;
  return Object.values(record).join(" ").toLowerCase().includes(query.toLowerCase());
}

function StatCard({ label, value, note, accent }) {
  return (
    <article className={`admin-stat-card glass ${accent || ""}`}>
      <span className="admin-stat-label">{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="admin-empty-state">
      <span aria-hidden="true">＋</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function ActivityList({ items, onSelect, emptyText = "Activity from inquiries and job applications will appear here." }) {
  if (!items.length) return <EmptyState title="No activity found" text={emptyText} />;
  return (
    <div className="admin-activity-list">
      {items.map((item) => (
        <button className="admin-activity-item" type="button" key={item.id} onClick={() => onSelect(item)}>
          <span className={`admin-activity-marker ${item.kind}`} aria-hidden="true">{item.kind === "application" ? "JA" : "IN"}</span>
          <span className="admin-activity-copy">
            <strong>{item.title}</strong>
            <span>{item.name} · {item.detail}</span>
          </span>
          <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
        </button>
      ))}
    </div>
  );
}

function DetailItem({ label, children, full = false }) {
  return (
    <div className={`admin-detail-item ${full ? "full" : ""}`}>
      <span>{label}</span>
      <div>{children || "—"}</div>
    </div>
  );
}

function DetailModal({ selection, onClose }) {
  const { kind, record } = selection;
  const isApplication = kind === "application";

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="app-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="app-modal admin-detail-modal" role="dialog" aria-modal="true" aria-labelledby="admin-detail-title">
        <button className="app-modal-close" type="button" onClick={onClose} aria-label="Close details">×</button>
        <div className="eyebrow">{isApplication ? `Application ${record.reference || ""}` : "Website inquiry"}</div>
        <h2 id="admin-detail-title">{isApplication ? record.jobTitle : record.service}</h2>
        <div className="admin-detail-badges">
          <span className={isApplication ? "admin-status" : "lead-service"}>{isApplication ? record.status || "New" : record.source || "Website"}</span>
          <span>{formatDate(record.createdAt)}</span>
        </div>

        <div className="admin-detail-grid">
          <DetailItem label="Full name">{record.name}</DetailItem>
          <DetailItem label="Email"><a href={`mailto:${record.email}`}>{record.email}</a></DetailItem>
          <DetailItem label="Phone"><a href={`tel:${record.phone}`}>{record.phone}</a></DetailItem>
          {isApplication ? (
            <>
              <DetailItem label="Current location">{record.location}</DetailItem>
              <DetailItem label="Department">{record.jobDepartment}</DetailItem>
              <DetailItem label="Experience">{record.experience}</DetailItem>
              <DetailItem label="Notice period">{record.noticePeriod}</DetailItem>
              <DetailItem label="Application source">{record.source}</DetailItem>
            </>
          ) : (
            <>
              <DetailItem label="Company / Organization">{record.company}</DetailItem>
              <DetailItem label="Lead source">{record.source}</DetailItem>
            </>
          )}
        </div>

        {isApplication && (
          <div className="admin-document-links">
            <a className="btn btn-primary" href={record.resumeLink} target="_blank" rel="noopener noreferrer">Open resume ↗</a>
            {record.linkedinUrl && <a className="btn btn-secondary" href={record.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>}
            {record.portfolioUrl && <a className="btn btn-secondary" href={record.portfolioUrl} target="_blank" rel="noopener noreferrer">Portfolio / GitHub ↗</a>}
          </div>
        )}

        <div className="admin-message-block">
          <span>{isApplication ? "Candidate cover note" : "Inquiry message"}</span>
          <p>{isApplication ? record.coverLetter : record.message}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeView, setActiveView] = useState("overview");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  const loadDashboard = useCallback(async (authToken) => {
    setLoading(true);
    setError("");
    try {
      const [leadsResponse, applicationsResponse] = await Promise.all([
        fetch(`${API_BASE}/api/admin/leads`, { headers: { Authorization: `Bearer ${authToken}` } }),
        fetch(`${API_BASE}/api/admin/applications`, { headers: { Authorization: `Bearer ${authToken}` } }),
      ]);
      const [leadsData, applicationsData] = await Promise.all([
        leadsResponse.json().catch(() => ({})),
        applicationsResponse.json().catch(() => ({})),
      ]);

      if (leadsResponse.status === 401 || applicationsResponse.status === 401) {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken("");
        setLeads([]);
        setApplications([]);
        setError("Session expired. Please log in again.");
        return;
      }
      if (!leadsResponse.ok) throw new Error(leadsData.error || "Failed to load inquiries.");
      if (!applicationsResponse.ok) throw new Error(applicationsData.error || "Failed to load applications.");

      setLeads(Array.isArray(leadsData.leads) ? leadsData.leads : []);
      setApplications(Array.isArray(applicationsData.applications) ? applicationsData.applications : []);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || "Failed to load the admin dashboard.");
    } finally {
      setLoading(false);
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem(TOKEN_KEY) || "";
    if (saved) {
      setToken(saved);
      loadDashboard(saved);
    } else {
      setChecking(false);
    }
  }, [loadDashboard]);

  async function onLogin(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Login failed.");
      sessionStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword("");
      await loadDashboard(data.token);
    } catch (err) {
      setError(err.message || "Login failed.");
      setLoading(false);
    }
  }

  function logout() {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken("");
    setLeads([]);
    setApplications([]);
    setPassword("");
    setSelected(null);
    setError("");
  }

  function changeView(view) {
    setActiveView(view);
    setQuery("");
  }

  const activities = [
    ...leads.map((lead) => ({
      id: `lead-${lead.id}`,
      kind: "lead",
      title: "New service inquiry",
      name: lead.name,
      email: lead.email,
      detail: lead.service,
      createdAt: lead.createdAt,
      record: lead,
    })),
    ...applications.map((application) => ({
      id: `application-${application.id}`,
      kind: "application",
      title: "New job application",
      name: application.name,
      email: application.email,
      detail: application.jobTitle,
      createdAt: application.createdAt,
      record: application,
    })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const today = new Date().toDateString();
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const todayCount = activities.filter((item) => new Date(item.createdAt).toDateString() === today).length;
  const weekCount = activities.filter((item) => new Date(item.createdAt).getTime() >= weekAgo).length;
  const filteredLeads = leads.filter((lead) => matchesQuery(lead, query.trim()));
  const filteredApplications = applications.filter((application) => matchesQuery(application, query.trim()));
  const filteredActivities = activities.filter((item) => matchesQuery(item, query.trim()));

  const serviceCounts = leads.reduce((counts, lead) => {
    const service = lead.service || "General Inquiry";
    counts[service] = (counts[service] || 0) + 1;
    return counts;
  }, {});
  const topServices = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "leads", label: "Inquiries", count: leads.length },
    { id: "applications", label: "Applications", count: applications.length },
    { id: "activity", label: "User activity", count: activities.length },
  ];

  if (checking) {
    return (
      <div className="admin-wrap">
        <div className="container">
          <div className="empty-state glass" style={{ borderRadius: 24 }}>Checking admin session...</div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="admin-wrap">
        <div className="container">
          <div className="login-card glass">
            <div className="eyebrow">Admin Portal</div>
            <h1>Welcome back</h1>
            <p>Sign in to manage website inquiries, job applications, and user activity in one organized workspace.</p>
            {error && <div className="form-status error">{error}</div>}
            <form onSubmit={onLogin}>
              <div className="field">
                <label htmlFor="admin-password">Password</label>
                <input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter admin password" required />
              </div>
              <div className="form-actions">
                <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrap admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <div>
            <div className="eyebrow">TechnoElevate / Admin</div>
            <h1>Business command center</h1>
            <p>Monitor inquiries, review candidates, and follow every new website interaction.</p>
          </div>
          <div className="admin-toolbar">
            <button className="btn btn-secondary" type="button" onClick={() => loadDashboard(token)} disabled={loading}>{loading ? "Refreshing..." : "Refresh data"}</button>
            <button className="btn btn-secondary" type="button" onClick={logout}>Logout</button>
          </div>
        </div>

        <nav className="admin-tabs glass" aria-label="Admin sections">
          {tabs.map((tab) => (
            <button className={activeView === tab.id ? "active" : ""} type="button" key={tab.id} onClick={() => changeView(tab.id)}>
              {tab.label}{typeof tab.count === "number" && <span>{tab.count}</span>}
            </button>
          ))}
        </nav>

        {error && <div className="form-status error admin-error">{error}</div>}

        {activeView === "overview" && (
          <>
            <div className="admin-stats-grid">
              <StatCard label="Total inquiries" value={leads.length} note="Website and service leads" accent="coral" />
              <StatCard label="Job applications" value={applications.length} note="Candidates across all roles" accent="blue" />
              <StatCard label="Activity today" value={todayCount} note="New interactions today" accent="green" />
              <StatCard label="Last 7 days" value={weekCount} note="Recent combined activity" accent="cream" />
            </div>

            <div className="admin-overview-grid">
              <section className="admin-panel glass">
                <div className="admin-panel-heading">
                  <div><span>Live feed</span><h2>Recent user activity</h2></div>
                  <button type="button" onClick={() => changeView("activity")}>View all</button>
                </div>
                <ActivityList items={activities.slice(0, 7)} onSelect={(item) => setSelected({ kind: item.kind, record: item.record })} />
              </section>

              <div className="admin-side-stack">
                <section className="admin-panel glass">
                  <div className="admin-panel-heading">
                    <div><span>Hiring</span><h2>Latest candidates</h2></div>
                    <button type="button" onClick={() => changeView("applications")}>View all</button>
                  </div>
                  {applications.length ? (
                    <div className="admin-candidate-list">
                      {applications.slice(0, 4).map((application) => (
                        <button type="button" key={application.id} onClick={() => setSelected({ kind: "application", record: application })}>
                          <span className="admin-candidate-avatar">{application.name?.charAt(0)?.toUpperCase() || "C"}</span>
                          <span><strong>{application.name}</strong><small>{application.jobTitle}</small></span>
                          <span>›</span>
                        </button>
                      ))}
                    </div>
                  ) : <EmptyState title="No candidates yet" text="New career applications will appear here." />}
                </section>

                <section className="admin-panel glass">
                  <div className="admin-panel-heading"><div><span>Demand</span><h2>Inquiry mix</h2></div></div>
                  {topServices.length ? (
                    <div className="admin-service-breakdown">
                      {topServices.map(([service, count]) => (
                        <div key={service}><span>{service}</span><strong>{count}</strong></div>
                      ))}
                    </div>
                  ) : <p className="admin-panel-note">Service trends will appear after the first inquiry.</p>}
                </section>
              </div>
            </div>
          </>
        )}

        {activeView !== "overview" && (
          <section className="admin-panel glass admin-records-panel">
            <div className="admin-records-toolbar">
              <div>
                <span className="admin-section-kicker">Workspace</span>
                <h2>{activeView === "leads" ? "Website inquiries" : activeView === "applications" ? "Job applications" : "User activity timeline"}</h2>
                <p>{activeView === "leads" ? "Search and review every service request." : activeView === "applications" ? "Review candidate details, experience, resumes, and cover notes." : "A combined chronological feed of inquiries and career applications."}</p>
              </div>
              <div className="admin-search">
                <label htmlFor="admin-search">Search records</label>
                <input id="admin-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, email, role, service..." />
              </div>
            </div>

            <div className="admin-record-meta">
              <span>{activeView === "leads" ? filteredLeads.length : activeView === "applications" ? filteredApplications.length : filteredActivities.length} records</span>
              <span>{lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}` : "Loading records"}</span>
            </div>

            {activeView === "activity" && (
              <ActivityList items={filteredActivities} onSelect={(item) => setSelected({ kind: item.kind, record: item.record })} emptyText="Try another search or check back after new website activity." />
            )}

            {activeView === "leads" && (
              filteredLeads.length ? (
                <div className="leads-table-wrap">
                  <table className="leads-table admin-records-table">
                    <thead><tr><th>Received</th><th>Contact</th><th>Service</th><th>Company</th><th>Source</th><th>Details</th></tr></thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id}>
                          <td className="admin-date-cell">{formatDate(lead.createdAt)}</td>
                          <td><div className="admin-person-cell"><strong>{lead.name}</strong><a href={`mailto:${lead.email}`}>{lead.email}</a><span>{lead.phone}</span></div></td>
                          <td><span className="lead-service">{lead.service}</span></td>
                          <td>{lead.company || "—"}</td>
                          <td>{lead.source || "website"}</td>
                          <td><button className="admin-view-btn" type="button" onClick={() => setSelected({ kind: "lead", record: lead })}>View details</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <EmptyState title="No inquiries found" text={query ? "No inquiry matches your search." : "Website and service inquiries will appear here."} />
            )}

            {activeView === "applications" && (
              filteredApplications.length ? (
                <div className="leads-table-wrap">
                  <table className="leads-table admin-records-table">
                    <thead><tr><th>Applied</th><th>Candidate</th><th>Role</th><th>Contact</th><th>Experience</th><th>Status</th><th>Details</th></tr></thead>
                    <tbody>
                      {filteredApplications.map((application) => (
                        <tr key={application.id}>
                          <td className="admin-date-cell">{formatDate(application.createdAt)}<small>{application.reference}</small></td>
                          <td><div className="admin-person-cell"><strong>{application.name}</strong><span>{application.location}</span></div></td>
                          <td><div className="admin-role-cell"><strong>{application.jobTitle}</strong><span>{application.jobDepartment}</span></div></td>
                          <td><div className="admin-person-cell"><a href={`mailto:${application.email}`}>{application.email}</a><span>{application.phone}</span></div></td>
                          <td>{application.experience}<small className="admin-table-subtext">{application.noticePeriod}</small></td>
                          <td><span className="admin-status">{application.status || "New"}</span></td>
                          <td><button className="admin-view-btn" type="button" onClick={() => setSelected({ kind: "application", record: application })}>View details</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <EmptyState title="No applications found" text={query ? "No candidate matches your search." : "Applications submitted through the careers page will appear here."} />
            )}
          </section>
        )}
      </div>

      {selected && <DetailModal selection={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
