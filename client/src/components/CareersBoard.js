"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/config";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  location: "",
  experience: "",
  noticePeriod: "",
  resumeLink: "",
  linkedinUrl: "",
  portfolioUrl: "",
  coverLetter: "",
};

export default function CareersBoard({ jobs, departments }) {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All teams");
  const [location, setLocation] = useState("All locations");
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const locations = [...new Set(jobs.map((job) => job.location))];
  const normalizedQuery = query.trim().toLowerCase();
  const filteredJobs = jobs.filter((job) => {
    const matchesQuery = !normalizedQuery || [job.title, job.description, job.department, ...job.skills]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
    const matchesDepartment = department === "All teams" || job.department === department;
    const matchesLocation = location === "All locations" || job.location === location;
    return matchesQuery && matchesDepartment && matchesLocation;
  });

  useEffect(() => {
    if (!selectedJob) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setSelectedJob(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedJob]);

  function openApplication(job) {
    setSelectedJob(job);
    setForm(EMPTY_FORM);
    setStatus({ type: "", message: "" });
  }

  function onChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      const response = await fetch(`${API_BASE}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
          jobDepartment: selectedJob.department,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Unable to submit your application. Please try again.");
      setForm(EMPTY_FORM);
      setStatus({
        type: "success",
        message: `Application received${data.application?.reference ? ` (${data.application.reference})` : ""}. Our team will review your profile and contact you if there is a suitable next step.`,
      });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Unable to submit your application. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section careers-board-section" id="open-roles">
      <div className="container">
        <div className="careers-board-heading careers-board-heading-simple">
          <div>
            <div className="eyebrow">Careers</div>
            <h1 className="section-title">Open positions</h1>
          </div>
        </div>

        <div className="career-filters glass">
          <div className="career-filter-field career-search-field">
            <label htmlFor="career-search">Search roles</label>
            <input id="career-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Job title, skill, or keyword" />
          </div>
          <div className="career-filter-field">
            <label htmlFor="career-department">Team</label>
            <select id="career-department" value={department} onChange={(event) => setDepartment(event.target.value)}>
              <option>All teams</option>
              {departments.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
          <div className="career-filter-field">
            <label htmlFor="career-location">Location</label>
            <select id="career-location" value={location} onChange={(event) => setLocation(event.target.value)}>
              <option>All locations</option>
              {locations.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>

        <div className="career-results-meta">
          <span>Showing <strong>{filteredJobs.length}</strong> of {jobs.length} roles</span>
          {(query || department !== "All teams" || location !== "All locations") && (
            <button type="button" onClick={() => { setQuery(""); setDepartment("All teams"); setLocation("All locations"); }}>Clear filters</button>
          )}
        </div>

        {filteredJobs.length ? (
          <div className="jobs-list">
            {filteredJobs.map((job) => (
              <article className="job-card glass" key={job.id}>
                <div className="job-card-main">
                  <div className="job-card-topline">
                    <span className="job-department">{job.department}</span>
                    <span className="job-type">{job.type}</span>
                  </div>
                  <h2>{job.title}</h2>
                </div>
                <div className="job-card-side">
                  <div className="job-meta">
                    <span>{job.location}</span>
                    <span>{job.experience}</span>
                  </div>
                  <button className="btn btn-primary" type="button" onClick={() => openApplication(job)}>Apply now</button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="career-empty glass">
            <h3>No matching roles</h3>
            <p>Try a different keyword or clear your filters to explore every open position.</p>
          </div>
        )}
      </div>

      {selectedJob && (
        <div className="app-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedJob(null); }}>
          <div className="app-modal application-modal" role="dialog" aria-modal="true" aria-labelledby="application-title">
            <button className="app-modal-close" type="button" onClick={() => setSelectedJob(null)} aria-label="Close application form">×</button>
            <div className="eyebrow">Job application</div>
            <h2 id="application-title">Apply for {selectedJob.title}</h2>
            <div className="application-selected-job">
              <span>{selectedJob.department}</span>
              <span>{selectedJob.location}</span>
              <span>{selectedJob.type}</span>
              <span>{selectedJob.experience}</span>
            </div>

            {status.type === "success" ? (
              <div className="application-success">
                <span aria-hidden="true">✓</span>
                <h3>Thank you for applying</h3>
                <p>{status.message}</p>
                <button className="btn btn-primary" type="button" onClick={() => setSelectedJob(null)}>Browse more roles</button>
              </div>
            ) : (
              <form className="application-form" onSubmit={onSubmit}>
                {status.message && <div className={`form-status ${status.type}`}>{status.message}</div>}
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="career-name">Full Name *</label>
                    <input id="career-name" name="name" value={form.name} onChange={onChange} placeholder="Your full name" autoComplete="name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="career-email">Email *</label>
                    <input id="career-email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" autoComplete="email" required />
                  </div>
                  <div className="field">
                    <label htmlFor="career-phone">Phone Number *</label>
                    <input id="career-phone" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+91 ..." autoComplete="tel" required />
                  </div>
                  <div className="field">
                    <label htmlFor="career-current-location">Current Location *</label>
                    <input id="career-current-location" name="location" value={form.location} onChange={onChange} placeholder="City, State" autoComplete="address-level2" required />
                  </div>
                  <div className="field">
                    <label htmlFor="career-experience">Total Experience *</label>
                    <select id="career-experience" name="experience" value={form.experience} onChange={onChange} required>
                      <option value="" disabled>Select experience</option>
                      <option>Fresher / Student</option>
                      <option>Less than 1 year</option>
                      <option>1–3 years</option>
                      <option>3–5 years</option>
                      <option>5–8 years</option>
                      <option>8+ years</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="career-notice">Notice Period *</label>
                    <select id="career-notice" name="noticePeriod" value={form.noticePeriod} onChange={onChange} required>
                      <option value="" disabled>Select notice period</option>
                      <option>Immediate</option>
                      <option>Within 15 days</option>
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                      <option>Currently studying</option>
                    </select>
                  </div>
                  <div className="field full">
                    <label htmlFor="career-resume">Resume / CV Link *</label>
                    <input id="career-resume" name="resumeLink" type="url" value={form.resumeLink} onChange={onChange} placeholder="Public Google Drive, Dropbox, or portfolio URL" required />
                    <small>Make sure the link can be viewed by our hiring team.</small>
                  </div>
                  <div className="field">
                    <label htmlFor="career-linkedin">LinkedIn Profile</label>
                    <input id="career-linkedin" name="linkedinUrl" type="url" value={form.linkedinUrl} onChange={onChange} placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div className="field">
                    <label htmlFor="career-portfolio">Portfolio / GitHub</label>
                    <input id="career-portfolio" name="portfolioUrl" type="url" value={form.portfolioUrl} onChange={onChange} placeholder="https://..." />
                  </div>
                  <div className="field full">
                    <label htmlFor="career-cover-letter">Why are you a good fit? *</label>
                    <textarea id="career-cover-letter" name="coverLetter" value={form.coverLetter} onChange={onChange} placeholder="Tell us about your relevant experience, interests, and what you would bring to this role." required />
                  </div>
                </div>
                <div className="form-actions application-actions">
                  <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit application"}</button>
                  <span>Your details will be reviewed by our hiring team.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
