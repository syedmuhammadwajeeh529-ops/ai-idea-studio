* { box-sizing: border-box; }
:root {
  --bg: #0b1020;
  --panel: rgba(15, 23, 42, 0.95);
  --panel-soft: rgba(15, 23, 42, 0.7);
  --card: rgba(30, 41, 59, 0.9);
  --card-hover: rgba(51, 65, 85, 0.75);
  --border: rgba(148, 163, 184, 0.2);
  --primary: #7c3aed;
  --primary-strong: #8b5cf6;
  --secondary: #0ea5e9;
  --highlight: #f59e0b;
  --success: #22c55e;
  --danger: #f87171;
  --text: #e2e8f0;
  --muted: #a5b4cf;
  --shadow: 0 24px 60px rgba(15, 23, 42, 0.35);
}

body {
  margin: 0;
  min-height: 100vh;
  background: radial-gradient(circle at top, rgba(124,58,237,0.22), transparent 30%), #020817;
  font-family: 'Inter', sans-serif;
  color: var(--text);
}

button, input, select, textarea {
  font: inherit;
}

.app-shell {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  background: rgba(15, 23, 42, 0.9);
  border-right: 1px solid var(--border);
  padding: 20px 18px;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 26px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  font-weight: 800;
}

.brand-title {
  font-weight: 700;
}

.brand-subtitle {
  color: var(--muted);
  font-size: 12px;
}

.primary-button,
.secondary-button,
.ghost-button {
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.primary-button {
  background: linear-gradient(135deg, var(--primary), var(--primary-strong));
  color: white;
  font-weight: 700;
  padding: 0.8rem 1rem;
}

.secondary-button {
  background: rgba(14, 165, 233, 0.14);
  color: #d9f3ff;
  border: 1px solid rgba(14, 165, 233, 0.35);
  padding: 0.7rem 0.9rem;
}

.ghost-button {
  padding: 0.7rem 0.9rem;
  background: rgba(148, 163, 184, 0.12);
  color: var(--text);
  border: 1px solid var(--border);
}

.primary-button:hover,
.secondary-button:hover,
.ghost-button:hover {
  transform: translateY(-1px);
}

.sidebar-section {
  margin-top: 24px;
}

.section-label {
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 11px;
  margin-bottom: 12px;
}

.mini-stat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.mini-stat {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px 12px;
  display: grid;
  gap: 6px;
}

.mini-value {
  font-size: 22px;
  font-weight: 700;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.55rem 0.75rem;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid var(--border);
}

.status-pill.success { background: rgba(34, 197, 94, 0.15); color: #b9f7cc; }
.status-pill.warning { background: rgba(245, 158, 11, 0.15); color: #fbe4b0; }
.status-pill.neutral { background: rgba(148, 163, 184, 0.12); color: var(--muted); }
.status-pill.danger { background: rgba(248, 113, 113, 0.12); color: #ffc7c7; }

.project-ribbon {
  display: grid;
  gap: 10px;
}

.project-ribbon-item {
  background: rgba(148, 163, 184, 0.08);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.8rem;
  cursor: pointer;
}

.project-ribbon-item strong {
  display: block;
  margin-bottom: 4px;
}

.main-panel {
  padding: 24px;
  background: rgba(2, 8, 23, 0.45);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.eyebrow {
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
  margin-bottom: 6px;
}

.topbar h1, .panel-header h2, .panel-header h3 {
  margin: 0;
  font-size: clamp(24px, 3vw, 38px);
}

.toolbar-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

#projectSearch {
  width: min(420px, 42vw);
  padding: 0.8rem 1rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.9);
  color: var(--text);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.project-card {
  background: linear-gradient(180deg, rgba(15,23,42,0.95), rgba(30,41,59,0.9));
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.project-card .thumb {
  height: 150px;
  background: linear-gradient(135deg, rgba(124,58,237,0.75), rgba(14,165,233,0.85));
  display: flex;
  align-items: flex-end;
  padding: 18px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-card .body {
  padding: 16px;
}

.project-card .meta-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 12px;
  color: var(--muted);
  font-size: 12px;
}

.project-card .status-tag {
  display: inline-flex;
  border-radius: 999px;
  padding: 0.24rem 0.6rem;
  font-size: 11px;
  font-weight: 600;
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid var(--border);
}

.progress-track {
  height: 8px;
  background: rgba(148, 163, 184, 0.18);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 12px;
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
}

.editor-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.75fr);
  gap: 18px;
}

.editor-panel,
.details-panel {
  background: rgba(15,23,42,0.9);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 20px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}

.panel-header.compact h3 {
  font-size: 24px;
}

.inline-actions,
.panel-footer-actions,
.stacked-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.field-group {
  display: grid;
  gap: 8px;
  margin-bottom: 16px;
}

.field-group label {
  color: var(--muted);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

input, textarea, select {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
  background: rgba(15,23,42,0.8);
  color: var(--text);
}

textarea {
  resize: vertical;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 14px;
}

.scene-list {
  display: grid;
  gap: 10px;
}

.scene-item {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(148,163,184,0.05);
}

.scene-item h4 {
  margin: 0 0 8px 0;
}

.scene-item p {
  margin: 0;
  color: var(--muted);
  line-height: 1.5;
}

.detail-actions {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.version-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
}

.version-item {
  background: rgba(148,163,184,0.05);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px;
  color: var(--muted);
  font-size: 13px;
}

.toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  background: rgba(15, 23, 42, 0.96);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text);
  padding: 0.8rem 1rem;
  box-shadow: var(--shadow);
}

.hidden {
  display: none;
}

@media (max-width: 980px) {
  .app-shell {
    grid-template-columns: 1fr;
  }
  .editor-layout {
    grid-template-columns: 1fr;
  }
  #projectSearch {
    width: 100%;
  }
}
