import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  LayoutDashboard, FolderKanban, AlertOctagon, ListChecks, Clock, GanttChart,
  FileText, Users, Settings, Plus, Search, Filter, X, ChevronRight, ChevronLeft,
  Send, Paperclip, MessageSquare, Activity, CheckCircle2, Circle, AlertCircle,
  Layers, Calendar, MapPin, User, Tag, Hash, ArrowUpRight, Trash2, Building2,
  Bell, ChevronDown, AtSign, Link2, Image as ImageIcon, History, LogOut,
  Briefcase, TrendingUp, Inbox, CheckSquare, Zap, Crown, Target, Eye,
  Play, Pause, Timer, StopCircle
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  CartesianGrid, AreaChart, Area
} from "recharts";

// ============================================================
// DESIGN TOKENS
// ============================================================
const styles = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --bg: #0b0e14;
  --bg-2: #11151d;
  --bg-3: #181d27;
  --bg-4: #1f2531;
  --bg-hover: #252c3a;
  --line: #232a37;
  --line-2: #2d3544;
  --txt: #e8edf5;
  --txt-2: #97a3b6;
  --txt-3: #5d6779;
  --brand: #5b8def;
  --brand-2: #3d6fd1;
  --brand-dim: rgba(91, 141, 239, 0.12);
  --brand-glow: rgba(91, 141, 239, 0.25);
  --green: #3fcf8e;
  --amber: #f0a847;
  --red: #ef5d6f;
  --purple: #b487f5;
  --teal: #4fd1c5;
}

* { box-sizing: border-box; }
body { margin: 0; }

.app {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: var(--bg);
  color: var(--txt);
  min-height: 100vh;
  font-size: 14px;
  letter-spacing: -0.005em;
}
.mono { font-family: 'JetBrains Mono', monospace; letter-spacing: 0; }

::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--line-2); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--txt-3); }

/* ============ SIDEBAR ============ */
.sidebar {
  width: 232px;
  background: var(--bg-2);
  border-right: 1px solid var(--line);
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 50;
}
.tenant-card {
  padding: 14px 14px 12px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 10px;
}
.tenant-logo {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, var(--brand) 0%, #7e6dff 100%);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800;
  font-size: 14px;
  color: white;
  letter-spacing: -0.04em;
  box-shadow: 0 4px 12px var(--brand-glow);
}
.tenant-info { flex: 1; min-width: 0; }
.tenant-name { font-weight: 700; font-size: 13px; line-height: 1.2; }
.tenant-plan {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px;
  color: var(--brand);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 2px;
}
.nav-area { padding: 12px 8px; flex: 1; overflow-y: auto; }
.nav-group-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9.5px;
  color: var(--txt-3);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 12px 12px 6px;
}
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 12px;
  border-radius: 6px;
  color: var(--txt-2);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 1px;
  transition: all 0.12s;
}
.nav-item:hover { background: var(--bg-3); color: var(--txt); }
.nav-item.active {
  background: var(--brand-dim);
  color: var(--brand);
  font-weight: 600;
}
.nav-item .badge {
  margin-left: auto;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  background: var(--bg-3);
  padding: 1px 7px;
  border-radius: 10px;
  color: var(--txt-2);
  font-weight: 500;
}
.nav-item.active .badge { background: rgba(91,141,239,0.2); color: var(--brand); }
.nav-item.has-dot::before {
  content: ''; width: 6px; height: 6px;
  background: var(--red); border-radius: 50%;
  position: absolute; right: 28px;
}

.user-card {
  padding: 12px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: relative;
}
.user-card:hover { background: var(--bg-3); }

/* ============ AVATAR ============ */
.avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 12px;
  flex-shrink: 0;
  color: white;
}
.av-1 { background: linear-gradient(135deg, #5b8def, #7e6dff); }
.av-2 { background: linear-gradient(135deg, #3fcf8e, #2dd4bf); }
.av-3 { background: linear-gradient(135deg, #f0a847, #ef5d6f); }
.av-4 { background: linear-gradient(135deg, #b487f5, #ec4899); }
.av-5 { background: linear-gradient(135deg, #4fd1c5, #5b8def); }
.av-6 { background: linear-gradient(135deg, #f59e0b, #b487f5); }
.av-sm { width: 24px; height: 24px; font-size: 10px; }
.av-xs { width: 20px; height: 20px; font-size: 9px; }
.av-lg { width: 40px; height: 40px; font-size: 14px; }

/* ============ MAIN ============ */
.main { margin-left: 232px; min-height: 100vh; }
.topbar {
  height: 56px;
  border-bottom: 1px solid var(--line);
  background: rgba(11, 14, 20, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 14px;
  position: sticky;
  top: 0;
  z-index: 40;
}
.crumb { display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--txt-2); }
.crumb a { color: var(--txt-2); cursor: pointer; }
.crumb a:hover { color: var(--txt); }
.crumb .current { color: var(--txt); font-weight: 600; }

.role-switcher {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 5px 10px 5px 8px;
  font-size: 12.5px;
  cursor: pointer;
  position: relative;
}
.role-switcher:hover { border-color: var(--line-2); }
.role-icon {
  width: 22px; height: 22px;
  border-radius: 5px;
  display: flex; align-items: center; justify-content: center;
}
.role-pop {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background: var(--bg-3);
  border: 1px solid var(--line-2);
  border-radius: 8px;
  width: 240px;
  padding: 6px;
  z-index: 60;
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);
}
.role-pop-item {
  padding: 9px 11px;
  border-radius: 6px;
  cursor: pointer;
  display: flex; align-items: center; gap: 10px;
}
.role-pop-item:hover { background: var(--bg-4); }
.role-pop-item.active { background: var(--brand-dim); }
.role-pop-title { font-size: 13px; font-weight: 600; }
.role-pop-desc { font-size: 11px; color: var(--txt-3); margin-top: 2px; }

.search-box {
  position: relative;
}
.search-input {
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: 7px;
  padding: 7px 12px 7px 32px;
  color: var(--txt);
  font-size: 13px;
  width: 280px;
  font-family: inherit;
  outline: none;
}
.search-input:focus { border-color: var(--brand); }

.notif-btn {
  width: 34px; height: 34px;
  border-radius: 7px;
  background: var(--bg-3);
  border: 1px solid var(--line);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  color: var(--txt-2);
  position: relative;
}
.notif-btn:hover { color: var(--txt); }
.notif-dot {
  position: absolute;
  top: 7px; right: 7px;
  width: 8px; height: 8px;
  background: var(--red);
  border-radius: 50%;
  border: 2px solid var(--bg-3);
}

/* ============ CONTENT ============ */
.content { padding: 24px 28px; }
.page-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 22px; }
.page-title { font-size: 24px; font-weight: 700; letter-spacing: -0.02em; margin: 0; }
.page-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--txt-3);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-top: 6px;
}
.welcome-name { color: var(--brand); }

/* ============ BUTTONS ============ */
.btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 14px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  font-family: inherit;
  transition: all 0.12s;
  white-space: nowrap;
}
.btn-primary { background: var(--brand); color: white; }
.btn-primary:hover { background: #6f9bf2; }
.btn-secondary { background: var(--bg-3); color: var(--txt); border-color: var(--line); }
.btn-secondary:hover { background: var(--bg-4); border-color: var(--line-2); }
.btn-ghost { background: transparent; color: var(--txt-2); }
.btn-ghost:hover { background: var(--bg-3); color: var(--txt); }
.btn-danger { background: transparent; color: var(--red); border-color: rgba(239,93,111,0.3); }
.btn-danger:hover { background: rgba(239,93,111,0.1); }
.btn-sm { padding: 6px 11px; font-size: 12px; }

/* ============ CARDS ============ */
.card {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
}
.card-head {
  padding: 14px 18px;
  border-bottom: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-title { font-size: 13.5px; font-weight: 700; }
.card-body { padding: 18px; }

/* ============ KPI ============ */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 22px;
}
.kpi {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 18px;
  position: relative;
  overflow: hidden;
  transition: all 0.15s;
}
.kpi:hover { border-color: var(--line-2); }
.kpi-head { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.kpi-icon {
  width: 32px; height: 32px;
  border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
}
.kpi-label { font-size: 12px; color: var(--txt-2); font-weight: 500; }
.kpi-value {
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1;
}
.kpi-sub { margin-top: 8px; font-size: 11.5px; color: var(--txt-3); }

/* ============ TABLE ============ */
.tbl { width: 100%; border-collapse: collapse; font-size: 13px; }
.tbl thead th {
  text-align: left;
  padding: 11px 14px;
  background: var(--bg-3);
  border-bottom: 1px solid var(--line);
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  color: var(--txt-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.tbl tbody td { padding: 11px 14px; border-bottom: 1px solid var(--line); vertical-align: middle; }
.tbl tbody tr { cursor: pointer; transition: background 0.1s; }
.tbl tbody tr:hover { background: var(--bg-3); }
.tbl tbody tr:last-child td { border-bottom: none; }

/* ============ BADGES ============ */
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}
.bg-low { background: rgba(63,207,142,0.14); color: var(--green); }
.bg-med { background: rgba(240,168,71,0.14); color: var(--amber); }
.bg-high { background: rgba(239,93,111,0.14); color: var(--red); }
.bg-crit { background: var(--red); color: white; }

.dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

.pill {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 11.5px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 5px;
  background: var(--bg-3);
  border: 1px solid var(--line);
  white-space: nowrap;
}

/* Disciplina */
.disc {
  display: inline-flex; align-items: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  letter-spacing: 0.05em;
}
.d-ARQ { background: rgba(91,141,239,0.15); color: #5b8def; }
.d-EST { background: rgba(180,135,245,0.15); color: #b487f5; }
.d-HID { background: rgba(79,209,197,0.15); color: #4fd1c5; }
.d-ELE { background: rgba(240,168,71,0.18); color: #f0a847; }
.d-AVAC { background: rgba(63,207,142,0.15); color: #3fcf8e; }
.d-PCI { background: rgba(239,93,111,0.15); color: #ef5d6f; }
.d-INC { background: rgba(151,163,182,0.15); color: #97a3b6; }

/* ============ FILTERS ============ */
.filters { display: flex; gap: 10px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
.select {
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 7px 10px;
  color: var(--txt);
  font-size: 12.5px;
  font-family: inherit;
  outline: none;
  cursor: pointer;
}
.select:focus { border-color: var(--brand); }

/* ============ TABS ============ */
.tabs {
  display: inline-flex;
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: 7px;
  padding: 3px;
}
.tab {
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  color: var(--txt-2);
  display: flex; align-items: center; gap: 6px;
  border: none;
  background: transparent;
  font-family: inherit;
}
.tab.active { background: var(--bg-4); color: var(--txt); }

/* Project tabs (dentro do projeto) */
.proj-tabs {
  display: flex;
  gap: 2px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 24px;
  overflow-x: auto;
}
.proj-tab {
  padding: 11px 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--txt-2);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  display: flex; align-items: center; gap: 7px;
  white-space: nowrap;
  transition: color 0.12s;
}
.proj-tab:hover { color: var(--txt); }
.proj-tab.active { color: var(--brand); border-bottom-color: var(--brand); }
.proj-tab .badge { font-family: 'JetBrains Mono', monospace; font-size: 10px; background: var(--bg-3); padding: 1px 6px; border-radius: 8px; color: var(--txt-2); font-weight: 500; }

/* ============ PROJECT CARDS ============ */
.proj-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px; }
.proj-card {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 18px;
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
  overflow: hidden;
}
.proj-card:hover { border-color: var(--line-2); transform: translateY(-2px); }
.proj-card-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
.proj-card-name { font-size: 15px; font-weight: 700; margin-bottom: 4px; line-height: 1.3; }
.proj-card-client {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  color: var(--txt-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.proj-card-progress { margin-top: 12px; }
.progress-bar { height: 5px; background: var(--bg-4); border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, var(--brand), var(--purple)); border-radius: 3px; transition: width 0.3s; }
.proj-card-stats { display: flex; gap: 18px; margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--line); }
.proj-stat-label { font-size: 9.5px; color: var(--txt-3); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 3px; }
.proj-stat-value { font-size: 17px; font-weight: 700; }
.proj-team { display: flex; margin-top: 14px; }
.proj-team .avatar { border: 2px solid var(--bg-2); margin-left: -8px; }
.proj-team .avatar:first-child { margin-left: 0; }
.proj-team-more {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: var(--bg-4);
  border: 2px solid var(--bg-2);
  display: flex; align-items: center; justify-content: center;
  font-size: 9.5px;
  font-weight: 600;
  color: var(--txt-2);
  margin-left: -8px;
}

/* ============ KANBAN ============ */
.kanban {
  display: grid;
  grid-template-columns: repeat(6, minmax(260px, 1fr));
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}
.kanban-col {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  min-height: 400px;
}
.kanban-col-head { padding: 12px 14px; border-bottom: 1px solid var(--line); display: flex; align-items: center; gap: 8px; }
.kanban-col-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
.kanban-col-count { margin-left: auto; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--txt-3); background: var(--bg-3); padding: 1px 7px; border-radius: 10px; }
.kanban-cards { padding: 10px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
.kanban-card {
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: 7px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.12s;
}
.kanban-card:hover { border-color: var(--line-2); transform: translateY(-1px); }
.kanban-card-id { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--txt-3); margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
.kanban-card-title { font-size: 13px; font-weight: 500; line-height: 1.4; margin-bottom: 10px; }
.kanban-card-meta { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--txt-2); }

/* ============ MODAL ============ */
.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}
.modal {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 12px;
  width: 100%;
  max-width: 920px;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.modal-head {
  padding: 16px 22px;
  border-bottom: 1px solid var(--line);
  display: flex; align-items: center; justify-content: space-between;
  flex-shrink: 0;
}
.modal-body { flex: 1; overflow-y: auto; }
.modal-close {
  background: transparent; border: none;
  color: var(--txt-2);
  cursor: pointer;
  width: 30px; height: 30px;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
}
.modal-close:hover { background: var(--bg-3); color: var(--txt); }

/* ============ FORM ============ */
.fg { margin-bottom: 14px; }
.lbl {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  color: var(--txt-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}
.inp, .ta {
  width: 100%;
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: 7px;
  padding: 9px 12px;
  color: var(--txt);
  font-size: 13px;
  font-family: inherit;
  outline: none;
}
.ta { resize: vertical; min-height: 80px; }
.inp:focus, .ta:focus { border-color: var(--brand); }
.fg2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

/* ============ ISSUE DETAIL ============ */
.detail-layout { display: grid; grid-template-columns: 1fr 320px; height: 100%; }
.detail-main { padding: 20px 24px; overflow-y: auto; }
.detail-side { background: var(--bg-3); border-left: 1px solid var(--line); padding: 20px; overflow-y: auto; }
.detail-id { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--txt-3); margin-bottom: 6px; }
.detail-title { font-size: 19px; font-weight: 700; line-height: 1.3; margin-bottom: 14px; }
.det-section { margin-top: 22px; }
.det-section-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--txt-3);
  margin-bottom: 10px;
  display: flex; align-items: center; gap: 6px;
}
.fld { display: flex; align-items: center; gap: 8px; padding: 7px 0; font-size: 12.5px; }
.fld-lbl { color: var(--txt-3); width: 100px; flex-shrink: 0; font-size: 11px; }
.fld-val { color: var(--txt); flex: 1; }

/* ============ COMMENT / CHAT ============ */
.cmt {
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 11px 13px;
  margin-bottom: 8px;
}
.cmt-head { display: flex; align-items: center; gap: 8px; margin-bottom: 7px; }
.cmt-author { font-size: 12.5px; font-weight: 600; }
.cmt-time { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--txt-3); margin-left: auto; }
.cmt-body { font-size: 13px; color: var(--txt); line-height: 1.5; }
.cmt-body .mention { color: var(--brand); font-weight: 600; background: var(--brand-dim); padding: 0 4px; border-radius: 3px; }
.cmt-body .iss-link { color: var(--purple); font-weight: 600; cursor: pointer; }
.cmt-body .iss-link:hover { text-decoration: underline; }

.history-item { display: flex; gap: 10px; padding: 9px 0; font-size: 12.5px; color: var(--txt-2); border-bottom: 1px solid var(--line); }
.history-item:last-child { border-bottom: none; }
.history-icon {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: var(--bg-3);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.history-time { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--txt-3); }

/* ============ EMPTY ============ */
.empty {
  padding: 60px 20px;
  text-align: center;
  color: var(--txt-3);
}
.empty-icon {
  width: 56px; height: 56px;
  background: var(--bg-3);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
}

/* ============ CHARTS ============ */
.chart-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 14px; margin-bottom: 14px; }
.chart-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

/* ============ GANTT ============ */
.gantt-row { display: grid; grid-template-columns: 240px 1fr; border-bottom: 1px solid var(--line); height: 40px; align-items: center; }
.gantt-task-name { padding: 0 14px; font-size: 12.5px; }
.gantt-track { position: relative; height: 100%; border-left: 1px solid var(--line); }
.gantt-bar {
  position: absolute;
  height: 22px;
  top: 9px;
  border-radius: 4px;
  display: flex; align-items: center;
  padding: 0 8px;
  font-size: 11px;
  font-weight: 600;
  color: white;
  overflow: hidden;
  white-space: nowrap;
}
.gantt-header {
  display: grid;
  grid-template-columns: 240px 1fr;
  background: var(--bg-3);
  border-bottom: 1px solid var(--line);
  height: 36px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  text-transform: uppercase;
  color: var(--txt-3);
  letter-spacing: 0.08em;
}
.gantt-header-track { display: flex; }
.gantt-header-cell { flex: 1; display: flex; align-items: center; justify-content: center; border-left: 1px solid var(--line); }

/* ============ CHAT FULL ============ */
.chat-layout { display: grid; grid-template-columns: 240px 1fr; height: calc(100vh - 220px); min-height: 500px; background: var(--bg-2); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
.chat-layout-v2 { display: block; height: calc(100vh - 240px); min-height: 500px; background: var(--bg-2); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
.chat-layout-v2 .chat-main { height: 100%; }
.chat-channels { border-right: 1px solid var(--line); padding: 10px; overflow-y: auto; }
.chat-channel-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--txt-3); text-transform: uppercase; letter-spacing: 0.1em; padding: 8px 10px 6px; }
.chat-channel {
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: var(--txt-2);
  display: flex; align-items: center; gap: 7px;
  margin-bottom: 1px;
}
.chat-channel:hover { background: var(--bg-3); color: var(--txt); }
.chat-channel.active { background: var(--brand-dim); color: var(--brand); font-weight: 600; }
.chat-channel .badge { margin-left: auto; background: var(--red); color: white; font-size: 10px; padding: 1px 6px; border-radius: 8px; font-family: 'JetBrains Mono', monospace; }

.chat-main { display: flex; flex-direction: column; }
.chat-head { padding: 14px 18px; border-bottom: 1px solid var(--line); display: flex; align-items: center; gap: 10px; }
.chat-messages { flex: 1; overflow-y: auto; padding: 16px 18px; display: flex; flex-direction: column; gap: 12px; }
.chat-msg { display: flex; gap: 10px; }
.chat-msg-content { flex: 1; min-width: 0; }
.chat-msg-head { display: flex; align-items: baseline; gap: 8px; margin-bottom: 3px; }
.chat-msg-author { font-size: 13px; font-weight: 700; }
.chat-msg-time { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--txt-3); }
.chat-msg-body { font-size: 13.5px; line-height: 1.5; color: var(--txt); }
.chat-msg-attach {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--bg-3);
  border: 1px solid var(--line);
  padding: 5px 10px;
  border-radius: 6px;
  margin-top: 4px;
  font-size: 12px;
  color: var(--txt-2);
}
.chat-input-area { padding: 14px 18px; border-top: 1px solid var(--line); }
.chat-input-wrap {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg-3);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 4px 4px 4px 12px;
}
.chat-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--txt);
  font-size: 13.5px;
  padding: 8px 0;
  font-family: inherit;
  outline: none;
}
.chat-input-btn {
  background: transparent; border: none;
  color: var(--txt-2);
  cursor: pointer;
  width: 32px; height: 32px;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
}
.chat-input-btn:hover { background: var(--bg-4); color: var(--txt); }
.chat-input-btn.send { background: var(--brand); color: white; }
.chat-input-btn.send:hover { background: #6f9bf2; }

.mention-menu {
  position: absolute;
  bottom: 100%;
  left: 12px;
  background: var(--bg-3);
  border: 1px solid var(--line-2);
  border-radius: 8px;
  width: 240px;
  margin-bottom: 4px;
  padding: 6px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  z-index: 10;
}
.mention-menu-item {
  display: flex; align-items: center; gap: 10px;
  padding: 7px 9px;
  border-radius: 5px;
  cursor: pointer;
}
.mention-menu-item:hover, .mention-menu-item.active { background: var(--bg-4); }

/* ============ TOAST ============ */
.toast {
  position: fixed; bottom: 24px; right: 24px;
  background: var(--bg-3);
  border: 1px solid var(--brand);
  padding: 11px 16px;
  border-radius: 8px;
  font-size: 13px;
  z-index: 200;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  animation: slideIn 0.2s ease;
  display: flex; align-items: center; gap: 8px;
}
@keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

/* ============ MY TASKS LIST ============ */
.task-row {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  transition: background 0.1s;
}
.task-row:hover { background: var(--bg-3); }
.task-row:last-child { border-bottom: none; }
.task-check { width: 18px; height: 18px; border-radius: 5px; border: 1.5px solid var(--txt-3); display: flex; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer; }
.task-check.done { background: var(--green); border-color: var(--green); }
.task-info { flex: 1; min-width: 0; }
.task-title { font-size: 13.5px; font-weight: 500; }
.task-meta { font-size: 11px; color: var(--txt-3); margin-top: 3px; display: flex; align-items: center; gap: 8px; }

/* ============ TIMER ============ */
.timer-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 700;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.04em;
  cursor: pointer;
  border: 1px solid;
  transition: all 0.15s;
  flex-shrink: 0;
  min-width: 90px;
  justify-content: center;
}
.timer-btn-start { background: rgba(63,207,142,0.1); color: var(--green); border-color: rgba(63,207,142,0.3); }
.timer-btn-start:hover { background: rgba(63,207,142,0.2); }
.timer-btn-running {
  background: rgba(239,93,111,0.15); color: var(--red);
  border-color: rgba(239,93,111,0.4);
  animation: timer-pulse 2s ease-in-out infinite;
}
.timer-btn-running:hover { background: rgba(239,93,111,0.25); }
@keyframes timer-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239,93,111,0.3); }
  50% { box-shadow: 0 0 0 4px rgba(239,93,111,0); }
}
.timer-total {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--txt-2);
  font-weight: 600;
  background: var(--bg-3);
  padding: 3px 8px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.timer-total.has-time { color: var(--brand); background: rgba(91,141,239,0.1); }

/* Floating timer banner */
.timer-floating {
  position: fixed;
  bottom: 24px; right: 24px;
  background: linear-gradient(135deg, var(--bg-3), var(--bg-4));
  border: 1px solid var(--green);
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);
  z-index: 80;
  min-width: 320px;
  animation: timer-pulse-soft 2s ease-in-out infinite;
}
@keyframes timer-pulse-soft {
  0%, 100% { box-shadow: 0 12px 32px rgba(0,0,0,0.4), 0 0 0 0 rgba(63,207,142,0.25); }
  50% { box-shadow: 0 12px 32px rgba(0,0,0,0.4), 0 0 0 6px rgba(63,207,142,0); }
}
.timer-floating-icon {
  width: 36px; height: 36px;
  border-radius: 8px;
  background: rgba(63,207,142,0.2);
  display: flex; align-items: center; justify-content: center;
  color: var(--green);
}
.timer-floating-info { flex: 1; min-width: 0; }
.timer-floating-task {
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
}
.timer-floating-time {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 800;
  color: var(--green);
  letter-spacing: 0.02em;
}
.timer-floating-stop {
  background: rgba(239,93,111,0.15);
  border: 1px solid rgba(239,93,111,0.4);
  color: var(--red);
  padding: 7px 12px;
  border-radius: 7px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.timer-floating-stop:hover { background: rgba(239,93,111,0.25); }


/* Notification dropdown */
.notif-pop {
  position: absolute;
  top: calc(100% + 8px);
  right: 24px;
  width: 360px;
  max-height: 480px;
  background: var(--bg-3);
  border: 1px solid var(--line-2);
  border-radius: 10px;
  z-index: 60;
  box-shadow: 0 12px 32px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
}
.notif-head { padding: 14px 16px; border-bottom: 1px solid var(--line); font-weight: 700; font-size: 13px; }
.notif-list { overflow-y: auto; flex: 1; }
.notif-item {
  padding: 11px 16px;
  border-bottom: 1px solid var(--line);
  display: flex; gap: 10px;
  cursor: pointer;
}
.notif-item:hover { background: var(--bg-4); }
.notif-item.unread { background: rgba(91,141,239,0.05); border-left: 2px solid var(--brand); }
.notif-text { font-size: 12.5px; line-height: 1.4; }
.notif-time { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--txt-3); margin-top: 4px; }
`;

// ============================================================
// CONSTANTS
// ============================================================
const STATUSES = ["aberto", "em_analise", "em_correcao", "em_validacao", "resolvido", "reaberto"];
const STATUS_LBL = {
  aberto: "Aberto", em_analise: "Em Análise", em_correcao: "Em Correção",
  em_validacao: "Em Validação", resolvido: "Resolvido", reaberto: "Reaberto",
};
const STATUS_CLR = {
  aberto: "#5b8def", em_analise: "#f0a847", em_correcao: "#b487f5",
  em_validacao: "#4fd1c5", resolvido: "#3fcf8e", reaberto: "#ef5d6f",
};
const DISCIPLINES = ["ARQ", "EST", "HID", "ELE", "AVAC", "PCI", "INC"];
const DISCIPLINE_FULL = {
  ARQ: "Arquitetura", EST: "Estrutural", HID: "Hidrossanitário",
  ELE: "Elétrico", AVAC: "Climatização", PCI: "Combate a Incêndio", INC: "Incorporadora"
};
// Helpers para usar a lista DINÂMICA do data
const getDisciplineCodes = (data) =>
  (data?.disciplines || []).map(d => d.code);
const getDisciplineName = (data, code) => {
  const found = (data?.disciplines || []).find(d => d.code === code);
  return found?.name || DISCIPLINE_FULL[code] || code;
};
const getDisciplineColor = (data, code) => {
  const found = (data?.disciplines || []).find(d => d.code === code);
  return found?.color || "#5b8def";
};
const PRIORITIES = ["baixa", "media", "alta", "critica"];

// ============ STATUS DE TAREFA ============
const PRIORITY_LBL = { baixa: "Baixa", media: "Média", alta: "Alta", critica: "Crítica" };

// === STATUS DE TAREFA (novo fluxo: 4 estados) ===
const TASK_STATUSES = ["aguardando", "em_andamento", "em_revisao", "concluida"];
const TASK_STATUS_LBL = {
  aguardando: "Aguardando",
  em_andamento: "Em andamento",
  em_revisao: "Em revisão",
  concluida: "Concluída",
  // backward-compat com seed antigo
  pendente: "Aguardando",
};
const TASK_STATUS_CLR = {
  aguardando: "#97a3b6",
  em_andamento: "#5b8def",
  em_revisao: "#f0a847",
  concluida: "#3fcf8e",
  pendente: "#97a3b6",
};
const TASK_STATUS_ICON = {
  aguardando: Circle,
  em_andamento: Activity,
  em_revisao: Eye,
  concluida: CheckCircle2,
};
// normaliza status legado -> novo
const normalizeTaskStatus = (s) => s === "pendente" ? "aguardando" : s;


const ROLES = {
  admin: { label: "Administrador", icon: Crown, color: "#b487f5", desc: "Acesso total ao escritório" },
  gerente: { label: "Gerente de Projetos", icon: Target, color: "#f0a847", desc: "Métricas e supervisão geral" },
  coordenador: { label: "Coordenador BIM", icon: Briefcase, color: "#5b8def", desc: "Gerencia projetos e equipe" },
  projetista: { label: "Projetista", icon: User, color: "#3fcf8e", desc: "Executa tarefas e aponta issues" },
};

// ============================================================
// SEED DATA (multi-tenant: 1 escritório)
// ============================================================
const seedData = () => ({
  tenant: {
    name: "Atelier Cardoso & Associados",
    plan: "Pro",
    initials: "AC",
  },
  // Disciplinas configuráveis (admin/coordenador podem editar)
  // code: sigla curta · name: nome completo · color: cor hex · isDefault: padrão do sistema (informativo)
  disciplines: [
    { code: "ARQ",  name: "Arquitetura",       color: "#5b8def", isDefault: true },
    { code: "EST",  name: "Estrutural",        color: "#f0a847", isDefault: true },
    { code: "HID",  name: "Hidrossanitário",   color: "#4fd1c5", isDefault: true },
    { code: "ELE",  name: "Elétrico",          color: "#b487f5", isDefault: true },
    { code: "AVAC", name: "Climatização",      color: "#3fcf8e", isDefault: true },
    { code: "PCI",  name: "Combate a Incêndio", color: "#ef5d6f", isDefault: true },
    { code: "INC",  name: "Incorporadora",     color: "#7e6dff", isDefault: true },
  ],
  users: [
    { id: "u1", name: "Marina Cardoso", role: "Coordenadora BIM Sênior", discipline: "ARQ", access: "admin", initials: "MC", avatarClass: "av-1" },
    { id: "u2", name: "Rafael Tomé", role: "Projetista Sênior", discipline: "EST", access: "coordenador", initials: "RT", avatarClass: "av-2" },
    { id: "u3", name: "Júlia Hartmann", role: "Projetista", discipline: "HID", access: "projetista", initials: "JH", avatarClass: "av-3" },
    { id: "u4", name: "Eduardo Lins", role: "Projetista", discipline: "ELE", access: "projetista", initials: "EL", avatarClass: "av-4" },
    { id: "u5", name: "Camila Pereira", role: "Coordenador AVAC", discipline: "AVAC", access: "coordenador", initials: "CP", avatarClass: "av-5" },
    { id: "u6", name: "Bruno Schneider", role: "Gerente de Projetos", discipline: "ARQ", access: "gerente", initials: "BS", avatarClass: "av-6" },
  ],
  projects: [
    { id: "p1", name: "Edifício Comercial Atrium", client: "Construtora Nova Era", startDate: "2025-01-15", endDate: "2026-08-30", status: "ativo", progress: 62, team: ["u1", "u2", "u3", "u4", "u5"] },
    { id: "p2", name: "Hospital São Marcos – Ala Sul", client: "Grupo Hospitalar SM", startDate: "2025-03-01", endDate: "2027-02-15", status: "ativo", progress: 38, team: ["u1", "u2", "u4", "u5", "u6"] },
    { id: "p3", name: "Centro Logístico Itajaí", client: "Logitech Brasil", startDate: "2025-06-10", endDate: "2026-04-20", status: "ativo", progress: 78, team: ["u1", "u3", "u4", "u6"] },
    { id: "p4", name: "Residencial Bosque das Acácias", client: "Incorporadora Vila Real", startDate: "2024-09-01", endDate: "2026-12-31", status: "ativo", progress: 45, team: ["u1", "u2", "u3", "u6"] },
  ],
  issues: [
    { id: "i1", code: "AP-0001", projectId: "p1", title: "Conflito entre viga V12 e duto de exaustão no pav. 7", description: "Viga estrutural V12 (eixo C-D / 4-5) interfere com o duto de exaustão de cozinha. Necessário rebaixamento ou redirecionamento.", responsibleDiscipline: "EST", affectedDisciplines: ["EST", "AVAC"], priority: "alta", status: "em_analise", assignedTo: "u2", dueDate: "2026-05-20", location: "Pav. 7 - Eixo C/4", version: "v3.2", createdAt: "2026-04-22" },
    { id: "i2", code: "AP-0002", projectId: "p1", title: "Tubulação hidráulica colide com forro do hall central", description: "Tubulação de água fria passando 12cm abaixo do nível do forro previsto.", responsibleDiscipline: "HID", affectedDisciplines: ["HID", "ARQ"], priority: "media", status: "em_correcao", assignedTo: "u3", dueDate: "2026-05-15", location: "Pav. Térreo - Hall", version: "v3.2", createdAt: "2026-04-18" },
    { id: "i3", code: "AP-0003", projectId: "p1", title: "Divergência de cotas entre arquitetura e estrutura no subsolo", description: "Diferença de 8cm na cota do piso técnico.", responsibleDiscipline: "ARQ", affectedDisciplines: ["ARQ", "EST"], priority: "critica", status: "aberto", assignedTo: "u1", dueDate: "2026-05-10", location: "Subsolo -1", version: "v3.2", createdAt: "2026-04-28" },
    { id: "i4", code: "AP-0004", projectId: "p2", title: "Eletrodutos sem espaço técnico no shaft B", description: "Quantidade de eletrodutos previstos não cabe no shaft especificado.", responsibleDiscipline: "ELE", affectedDisciplines: ["ELE", "ARQ"], priority: "alta", status: "em_validacao", assignedTo: "u4", dueDate: "2026-05-25", location: "Shaft B - todos pavimentos", version: "v2.1", createdAt: "2026-04-20" },
    { id: "i5", code: "AP-0005", projectId: "p2", title: "Sprinklers em desconformidade com layout da UTI", description: "Posicionamento dos sprinklers conflita com luminárias cirúrgicas.", responsibleDiscipline: "PCI", affectedDisciplines: ["PCI", "ELE", "ARQ"], priority: "critica", status: "em_correcao", assignedTo: "u5", dueDate: "2026-05-12", location: "Pav. 3 - UTI", version: "v2.1", createdAt: "2026-04-25" },
    { id: "i6", code: "AP-0006", projectId: "p2", title: "Falta de detalhamento em junta de dilatação", description: "Junta entre blocos A e B sem detalhamento adequado.", responsibleDiscipline: "EST", affectedDisciplines: ["EST", "HID", "ELE"], priority: "media", status: "resolvido", assignedTo: "u2", dueDate: "2026-04-30", location: "Junta A-B", version: "v2.0", createdAt: "2026-04-10" },
    { id: "i7", code: "AP-0007", projectId: "p3", title: "Pé-direito insuficiente após descida de viga", description: "Após detalhamento estrutural, pé-direito fica em 2.55m no setor de embarque.", responsibleDiscipline: "ARQ", affectedDisciplines: ["ARQ", "EST"], priority: "alta", status: "aberto", assignedTo: "u1", dueDate: "2026-05-18", location: "Setor embarque - galpão 2", version: "v1.4", createdAt: "2026-04-26" },
    { id: "i8", code: "AP-0008", projectId: "p3", title: "Bacia de retenção sem caimento adequado", description: "Caimento atual gera empoçamento.", responsibleDiscipline: "HID", affectedDisciplines: ["HID"], priority: "media", status: "em_analise", assignedTo: "u3", dueDate: "2026-05-22", location: "Pátio externo - doca 4", version: "v1.4", createdAt: "2026-04-24" },
    { id: "i9", code: "AP-0009", projectId: "p4", title: "Esquadrias não atendem dimensão modular", description: "Esquadrias do bloco residencial fora do padrão modular.", responsibleDiscipline: "ARQ", affectedDisciplines: ["ARQ"], priority: "baixa", status: "reaberto", assignedTo: "u1", dueDate: "2026-05-30", location: "Bloco A - aptos tipo", version: "v4.1", createdAt: "2026-04-15" },
    { id: "i10", code: "AP-0010", projectId: "p4", title: "Reservatório superior com sobrecarga estrutural", description: "Verificação indica necessidade de reforço.", responsibleDiscipline: "EST", affectedDisciplines: ["EST", "HID"], priority: "alta", status: "em_correcao", assignedTo: "u2", dueDate: "2026-05-28", location: "Cobertura - bloco B", version: "v4.1", createdAt: "2026-04-23" },
  ],
  tasks: [
    { id: "t1", projectId: "p1", issueId: "i1", title: "Recalcular viga V12 com rebaixamento", assignedTo: "u2", status: "em_andamento", startDate: "2026-04-23", endDate: "2026-05-08", discipline: "EST",
      parentTaskId: null,
      checklist: [
        { id: "c1", text: "Levantar cargas atuais", done: true },
        { id: "c2", text: "Modelar V12 com rebaixamento de 25cm", done: true },
        { id: "c3", text: "Verificar ELU e ELS", done: false },
        { id: "c4", text: "Emitir memorial de cálculo", done: false },
      ],
      dependsOn: [],
      attachments: [
        { id: "a1", name: "memorial-V12-r02.pdf", size: "2.4 MB", uploadedAt: "2026-04-25T10:30:00", uploadedBy: "u2" }
      ],
      comments: [
        { id: "tc1", userId: "u1", text: "Bota prioridade nessa, o cliente está perguntando.", createdAt: "2026-04-24T09:00:00" },
        { id: "tc2", userId: "u2", text: "Já estou rodando, deve fechar amanhã.", createdAt: "2026-04-24T09:15:00" },
      ]
    },
    { id: "t2", projectId: "p1", issueId: "i1", title: "Validar nova posição do duto", assignedTo: "u5", status: "aguardando", startDate: "2026-05-09", endDate: "2026-05-15", discipline: "AVAC",
      parentTaskId: null, checklist: [], dependsOn: ["t1"], attachments: [], comments: []
    },
    { id: "t3", projectId: "p1", issueId: "i2", title: "Atualizar modelo Revit hidráulico", assignedTo: "u3", status: "em_andamento", startDate: "2026-04-20", endDate: "2026-05-05", discipline: "HID",
      parentTaskId: null,
      checklist: [
        { id: "c5", text: "Subir modelo para BIM 360", done: true },
        { id: "c6", text: "Reposicionar tubulações em conflito", done: true },
        { id: "c7", text: "Verificar declividades mínimas", done: false },
      ],
      dependsOn: [], attachments: [], comments: []
    },
    { id: "t3a", projectId: "p1", issueId: "i2", title: "Subir modelo IFC compatibilizado", assignedTo: "u3", status: "aguardando", startDate: "2026-05-04", endDate: "2026-05-06", discipline: "HID",
      parentTaskId: "t3", checklist: [], dependsOn: [], attachments: [], comments: []
    },
    { id: "t4", projectId: "p2", issueId: "i4", title: "Redimensionar shaft elétrico", assignedTo: "u4", status: "concluida", startDate: "2026-04-22", endDate: "2026-05-02", discipline: "ELE",
      parentTaskId: null, checklist: [], dependsOn: [], attachments: [], comments: []
    },
    { id: "t5", projectId: "p2", issueId: "i5", title: "Estudar nova distribuição de sprinklers", assignedTo: "u5", status: "em_andamento", startDate: "2026-04-26", endDate: "2026-05-10", discipline: "PCI",
      parentTaskId: null, checklist: [], dependsOn: [], attachments: [], comments: []
    },
    { id: "t6", projectId: "p3", issueId: "i7", title: "Estudo de viabilidade pé-direito", assignedTo: "u1", status: "em_revisao", startDate: "2026-05-02", endDate: "2026-05-16", discipline: "ARQ",
      parentTaskId: null, checklist: [], dependsOn: [], attachments: [], comments: []
    },
    { id: "t7", projectId: "p4", issueId: "i10", title: "Reforço estrutural reservatório", assignedTo: "u2", status: "em_andamento", startDate: "2026-04-25", endDate: "2026-05-20", discipline: "EST",
      parentTaskId: null, checklist: [], dependsOn: [], attachments: [], comments: []
    },
    { id: "t8", projectId: "p1", issueId: "i3", title: "Alinhar cotas ARQ x EST subsolo", assignedTo: "u1", status: "aguardando", startDate: "2026-05-01", endDate: "2026-05-09", discipline: "ARQ",
      parentTaskId: null, checklist: [], dependsOn: [], attachments: [], comments: []
    },
  ],
  hours: [
    { id: "hr1", userId: "u2", projectId: "p1", issueId: "i1", taskId: "t1", date: "2026-04-23", hours: 4.5, description: "Análise estrutural inicial da viga V12" },
    { id: "hr2", userId: "u2", projectId: "p1", issueId: "i1", taskId: "t1", date: "2026-04-24", hours: 6, description: "Cálculo de rebaixamento e verificação ELU" },
    { id: "hr3", userId: "u3", projectId: "p1", issueId: "i2", taskId: "t3", date: "2026-04-20", hours: 3, description: "Reposicionamento de tubulações no Revit" },
    { id: "hr4", userId: "u3", projectId: "p1", issueId: "i2", taskId: "t3", date: "2026-04-22", hours: 5, description: "Atualização do modelo" },
    { id: "hr5", userId: "u5", projectId: "p2", issueId: "i5", taskId: "t5", date: "2026-04-26", hours: 7, description: "Estudo de redistribuição de sprinklers" },
    { id: "hr6", userId: "u4", projectId: "p2", issueId: "i4", taskId: "t4", date: "2026-04-22", hours: 8, description: "Redimensionamento do shaft B" },
    { id: "hr7", userId: "u1", projectId: "p4", issueId: "i9", date: "2026-04-16", hours: 2.5, description: "Levantamento de esquadrias divergentes" },
    { id: "hr8", userId: "u2", projectId: "p4", issueId: "i10", taskId: "t7", date: "2026-04-25", hours: 6, description: "Análise de carga reservatório superior" },
    { id: "hr9", userId: "u3", projectId: "p1", issueId: "i2", taskId: "t3", date: "2026-05-02", hours: 4, description: "Revisão do modelo após comentários" },
    { id: "hr10", userId: "u1", projectId: "p1", issueId: "i3", date: "2026-05-03", hours: 3, description: "Investigação cotas subsolo" },
  ],
  comments: [
    { id: "c1", issueId: "i1", userId: "u2", text: "Verificando viabilidade de rebaixar a viga em 15cm sem comprometer cálculo.", createdAt: "2026-04-23T10:30:00" },
    { id: "c2", issueId: "i1", userId: "u5", text: "Se o rebaixamento não for possível, conseguimos redirecionar o duto pelo eixo D.", createdAt: "2026-04-23T14:15:00" },
    { id: "c3", issueId: "i1", userId: "u1", text: "@Rafael Tomé qual prazo para análise?", createdAt: "2026-04-24T09:00:00", mentions: ["u2"] },
    { id: "c4", issueId: "i2", userId: "u3", text: "Solução: reposicionar tubulação 20cm para o lado oeste.", createdAt: "2026-04-19T11:00:00" },
    { id: "c5", issueId: "i5", userId: "u5", text: "Estudando relocação dos sprinklers para atender NBR 10897.", createdAt: "2026-04-26T08:30:00" },
  ],
  history: [
    { id: "h1", issueId: "i1", userId: "u1", action: "criou", details: "Apontamento criado", createdAt: "2026-04-22T08:00:00" },
    { id: "h2", issueId: "i1", userId: "u1", action: "status", details: "Status: Aberto → Em Análise", createdAt: "2026-04-22T15:30:00" },
    { id: "h3", issueId: "i1", userId: "u1", action: "atribuiu", details: "Atribuído a Rafael Tomé", createdAt: "2026-04-22T15:31:00" },
  ],
  // Chat: mensagens. projectId='office' = chat geral do escritório; senão = chat do projeto.
  // awaitingFrom: lista de userIds que precisam responder (mensagem fica fixada no topo até resolver)
  // resolved: true quando quem enviou marcou como resolvida
  chatMessages: [
    // === CHAT GERAL DO ESCRITÓRIO ===
    { id: "mo1", projectId: "office", userId: "u1", text: "Bom dia time! Lembrando que sexta-feira temos reunião de coordenação geral às 14h. Confirmem presença.", createdAt: "2026-05-04T08:00:00", awaitingFrom: ["u2","u3","u4","u5","u6"], resolved: false },
    { id: "mo2", projectId: "office", userId: "u2", text: "Confirmado, Marina!", createdAt: "2026-05-04T08:15:00", resolved: true },
    { id: "mo3", projectId: "office", userId: "u5", text: "Pessoal, alguém tem o template atualizado de relatório de visita técnica? @Carla Mendes", createdAt: "2026-05-03T16:20:00", mentions: ["u3"], awaitingFrom: ["u3"], resolved: false },
    { id: "mo4", projectId: "office", userId: "u1", text: "Cafézinho novo chegou na copa ☕", createdAt: "2026-05-03T10:00:00", resolved: true },

    // === CHAT DO PROJETO p1 (Edifício Aurora) ===
    { id: "m1", projectId: "p1", userId: "u1", text: "Bom dia equipe! Subimos o modelo federado v3.2 ontem à noite. Já temos o relatório de clash detection — tem alguns conflitos críticos pra resolvermos essa semana.", createdAt: "2026-05-04T08:30:00", resolved: true },
    { id: "m2", projectId: "p1", userId: "u2", text: "Bom dia. Já estou olhando o AP-0001 que é o mais urgente. Posso dar retorno ainda hoje.", createdAt: "2026-05-04T08:42:00", refIssueId: "i1", resolved: true },
    { id: "m3", projectId: "p1", userId: "u3", text: "@Marina Cardoso o AP-0002 vou conseguir resolver até quinta. Modelo Revit já atualizado.", createdAt: "2026-05-04T09:15:00", mentions: ["u1"], refIssueId: "i2", resolved: true },
    { id: "m4", projectId: "p1", userId: "u1", text: "Perfeito @Júlia Hartmann ! Vou marcar reunião sexta pra fechar essa rodada.", createdAt: "2026-05-04T09:20:00", mentions: ["u3"], resolved: true },
    // pendentes (ficam fixadas no topo)
    { id: "m5", projectId: "p1", userId: "u2", text: "@Pedro Sato preciso da revisão estrutural do reservatório até quarta. Consegue?", createdAt: "2026-05-04T11:00:00", mentions: ["u4"], awaitingFrom: ["u4"], resolved: false },
    { id: "m6", projectId: "p1", userId: "u1", text: "@Carla Mendes @Tiago Nunes alguém pode confirmar o detalhamento da fachada antes de eu mandar pro cliente?", createdAt: "2026-05-04T14:30:00", mentions: ["u3","u6"], awaitingFrom: ["u3","u6"], resolved: false, attachment: "fachada-norte-r02.pdf" },

    // === CHAT DO PROJETO p2 (Retrofit Estação) ===
    { id: "m7", projectId: "p2", userId: "u1", text: "Equipe — temos reunião amanhã 10h pra revisar o setor de plataforma.", createdAt: "2026-05-04T07:00:00", resolved: true },
    { id: "m8", projectId: "p2", userId: "u5", text: "Confirmado. Vou levar o estudo de relocação dos sprinklers.", createdAt: "2026-05-04T07:45:00", resolved: true },
    { id: "m9", projectId: "p2", userId: "u2", text: "@Pedro Sato o levantamento da estrutura existente está com pendências, pode revisar?", createdAt: "2026-05-04T13:00:00", mentions: ["u4"], awaitingFrom: ["u4"], resolved: false },

    // === CHAT DO PROJETO p3 (Hospital Vida+) ===
    { id: "m10", projectId: "p3", userId: "u1", text: "Cliente confirmou o prazo de entrega para março. Foco total esse mês.", createdAt: "2026-05-02T14:00:00", resolved: true },
  ],
  notifications: [
    { id: "n1", userId: "u1", type: "mention", text: "Júlia Hartmann mencionou você em #Atrium", time: "2026-05-04T09:15:00", read: false, link: { type: "chat", projectId: "p1", channel: "geral" } },
    { id: "n2", userId: "u1", type: "issue", text: "Apontamento AP-0003 está atrasado (prazo 10/05)", time: "2026-05-04T08:00:00", read: false, link: { type: "issue", id: "i3" } },
    { id: "n3", userId: "u1", type: "task", text: "Tarefa 'Alinhar cotas ARQ x EST' tem prazo amanhã", time: "2026-05-03T18:00:00", read: true, link: { type: "task", id: "t8" } },
  ],
  documents: [
    { id: "d1", projectId: "p1", name: "Modelo Federado v3.2.rvt", size: "287 MB", uploadedBy: "u1", uploadedAt: "2026-04-20" },
    { id: "d2", projectId: "p1", name: "Relatório Compatibilização ABR-2026.pdf", size: "8.4 MB", uploadedBy: "u1", uploadedAt: "2026-04-28" },
    { id: "d3", projectId: "p1", name: "Pranchas Estruturais R03.dwg", size: "42 MB", uploadedBy: "u2", uploadedAt: "2026-04-15" },
    { id: "d4", projectId: "p2", name: "Memorial Descritivo HSM.pdf", size: "3.2 MB", uploadedBy: "u1", uploadedAt: "2026-04-10" },
    { id: "d5", projectId: "p2", name: "Modelo MEP v2.1.rvt", size: "198 MB", uploadedBy: "u4", uploadedAt: "2026-04-22" },
  ],
});

// ============================================================
// UTILS
// ============================================================
const fmtDate = (s) => {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
};
const fmtDateTime = (s) => {
  if (!s) return "—";
  return new Date(s).toLocaleString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
};
const timeAgo = (s) => {
  const diff = Date.now() - new Date(s).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "agora";
  if (min < 60) return `${min}min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d`;
  return fmtDate(s);
};
// Formata segundos como HH:MM:SS ou Xh YYmin
const formatDuration = (totalSeconds) => {
  if (!totalSeconds || totalSeconds < 1) return "0:00";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
};
const formatDurationShort = (totalSeconds) => {
  if (!totalSeconds || totalSeconds < 1) return "0min";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  if (h > 0 && m > 0) return `${h}h ${m}min`;
  if (h > 0) return `${h}h`;
  return `${m}min`;
};
const priorityBadge = (p) => {
  const cls = { baixa: "bg-low", media: "bg-med", alta: "bg-high", critica: "bg-crit" }[p];
  return <span className={`badge ${cls}`}>{PRIORITY_LBL[p]}</span>;
};
const statusPill = (s) => (
  <span className="pill">
    <span className="dot" style={{ background: STATUS_CLR[s] }} />
    {STATUS_LBL[s]}
  </span>
);
const Avatar = ({ user, size = "" }) => {
  if (!user) return null;
  return <div className={`avatar ${user.avatarClass} ${size}`}>{user.initials}</div>;
};

// Renderiza texto com @menções e refs de apontamento
const renderRichText = (text, users, issues, onIssueClick) => {
  if (!text) return null;
  const parts = [];
  // 1) Substitui @Nome por mention spans, e AP-XXXX por links
  let rest = text;
  let i = 0;
  while (rest.length > 0) {
    const mentionMatch = rest.match(/@[\wÀ-ÿ]+(\s[\wÀ-ÿ]+)?/);
    const issueMatch = rest.match(/AP-\d{4}/);
    let next = null;
    if (mentionMatch && (!issueMatch || mentionMatch.index < issueMatch.index)) {
      next = { idx: mentionMatch.index, len: mentionMatch[0].length, type: "mention", text: mentionMatch[0] };
    } else if (issueMatch) {
      next = { idx: issueMatch.index, len: issueMatch[0].length, type: "issue", text: issueMatch[0] };
    }
    if (!next) { parts.push(<span key={i++}>{rest}</span>); break; }
    if (next.idx > 0) parts.push(<span key={i++}>{rest.slice(0, next.idx)}</span>);
    if (next.type === "mention") {
      parts.push(<span key={i++} className="mention">{next.text}</span>);
    } else {
      const issue = issues.find(x => x.code === next.text);
      parts.push(
        <span key={i++} className="iss-link" onClick={(e) => { e.stopPropagation(); if (issue) onIssueClick?.(issue); }}>
          {next.text}
        </span>
      );
    }
    rest = rest.slice(next.idx + next.len);
  }
  return <>{parts}</>;
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [data, setData] = useState(() => seedData());
  // current user id (varia conforme role escolhido na demo)
  const [currentUserId, setCurrentUserId] = useState("u1"); // Marina = admin
  const [view, setView] = useState({ kind: "home" }); // {kind: 'home'|'projects'|'project'|'team'|'settings', projectId?, projectTab?}
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showNewIssue, setShowNewIssue] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [showNewHours, setShowNewHours] = useState(false);
  const [showNewUser, setShowNewUser] = useState(false);
  const [showRoleSwitch, setShowRoleSwitch] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [toast, setToast] = useState(null);

  // ===== TIMER de tarefas =====
  // activeTimer: { taskId, userId, startedAt (ISO) } | null
  // accumulatedTime: { [taskId]: totalSeconds } - tempo acumulado de cada tarefa (todas pessoas, todas sessões)
  const [activeTimer, setActiveTimer] = useState(null);
  const [accumulatedTime, setAccumulatedTime] = useState({});
  const [tickNow, setTickNow] = useState(Date.now()); // força re-render a cada segundo
  const [pendingTimerSwitch, setPendingTimerSwitch] = useState(null); // { newTaskId } - confirmação de troca

  // tick a cada segundo enquanto há timer ativo
  useEffect(() => {
    if (!activeTimer) return;
    const id = setInterval(() => setTickNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [activeTimer]);

  // tempo da sessão atual em segundos
  const currentSessionSeconds = activeTimer
    ? Math.floor((tickNow - new Date(activeTimer.startedAt).getTime()) / 1000)
    : 0;

  function getTaskTotalSeconds(taskId) {
    const base = accumulatedTime[taskId] || 0;
    if (activeTimer && activeTimer.taskId === taskId) {
      return base + currentSessionSeconds;
    }
    return base;
  }

  function startTimer(taskId) {
    if (activeTimer && activeTimer.taskId === taskId) return; // já ativo
    if (activeTimer) {
      // pedir confirmação antes de trocar
      setPendingTimerSwitch({ newTaskId: taskId });
      return;
    }
    setActiveTimer({ taskId, userId: currentUserId, startedAt: new Date().toISOString() });
  }

  function stopTimer(autoLogHours = true) {
    if (!activeTimer) return;
    const elapsedSec = Math.floor((Date.now() - new Date(activeTimer.startedAt).getTime()) / 1000);
    if (elapsedSec < 1) {
      setActiveTimer(null);
      return;
    }
    // acumular
    setAccumulatedTime(prev => ({
      ...prev,
      [activeTimer.taskId]: (prev[activeTimer.taskId] || 0) + elapsedSec
    }));
    // converter em horas lançadas
    if (autoLogHours) {
      const task = data.tasks.find(t => t.id === activeTimer.taskId);
      if (task) {
        const hoursDecimal = +(elapsedSec / 3600).toFixed(2);
        if (hoursDecimal >= 0.01) {
          updateData(d => {
            d.hours.push({
              id: `h${Date.now()}`,
              userId: activeTimer.userId,
              projectId: task.projectId,
              taskId: task.id,
              date: new Date().toISOString().slice(0, 10),
              hours: hoursDecimal,
              description: `Timer: ${task.title}`,
              fromTimer: true,
            });
            return d;
          });
          showToast(`Timer parado: ${formatDuration(elapsedSec)} lançadas em horas`);
        }
      }
    }
    setActiveTimer(null);
  }

  function confirmTimerSwitch() {
    if (!pendingTimerSwitch) return;
    const newTaskId = pendingTimerSwitch.newTaskId;
    stopTimer(true); // pausa atual e lança horas
    setTimeout(() => {
      setActiveTimer({ taskId: newTaskId, userId: currentUserId, startedAt: new Date().toISOString() });
    }, 50);
    setPendingTimerSwitch(null);
  }

  function cancelTimerSwitch() {
    setPendingTimerSwitch(null);
  }

  // ao trocar de usuário, pausar timer (cada pessoa tem o seu)
  useEffect(() => {
    if (activeTimer && activeTimer.userId !== currentUserId) {
      // não pausar - manter rodando para o user que iniciou (visualmente o novo user não vê o timer ativo)
      // mas pra simplicidade da demo, pausamos
      stopTimer(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);

  const currentUser = data.users.find(u => u.id === currentUserId);
  const role = currentUser?.access || "projetista";

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };

  const updateData = (mutator) => {
    setData(prev => mutator(structuredClone(prev)));
  };

  // ===== Mutations =====
  const createIssue = (issueData) => {
    const code = `AP-${String(data.issues.length + 1).padStart(4, "0")}`;
    const newIssue = { id: `i${Date.now()}`, code, ...issueData, createdAt: new Date().toISOString() };
    updateData(d => {
      d.issues.unshift(newIssue);
      d.history.push({ id: `h${Date.now()}`, issueId: newIssue.id, userId: currentUserId, action: "criou", details: "Apontamento criado", createdAt: new Date().toISOString() });
      return d;
    });
    showToast(`Apontamento ${code} criado`);
  };

  const updateIssueStatus = (issueId, newStatus) => {
    const issue = data.issues.find(i => i.id === issueId);
    if (!issue || issue.status === newStatus) return;
    updateData(d => {
      d.issues = d.issues.map(i => i.id === issueId ? { ...i, status: newStatus } : i);
      d.history.push({ id: `h${Date.now()}`, issueId, userId: currentUserId, action: "status", details: `Status: ${STATUS_LBL[issue.status]} → ${STATUS_LBL[newStatus]}`, createdAt: new Date().toISOString() });
      return d;
    });
  };

  const updateIssueAssignee = (issueId, userId) => {
    const issue = data.issues.find(i => i.id === issueId);
    if (!issue || issue.assignedTo === userId) return;
    const user = data.users.find(u => u.id === userId);
    updateData(d => {
      d.issues = d.issues.map(i => i.id === issueId ? { ...i, assignedTo: userId } : i);
      d.history.push({ id: `h${Date.now()}`, issueId, userId: currentUserId, action: "atribuiu", details: `Atribuído a ${user.name}`, createdAt: new Date().toISOString() });
      return d;
    });
  };

  const addComment = (issueId, text) => {
    updateData(d => {
      d.comments.push({ id: `c${Date.now()}`, issueId, userId: currentUserId, text, createdAt: new Date().toISOString() });
      return d;
    });
  };

  const sendChatMessage = (projectId, text, attachment, refIssueId, awaitingFrom) => {
    if (!text.trim() && !attachment) return;
    // detect mentions
    const mentions = [];
    data.users.forEach(u => {
      if (text.includes(`@${u.name}`)) mentions.push(u.id);
    });
    updateData(d => {
      d.chatMessages.push({
        id: `m${Date.now()}`,
        projectId,
        userId: currentUserId,
        text,
        createdAt: new Date().toISOString(),
        ...(mentions.length && { mentions }),
        ...(attachment && { attachment }),
        ...(refIssueId && { refIssueId }),
        ...(awaitingFrom && awaitingFrom.length > 0 ? { awaitingFrom, resolved: false } : { resolved: true }),
      });
      return d;
    });
  };

  const resolveChatMessage = (messageId) => {
    updateData(d => {
      const m = d.chatMessages.find(x => x.id === messageId);
      if (m && m.userId === currentUserId) {
        m.resolved = true;
      }
      return d;
    });
    showToast?.("Mensagem marcada como resolvida");
  };

  // ===== NAV computed =====
  const myTasks = useMemo(
    () => data.tasks.filter(t => t.assignedTo === currentUserId && t.status !== "concluida"),
    [data.tasks, currentUserId]
  );
  const myIssues = useMemo(
    () => data.issues.filter(i => i.assignedTo === currentUserId && i.status !== "resolvido"),
    [data.issues, currentUserId]
  );
  const myMentions = useMemo(
    () => data.chatMessages.filter(m => m.mentions?.includes(currentUserId)).slice(-5).reverse(),
    [data.chatMessages, currentUserId]
  );

  // === NOTIFICAÇÕES DE PRAZO PRÓXIMO/ATRASADO (dinâmicas) ===
  const deadlineNotifications = useMemo(() => {
    const list = [];
    data.tasks.forEach(t => {
      if (t.assignedTo !== currentUserId) return;
      const status = normalizeTaskStatus(t.status);
      if (status === "concluida") return;
      const days = Math.floor((new Date(t.endDate) - Date.now()) / 86400000);
      if (days < 0) {
        list.push({
          id: `dn-late-${t.id}`,
          userId: currentUserId,
          type: "deadline-late",
          text: `Tarefa "${t.title}" está atrasada há ${-days} dia${-days > 1 ? "s" : ""}`,
          time: new Date().toISOString(),
          read: false,
          link: { type: "task", id: t.id, projectId: t.projectId },
        });
      } else if (days <= 2) {
        list.push({
          id: `dn-soon-${t.id}`,
          userId: currentUserId,
          type: "deadline-soon",
          text: days === 0 ? `Tarefa "${t.title}" vence hoje` : `Tarefa "${t.title}" vence em ${days} dia${days > 1 ? "s" : ""}`,
          time: new Date().toISOString(),
          read: false,
          link: { type: "task", id: t.id, projectId: t.projectId },
        });
      }
    });
    return list;
  }, [data.tasks, currentUserId]);

  const myNotifications = useMemo(() => {
    const stat = data.notifications.filter(n => n.userId === currentUserId);
    return [...deadlineNotifications, ...stat];
  }, [data.notifications, currentUserId, deadlineNotifications]);

  const unreadNotifs = myNotifications.filter(n => !n.read).length;

  // ===== Permission filter for projects =====
  const visibleProjects = useMemo(() => {
    if (role === "admin" || role === "gerente") return data.projects;
    return data.projects.filter(p => p.team?.includes(currentUserId));
  }, [data.projects, role, currentUserId]);

  // ===== NAV ITEMS =====
  const officePendingCount = data.chatMessages.filter(m => m.projectId === "office" && !m.resolved && m.awaitingFrom?.includes(currentUserId)).length;
  const navItems = [
    { id: "home", label: "Início", icon: LayoutDashboard, view: { kind: "home" } },
    { id: "projects", label: "Projetos", icon: FolderKanban, badge: visibleProjects.length, view: { kind: "projects" } },
    { id: "office-chat", label: "Chat Geral", icon: MessageSquare, badge: officePendingCount > 0 ? officePendingCount : undefined, view: { kind: "office-chat" } },
    ...((role === "admin" || role === "gerente") ? [{ id: "team", label: "Equipe", icon: Users, badge: data.users.length, view: { kind: "team" } }] : []),
    ...((role === "admin" || role === "coordenador") ? [{ id: "settings", label: "Configurações", icon: Settings, view: { kind: "settings" } }] : []),
  ];

  // breadcrumb
  const currentProject = view.projectId ? data.projects.find(p => p.id === view.projectId) : null;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <aside className="sidebar">
          <div className="tenant-card">
            <div className="tenant-logo">{data.tenant.initials}</div>
            <div className="tenant-info">
              <div className="tenant-name">{data.tenant.name}</div>
              <div className="tenant-plan">Plano {data.tenant.plan}</div>
            </div>
          </div>
          <nav className="nav-area">
            <div className="nav-group-label">Espaço de trabalho</div>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = view.kind === item.view.kind && !view.projectId;
              return (
                <div key={item.id} className={`nav-item ${isActive ? "active" : ""}`} onClick={() => setView(item.view)}>
                  <Icon size={16} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && <span className="badge">{item.badge}</span>}
                </div>
              );
            })}

            {visibleProjects.length > 0 && (
              <>
                <div className="nav-group-label">Projetos recentes</div>
                {visibleProjects.slice(0, 5).map(p => (
                  <div
                    key={p.id}
                    className={`nav-item ${view.projectId === p.id ? "active" : ""}`}
                    onClick={() => setView({ kind: "project", projectId: p.id, projectTab: "overview" })}
                  >
                    <Building2 size={15} />
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                      {p.name.split(" ").slice(0, 3).join(" ")}
                    </span>
                  </div>
                ))}
              </>
            )}
          </nav>
          <div className="user-card">
            <Avatar user={currentUser} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentUser.name}</div>
              <div style={{ fontSize: 10, color: ROLES[role].color, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 1 }}>
                {ROLES[role].label}
              </div>
            </div>
          </div>
        </aside>

        <div className="main">
          <div className="topbar">
            <div className="crumb">
              <a onClick={() => setView({ kind: "home" })}>Início</a>
              {view.kind !== "home" && <ChevronRight size={13} />}
              {view.kind === "projects" && <span className="current">Projetos</span>}
              {view.kind === "project" && currentProject && (
                <>
                  <a onClick={() => setView({ kind: "projects" })}>Projetos</a>
                  <ChevronRight size={13} />
                  <span className="current">{currentProject.name}</span>
                </>
              )}
              {view.kind === "team" && <span className="current">Equipe</span>}
              {view.kind === "settings" && <span className="current">Configurações</span>}
            </div>
            <div style={{ flex: 1 }} />

            <div style={{ position: "relative" }}>
              <div className="notif-btn" onClick={() => setShowNotif(s => !s)}>
                <Bell size={16} />
                {unreadNotifs > 0 && <div className="notif-dot" />}
              </div>
              {showNotif && (
                <NotifPopover
                  notifications={myNotifications}
                  data={data}
                  onClick={(n) => {
                    setShowNotif(false);
                    if (n.link.type === "issue") setSelectedIssue(data.issues.find(i => i.id === n.link.id));
                    if (n.link.type === "chat") setView({ kind: "project", projectId: n.link.projectId, projectTab: "chat" });
                    if (n.link.type === "task") setView({ kind: "project", projectId: n.link.projectId, projectTab: "tasks" });
                    // só marca como lida se for notificação salva (deadline-* são dinâmicas, ignoradas)
                    if (!n.id.startsWith("dn-")) {
                      updateData(d => { d.notifications = d.notifications.map(x => x.id === n.id ? { ...x, read: true } : x); return d; });
                    }
                  }}
                  onClose={() => setShowNotif(false)}
                />
              )}
            </div>

            <div className="role-switcher" onClick={() => setShowRoleSwitch(s => !s)}>
              <div className="role-icon" style={{ background: ROLES[role].color + "30" }}>
                {React.createElement(ROLES[role].icon, { size: 13, color: ROLES[role].color })}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 12.5 }}>{currentUser.name.split(" ")[0]}</div>
                <div style={{ fontSize: 10, color: "var(--txt-3)", fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>{ROLES[role].label}</div>
              </div>
              <ChevronDown size={13} style={{ color: "var(--txt-3)" }} />
              {showRoleSwitch && (
                <div className="role-pop" onClick={e => e.stopPropagation()}>
                  <div style={{ padding: "8px 10px", fontSize: 11, color: "var(--txt-3)", fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Trocar visão (demo)
                  </div>
                  {Object.entries(ROLES).map(([roleKey, roleInfo]) => {
                    const candidates = data.users.filter(u => u.access === roleKey);
                    if (candidates.length === 0) return null;
                    const u = candidates[0];
                    const Icon = roleInfo.icon;
                    return (
                      <div
                        key={roleKey}
                        className={`role-pop-item ${currentUserId === u.id ? "active" : ""}`}
                        onClick={() => { setCurrentUserId(u.id); setShowRoleSwitch(false); setView({ kind: "home" }); }}
                      >
                        <div className="role-icon" style={{ background: roleInfo.color + "30" }}>
                          <Icon size={13} color={roleInfo.color} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div className="role-pop-title">{roleInfo.label}</div>
                          <div className="role-pop-desc">{u.name} · {roleInfo.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="content">
            {view.kind === "home" && (
              <HomeView
                data={data}
                currentUser={currentUser}
                role={role}
                myTasks={myTasks}
                myIssues={myIssues}
                myMentions={myMentions}
                visibleProjects={visibleProjects}
                onOpenIssue={setSelectedIssue}
                onOpenProject={(pid, tab = "overview") => setView({ kind: "project", projectId: pid, projectTab: tab })}
                onToggleTask={(taskId) => updateData(d => {
                  d.tasks = d.tasks.map(t => {
                    if (t.id !== taskId) return t;
                    const flow = { aguardando: "em_andamento", em_andamento: "em_revisao", em_revisao: "concluida", concluida: "aguardando" };
                    return { ...t, status: flow[t.status] };
                  });
                  return d;
                })}
              />
            )}
            {view.kind === "projects" && (
              <ProjectsListView
                data={data}
                visibleProjects={visibleProjects}
                role={role}
                onOpen={(pid) => setView({ kind: "project", projectId: pid, projectTab: "overview" })}
                onNew={() => setShowNewProject(true)}
              />
            )}
            {view.kind === "project" && currentProject && (
              <ProjectView
                data={data}
                project={currentProject}
                tab={view.projectTab}
                role={role}
                currentUserId={currentUserId}
                onTabChange={(tab) => setView({ kind: "project", projectId: currentProject.id, projectTab: tab })}
                onOpenIssue={setSelectedIssue}
                onNewIssue={() => setShowNewIssue(true)}
                onNewTask={() => setShowNewTask(true)}
                onNewHours={() => setShowNewHours(true)}
                onSendChat={sendChatMessage}
                onResolveMessage={resolveChatMessage}
                onUpdate={updateData}
                showToast={showToast}
                activeTimer={activeTimer}
                getTaskTotalSeconds={getTaskTotalSeconds}
                startTimer={startTimer}
                stopTimer={stopTimer}
              />
            )}
            {view.kind === "office-chat" && (
              <OfficeChatView
                data={data}
                currentUserId={currentUserId}
                onSendChat={sendChatMessage}
                onResolveMessage={resolveChatMessage}
                onOpenIssue={setSelectedIssue}
              />
            )}
            {view.kind === "team" && <TeamView data={data} onNew={() => setShowNewUser(true)} onUpdate={updateData} />}
            {view.kind === "settings" && <SettingsView data={data} role={role} onUpdate={updateData} showToast={showToast} onReset={() => { if (confirm("Restaurar dados de exemplo?")) { setData(seedData()); showToast("Dados restaurados"); } }} />}
          </div>
        </div>

        {selectedIssue && (
          <IssueDetailModal
            issue={selectedIssue}
            data={data}
            onClose={() => setSelectedIssue(null)}
            onStatusChange={updateIssueStatus}
            onAssigneeChange={updateIssueAssignee}
            onAddComment={addComment}
            onDelete={(id) => { if (confirm("Excluir apontamento?")) { updateData(d => { d.issues = d.issues.filter(i => i.id !== id); d.comments = d.comments.filter(c => c.issueId !== id); d.history = d.history.filter(h => h.issueId !== id); return d; }); setSelectedIssue(null); showToast("Apontamento excluído"); } }}
          />
        )}
        {showNewIssue && <NewIssueModal data={data} defaultProjectId={view.projectId} onClose={() => setShowNewIssue(false)} onCreate={(d) => { createIssue(d); setShowNewIssue(false); }} />}
        {showNewProject && <NewProjectModal onClose={() => setShowNewProject(false)} onCreate={(p) => { updateData(d => { d.projects.push({ id: `p${Date.now()}`, ...p, progress: 0, team: [currentUserId] }); return d; }); setShowNewProject(false); showToast("Projeto criado"); }} />}
        {showNewTask && <NewTaskModal data={data} defaultProjectId={view.projectId} onClose={() => setShowNewTask(false)} onCreate={(t) => { updateData(d => { d.tasks.push({ id: `t${Date.now()}`, ...t }); return d; }); setShowNewTask(false); showToast("Tarefa criada"); }} />}
        {showNewHours && <NewHoursModal data={data} defaultProjectId={view.projectId} currentUserId={currentUserId} onClose={() => setShowNewHours(false)} onCreate={(h) => { updateData(d => { d.hours.push({ id: `hr${Date.now()}`, ...h }); return d; }); setShowNewHours(false); showToast("Horas registradas"); }} />}
        {showNewUser && <NewUserModal onClose={() => setShowNewUser(false)} onCreate={(u) => { const initials = u.name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase(); updateData(d => { d.users.push({ id: `u${Date.now()}`, initials, avatarClass: `av-${(d.users.length % 6) + 1}`, ...u }); return d; }); setShowNewUser(false); showToast("Usuário cadastrado"); }} />}

        {/* TIMER FLUTUANTE — visível em qualquer tela quando rodando */}
        {activeTimer && activeTimer.userId === currentUserId && (() => {
          const task = data.tasks.find(t => t.id === activeTimer.taskId);
          const project = task && data.projects.find(p => p.id === task.projectId);
          if (!task) return null;
          return (
            <div className="timer-floating">
              <div className="timer-floating-icon">
                <Timer size={18} />
              </div>
              <div className="timer-floating-info">
                <div className="timer-floating-task">{task.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="timer-floating-time">{formatDuration(currentSessionSeconds)}</div>
                  {project && <div style={{ fontSize: 11, color: "var(--txt-3)" }}>· {project.name}</div>}
                </div>
              </div>
              <button className="timer-floating-stop" onClick={() => stopTimer(true)}>
                <Pause size={13} fill="currentColor" /> Pausar
              </button>
            </div>
          );
        })()}

        {/* CONFIRMAÇÃO DE TROCA DE TIMER */}
        {pendingTimerSwitch && (() => {
          const currentTask = activeTimer && data.tasks.find(t => t.id === activeTimer.taskId);
          const newTask = data.tasks.find(t => t.id === pendingTimerSwitch.newTaskId);
          return (
            <div className="modal-bg" onClick={cancelTimerSwitch}>
              <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 480 }}>
                <div className="modal-head">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(240,168,71,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <AlertCircle size={18} color="var(--amber)" />
                    </div>
                    <h3 style={{ margin: 0 }}>Trocar de tarefa?</h3>
                  </div>
                  <button className="btn btn-ghost btn-sm" onClick={cancelTimerSwitch}><X size={14} /></button>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <p style={{ margin: "0 0 14px", fontSize: 13.5, lineHeight: 1.5, color: "var(--txt-2)" }}>
                    Você está com timer rodando em <strong style={{ color: "var(--txt)" }}>"{currentTask?.title}"</strong>. Pausar e iniciar timer em <strong style={{ color: "var(--txt)" }}>"{newTask?.title}"</strong>?
                  </p>
                  <div style={{ background: "var(--bg-3)", border: "1px solid var(--line)", borderRadius: 8, padding: 12, fontSize: 12.5, color: "var(--txt-2)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span>Tempo da sessão atual:</span>
                      <span className="mono" style={{ color: "var(--txt)", fontWeight: 700 }}>{formatDuration(currentSessionSeconds)}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: "var(--txt-3)", marginTop: 6 }}>
                      Esse tempo será convertido em horas trabalhadas automaticamente.
                    </div>
                  </div>
                </div>
                <div style={{ padding: "12px 20px", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "flex-end", gap: 8 }}>
                  <button className="btn btn-ghost" onClick={cancelTimerSwitch}>Cancelar</button>
                  <button className="btn btn-primary" onClick={confirmTimerSwitch}>
                    <Pause size={13} fill="currentColor" /> Pausar e trocar
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {toast && <div className="toast"><CheckCircle2 size={15} style={{ color: "var(--green)" }} /> {toast}</div>}
      </div>
    </>
  );
}

// ============================================================
// HOME VIEW (varia por perfil)
// ============================================================
function HomeView({ data, currentUser, role, myTasks, myIssues, myMentions, visibleProjects, onOpenIssue, onOpenProject, onToggleTask }) {
  // Métricas que cada perfil vê
  const myHoursWeek = useMemo(() => {
    const oneWeek = 7 * 24 * 3600 * 1000;
    return data.hours
      .filter(h => h.userId === currentUser.id && (Date.now() - new Date(h.date).getTime()) <= oneWeek)
      .reduce((s, h) => s + h.hours, 0);
  }, [data.hours, currentUser.id]);

  // Para gerente/admin, KPIs gerais
  const totalIssuesOpen = data.issues.filter(i => i.status !== "resolvido").length;
  const totalCritical = data.issues.filter(i => i.status !== "resolvido" && i.priority === "critica").length;
  const totalHoursMonth = data.hours.reduce((s, h) => s + h.hours, 0);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Bom dia";
    if (h < 18) return "Boa tarde";
    return "Boa noite";
  })();

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">{greeting}, <span className="welcome-name">{currentUser.name.split(" ")[0]}</span></h1>
          <div className="page-meta">
            {role === "projetista" && "Suas demandas e comunicações de hoje"}
            {role === "coordenador" && "Acompanhe seus projetos e equipe"}
            {role === "gerente" && "Visão executiva do escritório"}
            {role === "admin" && "Painel completo do escritório"}
          </div>
        </div>
      </div>

      {/* KPIs específicos por perfil */}
      {(role === "projetista" || role === "coordenador") && (
        <div className="kpi-grid">
          <div className="kpi">
            <div className="kpi-head">
              <div className="kpi-icon" style={{ background: "rgba(91,141,239,0.15)" }}><CheckSquare size={16} color="var(--brand)" /></div>
              <div className="kpi-label">Minhas tarefas</div>
            </div>
            <div className="kpi-value">{myTasks.length}</div>
            <div className="kpi-sub">{myTasks.filter(t => t.status === "em_andamento").length} em andamento</div>
          </div>
          <div className="kpi">
            <div className="kpi-head">
              <div className="kpi-icon" style={{ background: "rgba(239,93,111,0.15)" }}><AlertOctagon size={16} color="var(--red)" /></div>
              <div className="kpi-label">Apontamentos atribuídos</div>
            </div>
            <div className="kpi-value">{myIssues.length}</div>
            <div className="kpi-sub">{myIssues.filter(i => i.priority === "critica" || i.priority === "alta").length} prioritários</div>
          </div>
          <div className="kpi">
            <div className="kpi-head">
              <div className="kpi-icon" style={{ background: "rgba(63,207,142,0.15)" }}><Clock size={16} color="var(--green)" /></div>
              <div className="kpi-label">Horas esta semana</div>
            </div>
            <div className="kpi-value">{myHoursWeek.toFixed(1)}<span style={{ fontSize: 14, color: "var(--txt-3)", marginLeft: 4 }}>h</span></div>
            <div className="kpi-sub">Em {new Set(data.hours.filter(h => h.userId === currentUser.id).map(h => h.projectId)).size} projetos</div>
          </div>
          <div className="kpi">
            <div className="kpi-head">
              <div className="kpi-icon" style={{ background: "rgba(240,168,71,0.15)" }}><AlertCircle size={16} color="var(--amber)" /></div>
              <div className="kpi-label">Aguardando minha resposta</div>
            </div>
            <div className="kpi-value">{data.chatMessages.filter(m => !m.resolved && m.awaitingFrom?.includes(currentUser.id)).length}</div>
            <div className="kpi-sub">Mensagens pendentes no chat</div>
          </div>
        </div>
      )}

      {(role === "gerente" || role === "admin") && (
        <div className="kpi-grid">
          <div className="kpi">
            <div className="kpi-head">
              <div className="kpi-icon" style={{ background: "rgba(91,141,239,0.15)" }}><FolderKanban size={16} color="var(--brand)" /></div>
              <div className="kpi-label">Projetos ativos</div>
            </div>
            <div className="kpi-value">{visibleProjects.length}</div>
            <div className="kpi-sub">{data.users.length} pessoas alocadas</div>
          </div>
          <div className="kpi">
            <div className="kpi-head">
              <div className="kpi-icon" style={{ background: "rgba(239,93,111,0.15)" }}><AlertOctagon size={16} color="var(--red)" /></div>
              <div className="kpi-label">Apontamentos abertos</div>
            </div>
            <div className="kpi-value">{totalIssuesOpen}</div>
            <div className="kpi-sub">{totalCritical} críticos pendentes</div>
          </div>
          <div className="kpi">
            <div className="kpi-head">
              <div className="kpi-icon" style={{ background: "rgba(63,207,142,0.15)" }}><Clock size={16} color="var(--green)" /></div>
              <div className="kpi-label">Horas registradas</div>
            </div>
            <div className="kpi-value">{totalHoursMonth.toFixed(0)}<span style={{ fontSize: 14, color: "var(--txt-3)", marginLeft: 4 }}>h</span></div>
            <div className="kpi-sub">No mês corrente</div>
          </div>
          <div className="kpi">
            <div className="kpi-head">
              <div className="kpi-icon" style={{ background: "rgba(240,168,71,0.15)" }}><TrendingUp size={16} color="var(--amber)" /></div>
              <div className="kpi-label">Taxa de resolução</div>
            </div>
            <div className="kpi-value">{Math.round((data.issues.filter(i => i.status === "resolvido").length / data.issues.length) * 100)}<span style={{ fontSize: 14, color: "var(--txt-3)", marginLeft: 4 }}>%</span></div>
            <div className="kpi-sub">Apontamentos resolvidos</div>
          </div>
        </div>
      )}

      <div className="chart-grid">
        <div className="card">
          <div className="card-head">
            <span className="card-title">{role === "projetista" || role === "coordenador" ? "Minhas tarefas pendentes" : "Tarefas em andamento"}</span>
            <span className="page-meta" style={{ marginTop: 0 }}>Clique para alternar status</span>
          </div>
          <div>
            {(role === "projetista" || role === "coordenador" ? myTasks : data.tasks.filter(t => t.status !== "concluida")).slice(0, 6).map(t => {
              const proj = data.projects.find(p => p.id === t.projectId);
              const u = data.users.find(x => x.id === t.assignedTo);
              return (
                <div key={t.id} className="task-row">
                  <div className={`task-check ${t.status === "concluida" ? "done" : ""}`} onClick={() => onToggleTask(t.id)}>
                    {t.status === "concluida" && <CheckCircle2 size={12} color="white" />}
                  </div>
                  <div className="task-info">
                    <div className="task-title">{t.title}</div>
                    <div className="task-meta">
                      <span className={`disc d-${t.discipline}`}>{t.discipline}</span>
                      <span>·</span>
                      <span style={{ color: "var(--brand)", cursor: "pointer" }} onClick={() => onOpenProject(t.projectId)}>{proj?.name.split(" ").slice(0, 3).join(" ")}</span>
                      <span>·</span>
                      <span className="mono">{fmtDate(t.endDate)}</span>
                    </div>
                  </div>
                  {(role === "gerente" || role === "admin") && u && <Avatar user={u} size="av-sm" />}
                </div>
              );
            })}
            {((role === "projetista" || role === "coordenador") && myTasks.length === 0) && (
              <div className="empty"><div className="empty-icon"><CheckCircle2 size={24} /></div>Tudo em dia! Nenhuma tarefa pendente.</div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <span className="card-title">Atividade no chat</span>
          </div>
          <div style={{ padding: "4px 0" }}>
            {myMentions.length === 0 && data.chatMessages.slice(-5).reverse().slice(0, 5).map(m => {
              const u = data.users.find(x => x.id === m.userId);
              const proj = data.projects.find(p => p.id === m.projectId);
              return (
                <div key={m.id} style={{ padding: "10px 16px", borderBottom: "1px solid var(--line)", display: "flex", gap: 10, cursor: "pointer" }} onClick={() => onOpenProject(m.projectId, "chat")}>
                  <Avatar user={u} size="av-sm" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: "var(--txt-3)" }}>
                      <strong style={{ color: "var(--txt-2)" }}>{u?.name.split(" ")[0]}</strong> em <span style={{ color: "var(--brand)" }}>{proj?.name.split(" ").slice(0, 3).join(" ")}</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--txt)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.text}</div>
                  </div>
                </div>
              );
            })}
            {myMentions.length > 0 && myMentions.map(m => {
              const u = data.users.find(x => x.id === m.userId);
              const proj = data.projects.find(p => p.id === m.projectId);
              return (
                <div key={m.id} style={{ padding: "10px 16px", borderBottom: "1px solid var(--line)", display: "flex", gap: 10, cursor: "pointer", borderLeft: "2px solid var(--purple)" }} onClick={() => onOpenProject(m.projectId, "chat")}>
                  <Avatar user={u} size="av-sm" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: "var(--txt-3)" }}>
                      <AtSign size={10} style={{ display: "inline", color: "var(--purple)" }} /> mencionou você em <span style={{ color: "var(--brand)" }}>{proj?.name.split(" ").slice(0, 3).join(" ")}</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--txt)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      <strong>{u?.name.split(" ")[0]}:</strong> {m.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="card-head">
          <span className="card-title">Seus projetos</span>
          <button className="btn btn-ghost btn-sm" onClick={() => onOpenProject(visibleProjects[0]?.id)}>Ver todos <ArrowUpRight size={12} /></button>
        </div>
        <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
          {visibleProjects.slice(0, 4).map(p => (
            <div key={p.id} style={{ padding: 14, background: "var(--bg-3)", borderRadius: 8, cursor: "pointer", border: "1px solid var(--line)" }} onClick={() => onOpenProject(p.id)}>
              <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 10.5, color: "var(--txt-3)", fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>{p.client}</div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${p.progress}%` }} /></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "var(--txt-2)" }}>
                <span>{p.progress}% concluído</span>
                <span className="mono" style={{ color: "var(--txt-3)" }}>{fmtDate(p.endDate)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ============================================================
// PROJECTS LIST
// ============================================================
function ProjectsListView({ data, visibleProjects, role, onOpen, onNew }) {
  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Projetos</h1>
          <div className="page-meta">{visibleProjects.length} projetos {role !== "admin" && role !== "gerente" ? "que você participa" : "ativos"}</div>
        </div>
        {(role === "admin" || role === "gerente" || role === "coordenador") && (
          <button className="btn btn-primary" onClick={onNew}><Plus size={14} /> Novo projeto</button>
        )}
      </div>

      <div className="proj-grid">
        {visibleProjects.map(p => {
          const issues = data.issues.filter(i => i.projectId === p.id);
          const open = issues.filter(i => i.status !== "resolvido").length;
          const tasks = data.tasks.filter(t => t.projectId === p.id);
          const team = (p.team || []).map(uid => data.users.find(u => u.id === uid)).filter(Boolean);
          return (
            <div key={p.id} className="proj-card" onClick={() => onOpen(p.id)}>
              <div className="proj-card-head">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="proj-card-name">{p.name}</div>
                  <div className="proj-card-client">{p.client}</div>
                </div>
                <Building2 size={20} style={{ color: "var(--txt-3)", flexShrink: 0 }} />
              </div>
              <div className="proj-card-progress">
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 11, color: "var(--txt-2)" }}>
                  <span style={{ fontWeight: 600 }}>{p.progress}%</span>
                  <span className="mono" style={{ color: "var(--txt-3)" }}>{fmtDate(p.endDate)}</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${p.progress}%` }} /></div>
              </div>
              <div className="proj-card-stats">
                <div>
                  <div className="proj-stat-label">Apontam.</div>
                  <div className="proj-stat-value">{open}<span style={{ color: "var(--txt-3)", fontSize: 13 }}>/{issues.length}</span></div>
                </div>
                <div>
                  <div className="proj-stat-label">Tarefas</div>
                  <div className="proj-stat-value">{tasks.filter(t => t.status !== "concluida").length}</div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <div className="proj-stat-label">Equipe</div>
                  <div className="proj-team">
                    {team.slice(0, 4).map(u => <Avatar key={u.id} user={u} size="av-sm" />)}
                    {team.length > 4 && <div className="proj-team-more">+{team.length - 4}</div>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ============================================================
// PROJECT VIEW (com tabs internas)
// ============================================================
function ProjectView({ data, project, tab, role, currentUserId, onTabChange, onOpenIssue, onNewIssue, onNewTask, onNewHours, onSendChat, onResolveMessage, onUpdate, showToast, activeTimer, getTaskTotalSeconds, startTimer, stopTimer }) {
  const projectIssues = data.issues.filter(i => i.projectId === project.id);
  const projectTasks = data.tasks.filter(t => t.projectId === project.id);
  const projectHours = data.hours.filter(h => h.projectId === project.id);
  const projectDocs = data.documents.filter(d => d.projectId === project.id);

  // ===== FILTROS POR PAPEL =====
  // Projetista: só vê o que é dele em Visão Geral, Tarefas e Horas.
  // Coordenador / Gerente / Admin: veem tudo.
  const isProjetista = role === "projetista";
  const visibleIssues = isProjetista
    ? projectIssues.filter(i => i.assignedTo === currentUserId)
    : projectIssues;
  const visibleTasks = isProjetista
    ? projectTasks.filter(t => t.assignedTo === currentUserId)
    : projectTasks;
  const visibleHours = isProjetista
    ? projectHours.filter(h => h.userId === currentUserId)
    : projectHours;

  const openIssues = visibleIssues.filter(i => i.status !== "resolvido").length;

  const tabs = [
    { id: "overview", label: "Visão Geral", icon: LayoutDashboard },
    { id: "issues", label: "Apontamentos", icon: AlertOctagon, badge: openIssues },
    { id: "tasks", label: "Tarefas", icon: ListChecks, badge: visibleTasks.filter(t => t.status !== "concluida").length },
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "gantt", label: "Cronograma", icon: GanttChart },
    { id: "documents", label: "Documentos", icon: FileText, badge: projectDocs.length },
    { id: "hours", label: "Horas", icon: Clock },
  ];

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">{project.name}</h1>
          <div className="page-meta">
            {project.client} · Prazo {fmtDate(project.endDate)} · {project.progress}% concluído
            {isProjetista && <span style={{ marginLeft: 10, padding: "2px 8px", background: "rgba(63,207,142,0.12)", color: "var(--green)", borderRadius: 4, fontSize: 10.5, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Visão pessoal</span>}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {tab === "issues" && <button className="btn btn-primary" onClick={onNewIssue}><Plus size={14} /> Novo apontamento</button>}
          {tab === "tasks" && !isProjetista && <button className="btn btn-primary" onClick={onNewTask}><Plus size={14} /> Nova tarefa</button>}
          {tab === "hours" && <button className="btn btn-primary" onClick={onNewHours}><Plus size={14} /> Registrar horas</button>}
        </div>
      </div>

      <div className="proj-tabs">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <div key={t.id} className={`proj-tab ${tab === t.id ? "active" : ""}`} onClick={() => onTabChange(t.id)}>
              <Icon size={14} />
              <span>{t.label}</span>
              {t.badge !== undefined && t.badge > 0 && <span className="badge">{t.badge}</span>}
            </div>
          );
        })}
      </div>

      {tab === "overview" && <ProjectOverview project={project} data={data} issues={visibleIssues} tasks={visibleTasks} hours={visibleHours} allTasks={projectTasks} onOpenIssue={onOpenIssue} onTabChange={onTabChange} isProjetista={isProjetista} currentUserId={currentUserId} />}
      {tab === "issues" && <ProjectIssues data={data} issues={isProjetista ? visibleIssues : projectIssues} onOpenIssue={onOpenIssue} />}
      {tab === "tasks" && <ProjectTasks data={data} tasks={visibleTasks} onUpdate={onUpdate} activeTimer={activeTimer} getTaskTotalSeconds={getTaskTotalSeconds} startTimer={startTimer} stopTimer={stopTimer} currentUserId={currentUserId} role={role} isProjetista={isProjetista} />}
      {tab === "chat" && <ProjectChat data={data} project={project} currentUserId={currentUserId} onSend={onSendChat} onResolveMessage={onResolveMessage} onOpenIssue={onOpenIssue} />}
      {tab === "gantt" && <ProjectGantt data={data} tasks={projectTasks} />}
      {tab === "documents" && <ProjectDocuments data={data} project={project} docs={projectDocs} onUpdate={onUpdate} showToast={showToast} />}
      {tab === "hours" && <ProjectHours data={data} hours={visibleHours} isProjetista={isProjetista} />}
    </>
  );
}

// ===== Project Overview =====
function ProjectOverview({ project, data, issues, tasks, hours, allTasks, onOpenIssue, onTabChange, isProjetista, currentUserId }) {
  const issuesByDiscipline = useMemo(() => {
    return getDisciplineCodes(data).map(d => ({
      name: d, total: issues.filter(i => i.responsibleDiscipline === d).length,
    })).filter(x => x.total > 0);
  }, [issues, data]);

  const statusData = useMemo(() => STATUSES.map(s => ({
    name: STATUS_LBL[s], value: issues.filter(i => i.status === s).length, color: STATUS_CLR[s],
  })).filter(d => d.value > 0), [issues]);

  const totalHours = hours.reduce((s, h) => s + h.hours, 0);
  const team = (project.team || []).map(uid => data.users.find(u => u.id === uid)).filter(Boolean);

  // Labels e KPIs adaptados pro projetista
  const lbl = {
    issues: isProjetista ? "Meus apontamentos" : "Apontamentos",
    tasks:  isProjetista ? "Minhas tarefas"    : "Tarefas",
    hours:  isProjetista ? "Minhas horas"      : "Horas registradas",
    chartIssues: isProjetista ? "Meus apontamentos por disciplina" : "Apontamentos por disciplina",
    chartStatus: isProjetista ? "Status dos meus apontamentos"     : "Status",
    recent: isProjetista ? "Meus apontamentos recentes" : "Apontamentos recentes",
  };

  return (
    <>
      {isProjetista && issues.length === 0 && tasks.length === 0 && hours.length === 0 && (
        <div className="card" style={{ marginBottom: 16, padding: 24, textAlign: "center" }}>
          <Inbox size={32} color="var(--txt-3)" style={{ margin: "0 auto 12px", display: "block" }} />
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Nada atribuído a você neste projeto ainda</div>
          <div style={{ fontSize: 12.5, color: "var(--txt-2)" }}>
            Quando o coordenador atribuir apontamentos ou tarefas, eles aparecerão aqui.
          </div>
        </div>
      )}

      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-head"><div className="kpi-icon" style={{ background: "rgba(91,141,239,0.15)" }}><AlertOctagon size={16} color="var(--brand)" /></div><div className="kpi-label">{lbl.issues}</div></div>
          <div className="kpi-value">{issues.filter(i => i.status !== "resolvido").length}<span style={{ fontSize: 14, color: "var(--txt-3)", marginLeft: 4 }}>/{issues.length}</span></div>
          <div className="kpi-sub">{issues.filter(i => i.priority === "critica" && i.status !== "resolvido").length} críticos</div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><div className="kpi-icon" style={{ background: "rgba(63,207,142,0.15)" }}><CheckSquare size={16} color="var(--green)" /></div><div className="kpi-label">{lbl.tasks}</div></div>
          <div className="kpi-value">{tasks.filter(t => t.status !== "concluida").length}<span style={{ fontSize: 14, color: "var(--txt-3)", marginLeft: 4 }}>/{tasks.length}</span></div>
          <div className="kpi-sub">{tasks.filter(t => t.status === "em_andamento").length} em andamento</div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><div className="kpi-icon" style={{ background: "rgba(240,168,71,0.15)" }}><Clock size={16} color="var(--amber)" /></div><div className="kpi-label">{lbl.hours}</div></div>
          <div className="kpi-value">{totalHours.toFixed(0)}<span style={{ fontSize: 14, color: "var(--txt-3)", marginLeft: 4 }}>h</span></div>
          <div className="kpi-sub">
            {isProjetista
              ? `em ${new Set(hours.map(h => h.taskId).filter(Boolean)).size} tarefas`
              : `por ${new Set(hours.map(h => h.userId)).size} pessoas`}
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-head"><div className="kpi-icon" style={{ background: "rgba(180,135,245,0.15)" }}><Users size={16} color="var(--purple)" /></div><div className="kpi-label">Equipe</div></div>
          <div className="kpi-value">{team.length}</div>
          <div className="kpi-sub" style={{ display: "flex", marginTop: 8 }}>
            {team.slice(0, 5).map(u => <div key={u.id} style={{ marginLeft: -4 }}><Avatar user={u} size="av-sm" /></div>)}
          </div>
        </div>
      </div>

      {/* Gráficos só fazem sentido se houver dados */}
      {issues.length > 0 && (
        <div className="chart-grid">
          <div className="card">
            <div className="card-head"><span className="card-title">{lbl.chartIssues}</span></div>
            <div className="card-body" style={{ padding: 12 }}>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={issuesByDiscipline} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid stroke="#232a37" vertical={false} />
                  <XAxis dataKey="name" stroke="#5d6779" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={{ stroke: "#232a37" }} tickLine={false} />
                  <YAxis stroke="#5d6779" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#181d27", border: "1px solid #2d3544", borderRadius: 6, fontSize: 12 }} />
                  <Bar dataKey="total" fill="#5b8def" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card">
            <div className="card-head"><span className="card-title">{lbl.chartStatus}</span></div>
            <div className="card-body" style={{ padding: 12 }}>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2}>
                    {statusData.map((e, i) => <Cell key={i} fill={e.color} stroke="#0b0e14" strokeWidth={2} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#181d27", border: "1px solid #2d3544", borderRadius: 6, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
                {statusData.map(d => (
                  <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
                    <span className="dot" style={{ background: d.color }} />
                    <span style={{ color: "var(--txt-2)" }}>{d.name}</span>
                    <span className="mono" style={{ marginLeft: "auto", color: "var(--txt-3)" }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {issues.length > 0 && (
        <div className="card">
          <div className="card-head">
            <span className="card-title">{lbl.recent}</span>
            <button className="btn btn-ghost btn-sm" onClick={() => onTabChange("issues")}>Ver {isProjetista ? "meus" : "todos"} <ArrowUpRight size={12} /></button>
          </div>
          <div>
            {issues.slice(0, 5).map(i => {
              const u = data.users.find(x => x.id === i.assignedTo);
              return (
                <div key={i.id} className="task-row" onClick={() => onOpenIssue(i)}>
                  <span className="dot" style={{ background: STATUS_CLR[i.status], marginLeft: 4 }} />
                  <div className="task-info">
                    <div className="task-title">{i.title}</div>
                    <div className="task-meta">
                      <span className="mono">{i.code}</span>
                      <span>·</span>
                      <span className={`disc d-${i.responsibleDiscipline}`}>{i.responsibleDiscipline}</span>
                    </div>
                  </div>
                  {priorityBadge(i.priority)}
                  {u && <Avatar user={u} size="av-sm" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

// ===== Project Issues =====
function ProjectIssues({ data, issues, onOpenIssue }) {
  const [issuesView, setIssuesView] = useState("table");
  const [filters, setFilters] = useState({ discipline: "all", status: "all", priority: "all", assignedTo: "all" });

  const filtered = useMemo(() => issues.filter(i => {
    if (filters.discipline !== "all" && i.responsibleDiscipline !== filters.discipline) return false;
    if (filters.status !== "all" && i.status !== filters.status) return false;
    if (filters.priority !== "all" && i.priority !== filters.priority) return false;
    if (filters.assignedTo !== "all" && i.assignedTo !== filters.assignedTo) return false;
    return true;
  }), [issues, filters]);

  return (
    <>
      <div className="filters">
        <div className="tabs">
          <button className={`tab ${issuesView === "table" ? "active" : ""}`} onClick={() => setIssuesView("table")}><Layers size={12} /> Tabela</button>
          <button className={`tab ${issuesView === "kanban" ? "active" : ""}`} onClick={() => setIssuesView("kanban")}><LayoutDashboard size={12} /> Kanban</button>
        </div>
        <Filter size={14} style={{ color: "var(--txt-3)" }} />
        <select className="select" value={filters.discipline} onChange={e => setFilters(f => ({ ...f, discipline: e.target.value }))}>
          <option value="all">Todas disciplinas</option>
          {getDisciplineCodes(data).map(d => <option key={d} value={d}>{getDisciplineName(data, d)}</option>)}
        </select>
        <select className="select" value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
          <option value="all">Todos status</option>
          {STATUSES.map(s => <option key={s} value={s}>{STATUS_LBL[s]}</option>)}
        </select>
        <select className="select" value={filters.priority} onChange={e => setFilters(f => ({ ...f, priority: e.target.value }))}>
          <option value="all">Todas prioridades</option>
          {PRIORITIES.map(p => <option key={p} value={p}>{PRIORITY_LBL[p]}</option>)}
        </select>
      </div>

      {issuesView === "table" && (
        <div className="card">
          {filtered.length === 0 ? (
            <div className="empty"><div className="empty-icon"><AlertOctagon size={24} /></div>Nenhum apontamento encontrado</div>
          ) : (
            <table className="tbl">
              <thead><tr>
                <th style={{ width: 90 }}>ID</th><th>Título</th>
                <th style={{ width: 80 }}>Disc.</th>
                <th style={{ width: 110 }}>Prioridade</th>
                <th style={{ width: 150 }}>Status</th>
                <th style={{ width: 160 }}>Responsável</th>
                <th style={{ width: 110 }}>Prazo</th>
              </tr></thead>
              <tbody>
                {filtered.map(i => {
                  const u = data.users.find(x => x.id === i.assignedTo);
                  return (
                    <tr key={i.id} onClick={() => onOpenIssue(i)}>
                      <td className="mono" style={{ fontSize: 11.5, color: "var(--txt-3)" }}>{i.code}</td>
                      <td style={{ fontWeight: 500 }}>{i.title}</td>
                      <td><span className={`disc d-${i.responsibleDiscipline}`}>{i.responsibleDiscipline}</span></td>
                      <td>{priorityBadge(i.priority)}</td>
                      <td>{statusPill(i.status)}</td>
                      <td>{u && <div style={{ display: "flex", alignItems: "center", gap: 7 }}><Avatar user={u} size="av-xs" /><span style={{ fontSize: 12 }}>{u.name.split(" ")[0]}</span></div>}</td>
                      <td className="mono" style={{ fontSize: 11.5, color: "var(--txt-2)" }}>{fmtDate(i.dueDate)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {issuesView === "kanban" && (
        <div className="kanban">
          {STATUSES.map(s => {
            const colIssues = filtered.filter(i => i.status === s);
            return (
              <div key={s} className="kanban-col">
                <div className="kanban-col-head">
                  <span className="dot" style={{ background: STATUS_CLR[s] }} />
                  <span className="kanban-col-title">{STATUS_LBL[s]}</span>
                  <span className="kanban-col-count">{colIssues.length}</span>
                </div>
                <div className="kanban-cards">
                  {colIssues.map(i => {
                    const u = data.users.find(x => x.id === i.assignedTo);
                    return (
                      <div key={i.id} className="kanban-card" onClick={() => onOpenIssue(i)}>
                        <div className="kanban-card-id"><span className="mono">{i.code}</span> · <span className={`disc d-${i.responsibleDiscipline}`}>{i.responsibleDiscipline}</span></div>
                        <div className="kanban-card-title">{i.title}</div>
                        <div className="kanban-card-meta">{priorityBadge(i.priority)}<span style={{ marginLeft: "auto" }}>{u && <Avatar user={u} size="av-xs" />}</span></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

// ===== Project Tasks (organizadas por disciplina) =====
function ProjectTasks({ data, tasks, onUpdate, activeTimer, getTaskTotalSeconds, startTimer, stopTimer, currentUserId, role, isProjetista }) {
  const [groupBy, setGroupBy] = useState("discipline");
  const [openTaskId, setOpenTaskId] = useState(null);

  // Estado vazio amigável para o projetista
  if (isProjetista && tasks.length === 0) {
    return (
      <div className="card" style={{ padding: 40, textAlign: "center" }}>
        <CheckSquare size={36} color="var(--txt-3)" style={{ margin: "0 auto 14px", display: "block" }} />
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Nenhuma tarefa atribuída a você neste projeto</div>
        <div style={{ fontSize: 13, color: "var(--txt-2)", maxWidth: 420, margin: "0 auto" }}>
          Quando o coordenador atribuir uma tarefa para você, ela aparecerá aqui — com botão para iniciar o timer e marcar como concluída.
        </div>
      </div>
    );
  }

  const changeStatus = (taskId, newStatus) => {
    onUpdate(d => {
      d.tasks = d.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t);
      return d;
    });
  };

  const groups = useMemo(() => {
    if (groupBy === "discipline") {
      const m = {};
      tasks.forEach(t => { (m[t.discipline] = m[t.discipline] || []).push(t); });
      return Object.entries(m);
    }
    if (groupBy === "status") {
      const m = { aguardando: [], em_andamento: [], em_revisao: [], concluida: [] };
      tasks.forEach(t => {
        const s = normalizeTaskStatus(t.status);
        if (m[s]) m[s].push(t);
      });
      return Object.entries(m).filter(([, v]) => v.length > 0);
    }
    return [["Todas", tasks]];
  }, [tasks, groupBy]);

  const canStartTimer = (task) => task.assignedTo === currentUserId && normalizeTaskStatus(task.status) !== "concluida";
  const canChangeStatus = (task) => task.assignedTo === currentUserId || role !== "projetista";

  const openTask = openTaskId ? tasks.find(t => t.id === openTaskId) : null;

  const getDeadlineFlag = (endDate, status) => {
    if (normalizeTaskStatus(status) === "concluida") return null;
    const days = Math.floor((new Date(endDate) - Date.now()) / 86400000);
    if (days < 0) return { kind: "atrasado", days: -days };
    if (days <= 2) return { kind: "proximo", days };
    return null;
  };

  return (
    <>
      <div className="filters">
        <span style={{ fontSize: 12, color: "var(--txt-3)", fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.06em" }}>Agrupar por</span>
        <div className="tabs">
          <button className={`tab ${groupBy === "discipline" ? "active" : ""}`} onClick={() => setGroupBy("discipline")}>Disciplina</button>
          <button className={`tab ${groupBy === "status" ? "active" : ""}`} onClick={() => setGroupBy("status")}>Status</button>
          <button className={`tab ${groupBy === "all" ? "active" : ""}`} onClick={() => setGroupBy("all")}>Todas</button>
        </div>
      </div>

      {groups.map(([key, ts]) => (
        <div key={key} className="card" style={{ marginBottom: 14 }}>
          <div className="card-head">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {groupBy === "discipline" && <span className={`disc d-${key}`} style={{ padding: "3px 9px", fontSize: 11 }}>{key}</span>}
              {groupBy === "status" && <span className="dot" style={{ background: TASK_STATUS_CLR[key] }} />}
              <span className="card-title">{groupBy === "discipline" ? getDisciplineName(data, key) : groupBy === "status" ? TASK_STATUS_LBL[key] : "Todas as tarefas"}</span>
              <span style={{ fontSize: 11, color: "var(--txt-3)", fontFamily: "JetBrains Mono, monospace" }}>{ts.length}</span>
            </div>
          </div>
          <div>
            {ts.map(t => {
              const u = data.users.find(x => x.id === t.assignedTo);
              const issue = data.issues.find(i => i.id === t.issueId);
              const totalSec = getTaskTotalSeconds(t.id);
              const isActiveHere = activeTimer && activeTimer.taskId === t.id;
              const userCanStart = canStartTimer(t);
              const status = normalizeTaskStatus(t.status);
              const isDone = status === "concluida";
              const canEdit = canChangeStatus(t);
              const deadline = getDeadlineFlag(t.endDate, status);
              const checklist = t.checklist || [];
              const completedItems = checklist.filter(x => x.done).length;
              const attachments = t.attachments || [];

              return (
                <div key={t.id} className="task-row" style={{ alignItems: "center" }}>
                  <span className="dot" style={{ background: TASK_STATUS_CLR[status], marginLeft: 4, marginRight: 4 }} />
                  <div className="task-info" onClick={() => setOpenTaskId(t.id)} style={{ cursor: "pointer" }}>
                    <div className="task-title" style={{ textDecoration: isDone ? "line-through" : "none", color: isDone ? "var(--txt-3)" : "var(--txt)" }}>
                      {t.title}
                    </div>
                    <div className="task-meta" style={{ flexWrap: "wrap" }}>
                      {issue && <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "1px 6px", borderRadius: 4, background: "rgba(180,135,245,0.12)", color: "var(--purple)", fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, fontWeight: 600 }}><Link2 size={9} />{issue.code}</span>}
                      <span className="mono">{fmtDate(t.startDate)} → {fmtDate(t.endDate)}</span>
                      {checklist.length > 0 && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                          <CheckSquare size={10} />
                          <span className="mono">{completedItems}/{checklist.length}</span>
                        </span>
                      )}
                      {attachments.length > 0 && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                          <Paperclip size={10} />
                          <span className="mono">{attachments.length}</span>
                        </span>
                      )}
                      {deadline && (
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 3,
                          padding: "1px 7px", borderRadius: 4,
                          background: deadline.kind === "atrasado" ? "rgba(239,93,111,0.14)" : "rgba(240,168,71,0.14)",
                          color: deadline.kind === "atrasado" ? "var(--red)" : "var(--amber)",
                          fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em",
                        }}>
                          <AlertCircle size={10} />
                          {deadline.kind === "atrasado" ? `atrasada ${deadline.days}d` : deadline.days === 0 ? "vence hoje" : `${deadline.days}d`}
                        </span>
                      )}
                    </div>
                  </div>

                  {totalSec > 0 && !isActiveHere && (
                    <span className="timer-total has-time" title="Tempo total acumulado">
                      <Clock size={11} /> {formatDurationShort(totalSec)}
                    </span>
                  )}

                  {isActiveHere ? (
                    <button
                      className="timer-btn timer-btn-running"
                      onClick={(e) => { e.stopPropagation(); stopTimer(true); }}
                      title="Pausar e lançar horas"
                    >
                      <Pause size={12} fill="currentColor" /> {formatDuration(totalSec)}
                    </button>
                  ) : userCanStart && (
                    <button
                      className="timer-btn timer-btn-start"
                      onClick={(e) => { e.stopPropagation(); startTimer(t.id); }}
                      title="Iniciar timer"
                    >
                      <Play size={11} fill="currentColor" /> Iniciar
                    </button>
                  )}

                  <TaskStatusButton
                    status={status}
                    canEdit={canEdit}
                    onChange={(s) => changeStatus(t.id, s)}
                  />

                  {u && <Avatar user={u} size="av-sm" />}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {openTask && (
        <TaskDetailModal
          task={openTask}
          data={data}
          currentUserId={currentUserId}
          role={role}
          onClose={() => setOpenTaskId(null)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}

// ===== Botão dropdown de status da tarefa =====
function TaskStatusButton({ status, canEdit, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  const cur = TASK_STATUSES.includes(status) ? status : "aguardando";
  const color = TASK_STATUS_CLR[cur];

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={(e) => { e.stopPropagation(); if (canEdit) setOpen(o => !o); }}
        disabled={!canEdit}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 10px",
          borderRadius: 6,
          fontSize: 11.5, fontWeight: 700,
          fontFamily: "JetBrains Mono, monospace",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          cursor: canEdit ? "pointer" : "default",
          background: color + "1f",
          color: color,
          border: `1px solid ${color}40`,
          minWidth: 130,
          justifyContent: "space-between",
          opacity: canEdit ? 1 : 0.7,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span className="dot" style={{ background: color }} />
          {TASK_STATUS_LBL[cur]}
        </span>
        {canEdit && <ChevronDown size={11} style={{ opacity: 0.7 }} />}
      </button>
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 4px)",
          right: 0,
          background: "var(--bg-3)",
          border: "1px solid var(--line-2)",
          borderRadius: 7,
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          zIndex: 50,
          minWidth: 170,
          overflow: "hidden",
        }}>
          {TASK_STATUSES.map(s => (
            <div
              key={s}
              onClick={(e) => { e.stopPropagation(); onChange(s); setOpen(false); }}
              style={{
                padding: "8px 12px",
                fontSize: 12.5,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                background: s === cur ? "var(--bg-4)" : "transparent",
                color: TASK_STATUS_CLR[s],
              }}
            >
              <span className="dot" style={{ background: TASK_STATUS_CLR[s] }} />
              {TASK_STATUS_LBL[s]}
              {s === cur && <CheckCircle2 size={12} style={{ marginLeft: "auto" }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== Modal de detalhes da tarefa =====
function TaskDetailModal({ task, data, currentUserId, role, onClose, onUpdate }) {
  const [tab, setTab] = useState("info");
  const [newItem, setNewItem] = useState("");
  const [showIssuePicker, setShowIssuePicker] = useState(false);
  const [issueSearch, setIssueSearch] = useState("");
  const fileRef = useRef(null);

  const u = data.users.find(x => x.id === task.assignedTo);
  const issue = data.issues.find(i => i.id === task.issueId);
  const project = data.projects.find(p => p.id === task.projectId);
  const checklist = task.checklist || [];
  const attachments = task.attachments || [];
  const status = normalizeTaskStatus(task.status);
  const projectIssues = data.issues.filter(i => i.projectId === task.projectId);
  const filteredIssues = projectIssues.filter(i =>
    !issueSearch || i.code.toLowerCase().includes(issueSearch.toLowerCase()) || i.title.toLowerCase().includes(issueSearch.toLowerCase())
  );

  const canEdit = task.assignedTo === currentUserId || role !== "projetista";

  const updateTask = (mutator) => {
    onUpdate(d => {
      d.tasks = d.tasks.map(t => t.id === task.id ? mutator({ ...t }) : t);
      return d;
    });
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    updateTask(t => ({
      ...t,
      checklist: [...(t.checklist || []), { id: `cl${Date.now()}`, text: newItem.trim(), done: false }]
    }));
    setNewItem("");
  };

  const toggleItem = (itemId) => {
    updateTask(t => ({
      ...t,
      checklist: (t.checklist || []).map(x => x.id === itemId ? { ...x, done: !x.done } : x)
    }));
  };

  const deleteItem = (itemId) => {
    updateTask(t => ({
      ...t,
      checklist: (t.checklist || []).filter(x => x.id !== itemId)
    }));
  };

  const onPickFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    updateTask(t => ({
      ...t,
      attachments: [...(t.attachments || []), {
        id: `at${Date.now()}`,
        name: f.name,
        size: f.size,
        addedAt: new Date().toISOString(),
        addedBy: currentUserId,
      }]
    }));
    e.target.value = "";
  };

  const removeAttachment = (attId) => {
    updateTask(t => ({
      ...t,
      attachments: (t.attachments || []).filter(x => x.id !== attId)
    }));
  };

  const linkIssue = (issueId) => {
    updateTask(t => ({ ...t, issueId }));
    setShowIssuePicker(false);
    setIssueSearch("");
  };

  const unlinkIssue = () => {
    updateTask(t => ({ ...t, issueId: "" }));
  };

  const pct = checklist.length > 0 ? Math.round((checklist.filter(x => x.done).length / checklist.length) * 100) : 0;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 640, maxHeight: "90vh", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
        <div className="modal-head" style={{ alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
              <span className="dot" style={{ background: TASK_STATUS_CLR[status] }} />
              <span className="mono" style={{ fontSize: 10.5, color: TASK_STATUS_CLR[status], fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {TASK_STATUS_LBL[status]}
              </span>
              <span className={`disc d-${task.discipline}`} style={{ padding: "2px 7px", fontSize: 10 }}>{task.discipline}</span>
              <span className="mono" style={{ fontSize: 10.5, color: "var(--txt-3)" }}>{project?.name}</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>{task.title}</div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div style={{ display: "flex", borderBottom: "1px solid var(--line)", padding: "0 18px" }}>
          <button onClick={() => setTab("info")} style={tabStyleT(tab === "info")}>
            <Inbox size={12} /> Informações
          </button>
          <button onClick={() => setTab("checklist")} style={tabStyleT(tab === "checklist")}>
            <CheckSquare size={12} /> Checklist
            {checklist.length > 0 && <span style={countBadgeT}>{checklist.filter(x => x.done).length}/{checklist.length}</span>}
          </button>
          <button onClick={() => setTab("attachments")} style={tabStyleT(tab === "attachments")}>
            <Paperclip size={12} /> Anexos
            {attachments.length > 0 && <span style={countBadgeT}>{attachments.length}</span>}
          </button>
        </div>

        <div style={{ padding: 18, overflowY: "auto", flex: 1 }}>
          {tab === "info" && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <InfoBlockT label="Responsável" value={u && (
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <Avatar user={u} size="av-sm" />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</span>
                  </div>
                )} />
                <InfoBlockT label="Disciplina" value={
                  <span className={`disc d-${task.discipline}`} style={{ padding: "3px 9px", fontSize: 11 }}>
                    {task.discipline} {getDisciplineName(data, task.discipline)}
                  </span>
                } />
                <InfoBlockT label="Início" value={<span className="mono" style={{ fontSize: 12.5 }}>{fmtDate(task.startDate)}</span>} />
                <InfoBlockT label="Prazo" value={<span className="mono" style={{ fontSize: 12.5 }}>{fmtDate(task.endDate)}</span>} />
              </div>

              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: "var(--txt-3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                  Apontamento vinculado
                </div>
                {issue ? (
                  <div style={{
                    background: "rgba(180,135,245,0.08)",
                    border: "1px solid rgba(180,135,245,0.25)",
                    borderRadius: 8,
                    padding: 12,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10
                  }}>
                    <div style={{ width: 30, height: 30, borderRadius: 6, background: "rgba(180,135,245,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Link2 size={14} color="var(--purple)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                        <span className="mono" style={{ fontSize: 11.5, fontWeight: 700, color: "var(--purple)" }}>{issue.code}</span>
                        <span className="dot" style={{ background: STATUS_CLR[issue.status] }} />
                        <span style={{ fontSize: 10.5, color: "var(--txt-3)" }}>{STATUS_LBL[issue.status]}</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{issue.title}</div>
                    </div>
                    {canEdit && (
                      <button className="icon-btn" style={{ width: 26, height: 26 }} onClick={unlinkIssue} title="Desvincular">
                        <X size={12} />
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    {!showIssuePicker ? (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setShowIssuePicker(true)}
                        disabled={!canEdit}
                      >
                        <Link2 size={13} /> Vincular apontamento
                      </button>
                    ) : (
                      <div style={{ background: "var(--bg-3)", border: "1px solid var(--line)", borderRadius: 8, padding: 10 }}>
                        <input
                          autoFocus
                          className="inp"
                          placeholder="Buscar por código ou título..."
                          value={issueSearch}
                          onChange={e => setIssueSearch(e.target.value)}
                          style={{ marginBottom: 8 }}
                        />
                        <div style={{ maxHeight: 200, overflowY: "auto" }}>
                          {filteredIssues.length === 0 ? (
                            <div style={{ padding: 14, textAlign: "center", fontSize: 12, color: "var(--txt-3)" }}>Nenhum apontamento encontrado</div>
                          ) : filteredIssues.slice(0, 10).map(i => (
                            <div
                              key={i.id}
                              onClick={() => linkIssue(i.id)}
                              style={{
                                padding: "8px 10px",
                                borderRadius: 5,
                                cursor: "pointer",
                                fontSize: 12.5,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = "var(--bg-4)"}
                              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >
                              <span className="mono" style={{ fontSize: 11, color: "var(--purple)", fontWeight: 700, minWidth: 60 }}>{i.code}</span>
                              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{i.title}</span>
                              <span className={`disc d-${i.responsibleDiscipline}`} style={{ fontSize: 10, padding: "1px 6px" }}>{i.responsibleDiscipline}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: 6, marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--line)" }}>
                          <button className="btn btn-secondary btn-sm" onClick={() => { setShowIssuePicker(false); setIssueSearch(""); }}>Cancelar</button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}

          {tab === "checklist" && (
            <div>
              {checklist.length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 11.5, color: "var(--txt-2)" }}>
                    <span>Progresso</span>
                    <span className="mono" style={{ fontWeight: 700, color: "var(--green)" }}>{pct}%</span>
                  </div>
                  <div style={{ height: 6, background: "var(--bg-4)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: "var(--green)", transition: "width 0.3s" }} />
                  </div>
                </div>
              )}

              {checklist.length === 0 ? (
                <div style={{ padding: 24, textAlign: "center", color: "var(--txt-3)", fontSize: 13 }}>
                  Nenhum item ainda. Adicione subitens pra quebrar a tarefa em passos menores.
                </div>
              ) : checklist.map(item => (
                <div key={item.id} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 6,
                  marginBottom: 4,
                  background: item.done ? "rgba(63,207,142,0.06)" : "transparent",
                  border: "1px solid var(--line)",
                }}>
                  <div
                    onClick={() => canEdit && toggleItem(item.id)}
                    style={{
                      width: 18, height: 18, borderRadius: 4,
                      border: `1.5px solid ${item.done ? "var(--green)" : "var(--txt-3)"}`,
                      background: item.done ? "var(--green)" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: canEdit ? "pointer" : "default",
                      flexShrink: 0,
                    }}
                  >
                    {item.done && <CheckCircle2 size={12} color="white" />}
                  </div>
                  <span style={{
                    flex: 1, fontSize: 13,
                    textDecoration: item.done ? "line-through" : "none",
                    color: item.done ? "var(--txt-3)" : "var(--txt)"
                  }}>
                    {item.text}
                  </span>
                  {canEdit && (
                    <button className="icon-btn" style={{ width: 24, height: 24, color: "var(--txt-3)" }} onClick={() => deleteItem(item.id)}>
                      <X size={12} />
                    </button>
                  )}
                </div>
              ))}

              {canEdit && (
                <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                  <input
                    className="inp"
                    placeholder="Adicionar item..."
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") addItem(); }}
                  />
                  <button className="btn btn-primary btn-sm" onClick={addItem} disabled={!newItem.trim()}>
                    <Plus size={13} /> Adicionar
                  </button>
                </div>
              )}
            </div>
          )}

          {tab === "attachments" && (
            <div>
              {attachments.length === 0 ? (
                <div style={{ padding: 24, textAlign: "center", color: "var(--txt-3)", fontSize: 13 }}>
                  Nenhum anexo. Adicione arquivos de referência (DWG, IFC, PDFs).
                </div>
              ) : attachments.map(att => {
                const adder = data.users.find(u => u.id === att.addedBy);
                return (
                  <div key={att.id} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 6,
                    marginBottom: 6,
                    background: "var(--bg-3)",
                    border: "1px solid var(--line)",
                  }}>
                    <div style={{ width: 32, height: 32, borderRadius: 6, background: "var(--bg-4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <FileText size={14} color="var(--txt-2)" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{att.name}</div>
                      <div style={{ fontSize: 10.5, color: "var(--txt-3)", marginTop: 2 }}>
                        {(att.size / 1024).toFixed(1)} KB · {adder?.name || "—"} · {fmtDate(att.addedAt)}
                      </div>
                    </div>
                    {canEdit && (
                      <button className="icon-btn" style={{ width: 26, height: 26, color: "var(--red)" }} onClick={() => removeAttachment(att.id)}>
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                );
              })}

              {canEdit && (
                <>
                  <input ref={fileRef} type="file" style={{ display: "none" }} onChange={onPickFile} />
                  <button className="btn btn-secondary btn-sm" onClick={() => fileRef.current?.click()} style={{ marginTop: 12 }}>
                    <Paperclip size={13} /> Anexar arquivo
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const tabStyleT = (active) => ({
  padding: "10px 14px",
  background: "transparent",
  border: "none",
  borderBottom: `2px solid ${active ? "var(--brand)" : "transparent"}`,
  color: active ? "var(--brand)" : "var(--txt-2)",
  fontWeight: active ? 700 : 500,
  fontSize: 12.5,
  cursor: "pointer",
  fontFamily: "inherit",
  display: "flex", alignItems: "center", gap: 6,
});
const countBadgeT = {
  fontFamily: "JetBrains Mono, monospace",
  fontSize: 10,
  background: "var(--bg-4)",
  padding: "1px 6px",
  borderRadius: 8,
  color: "var(--txt-2)",
};

function InfoBlockT({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, color: "var(--txt-3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{label}</div>
      <div>{value || <span style={{ color: "var(--txt-3)" }}>—</span>}</div>
    </div>
  );
}

// ===== Office Chat View (Chat Geral do Escritório) =====
function OfficeChatView({ data, currentUserId, onSendChat, onResolveMessage, onOpenIssue }) {
  // Wrapper que renderiza ProjectChat em modo "office"
  const officeProject = { id: "office", name: "Chat Geral do Escritório", team: data.users.map(u => u.id) };
  return (
    <div>
      <div style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, var(--brand) 0%, var(--purple) 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800 }}>
          <Building2 size={22} />
        </div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>Chat Geral do Escritório</h1>
          <div style={{ fontSize: 13, color: "var(--txt-2)", marginTop: 2 }}>
            Conversa transversal com todo o time de {data.tenant.name}
          </div>
        </div>
      </div>
      <ProjectChat
        data={data}
        project={officeProject}
        currentUserId={currentUserId}
        onSend={onSendChat}
        onResolveMessage={onResolveMessage}
        onOpenIssue={onOpenIssue}
        isOffice={true}
      />
    </div>
  );
}

// ===== Project Chat =====
// projectId pode ser id de projeto OU "office" (chat geral do escritório)
function ProjectChat({ data, project, currentUserId, onSend, onOpenIssue, onResolveMessage, isOffice = false }) {
  const [draft, setDraft] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [mentionFilter, setMentionFilter] = useState("");
  const [refIssue, setRefIssue] = useState(null);
  const [pendingFile, setPendingFile] = useState(null);
  // Controle: quem precisa responder esta mensagem (lista de userIds selecionados antes de enviar)
  const [awaitingFrom, setAwaitingFrom] = useState([]);
  const [showAwaitMenu, setShowAwaitMenu] = useState(false);
  const fileRef = useRef(null);
  const messagesRef = useRef(null);

  const chatId = isOffice ? "office" : project.id;
  const allMessages = useMemo(() =>
    data.chatMessages
      .filter(m => m.projectId === chatId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
    [data.chatMessages, chatId]
  );

  // Mensagens pendentes (não resolvidas) ficam fixadas no topo
  const pendingMessages = allMessages.filter(m => !m.resolved && m.awaitingFrom && m.awaitingFrom.length > 0);
  const resolvedMessages = allMessages.filter(m => m.resolved || !m.awaitingFrom || m.awaitingFrom.length === 0);

  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [allMessages.length]);

  const handleInputChange = (e) => {
    const v = e.target.value;
    setDraft(v);
    const lastAt = v.lastIndexOf("@");
    if (lastAt >= 0 && (lastAt === 0 || v[lastAt - 1] === " ")) {
      const after = v.slice(lastAt + 1);
      if (!after.includes(" ")) {
        setShowMentions(true);
        setMentionFilter(after.toLowerCase());
        return;
      }
    }
    setShowMentions(false);
  };

  const insertMention = (user) => {
    const lastAt = draft.lastIndexOf("@");
    setDraft(draft.slice(0, lastAt) + "@" + user.name + " ");
    setShowMentions(false);
    // Auto-adiciona à lista de aguardando
    if (!awaitingFrom.includes(user.id)) {
      setAwaitingFrom([...awaitingFrom, user.id]);
    }
  };

  const submit = () => {
    if (!draft.trim() && !pendingFile) return;
    onSend(chatId, draft, pendingFile, refIssue?.id, awaitingFrom);
    setDraft("");
    setPendingFile(null);
    setRefIssue(null);
    setAwaitingFrom([]);
  };

  // Pessoas disponíveis: time do projeto, ou todos os usuários no chat geral
  const availablePeople = isOffice
    ? data.users
    : (project.team || []).map(uid => data.users.find(u => u.id === uid)).filter(Boolean);
  const filteredMentionUsers = availablePeople.filter(u => u.name.toLowerCase().includes(mentionFilter) && u.id !== currentUserId);

  const projectIssues = isOffice ? [] : data.issues.filter(i => i.projectId === project.id);

  const renderMessage = (m, isPinned = false) => {
    const u = data.users.find(x => x.id === m.userId);
    const ref = m.refIssueId ? data.issues.find(i => i.id === m.refIssueId) : null;
    const isOwner = m.userId === currentUserId;
    const awaitUsers = (m.awaitingFrom || []).map(uid => data.users.find(x => x.id === uid)).filter(Boolean);
    return (
      <div key={m.id} className="chat-msg" style={isPinned ? { background: "rgba(240,168,71,0.06)", border: "1px solid rgba(240,168,71,0.2)", borderRadius: 8, padding: 10, marginBottom: 8 } : {}}>
        <Avatar user={u} />
        <div className="chat-msg-content">
          <div className="chat-msg-head">
            <span className="chat-msg-author">{u?.name}</span>
            <span style={{ fontSize: 10, color: u && ROLES[u.access].color, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {u && ROLES[u.access].label}
            </span>
            <span className="chat-msg-time">{timeAgo(m.createdAt)}</span>
            {isPinned && <span style={{ fontSize: 10, color: "var(--amber)", fontWeight: 700, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.06em" }}>● Pendente</span>}
          </div>
          <div className="chat-msg-body">{renderRichText(m.text, data.users, projectIssues, onOpenIssue)}</div>
          {ref && (
            <div className="chat-msg-attach" onClick={() => onOpenIssue(ref)} style={{ cursor: "pointer", marginTop: 6 }}>
              <Link2 size={12} color="var(--purple)" />
              <span style={{ color: "var(--purple)", fontWeight: 600 }}>{ref.code}</span>
              <span>{ref.title}</span>
            </div>
          )}
          {m.attachment && (
            <div className="chat-msg-attach">
              <Paperclip size={12} />
              <span>{m.attachment}</span>
            </div>
          )}
          {isPinned && awaitUsers.length > 0 && (
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: "var(--txt-3)", fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.06em" }}>Aguardando:</span>
              {awaitUsers.map(au => (
                <span key={au.id} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 12, background: "rgba(240,168,71,0.15)", fontSize: 11, color: "var(--amber)", fontWeight: 600 }}>
                  <Avatar user={au} size="av-xs" />
                  {au.name.split(" ")[0]}
                </span>
              ))}
              {isOwner && (
                <button
                  onClick={() => onResolveMessage(m.id)}
                  style={{ marginLeft: "auto", padding: "4px 10px", fontSize: 11, fontWeight: 600, borderRadius: 6, border: "1px solid var(--green)", background: "rgba(63,207,142,0.12)", color: "var(--green)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}
                >
                  <CheckCircle2 size={12} /> Marcar como resolvida
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="chat-layout-v2">
      <div className="chat-main" style={{ width: "100%" }}>
        <div className="chat-head">
          {isOffice ? <Building2 size={16} color="var(--txt-2)" /> : <Hash size={16} color="var(--txt-2)" />}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>
              {isOffice ? "Chat Geral do Escritório" : project.name}
            </div>
            <div style={{ fontSize: 11, color: "var(--txt-3)" }}>
              {allMessages.length} mensagens · {availablePeople.length} pessoas
              {pendingMessages.length > 0 && <> · <span style={{ color: "var(--amber)", fontWeight: 600 }}>{pendingMessages.length} pendente{pendingMessages.length > 1 ? "s" : ""}</span></>}
            </div>
          </div>
        </div>

        <div className="chat-messages" ref={messagesRef}>
          {/* Mensagens pendentes (fixadas no topo) */}
          {pendingMessages.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 4px", marginBottom: 8 }}>
                <AlertCircle size={14} color="var(--amber)" />
                <span style={{ fontSize: 11, color: "var(--amber)", fontWeight: 700, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Aguardando resposta ({pendingMessages.length})
                </span>
              </div>
              {pendingMessages.map(m => renderMessage(m, true))}
              <div style={{ borderTop: "1px solid var(--line)", margin: "16px 0 8px" }} />
            </div>
          )}

          {allMessages.length === 0 && (
            <div style={{ textAlign: "center", color: "var(--txt-3)", padding: 30, fontSize: 13 }}>
              Nenhuma mensagem ainda. Seja o primeiro a escrever!
            </div>
          )}

          {/* Mensagens resolvidas / sem aguardo */}
          {resolvedMessages.map(m => renderMessage(m, false))}
        </div>

        <div className="chat-input-area">
          {refIssue && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "rgba(180,135,245,0.1)", borderRadius: 6, marginBottom: 8, fontSize: 12 }}>
              <Link2 size={12} color="var(--purple)" />
              <span>Vinculando: <strong style={{ color: "var(--purple)" }}>{refIssue.code}</strong> {refIssue.title}</span>
              <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto", padding: 2 }} onClick={() => setRefIssue(null)}><X size={11} /></button>
            </div>
          )}
          {pendingFile && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "var(--bg-3)", borderRadius: 6, marginBottom: 8, fontSize: 12 }}>
              <Paperclip size={12} color="var(--txt-2)" />
              <span>{pendingFile}</span>
              <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto", padding: 2 }} onClick={() => setPendingFile(null)}><X size={11} /></button>
            </div>
          )}
          {awaitingFrom.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", background: "rgba(240,168,71,0.1)", border: "1px solid rgba(240,168,71,0.25)", borderRadius: 6, marginBottom: 8, fontSize: 12, flexWrap: "wrap" }}>
              <AlertCircle size={12} color="var(--amber)" />
              <span style={{ color: "var(--amber)", fontWeight: 600 }}>Aguardando resposta de:</span>
              {awaitingFrom.map(uid => {
                const u = data.users.find(x => x.id === uid);
                if (!u) return null;
                return (
                  <span key={uid} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 12, background: "var(--bg-3)", fontSize: 11, fontWeight: 600 }}>
                    {u.name.split(" ")[0]}
                    <X size={10} style={{ cursor: "pointer" }} onClick={() => setAwaitingFrom(awaitingFrom.filter(x => x !== uid))} />
                  </span>
                );
              })}
            </div>
          )}
          <div style={{ position: "relative" }}>
            {showMentions && filteredMentionUsers.length > 0 && (
              <div className="mention-menu">
                <div style={{ padding: "4px 9px", fontSize: 10, color: "var(--txt-3)", fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>Mencionar</div>
                {filteredMentionUsers.map(u => (
                  <div key={u.id} className="mention-menu-item" onClick={() => insertMention(u)}>
                    <Avatar user={u} size="av-sm" />
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 600 }}>{u.name}</div>
                      <div style={{ fontSize: 10.5, color: "var(--txt-3)" }}>{u.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {showAwaitMenu && (
              <div className="mention-menu" style={{ maxHeight: 240, overflowY: "auto" }}>
                <div style={{ padding: "4px 9px", fontSize: 10, color: "var(--txt-3)", fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>Aguardar resposta de:</div>
                {availablePeople.filter(u => u.id !== currentUserId).map(u => {
                  const checked = awaitingFrom.includes(u.id);
                  return (
                    <div key={u.id} className="mention-menu-item" onClick={() => {
                      if (checked) setAwaitingFrom(awaitingFrom.filter(x => x !== u.id));
                      else setAwaitingFrom([...awaitingFrom, u.id]);
                    }}>
                      <div style={{ width: 14, height: 14, borderRadius: 3, border: "1.5px solid " + (checked ? "var(--brand)" : "var(--line-2)"), background: checked ? "var(--brand)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {checked && <CheckCircle2 size={10} color="white" />}
                      </div>
                      <Avatar user={u} size="av-sm" />
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 600 }}>{u.name}</div>
                        <div style={{ fontSize: 10.5, color: "var(--txt-3)" }}>{u.role}</div>
                      </div>
                    </div>
                  );
                })}
                <div style={{ padding: 6, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn btn-sm" onClick={() => setShowAwaitMenu(false)}>OK</button>
                </div>
              </div>
            )}
            <div className="chat-input-wrap">
              <input
                className="chat-input"
                placeholder={isOffice ? "Mensagem no chat geral... (use @ para mencionar)" : `Mensagem em ${project.name}... (use @ para mencionar)`}
                value={draft}
                onChange={handleInputChange}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
              />
              <input ref={fileRef} type="file" style={{ display: "none" }} onChange={e => { if (e.target.files[0]) setPendingFile(e.target.files[0].name); e.target.value = ""; }} />
              <button className="chat-input-btn" title="Anexar arquivo" onClick={() => fileRef.current?.click()}><Paperclip size={15} /></button>
              <button
                className="chat-input-btn"
                title="Marcar quem precisa responder"
                style={awaitingFrom.length > 0 ? { color: "var(--amber)" } : {}}
                onClick={() => setShowAwaitMenu(v => !v)}
              ><AlertCircle size={15} /></button>
              {!isOffice && (
                <button className="chat-input-btn" title="Vincular apontamento" onClick={() => {
                  const code = prompt("Digite o código do apontamento (ex: AP-0001):");
                  if (code) {
                    const found = projectIssues.find(i => i.code === code.toUpperCase().trim());
                    if (found) setRefIssue(found);
                    else alert("Apontamento não encontrado neste projeto");
                  }
                }}><Link2 size={15} /></button>
              )}
              <button className="chat-input-btn send" onClick={submit}><Send size={14} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== Project Gantt =====
function ProjectGantt({ data, tasks }) {
  const validTasks = tasks.filter(t => t.startDate && t.endDate);
  const { startMs, totalMs, weeks } = useMemo(() => {
    if (validTasks.length === 0) return { startMs: 0, totalMs: 0, weeks: [] };
    const starts = validTasks.map(t => new Date(t.startDate).getTime());
    const ends = validTasks.map(t => new Date(t.endDate).getTime());
    const startMs = Math.min(...starts);
    const endMs = Math.max(...ends);
    const totalMs = endMs - startMs;
    const weekMs = 7 * 24 * 3600 * 1000;
    const weekCount = Math.ceil(totalMs / weekMs) + 1;
    const weeks = Array.from({ length: weekCount }, (_, idx) => {
      const d = new Date(startMs + idx * weekMs);
      return { idx, label: `${d.getDate()}/${d.getMonth() + 1}` };
    });
    return { startMs, totalMs, weeks };
  }, [validTasks]);

  const statusColor = { pendente: "#5d6779", em_andamento: "#f0a847", concluida: "#3fcf8e" };

  return (
    <div className="card">
      {validTasks.length === 0 ? (
        <div className="empty"><div className="empty-icon"><GanttChart size={24} /></div>Nenhuma tarefa com datas neste projeto</div>
      ) : (
        <>
          <div className="gantt-header">
            <div style={{ padding: "0 14px", display: "flex", alignItems: "center" }}>Tarefa</div>
            <div className="gantt-header-track">{weeks.map(w => <div key={w.idx} className="gantt-header-cell">{w.label}</div>)}</div>
          </div>
          {validTasks.map(t => {
            const u = data.users.find(x => x.id === t.assignedTo);
            const issue = data.issues.find(i => i.id === t.issueId);
            const taskStart = new Date(t.startDate).getTime();
            const taskEnd = new Date(t.endDate).getTime();
            const left = ((taskStart - startMs) / totalMs) * 100;
            const width = Math.max(((taskEnd - taskStart) / totalMs) * 100, 2);
            return (
              <div key={t.id} className="gantt-row">
                <div className="gantt-task-name">
                  <div style={{ fontWeight: 500, fontSize: 12.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</div>
                  <div className="mono" style={{ fontSize: 10, color: "var(--txt-3)" }}>{issue?.code} · {u?.initials}</div>
                </div>
                <div className="gantt-track">
                  <div className="gantt-bar" style={{ left: `${left}%`, width: `${width}%`, background: statusColor[t.status] }}>
                    {t.title.slice(0, 30)}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

// ===== Project Documents =====
function ProjectDocuments({ data, project, docs, onUpdate, showToast }) {
  const fileInput = useRef(null);
  const handleUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newDocs = files.map(f => ({
      id: `d${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      projectId: project.id, name: f.name,
      size: f.size > 1024 * 1024 ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : `${(f.size / 1024).toFixed(1)} KB`,
      uploadedBy: "u1", uploadedAt: new Date().toISOString().split("T")[0],
    }));
    onUpdate(d => { d.documents.push(...newDocs); return d; });
    showToast(`${files.length} arquivo(s) enviado(s)`);
    e.target.value = "";
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
        <button className="btn btn-primary" onClick={() => fileInput.current?.click()}><Plus size={14} /> Enviar arquivos</button>
        <input ref={fileInput} type="file" multiple style={{ display: "none" }} onChange={handleUpload} />
      </div>
      <div className="card">
        {docs.length === 0 ? (
          <div className="empty"><div className="empty-icon"><FileText size={24} /></div>Nenhum documento neste projeto</div>
        ) : (
          <table className="tbl">
            <thead><tr><th style={{ width: 36 }}></th><th>Arquivo</th><th style={{ width: 100 }}>Tamanho</th><th style={{ width: 160 }}>Enviado por</th><th style={{ width: 120 }}>Data</th></tr></thead>
            <tbody>
              {docs.map(d => {
                const u = data.users.find(x => x.id === d.uploadedBy);
                return (
                  <tr key={d.id}>
                    <td><FileText size={16} style={{ color: "var(--txt-3)" }} /></td>
                    <td style={{ fontWeight: 500 }}>{d.name}</td>
                    <td className="mono" style={{ fontSize: 11.5, color: "var(--txt-2)" }}>{d.size}</td>
                    <td>{u && <div style={{ display: "flex", alignItems: "center", gap: 7 }}><Avatar user={u} size="av-xs" /><span style={{ fontSize: 12 }}>{u.name.split(" ")[0]}</span></div>}</td>
                    <td className="mono" style={{ fontSize: 11.5, color: "var(--txt-2)" }}>{fmtDate(d.uploadedAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

// ===== Project Hours =====
function ProjectHours({ data, hours, isProjetista }) {
  const total = hours.reduce((s, h) => s + h.hours, 0);
  const byUser = useMemo(() => {
    const m = {};
    hours.forEach(h => { m[h.userId] = (m[h.userId] || 0) + h.hours; });
    return Object.entries(m).map(([uid, h]) => ({ uid, h, user: data.users.find(u => u.id === uid) })).filter(x => x.user);
  }, [hours, data.users]);

  // Para projetista: agrupar por tarefa
  const byTask = useMemo(() => {
    if (!isProjetista) return [];
    const m = {};
    hours.forEach(h => {
      const key = h.taskId || "sem-tarefa";
      if (!m[key]) m[key] = { taskId: h.taskId, hours: 0, count: 0 };
      m[key].hours += h.hours;
      m[key].count++;
    });
    return Object.values(m)
      .map(x => ({ ...x, task: x.taskId ? data.tasks.find(t => t.id === x.taskId) : null }))
      .sort((a, b) => b.hours - a.hours);
  }, [hours, isProjetista, data.tasks]);

  // === ESTADO VAZIO ===
  if (isProjetista && hours.length === 0) {
    return (
      <div className="card" style={{ padding: 40, textAlign: "center" }}>
        <Clock size={36} color="var(--txt-3)" style={{ margin: "0 auto 14px", display: "block" }} />
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Você ainda não registrou horas neste projeto</div>
        <div style={{ fontSize: 13, color: "var(--txt-2)", maxWidth: 420, margin: "0 auto" }}>
          Você pode registrar manualmente clicando em "Registrar horas" acima, ou usar o <strong style={{ color: "var(--green)" }}>timer das tarefas</strong> — ele lança as horas automaticamente.
        </div>
      </div>
    );
  }

  // === VISÃO PROJETISTA (apenas o dele) ===
  if (isProjetista) {
    return (
      <>
        <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          <div className="kpi">
            <div className="kpi-head"><div className="kpi-icon" style={{ background: "rgba(91,141,239,0.15)" }}><Clock size={16} color="var(--brand)" /></div><div className="kpi-label">Total registrado por mim</div></div>
            <div className="kpi-value">{total.toFixed(1)}<span style={{ fontSize: 14, color: "var(--txt-3)", marginLeft: 4 }}>h</span></div>
            <div className="kpi-sub">{hours.length} lançamento{hours.length === 1 ? "" : "s"}</div>
          </div>
          <div className="kpi">
            <div className="kpi-head"><div className="kpi-icon" style={{ background: "rgba(63,207,142,0.15)" }}><CheckSquare size={16} color="var(--green)" /></div><div className="kpi-label">Tarefas trabalhadas</div></div>
            <div className="kpi-value">{byTask.filter(x => x.task).length}</div>
            <div className="kpi-sub">{byTask.filter(x => !x.task).length > 0 ? `+${byTask.filter(x => !x.task).length} sem vínculo` : "Todas vinculadas"}</div>
          </div>
          <div className="kpi">
            <div className="kpi-head"><div className="kpi-icon" style={{ background: "rgba(240,168,71,0.15)" }}><Timer size={16} color="var(--amber)" /></div><div className="kpi-label">Pelo timer</div></div>
            <div className="kpi-value">{hours.filter(h => h.fromTimer).reduce((s, h) => s + h.hours, 0).toFixed(1)}<span style={{ fontSize: 14, color: "var(--txt-3)", marginLeft: 4 }}>h</span></div>
            <div className="kpi-sub">{hours.filter(h => h.fromTimer).length} sessões cronometradas</div>
          </div>
        </div>

        <div className="chart-grid-2">
          <div className="card">
            <div className="card-head"><span className="card-title">Minhas horas por tarefa</span></div>
            <div className="card-body">
              {byTask.length === 0 ? (
                <div style={{ padding: 16, textAlign: "center", color: "var(--txt-3)", fontSize: 13 }}>Sem dados</div>
              ) : byTask.map(({ task, hours: h, taskId }) => {
                const pct = (h / total) * 100;
                return (
                  <div key={taskId || "sem-tarefa"} style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {task ? task.title : <span style={{ color: "var(--txt-3)", fontStyle: "italic" }}>Sem tarefa vinculada</span>}
                        </div>
                        {task && <div style={{ fontSize: 10.5, color: "var(--txt-3)" }} className="mono">{task.discipline}</div>}
                      </div>
                      <span className="mono" style={{ fontWeight: 700, color: "var(--brand)" }}>{h.toFixed(1)}h</span>
                    </div>
                    <div style={{ height: 4, background: "var(--bg-4)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: "var(--brand)" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card">
            <div className="card-head"><span className="card-title">Meus lançamentos</span></div>
            <div>
              {hours.slice().reverse().slice(0, 10).map(h => {
                const t = data.tasks.find(x => x.id === h.taskId);
                return (
                  <div key={h.id} style={{ padding: "10px 16px", borderBottom: "1px solid var(--line)", fontSize: 12.5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {h.fromTimer && <Timer size={11} color="var(--green)" />}
                      <span style={{ flex: 1, fontWeight: 600 }}>{h.description}</span>
                      <span className="mono" style={{ color: "var(--brand)", fontWeight: 700 }}>{h.hours.toFixed(1)}h</span>
                    </div>
                    {t && <div style={{ color: "var(--txt-3)", fontSize: 11, marginTop: 3 }}>{t.title}</div>}
                    <div className="mono" style={{ color: "var(--txt-3)", fontSize: 10, marginTop: 3 }}>{fmtDate(h.date)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  // === VISÃO COORDENADOR / GERENTE / ADMIN (tudo) ===
  return (
    <>
      <div className="kpi-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="kpi"><div className="kpi-head"><div className="kpi-icon" style={{ background: "rgba(91,141,239,0.15)" }}><Clock size={16} color="var(--brand)" /></div><div className="kpi-label">Total no projeto</div></div><div className="kpi-value">{total.toFixed(1)}<span style={{ fontSize: 14, color: "var(--txt-3)", marginLeft: 4 }}>h</span></div></div>
        <div className="kpi"><div className="kpi-head"><div className="kpi-icon" style={{ background: "rgba(63,207,142,0.15)" }}><Users size={16} color="var(--green)" /></div><div className="kpi-label">Pessoas envolvidas</div></div><div className="kpi-value">{byUser.length}</div></div>
        <div className="kpi"><div className="kpi-head"><div className="kpi-icon" style={{ background: "rgba(180,135,245,0.15)" }}><TrendingUp size={16} color="var(--purple)" /></div><div className="kpi-label">Média por pessoa</div></div><div className="kpi-value">{byUser.length ? (total / byUser.length).toFixed(1) : 0}<span style={{ fontSize: 14, color: "var(--txt-3)", marginLeft: 4 }}>h</span></div></div>
      </div>

      <div className="chart-grid-2">
        <div className="card">
          <div className="card-head"><span className="card-title">Distribuição por pessoa</span></div>
          <div className="card-body">
            {byUser.map(({ user, h }) => {
              const pct = (h / total) * 100;
              return (
                <div key={user.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
                  <Avatar user={user} size="av-sm" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600 }}>{user.name}</div>
                    <div style={{ marginTop: 4, height: 4, background: "var(--bg-4)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: "var(--brand)" }} />
                    </div>
                  </div>
                  <span className="mono" style={{ fontWeight: 600, color: "var(--brand)" }}>{h.toFixed(1)}h</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card">
          <div className="card-head"><span className="card-title">Lançamentos recentes</span></div>
          <div>
            {hours.slice(-8).reverse().map(h => {
              const u = data.users.find(x => x.id === h.userId);
              return (
                <div key={h.id} style={{ padding: "10px 16px", borderBottom: "1px solid var(--line)", fontSize: 12.5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar user={u} size="av-xs" />
                    <strong>{u?.name.split(" ")[0]}</strong>
                    {h.fromTimer && <Timer size={10} color="var(--green)" title="Timer" />}
                    <span className="mono" style={{ marginLeft: "auto", color: "var(--brand)", fontWeight: 700 }}>{h.hours.toFixed(1)}h</span>
                  </div>
                  <div style={{ color: "var(--txt-2)", fontSize: 12, marginTop: 3 }}>{h.description}</div>
                  <div className="mono" style={{ color: "var(--txt-3)", fontSize: 10, marginTop: 3 }}>{fmtDate(h.date)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// ISSUE DETAIL MODAL
// ============================================================
function IssueDetailModal({ issue, data, onClose, onStatusChange, onAssigneeChange, onAddComment, onDelete }) {
  const [tab, setTab] = useState("comments");
  const [comment, setComment] = useState("");
  const project = data.projects.find(p => p.id === issue.projectId);
  const comments = data.comments.filter(c => c.issueId === issue.id).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const history = data.history.filter(h => h.issueId === issue.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const tasks = data.tasks.filter(t => t.issueId === issue.id);

  const submitComment = () => {
    if (!comment.trim()) return;
    onAddComment(issue.id, comment.trim());
    setComment("");
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 1000, height: "85vh" }} onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--txt-3)", padding: "3px 8px", background: "var(--bg-3)", borderRadius: 4 }}>{issue.code}</span>
            <span className={`disc d-${issue.responsibleDiscipline}`}>{issue.responsibleDiscipline}</span>
            {priorityBadge(issue.priority)}
            <span style={{ fontSize: 12, color: "var(--txt-3)" }}>· {project?.name}</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(issue.id)}><Trash2 size={12} /></button>
            <button className="modal-close" onClick={onClose}><X size={18} /></button>
          </div>
        </div>

        <div className="detail-layout" style={{ flex: 1, overflow: "hidden" }}>
          <div className="detail-main">
            <div className="detail-title">{issue.title}</div>
            <div style={{ color: "var(--txt-2)", fontSize: 13.5, lineHeight: 1.6, marginBottom: 16 }}>{issue.description}</div>

            <div className="tabs" style={{ marginBottom: 16 }}>
              <button className={`tab ${tab === "comments" ? "active" : ""}`} onClick={() => setTab("comments")}><MessageSquare size={12} /> Comentários ({comments.length})</button>
              <button className={`tab ${tab === "history" ? "active" : ""}`} onClick={() => setTab("history")}><History size={12} /> Histórico ({history.length})</button>
              <button className={`tab ${tab === "tasks" ? "active" : ""}`} onClick={() => setTab("tasks")}><ListChecks size={12} /> Tarefas ({tasks.length})</button>
            </div>

            {tab === "comments" && (
              <>
                <div style={{ marginBottom: 14 }}>
                  {comments.length === 0 && <div style={{ color: "var(--txt-3)", fontSize: 13, padding: "20px 0", textAlign: "center" }}>Nenhum comentário ainda</div>}
                  {comments.map(c => {
                    const u = data.users.find(x => x.id === c.userId);
                    return (
                      <div key={c.id} className="cmt">
                        <div className="cmt-head">
                          <Avatar user={u} size="av-sm" />
                          <span className="cmt-author">{u?.name}</span>
                          <span className={`disc d-${u?.discipline}`}>{u?.discipline}</span>
                          <span className="cmt-time">{fmtDateTime(c.createdAt)}</span>
                        </div>
                        <div className="cmt-body">{renderRichText(c.text, data.users, data.issues)}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input className="inp" placeholder="Comentário (use @ para mencionar)" value={comment} onChange={e => setComment(e.target.value)} onKeyDown={e => { if (e.key === "Enter") submitComment(); }} />
                  <button className="btn btn-primary" onClick={submitComment}><Send size={14} /></button>
                </div>
              </>
            )}

            {tab === "history" && (
              <div>
                {history.length === 0 && <div style={{ color: "var(--txt-3)", fontSize: 13, padding: "20px 0", textAlign: "center" }}>Sem registros</div>}
                {history.map(h => {
                  const u = data.users.find(x => x.id === h.userId);
                  return (
                    <div key={h.id} className="history-item">
                      <div className="history-icon"><Activity size={11} /></div>
                      <div style={{ flex: 1 }}>
                        <div><strong style={{ color: "var(--txt)" }}>{u?.name}</strong> — {h.details}</div>
                        <div className="history-time">{fmtDateTime(h.createdAt)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {tab === "tasks" && (
              <div>
                {tasks.length === 0 && <div style={{ color: "var(--txt-3)", fontSize: 13, padding: "20px 0", textAlign: "center" }}>Nenhuma tarefa vinculada</div>}
                {tasks.map(t => {
                  const u = data.users.find(x => x.id === t.assignedTo);
                  return (
                    <div key={t.id} className="cmt" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Circle size={14} style={{ color: t.status === "concluida" ? "var(--green)" : "var(--txt-3)" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{t.title}</div>
                        <div className="mono" style={{ fontSize: 10, color: "var(--txt-3)", marginTop: 2 }}>{fmtDate(t.startDate)} → {fmtDate(t.endDate)}</div>
                      </div>
                      {u && <Avatar user={u} size="av-sm" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="detail-side">
            <div className="det-section-title"><Tag size={11} /> Status</div>
            <select className="select" style={{ width: "100%", marginBottom: 14 }} value={issue.status} onChange={e => onStatusChange(issue.id, e.target.value)}>
              {STATUSES.map(s => <option key={s} value={s}>{STATUS_LBL[s]}</option>)}
            </select>
            <div className="det-section-title"><User size={11} /> Responsável</div>
            <select className="select" style={{ width: "100%", marginBottom: 14 }} value={issue.assignedTo || ""} onChange={e => onAssigneeChange(issue.id, e.target.value)}>
              {data.users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </select>
            <div className="det-section">
              <div className="det-section-title">Detalhes</div>
              <div className="fld"><span className="fld-lbl">Disciplina</span><span className="fld-val"><span className={`disc d-${issue.responsibleDiscipline}`}>{issue.responsibleDiscipline}</span></span></div>
              <div className="fld"><span className="fld-lbl">Afetadas</span><span className="fld-val" style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{issue.affectedDisciplines?.map(d => <span key={d} className={`disc d-${d}`}>{d}</span>)}</span></div>
              <div className="fld"><span className="fld-lbl">Prioridade</span><span className="fld-val">{priorityBadge(issue.priority)}</span></div>
              <div className="fld"><span className="fld-lbl">Prazo</span><span className="fld-val mono" style={{ fontSize: 12 }}>{fmtDate(issue.dueDate)}</span></div>
              <div className="fld"><span className="fld-lbl">Local</span><span className="fld-val" style={{ fontSize: 12 }}>{issue.location || "—"}</span></div>
              <div className="fld"><span className="fld-lbl">Versão</span><span className="fld-val mono" style={{ fontSize: 12 }}>{issue.version || "—"}</span></div>
              <div className="fld"><span className="fld-lbl">Criado</span><span className="fld-val mono" style={{ fontSize: 12 }}>{fmtDate(issue.createdAt)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MODALS DE CRIAÇÃO
// ============================================================
function NewIssueModal({ data, defaultProjectId, onClose, onCreate }) {
  const [form, setForm] = useState({
    projectId: defaultProjectId || data.projects[0]?.id || "",
    title: "", description: "", responsibleDiscipline: "ARQ",
    affectedDisciplines: ["ARQ"], priority: "media", status: "aberto",
    assignedTo: data.users[0]?.id || "", dueDate: "", location: "", version: "",
  });

  const submit = () => { if (!form.title.trim()) return alert("Informe um título"); onCreate(form); };
  const toggleAffected = (d) => setForm(f => ({ ...f, affectedDisciplines: f.affectedDisciplines.includes(d) ? f.affectedDisciplines.filter(x => x !== d) : [...f.affectedDisciplines, d] }));

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ fontSize: 15, fontWeight: 700 }}>Novo Apontamento</div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body" style={{ padding: 22 }}>
          <div className="fg"><label className="lbl">Título *</label><input className="inp" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Ex: Conflito entre viga V10 e duto..." /></div>
          <div className="fg"><label className="lbl">Descrição</label><textarea className="ta" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
          <div className="fg2">
            <div className="fg"><label className="lbl">Projeto *</label><select className="inp" value={form.projectId} onChange={e => setForm(f => ({ ...f, projectId: e.target.value }))}>{data.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
            <div className="fg"><label className="lbl">Responsável</label><select className="inp" value={form.assignedTo} onChange={e => setForm(f => ({ ...f, assignedTo: e.target.value }))}>{data.users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}</select></div>
          </div>
          <div className="fg2">
            <div className="fg"><label className="lbl">Disciplina responsável</label><select className="inp" value={form.responsibleDiscipline} onChange={e => setForm(f => ({ ...f, responsibleDiscipline: e.target.value }))}>{getDisciplineCodes(data).map(d => <option key={d} value={d}>{getDisciplineName(data, d)}</option>)}</select></div>
            <div className="fg"><label className="lbl">Prioridade</label><select className="inp" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>{PRIORITIES.map(p => <option key={p} value={p}>{PRIORITY_LBL[p]}</option>)}</select></div>
          </div>
          <div className="fg">
            <label className="lbl">Disciplinas afetadas</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {getDisciplineCodes(data).map(d => (
                <button key={d} type="button" onClick={() => toggleAffected(d)} className={`disc d-${d}`} style={{ cursor: "pointer", padding: "5px 10px", border: form.affectedDisciplines.includes(d) ? "1px solid currentColor" : "1px solid var(--line)", opacity: form.affectedDisciplines.includes(d) ? 1 : 0.5, background: getDisciplineColor(data, d) + "26", color: getDisciplineColor(data, d) }}>{d}</button>
              ))}
            </div>
          </div>
          <div className="fg2">
            <div className="fg"><label className="lbl">Status</label><select className="inp" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>{STATUSES.map(s => <option key={s} value={s}>{STATUS_LBL[s]}</option>)}</select></div>
            <div className="fg"><label className="lbl">Data limite</label><input type="date" className="inp" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} /></div>
          </div>
          <div className="fg2">
            <div className="fg"><label className="lbl">Localização</label><input className="inp" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Ex: Pav. 3 - Eixo B/4" /></div>
            <div className="fg"><label className="lbl">Versão</label><input className="inp" value={form.version} onChange={e => setForm(f => ({ ...f, version: e.target.value }))} placeholder="Ex: v2.1" /></div>
          </div>
        </div>
        <div style={{ padding: 16, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={submit}>Criar apontamento</button>
        </div>
      </div>
    </div>
  );
}

function NewProjectModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ name: "", client: "", startDate: "", endDate: "", status: "ativo" });
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 520 }} onClick={e => e.stopPropagation()}>
        <div className="modal-head"><div style={{ fontSize: 15, fontWeight: 700 }}>Novo Projeto</div><button className="modal-close" onClick={onClose}><X size={18} /></button></div>
        <div className="modal-body" style={{ padding: 22 }}>
          <div className="fg"><label className="lbl">Nome do projeto *</label><input className="inp" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
          <div className="fg"><label className="lbl">Cliente</label><input className="inp" value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} /></div>
          <div className="fg2">
            <div className="fg"><label className="lbl">Início</label><input type="date" className="inp" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} /></div>
            <div className="fg"><label className="lbl">Fim</label><input type="date" className="inp" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} /></div>
          </div>
        </div>
        <div style={{ padding: 16, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => { if (!form.name.trim()) return alert("Informe um nome"); onCreate(form); }}>Criar projeto</button>
        </div>
      </div>
    </div>
  );
}

function NewTaskModal({ data, defaultProjectId, onClose, onCreate }) {
  const [form, setForm] = useState({
    title: "", projectId: defaultProjectId || data.projects[0]?.id || "",
    issueId: "", assignedTo: data.users[0]?.id || "", status: "aguardando",
    startDate: new Date().toISOString().split("T")[0], endDate: "", discipline: "ARQ",
  });
  const projectIssues = data.issues.filter(i => i.projectId === form.projectId);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 580 }} onClick={e => e.stopPropagation()}>
        <div className="modal-head"><div style={{ fontSize: 15, fontWeight: 700 }}>Nova Tarefa</div><button className="modal-close" onClick={onClose}><X size={18} /></button></div>
        <div className="modal-body" style={{ padding: 22 }}>
          <div className="fg"><label className="lbl">Título *</label><input className="inp" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
          <div className="fg2">
            <div className="fg"><label className="lbl">Projeto *</label><select className="inp" value={form.projectId} onChange={e => setForm(f => ({ ...f, projectId: e.target.value, issueId: "" }))}>{data.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
            <div className="fg"><label className="lbl">Disciplina</label><select className="inp" value={form.discipline} onChange={e => setForm(f => ({ ...f, discipline: e.target.value }))}>{getDisciplineCodes(data).map(d => <option key={d} value={d}>{getDisciplineName(data, d)}</option>)}</select></div>
          </div>
          <div className="fg"><label className="lbl">Apontamento (opcional)</label><select className="inp" value={form.issueId} onChange={e => setForm(f => ({ ...f, issueId: e.target.value }))}><option value="">— Nenhum —</option>{projectIssues.map(i => <option key={i.id} value={i.id}>{i.code} — {i.title.slice(0, 50)}</option>)}</select></div>
          <div className="fg2">
            <div className="fg"><label className="lbl">Responsável</label><select className="inp" value={form.assignedTo} onChange={e => setForm(f => ({ ...f, assignedTo: e.target.value }))}>{data.users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}</select></div>
            <div className="fg"><label className="lbl">Status</label><select className="inp" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}><option value="pendente">Pendente</option><option value="em_andamento">Em andamento</option><option value="concluida">Concluída</option></select></div>
          </div>
          <div className="fg2">
            <div className="fg"><label className="lbl">Início</label><input type="date" className="inp" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} /></div>
            <div className="fg"><label className="lbl">Fim</label><input type="date" className="inp" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} /></div>
          </div>
        </div>
        <div style={{ padding: 16, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => { if (!form.title.trim()) return alert("Informe um título"); onCreate(form); }}>Criar tarefa</button>
        </div>
      </div>
    </div>
  );
}

function NewHoursModal({ data, defaultProjectId, currentUserId, onClose, onCreate }) {
  const [form, setForm] = useState({
    userId: currentUserId, projectId: defaultProjectId || data.projects[0]?.id || "",
    issueId: "", taskId: "", date: new Date().toISOString().split("T")[0], hours: 1, description: "",
  });
  const projectIssues = data.issues.filter(i => i.projectId === form.projectId);
  const issueTasks = data.tasks.filter(t => t.issueId === form.issueId);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 580 }} onClick={e => e.stopPropagation()}>
        <div className="modal-head"><div style={{ fontSize: 15, fontWeight: 700 }}>Registrar Horas</div><button className="modal-close" onClick={onClose}><X size={18} /></button></div>
        <div className="modal-body" style={{ padding: 22 }}>
          <div className="fg2">
            <div className="fg"><label className="lbl">Usuário</label><select className="inp" value={form.userId} onChange={e => setForm(f => ({ ...f, userId: e.target.value }))}>{data.users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}</select></div>
            <div className="fg"><label className="lbl">Data</label><input type="date" className="inp" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
          </div>
          <div className="fg"><label className="lbl">Projeto</label><select className="inp" value={form.projectId} onChange={e => setForm(f => ({ ...f, projectId: e.target.value, issueId: "", taskId: "" }))}>{data.projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
          <div className="fg2">
            <div className="fg"><label className="lbl">Apontamento</label><select className="inp" value={form.issueId} onChange={e => setForm(f => ({ ...f, issueId: e.target.value, taskId: "" }))}><option value="">— Nenhum —</option>{projectIssues.map(i => <option key={i.id} value={i.id}>{i.code}</option>)}</select></div>
            <div className="fg"><label className="lbl">Tarefa</label><select className="inp" value={form.taskId} onChange={e => setForm(f => ({ ...f, taskId: e.target.value }))}><option value="">— Nenhuma —</option>{issueTasks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}</select></div>
          </div>
          <div className="fg" style={{ width: "50%" }}><label className="lbl">Horas</label><input type="number" step="0.25" min="0" className="inp" value={form.hours} onChange={e => setForm(f => ({ ...f, hours: e.target.value }))} /></div>
          <div className="fg"><label className="lbl">Descrição *</label><textarea className="ta" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="O que foi feito?" /></div>
        </div>
        <div style={{ padding: 16, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => { if (!form.description.trim()) return alert("Informe descrição"); if (!form.hours || form.hours <= 0) return alert("Horas inválidas"); onCreate({ ...form, hours: parseFloat(form.hours) }); }}>Registrar</button>
        </div>
      </div>
    </div>
  );
}

function NewUserModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ name: "", role: "", discipline: "ARQ", access: "projetista" });
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
        <div className="modal-head"><div style={{ fontSize: 15, fontWeight: 700 }}>Novo Usuário</div><button className="modal-close" onClick={onClose}><X size={18} /></button></div>
        <div className="modal-body" style={{ padding: 22 }}>
          <div className="fg"><label className="lbl">Nome completo *</label><input className="inp" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
          <div className="fg"><label className="lbl">Função *</label><input className="inp" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Ex: Projetista Sênior" /></div>
          <div className="fg2">
            <div className="fg"><label className="lbl">Disciplina</label><select className="inp" value={form.discipline} onChange={e => setForm(f => ({ ...f, discipline: e.target.value }))}>{getDisciplineCodes(data).map(d => <option key={d} value={d}>{getDisciplineName(data, d)}</option>)}</select></div>
            <div className="fg"><label className="lbl">Nível de acesso</label><select className="inp" value={form.access} onChange={e => setForm(f => ({ ...f, access: e.target.value }))}><option value="projetista">Projetista</option><option value="coordenador">Coordenador</option><option value="gerente">Gerente</option><option value="admin">Administrador</option></select></div>
          </div>
        </div>
        <div style={{ padding: 16, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => { if (!form.name.trim() || !form.role.trim()) return alert("Preencha nome e função"); onCreate(form); }}>Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// TEAM
// ============================================================
function TeamView({ data, onNew, onUpdate }) {
  return (
    <>
      <div className="page-head">
        <div><h1 className="page-title">Equipe</h1><div className="page-meta">{data.users.length} usuários no escritório</div></div>
        <button className="btn btn-primary" onClick={onNew}><Plus size={14} /> Novo usuário</button>
      </div>

      <div className="card">
        <table className="tbl">
          <thead><tr><th style={{ width: 50 }}></th><th>Nome</th><th style={{ width: 200 }}>Função</th><th style={{ width: 100 }}>Disciplina</th><th style={{ width: 160 }}>Acesso</th><th style={{ width: 100 }}>Apont.</th><th style={{ width: 60 }}></th></tr></thead>
          <tbody>
            {data.users.map(u => {
              const issues = data.issues.filter(i => i.assignedTo === u.id).length;
              const Icon = ROLES[u.access].icon;
              return (
                <tr key={u.id}>
                  <td><Avatar user={u} /></td>
                  <td style={{ fontWeight: 600 }}>{u.name}</td>
                  <td style={{ color: "var(--txt-2)", fontSize: 12.5 }}>{u.role}</td>
                  <td><span className={`disc d-${u.discipline}`}>{u.discipline}</span></td>
                  <td>
                    <span className="pill"><Icon size={11} color={ROLES[u.access].color} /> {ROLES[u.access].label}</span>
                  </td>
                  <td className="mono">{issues}</td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => { if (confirm("Remover usuário?")) onUpdate(d => { d.users = d.users.filter(x => x.id !== u.id); return d; }); }}><Trash2 size={12} /></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ============================================================
// SETTINGS
// ============================================================
function SettingsView({ data, role, onUpdate, showToast, onReset }) {
  const canManage = role === "admin" || role === "coordenador";

  // Estado dos modais de disciplinas
  const [discModal, setDiscModal] = useState(null); // null | "new" | { mode: "edit", disc }
  const [confirmDelete, setConfirmDelete] = useState(null); // disc a confirmar exclusão

  // Conta uso de uma disciplina (apontamentos + tarefas)
  const usageOf = (code) => {
    const issues = data.issues.filter(i => i.responsibleDiscipline === code || (i.affectedDisciplines || []).includes(code)).length;
    const tasks = data.tasks.filter(t => t.discipline === code).length;
    const users = data.users.filter(u => u.discipline === code).length;
    return { issues, tasks, users, total: issues + tasks + users };
  };

  const saveDiscipline = (payload, originalCode) => {
    onUpdate(d => {
      const code = payload.code.trim().toUpperCase();
      if (originalCode && originalCode !== code) {
        // mudou o código — atualizar todas as referências em apontamentos/tarefas/usuários
        d.issues = d.issues.map(i => ({
          ...i,
          responsibleDiscipline: i.responsibleDiscipline === originalCode ? code : i.responsibleDiscipline,
          affectedDisciplines: (i.affectedDisciplines || []).map(x => x === originalCode ? code : x),
        }));
        d.tasks = d.tasks.map(t => t.discipline === originalCode ? { ...t, discipline: code } : t);
        d.users = d.users.map(u => u.discipline === originalCode ? { ...u, discipline: code } : u);
      }
      if (originalCode) {
        // edição
        d.disciplines = d.disciplines.map(x => x.code === originalCode ? { ...x, code, name: payload.name.trim(), color: payload.color } : x);
      } else {
        // novo
        d.disciplines = [...d.disciplines, { code, name: payload.name.trim(), color: payload.color, isDefault: false }];
      }
      return d;
    });
    showToast?.(originalCode ? "Disciplina atualizada" : "Disciplina adicionada");
    setDiscModal(null);
  };

  const doDelete = (disc) => {
    onUpdate(d => {
      d.disciplines = d.disciplines.filter(x => x.code !== disc.code);
      return d;
    });
    showToast?.("Disciplina excluída");
    setConfirmDelete(null);
  };

  return (
    <>
      <div className="page-head"><div><h1 className="page-title">Configurações</h1><div className="page-meta">Preferências do escritório</div></div></div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="card">
          <div className="card-head"><span className="card-title">Escritório</span></div>
          <div className="card-body">
            <div className="fld"><span className="fld-lbl">Nome</span><span className="fld-val">{data.tenant.name}</span></div>
            <div className="fld"><span className="fld-lbl">Plano</span><span className="fld-val"><span className="badge" style={{ background: "var(--brand-dim)", color: "var(--brand)" }}>{data.tenant.plan}</span></span></div>
            <div className="fld"><span className="fld-lbl">Usuários</span><span className="fld-val mono">{data.users.length}</span></div>
            <div className="fld"><span className="fld-lbl">Projetos</span><span className="fld-val mono">{data.projects.length}</span></div>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><span className="card-title">Workflow de apontamentos</span></div>
          <div className="card-body">
            {STATUSES.map((s, idx) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", background: "var(--bg-3)", borderRadius: 6, marginBottom: 6 }}>
                <span className="mono" style={{ fontSize: 10, color: "var(--txt-3)", width: 20 }}>{String(idx + 1).padStart(2, "0")}</span>
                <span className="dot" style={{ background: STATUS_CLR[s] }} />
                <span style={{ fontSize: 13, fontWeight: 500 }}>{STATUS_LBL[s]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DISCIPLINAS — gerenciamento completo */}
        <div className="card" style={{ gridColumn: "1 / -1" }}>
          <div className="card-head">
            <div>
              <span className="card-title">Disciplinas técnicas</span>
              <div style={{ fontSize: 11.5, color: "var(--txt-3)", marginTop: 3 }}>
                {data.disciplines.length} disciplinas configuradas
                {!canManage && " · só admin/coordenador podem editar"}
              </div>
            </div>
            {canManage && (
              <button className="btn btn-primary btn-sm" onClick={() => setDiscModal("new")}>
                <Plus size={13} /> Nova disciplina
              </button>
            )}
          </div>
          <div className="card-body">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
              {data.disciplines.map(disc => {
                const usage = usageOf(disc.code);
                return (
                  <div key={disc.code} style={{
                    background: "var(--bg-3)",
                    border: "1px solid var(--line)",
                    borderRadius: 8,
                    padding: 12,
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                  }}>
                    <span style={{
                      width: 38, height: 38,
                      borderRadius: 7,
                      background: disc.color + "26",
                      color: disc.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 11.5,
                      fontFamily: "JetBrains Mono, monospace",
                      letterSpacing: "0.04em",
                      border: `1px solid ${disc.color}40`,
                      flexShrink: 0,
                    }}>{disc.code}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {disc.name}
                      </div>
                      <div style={{ fontSize: 10.5, color: "var(--txt-3)", marginTop: 2, fontFamily: "JetBrains Mono, monospace" }}>
                        {disc.isDefault && <span style={{ color: "var(--brand)", marginRight: 6 }}>● padrão</span>}
                        {usage.total === 0 ? "sem uso" : `${usage.issues} ap · ${usage.tasks} tar`}
                      </div>
                    </div>
                    {canManage && (
                      <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                        <button
                          className="icon-btn"
                          style={{ width: 28, height: 28 }}
                          onClick={() => setDiscModal({ mode: "edit", disc })}
                          title="Editar"
                        >
                          <Settings size={13} />
                        </button>
                        <button
                          className="icon-btn"
                          style={{ width: 28, height: 28, color: "var(--red)" }}
                          onClick={() => setConfirmDelete(disc)}
                          title="Excluir"
                          disabled={data.disciplines.length <= 1}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {data.disciplines.length === 0 && (
              <div style={{ textAlign: "center", color: "var(--txt-3)", padding: 24, fontSize: 13 }}>
                Nenhuma disciplina configurada. Adicione a primeira clicando em "Nova disciplina".
              </div>
            )}
          </div>
        </div>

        <div className="card" style={{ gridColumn: "1 / -1" }}>
          <div className="card-head"><span className="card-title">Dados</span></div>
          <div className="card-body">
            <div style={{ fontSize: 12.5, color: "var(--txt-2)", marginBottom: 14, lineHeight: 1.6 }}>Restaure os dados de exemplo a qualquer momento.</div>
            <button className="btn btn-secondary" onClick={onReset}><Activity size={14} /> Restaurar dados de exemplo</button>
          </div>
        </div>
      </div>

      {/* MODAL: nova / editar disciplina */}
      {discModal && (
        <DisciplineModal
          mode={discModal === "new" ? "new" : "edit"}
          disc={discModal !== "new" ? discModal.disc : null}
          existingCodes={data.disciplines.map(d => d.code)}
          onClose={() => setDiscModal(null)}
          onSave={saveDiscipline}
        />
      )}

      {/* CONFIRMAÇÃO DE EXCLUSÃO */}
      {confirmDelete && (() => {
        const usage = usageOf(confirmDelete.code);
        const hasUsage = usage.total > 0;
        return (
          <div className="overlay" onClick={() => setConfirmDelete(null)}>
            <div className="modal" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
              <div className="modal-head">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: hasUsage ? "rgba(239,93,111,0.15)" : "rgba(240,168,71,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <AlertCircle size={18} color={hasUsage ? "var(--red)" : "var(--amber)"} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Excluir "{confirmDelete.code} {confirmDelete.name}"?</div>
                </div>
                <button className="modal-close" onClick={() => setConfirmDelete(null)}><X size={18} /></button>
              </div>
              <div className="modal-body" style={{ padding: 22 }}>
                {hasUsage ? (
                  <>
                    <p style={{ margin: "0 0 14px", fontSize: 13.5, lineHeight: 1.55 }}>
                      <strong style={{ color: "var(--red)" }}>Atenção:</strong> esta disciplina está em uso e será removida das referências:
                    </p>
                    <div style={{ background: "var(--bg-3)", border: "1px solid var(--line)", borderRadius: 8, padding: 12, fontSize: 12.5, color: "var(--txt-2)" }}>
                      {usage.issues > 0 && <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}><span>Apontamentos referenciando:</span><span className="mono" style={{ color: "var(--red)", fontWeight: 700 }}>{usage.issues}</span></div>}
                      {usage.tasks > 0 && <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}><span>Tarefas vinculadas:</span><span className="mono" style={{ color: "var(--red)", fontWeight: 700 }}>{usage.tasks}</span></div>}
                      {usage.users > 0 && <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}><span>Usuários com esta disciplina:</span><span className="mono" style={{ color: "var(--red)", fontWeight: 700 }}>{usage.users}</span></div>}
                    </div>
                    <p style={{ marginTop: 12, fontSize: 11.5, color: "var(--txt-3)" }}>
                      Os registros vão manter o código antigo, mas a disciplina não aparecerá mais nas listas.
                      Recomendado: <strong>editar</strong> em vez de excluir.
                    </p>
                  </>
                ) : (
                  <p style={{ margin: 0, fontSize: 13.5, color: "var(--txt-2)" }}>
                    Esta disciplina não está em uso. Pode excluir com segurança.
                  </p>
                )}
              </div>
              <div className="modal-foot">
                <button className="btn btn-secondary" onClick={() => setConfirmDelete(null)}>Cancelar</button>
                <button className="btn" style={{ background: "var(--red)", color: "white", border: "1px solid var(--red)" }} onClick={() => doDelete(confirmDelete)}>
                  <Trash2 size={13} /> Excluir mesmo assim
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}

// ===== Modal: nova/editar disciplina =====
function DisciplineModal({ mode, disc, existingCodes, onClose, onSave }) {
  const [form, setForm] = useState(() => disc
    ? { code: disc.code, name: disc.name, color: disc.color }
    : { code: "", name: "", color: "#5b8def" }
  );
  const [error, setError] = useState("");

  const palette = [
    "#5b8def", "#3fcf8e", "#f0a847", "#ef5d6f", "#b487f5",
    "#4fd1c5", "#7e6dff", "#ec4899", "#f59e0b", "#10b981",
    "#06b6d4", "#a855f7"
  ];

  const handleSave = () => {
    const code = form.code.trim().toUpperCase();
    const name = form.name.trim();
    if (!code) { setError("Sigla é obrigatória"); return; }
    if (code.length > 6) { setError("Sigla máximo 6 caracteres"); return; }
    if (!/^[A-ZÀ-Ú]+$/.test(code)) { setError("Sigla só pode ter letras"); return; }
    if (!name) { setError("Nome é obrigatório"); return; }
    // Verifica duplicidade (mas permite manter o próprio código quando editando)
    const isDuplicate = existingCodes.includes(code) && (!disc || disc.code !== code);
    if (isDuplicate) { setError(`Sigla "${code}" já existe`); return; }
    onSave({ code, name, color: form.color }, disc?.code);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ fontSize: 15, fontWeight: 700 }}>{mode === "edit" ? "Editar disciplina" : "Nova disciplina"}</div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body" style={{ padding: 22 }}>
          {/* Preview */}
          <div style={{ marginBottom: 18, padding: 14, background: "var(--bg-3)", borderRadius: 8, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              width: 44, height: 44,
              borderRadius: 8,
              background: form.color + "26",
              color: form.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 13,
              fontFamily: "JetBrains Mono, monospace",
              letterSpacing: "0.04em",
              border: `1px solid ${form.color}40`,
            }}>{form.code.toUpperCase() || "—"}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{form.name || "Nome da disciplina"}</div>
              <div style={{ fontSize: 11, color: "var(--txt-3)", marginTop: 2 }}>Pré-visualização</div>
            </div>
          </div>

          <div className="fg2">
            <div className="fg">
              <label className="lbl">Sigla * <span style={{ color: "var(--txt-3)", fontWeight: 400, textTransform: "none" }}>(2-6 letras)</span></label>
              <input
                className="inp mono"
                value={form.code}
                onChange={e => { setForm(f => ({ ...f, code: e.target.value.toUpperCase().replace(/[^A-ZÀ-Ú]/g, "") })); setError(""); }}
                placeholder="Ex: PAI"
                maxLength={6}
                style={{ textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}
              />
            </div>
            <div className="fg">
              <label className="lbl">Nome completo *</label>
              <input
                className="inp"
                value={form.name}
                onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setError(""); }}
                placeholder="Ex: Paisagismo"
              />
            </div>
          </div>

          <div className="fg">
            <label className="lbl">Cor</label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {palette.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, color }))}
                  style={{
                    width: 32, height: 32,
                    borderRadius: 6,
                    background: color,
                    border: form.color === color ? "2px solid white" : "2px solid transparent",
                    boxShadow: form.color === color ? `0 0 0 2px ${color}` : "none",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                />
              ))}
            </div>
          </div>

          {error && (
            <div style={{ marginTop: 14, padding: "8px 12px", background: "rgba(239,93,111,0.1)", border: "1px solid rgba(239,93,111,0.3)", borderRadius: 6, fontSize: 12.5, color: "var(--red)" }}>
              {error}
            </div>
          )}

          {disc && disc.isDefault && (
            <div style={{ marginTop: 14, padding: "8px 12px", background: "rgba(91,141,239,0.08)", border: "1px solid rgba(91,141,239,0.2)", borderRadius: 6, fontSize: 11.5, color: "var(--txt-2)" }}>
              Esta é uma disciplina padrão do sistema. Editar é permitido, mas alterar a sigla atualizará todas as referências em apontamentos, tarefas e usuários.
            </div>
          )}
        </div>
        <div className="modal-foot">
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSave}>
            {mode === "edit" ? "Salvar alterações" : "Adicionar disciplina"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// NOTIF POPOVER
// ============================================================
function NotifPopover({ notifications, data, onClick, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (!e.target.closest(".notif-pop") && !e.target.closest(".notif-btn")) onClose(); };
    setTimeout(() => document.addEventListener("click", handler), 0);
    return () => document.removeEventListener("click", handler);
  }, [onClose]);

  return (
    <div className="notif-pop" onClick={e => e.stopPropagation()}>
      <div className="notif-head">Notificações</div>
      <div className="notif-list">
        {notifications.length === 0 && <div style={{ padding: 24, textAlign: "center", color: "var(--txt-3)", fontSize: 12.5 }}>Sem notificações</div>}
        {notifications.map(n => {
          const isLate = n.type === "deadline-late";
          const isSoon = n.type === "deadline-soon";
          const bgIcon =
            n.type === "mention" ? "rgba(180,135,245,0.15)" :
            n.type === "issue" ? "rgba(239,93,111,0.15)" :
            isLate ? "rgba(239,93,111,0.15)" :
            isSoon ? "rgba(240,168,71,0.15)" :
            "rgba(91,141,239,0.15)";
          return (
            <div key={n.id} className={`notif-item ${!n.read ? "unread" : ""}`} onClick={() => onClick(n)}>
              <div style={{ width: 26, height: 26, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: bgIcon }}>
                {n.type === "mention" && <AtSign size={13} color="var(--purple)" />}
                {n.type === "issue" && <AlertOctagon size={13} color="var(--red)" />}
                {n.type === "task" && <CheckSquare size={13} color="var(--brand)" />}
                {isLate && <AlertCircle size={13} color="var(--red)" />}
                {isSoon && <Clock size={13} color="var(--amber)" />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="notif-text">{n.text}</div>
                <div className="notif-time">{isLate || isSoon ? "agora" : timeAgo(n.time)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
