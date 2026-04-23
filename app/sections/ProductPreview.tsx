"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, easeOut } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import Container from "../components/Container";

const sidebarItems = [
  "Overview",
  "Metrics",
  "Logs",
  "Alerts",
  "Anomalies",
  "Analytics",
] as const;

const tabs = ["Open insights", "Assigned", "Created"] as const;

const dashboardData = {
  "Open insights": [
    {
      id: "OBS-214",
      title: "Improve anomaly correlation across user and order services",
      status: "active",
      team: "Reliability",
      service: "User service",
      date: "Oct 9",
      summary:
        "Multiple anomaly signals are being grouped into a single incident context for better debugging and triage.",
    },
    {
      id: "OBS-208",
      title: "Reduce noisy alert spikes during short traffic bursts",
      status: "review",
      team: "Alerts",
      service: "Gateway",
      date: "Oct 8",
      summary:
        "Adaptive thresholds should reduce false positives during short-lived throughput spikes in production.",
    },
    {
      id: "OBS-203",
      title: "Detect unusual latency regressions in restaurant service",
      status: "active",
      team: "Performance",
      service: "Restaurant service",
      date: "Oct 8",
      summary:
        "Latency patterns have drifted from the expected baseline and need better signal grouping across recent requests.",
    },
    {
      id: "OBS-197",
      title: "Improve log structuring for payment-related incidents",
      status: "planned",
      team: "Logs",
      service: "Payment service",
      date: "Oct 7",
      summary:
        "Structured log templates can make payment failures easier to cluster and investigate during incident review.",
    },
    {
      id: "OBS-188",
      title: "Highlight high-impact anomalies before escalation",
      status: "active",
      team: "Anomalies",
      service: "Delivery service",
      date: "Oct 6",
      summary:
        "Important anomaly groups should be surfaced earlier using impact weighting and service importance.",
    },
    {
      id: "OBS-181",
      title: "Track KPI coverage gaps in newly added services",
      status: "planned",
      team: "Metrics",
      service: "Order service",
      date: "Oct 5",
      summary:
        "Some services still lack complete KPI coverage, making it harder to reason about system behavior end-to-end.",
    },
  ],
  Assigned: [
    {
      id: "OBS-176",
      title: "Refine alert priority ranking for repeated incidents",
      status: "review",
      team: "Alerts",
      service: "User service",
      date: "Oct 4",
      summary:
        "Repeated incidents should receive better ranking logic based on recurrence, severity, and service impact.",
    },
    {
      id: "OBS-173",
      title: "Improve root-cause suggestions from correlated logs",
      status: "active",
      team: "Logs",
      service: "Order service",
      date: "Oct 3",
      summary:
        "Root-cause hints should connect correlated logs and metrics so engineers can move faster during investigation.",
    },
    {
      id: "OBS-169",
      title: "Tune anomaly grouping for bursty traffic windows",
      status: "planned",
      team: "Anomalies",
      service: "Gateway",
      date: "Oct 2",
      summary:
        "Grouping logic should handle dense signal clusters more gracefully during short traffic bursts.",
    },
  ],
  Created: [
    {
      id: "OBS-161",
      title: "Add signal coverage checks during telemetry onboarding",
      status: "planned",
      team: "Metrics",
      service: "Platform",
      date: "Oct 1",
      summary:
        "Telemetry onboarding should validate expected KPI coverage automatically before deployment.",
    },
    {
      id: "OBS-154",
      title: "Surface incident summaries directly from alert context",
      status: "review",
      team: "Alerts",
      service: "Payment service",
      date: "Sep 30",
      summary:
        "Incident summaries should be easier to scan so responders can understand scope without opening multiple views.",
    },
  ],
};

// Real-time metrics data
const initialMetrics = {
  "Active signals": 193,
  "Services monitored": 12,
  "Coverage score": 92,
  "Missing KPIs": 8,
  "Error rate": 0.12,
  "Response time": 245,
};

// Chart data for analytics
const chartData = {
  latency: [
    { time: "00:00", value: 120 },
    { time: "04:00", value: 135 },
    { time: "08:00", value: 98 },
    { time: "12:00", value: 156 },
    { time: "16:00", value: 142 },
    { time: "20:00", value: 128 },
  ],
  errors: [
    { time: "00:00", errors: 2 },
    { time: "04:00", errors: 1 },
    { time: "08:00", errors: 5 },
    { time: "12:00", errors: 8 },
    { time: "16:00", errors: 3 },
    { time: "20:00", errors: 4 },
  ],
  throughput: [
    { service: "User", requests: 12500 },
    { service: "Order", requests: 8900 },
    { service: "Payment", requests: 6700 },
    { service: "Delivery", requests: 5400 },
    { service: "Restaurant", requests: 4300 },
  ],
  status: [
    { name: "Healthy", value: 75, color: "#10b981" },
    { name: "Warning", value: 20, color: "#f59e0b" },
    { name: "Critical", value: 5, color: "#ef4444" },
  ],
};

type SidebarKey = (typeof sidebarItems)[number];
type TabKey = keyof typeof dashboardData;

function getStatusStyles(status: string) {
  switch (status) {
    case "active":
      return "bg-[#eef8f1] text-[#177245] border-[#d6eadc]";
    case "review":
      return "bg-[#fff7e8] text-[#9a6700] border-[#f1dfb7]";
    case "planned":
      return "bg-[#f2f3f7] text-[#5f6368] border-[#e5e7eb]";
    default:
      return "bg-[#f2f3f7] text-[#5f6368] border-[#e5e7eb]";
  }
}

const sectionReveal = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut, delay: 0.45 },
  },
};

const panelMotion = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.18, ease: easeOut },
  },
};

function LoadingSpinner() {
  return (
    <div className="flex h-32 items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/20 border-t-black/60"></div>
    </div>
  );
}

function OverviewPanel({
  items,
  selectedId,
  setSelectedId,
}: {
  items: (typeof dashboardData)[TabKey];
  selectedId: string;
  setSelectedId: (id: string) => void;
}) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const selectedItem = items.find((item) => item.id === selectedId) || items[0];

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="h-[520px] overflow-hidden grid lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="min-w-0">
        {items.map((item) => {
          const isSelected = selectedItem.id === item.id;
          const isExpanded = expandedItems.has(item.id);

          return (
            <motion.button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              onDoubleClick={() => toggleExpanded(item.id)}
              className={`grid w-full grid-cols-[88px_minmax(0,1fr)_auto] items-center gap-3 border-b border-black/6 px-4 py-3 text-left transition hover:bg-[#fcfcfa] ${
                isSelected ? "bg-[#fafaf8]" : ""
              }`}
              transition={{ duration: 0.2 }}
            >
              <div className="text-[12px] text-black/45">{item.id}</div>

              <div className="min-w-0">
                <div className="truncate text-[13px] font-medium text-black/88">
                  {item.title}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] text-black/45">
                  <span>{item.service}</span>
                  <span>•</span>
                  <span>{item.team}</span>
                </div>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-[12px] text-black/60"
                  >
                    {item.summary}
                  </motion.div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] capitalize ${getStatusStyles(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
                <span className="text-[12px] text-black/40">{item.date}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <aside className="border-l border-black/6 bg-[#fcfcfa] p-4">
        <div className="text-[11px] uppercase tracking-[0.16em] text-black/35">
          Selected insight
        </div>

        {selectedItem ? (
          <>
            <h3 className="mt-3 text-[15px] font-medium leading-6 text-black/90">
              {selectedItem.title}
            </h3>

            <p className="mt-3 text-[13px] leading-6 text-black/55">
              {selectedItem.summary}
            </p>

            <div className="mt-5 space-y-3 rounded-[18px] border border-black/6 bg-white p-4">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-black/45">ID</span>
                <span className="font-medium text-black/85">{selectedItem.id}</span>
              </div>

              <div className="flex items-center justify-between text-[13px]">
                <span className="text-black/45">Service</span>
                <span className="font-medium text-black/85">
                  {selectedItem.service}
                </span>
              </div>

              <div className="flex items-center justify-between text-[13px]">
                <span className="text-black/45">Team</span>
                <span className="font-medium text-black/85">{selectedItem.team}</span>
              </div>

              <div className="flex items-center justify-between text-[13px]">
                <span className="text-black/45">Status</span>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] capitalize ${getStatusStyles(
                    selectedItem.status
                  )}`}
                >
                  {selectedItem.status}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-3 text-[13px] text-black/45">
            No insight selected
          </div>
        )}
      </aside>
    </div>
  );
}

function MetricsPanel({ metrics }: { metrics: typeof initialMetrics }) {
  const [selectedTimeRange, setSelectedTimeRange] = useState<"1h" | "24h" | "7d" | "30d">("24h");
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const displayMetrics = [
    { label: "Active signals", value: metrics["Active signals"].toString(), trend: "+12%", color: "text-blue-600" },
    { label: "Services monitored", value: metrics["Services monitored"].toString(), trend: "→ 0%", color: "text-green-600" },
    { label: "Coverage score", value: `${metrics["Coverage score"]}%`, trend: "+2%", color: "text-green-600" },
  ];

  const services = [
    {
      name: "User service",
      score: "97%",
      state: "Healthy",
      uptime: "99.9%",
      latency: "145ms",
      errors: "0.02%",
      throughput: "2.3k/min"
    },
    {
      name: "Order service",
      score: "94%",
      state: "Healthy",
      uptime: "99.8%",
      latency: "203ms",
      errors: "0.08%",
      throughput: "1.8k/min"
    },
    {
      name: "Restaurant service",
      score: "88%",
      state: "Warning",
      uptime: "99.5%",
      latency: "312ms",
      errors: "0.15%",
      throughput: "1.2k/min"
    },
    {
      name: "Delivery service",
      score: "91%",
      state: "Healthy",
      uptime: "99.7%",
      latency: "178ms",
      errors: "0.05%",
      throughput: "950/min"
    },
  ];

  return (
    <div className="h-[520px] overflow-hidden grid gap-4 p-4">
      {/* Time Range and Metric Filter Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {["1h", "24h", "7d", "30d"].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedTimeRange(range as any)}
              className={`px-3 py-1 text-[12px] rounded-full transition ${
                selectedTimeRange === range
                  ? "bg-black/10 font-medium text-black"
                  : "text-black/55 hover:bg-black/5"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {displayMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="rounded-[16px] border border-black/6 bg-[#fcfcfa] p-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-[22px] font-semibold tracking-[-0.04em] text-black/90">
                  {metric.value}
                </div>
                <span className={`text-[11px] font-medium ${metric.color}`}>
                  {metric.trend}
                </span>
              </div>
              <div className="mt-1 text-[12px] text-black/45">{metric.label}</div>
            </motion.div>
          ))}
      </div>

      {/* Service Health Section */}
      <div className="rounded-t-[18px] border border-black/6 bg-white overflow-hidden">
        <div className="flex items-center justify-between border-b border-black/6 px-4 py-3">
          <div>
            <h3 className="text-[14px] font-medium text-black/85">
              Service health
            </h3>
            <p className="mt-1 text-[12px] text-black/45">
              Coverage and KPI readiness across core services
            </p>
          </div>
          <span className="rounded-full border border-[#d9defc] bg-[#eef1ff] px-2.5 py-1 text-[11px] text-[#2f3a8f]">
            Live metrics
          </span>
        </div>

        <div className="space-y-1">
          {services.map((service) => (
            <div key={service.name}>
              <div
                className="grid grid-cols-[minmax(0,1fr)_80px_90px] items-center gap-3 px-4 py-3 cursor-pointer hover:bg-black/[0.02] transition-colors"
                onClick={() => setExpandedService(expandedService === service.name ? null : service.name)}
              >
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-black/85">{service.name}</div>
                  <div className="mt-1 text-[12px] text-black/45">
                    Signal quality and KPI coverage
                  </div>
                </div>
                <div className="text-[12px] text-black/55">{service.score}</div>
                <div>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] ${
                      service.state === "Healthy"
                        ? "border-[#d6eadc] bg-[#eef8f1] text-[#177245]"
                        : "border-[#f1dfb7] bg-[#fff7e8] text-[#9a6700]"
                    }`}
                  >
                    {service.state}
                  </span>
                </div>
              </div>

              {expandedService === service.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-black/6 bg-[#fafafa] px-4 py-3"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[12px]">
                    <div>
                      <span className="text-black/45">Uptime:</span>
                      <div className="font-medium text-black/85">{service.uptime}</div>
                    </div>
                    <div>
                      <span className="text-black/45">Latency:</span>
                      <div className="font-medium text-black/85">{service.latency}</div>
                    </div>
                    <div>
                      <span className="text-black/45">Errors:</span>
                      <div className="font-medium text-black/85">{service.errors}</div>
                    </div>
                    <div>
                      <span className="text-black/45">Throughput:</span>
                      <div className="font-medium text-black/85">{service.throughput}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LogsPanel() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const logs = [
    {
      id: "1",
      time: "09:41:58",
      level: "info",
      service: "orders.service",
      event: "order.update.success",
      details: "Order #12345 updated successfully for user ID 67890",
      traceId: "abc-123-def-456"
    },
    {
      id: "2",
      time: "09:42:12",
      level: "warn",
      service: "restaurant.service",
      event: "latency.threshold.approaching",
      details: "Response time exceeded 200ms threshold (245ms)",
      traceId: "def-456-ghi-789"
    },
    {
      id: "3",
      time: "09:42:27",
      level: "info",
      service: "user.service",
      event: "user.login.success",
      details: "User authentication successful for email user@example.com",
      traceId: "ghi-789-jkl-012"
    },
    {
      id: "4",
      time: "09:43:01",
      level: "error",
      service: "payment.service",
      event: "payment.retry.failed",
      details: "Payment retry failed after 3 attempts for transaction TXN-789",
      traceId: "jkl-012-mno-345"
    },
    {
      id: "5",
      time: "09:43:18",
      level: "info",
      service: "delivery.service",
      event: "route.assignment.completed",
      details: "Route optimization completed for delivery batch #456",
      traceId: "mno-345-pqr-678"
    },
    {
      id: "6",
      time: "09:43:42",
      level: "warn",
      service: "gateway.service",
      event: "cache.miss.rate.high",
      details: "Cache miss rate increased to 42% above baseline",
      traceId: "pqr-678-stu-901"
    },
    {
      id: "7",
      time: "09:44:05",
      level: "info",
      service: "orders.service",
      event: "batch.processing.started",
      details: "Batch processing job started for 1200 pending orders",
      traceId: "stu-901-uvw-234"
    },
    {
      id: "8",
      time: "09:44:28",
      level: "error",
      service: "restaurant.service",
      event: "database.connection.timeout",
      details: "Database connection timeout after 30 seconds for query execution",
      traceId: "uvw-234-vwx-567"
    },
    {
      id: "9",
      time: "09:44:51",
      level: "info",
      service: "user.service",
      event: "session.creation.success",
      details: "Session created successfully for user ID 45678",
      traceId: "vwx-567-wxy-890"
    },
    {
      id: "10",
      time: "09:45:14",
      level: "warn",
      service: "payment.service",
      event: "fraud.check.slow",
      details: "Fraud detection check took 1.2 seconds (threshold: 800ms)",
      traceId: "wxy-890-xyz-123"
    },
  ];

  const levelStyles: Record<string, string> = {
    info: "bg-[#eef1ff] text-[#4452c8] border-[#d9defc]",
    warn: "bg-[#fff7e8] text-[#9a6700] border-[#f1dfb7]",
    error: "bg-[#fff0f0] text-[#b42318] border-[#f2c6c6]",
  };

  const filteredLogs = logs;

  return (
    <div className="h-[520px] overflow-hidden grid gap-4 p-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-black/45">Level:</span>
          <div className="flex gap-1">
            {["info", "warn", "error"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                className={`px-2 py-1 text-[11px] rounded capitalize transition ${
                  selectedLevel === level
                    ? "bg-black/10 font-medium text-black"
                    : "text-black/55 hover:bg-black/5"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[12px] text-black/45">Service:</span>
          <select
            value={selectedService || ""}
            onChange={(e) => setSelectedService(e.target.value || null)}
            className="text-[12px] bg-white border border-black/10 rounded px-2 py-1"
          >
            <option value="">All services</option>
            <option value="orders.service">Orders</option>
            <option value="restaurant.service">Restaurant</option>
            <option value="user.service">User</option>
            <option value="payment.service">Payment</option>
            <option value="delivery.service">Delivery</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-[12px] bg-white border border-black/10 rounded px-2 py-1 w-32"
          />
        </div>

        <label className="flex items-center gap-2 text-[12px] text-black/45">
          <input
            type="checkbox"
            checked={autoScroll}
            onChange={(e) => setAutoScroll(e.target.checked)}
            className="rounded"
          />
          Auto-scroll
        </label>
      </div>

      {/* Log Stream */}
      <div className="rounded-t-[18px] border border-black/6 bg-[#fbfbf9] p-3 overflow-hidden">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[14px] font-medium text-black/85">
            Realtime log stream
          </h3>
          <span className="text-[12px] text-black/40">{filteredLogs.length} events</span>
        </div>

        <div className="space-y-2">
          {filteredLogs.map((log) => (
            <div key={log.id}>
              <div
                className="grid grid-cols-[70px_64px_150px_minmax(0,1fr)_20px] items-center gap-3 rounded-[14px] border border-black/6 bg-white px-3 py-2.5 cursor-pointer hover:bg-black/[0.02] transition-colors"
                onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
              >
                <span className="text-[12px] text-black/40">{log.time}</span>
                <span
                  className={`rounded-full border px-2 py-1 text-[11px] capitalize ${levelStyles[log.level]}`}
                >
                  {log.level}
                </span>
                <span className="truncate text-[12px] text-black/55">
                  {log.service}
                </span>
                <span className="truncate text-[12px] font-medium text-black/82">
                  {log.event}
                </span>
                <span className="text-[12px] text-black/40">
                  {expandedLog === log.id ? "−" : "+"}
                </span>
              </div>

              {expandedLog === log.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 ml-3 p-3 bg-[#f8f8f8] rounded-[10px] border-l-2 border-black/10"
                >
                  <div className="text-[12px] text-black/70 mb-2">{log.details}</div>
                  <div className="text-[11px] text-black/50">
                    Trace ID: <span className="font-mono">{log.traceId}</span>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function AlertsPanel() {
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  const alerts = [
    {
      id: "1",
      priority: "P1",
      title: "Payment retry failures increasing",
      service: "payment.service",
      status: "Open",
      time: "2 min ago",
      description: "Payment service experiencing 45% increase in retry failures over the last 10 minutes",
      impact: "High - affecting checkout flow",
      assigned: "John Doe",
      tags: ["payment", "critical", "revenue"]
    },
    {
      id: "2",
      priority: "P2",
      title: "Latency spike across restaurant service",
      service: "restaurant.service",
      status: "Investigating",
      time: "5 min ago",
      description: "Restaurant service latency increased by 120ms affecting order placement",
      impact: "Medium - delayed orders",
      assigned: "Jane Smith",
      tags: ["latency", "orders", "performance"]
    },
    {
      id: "3",
      priority: "P2",
      title: "High CPU usage in user service",
      service: "user.service",
      status: "Open",
      time: "8 min ago",
      description: "User service CPU utilization at 85% sustained for 15 minutes",
      impact: "Medium - potential slowdowns",
      assigned: "Mike Johnson",
      tags: ["cpu", "user-service", "infrastructure"]
    },
    {
      id: "4",
      priority: "P3",
      title: "Error burst in gateway routes",
      service: "gateway",
      status: "Monitoring",
      time: "12 min ago",
      description: "Gateway experiencing intermittent 5xx errors on 3 routes",
      impact: "Low - isolated routes",
      assigned: "Auto-assigned",
      tags: ["gateway", "errors", "routing"]
    },
    {
      id: "5",
      priority: "P1",
      title: "Database connection pool exhausted",
      service: "orders.service",
      status: "Investigating",
      time: "15 min ago",
      description: "Database connection pool reached 98% capacity limiting new connections",
      impact: "High - blocking new requests",
      assigned: "David Lee",
      tags: ["database", "connection", "critical"]
    },
    {
      id: "6",
      priority: "P2",
      title: "Memory leak detected in delivery service",
      service: "delivery.service",
      status: "Open",
      time: "18 min ago",
      description: "Memory usage growing linearly at 50MB/hour without recovery",
      impact: "Medium - service restart required soon",
      assigned: "Sarah Chen",
      tags: ["memory", "leak", "infrastructure"]
    },
    {
      id: "7",
      priority: "P3",
      title: "Unusual traffic pattern detected",
      service: "gateway",
      status: "Monitoring",
      time: "22 min ago",
      description: "Traffic from specific IP range showing anomalous spike pattern",
      impact: "Low - under investigation",
      assigned: "Security Team",
      tags: ["traffic", "security", "anomaly"]
    },
    {
      id: "8",
      priority: "P2",
      title: "Cache invalidation failures",
      service: "restaurant.service",
      status: "Resolved",
      time: "25 min ago",
      description: "Cache invalidation failed for 15% of menu updates",
      impact: "Medium - stale data served",
      assigned: "Tom Wilson",
      tags: ["cache", "data-consistency"]
    },
  ];

  const priorityColors = {
    P1: "border-[#f2c6c6] bg-[#fff0f0] text-[#b42318]",
    P2: "border-[#f1dfb7] bg-[#fff7e8] text-[#9a6700]",
    P3: "border-[#d6eadc] bg-[#eef8f1] text-[#177245]",
  };

  const statusColors = {
    Open: "border-[#f2c6c6] bg-[#fff0f0] text-[#b42318]",
    Investigating: "border-[#f1dfb7] bg-[#fff7e8] text-[#9a6700]",
    Monitoring: "border-[#d9defc] bg-[#eef1ff] text-[#2f3a8f]",
    Resolved: "border-[#d6eadc] bg-[#eef8f1] text-[#177245]",
  };

  const filteredAlerts = alerts;

  const handleAlertAction = (alertId: string, action: string) => {
    console.log(`Alert ${alertId}: ${action}`);
    // In a real app, this would update the alert status
  };

  return (
    <div className="h-[520px] overflow-hidden grid gap-4 p-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-black/45">Priority:</span>
          <div className="flex gap-1">
            {["P1", "P2", "P3"].map((priority) => (
              <button
                key={priority}
                onClick={() => setSelectedPriority(selectedPriority === priority ? null : priority)}
                className={`px-2 py-1 text-[11px] rounded transition ${
                  selectedPriority === priority
                    ? "bg-black/10 font-medium text-black"
                    : "text-black/55 hover:bg-black/5"
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[12px] text-black/45">Status:</span>
          <select
            value={selectedStatus || ""}
            onChange={(e) => setSelectedStatus(e.target.value || null)}
            className="text-[12px] bg-white border border-black/10 rounded px-2 py-1"
          >
            <option value="">All statuses</option>
            <option value="Open">Open</option>
            <option value="Investigating">Investigating</option>
            <option value="Monitoring">Monitoring</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="ml-auto">
          <span className="text-[12px] text-black/45">
            {filteredAlerts.length} of {alerts.length} alerts
          </span>
        </div>
      </div>

      {/* Alerts List */}
      <div className="rounded-t-[18px] border border-black/6 bg-white overflow-hidden">
        <div className="border-b border-black/6 px-4 py-3">
          <h3 className="text-[14px] font-medium text-black/85">
            Prioritized alerts
          </h3>
          <p className="mt-1 text-[12px] text-black/45">
            Adaptive thresholds surface the most important incidents first
          </p>
        </div>

        <div className="space-y-0">
          {filteredAlerts.map((alert) => (
            <div key={alert.id}>
              <div
                className="grid grid-cols-[52px_minmax(0,1fr)_140px_120px_20px] items-center gap-3 px-4 py-3 cursor-pointer hover:bg-black/[0.02] transition-colors border-b border-black/6 last:border-b-0"
                onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
              >
                <span className={`rounded-full border px-2 py-1 text-[11px] font-medium ${priorityColors[alert.priority as keyof typeof priorityColors]}`}>
                  {alert.priority}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-medium text-black/85">
                    {alert.title}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="truncate text-[12px] text-black/50">{alert.service}</span>
                    <span className="text-[11px] text-black/40">•</span>
                    <span className="text-[11px] text-black/40">{alert.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] ${statusColors[alert.status as keyof typeof statusColors]}`}
                  >
                    {alert.status}
                  </span>
                </div>
                <div className="text-[12px] text-black/55 truncate">
                  {alert.assigned}
                </div>
                <span className="text-[12px] text-black/40">
                  {expandedAlert === alert.id ? "−" : "+"}
                </span>
              </div>

              {expandedAlert === alert.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-black/6 bg-[#fafafa] px-4 py-3"
                >
                  <div className="mb-3">
                    <div className="text-[13px] text-black/70 mb-2">{alert.description}</div>
                    <div className="text-[12px] text-black/60 mb-2">
                      <strong>Impact:</strong> {alert.impact}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {alert.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-black/5 text-[11px] rounded-full text-black/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAlertAction(alert.id, "acknowledge")}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-[12px] rounded hover:bg-blue-100 transition-colors"
                    >
                      Acknowledge
                    </button>
                    <button
                      onClick={() => handleAlertAction(alert.id, "resolve")}
                      className="px-3 py-1 bg-green-50 text-green-700 text-[12px] rounded hover:bg-green-100 transition-colors"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => handleAlertAction(alert.id, "escalate")}
                      className="px-3 py-1 bg-red-50 text-red-700 text-[12px] rounded hover:bg-red-100 transition-colors"
                    >
                      Escalate
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnomaliesPanel() {
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [expandedAnomaly, setExpandedAnomaly] = useState<string | null>(null);

  const anomalies = [
    {
      id: "1",
      title: "Incident cluster A",
      service: "User + Order services",
      detections: 771,
      severity: "High",
      time: "15 min ago",
      description: "Correlated anomaly pattern detected across user authentication and order processing services",
      affected: ["user.service", "orders.service"],
      pattern: "Spike in failed authentications followed by order failures",
      confidence: 92,
      status: "Active"
    },
    {
      id: "2",
      title: "Latency pattern drift",
      service: "Restaurant service",
      detections: 124,
      severity: "Medium",
      time: "23 min ago",
      description: "Gradual increase in response times across restaurant service endpoints",
      affected: ["restaurant.service"],
      pattern: "Linear trend increase over 2-hour window",
      confidence: 78,
      status: "Monitoring"
    },
    {
      id: "3",
      title: "Traffic burst mismatch",
      service: "Gateway",
      detections: 92,
      severity: "Low",
      time: "31 min ago",
      description: "Unusual traffic patterns with high request volume but low error rates",
      affected: ["gateway"],
      pattern: "Bursty traffic with normal error distribution",
      confidence: 65,
      status: "Resolved"
    },
    {
      id: "4",
      title: "Memory leak pattern",
      service: "Payment service",
      detections: 45,
      severity: "High",
      time: "45 min ago",
      description: "Gradual memory increase detected in payment processing workers",
      affected: ["payment.service"],
      pattern: "Linear memory growth with periodic resets",
      confidence: 88,
      status: "Investigating"
    },
    {
      id: "5",
      title: "Database query timeout spike",
      service: "Orders service",
      detections: 156,
      severity: "High",
      time: "52 min ago",
      description: "Database query execution times increased significantly affecting order processing",
      affected: ["orders.service"],
      pattern: "Query timeout frequency spike correlated with transaction volume",
      confidence: 91,
      status: "Active"
    },
    {
      id: "6",
      title: "Cache hit rate degradation",
      service: "User service",
      detections: 87,
      severity: "Medium",
      time: "1 hour ago",
      description: "Cache hit rate decreased from 94% to 67% over recent period",
      affected: ["user.service"],
      pattern: "Gradual cache efficiency loss",
      confidence: 76,
      status: "Monitoring"
    },
    {
      id: "7",
      title: "Frequent service restarts",
      service: "Restaurant service",
      detections: 34,
      severity: "High",
      time: "1 hour ago",
      description: "Restaurant service restarting every 15-20 minutes",
      affected: ["restaurant.service"],
      pattern: "Repeated crash cycle with consistent intervals",
      confidence: 94,
      status: "Investigating"
    },
    {
      id: "8",
      title: "Network packet loss detected",
      service: "Gateway",
      detections: 203,
      severity: "Medium",
      time: "1 hour 15 min ago",
      description: "Packet loss rate elevated to 2.3% on specific network routes",
      affected: ["gateway"],
      pattern: "Intermittent packet loss on East coast datacenter",
      confidence: 82,
      status: "Monitoring"
    },
  ];

  const severityColors = {
    High: "border-[#f2c6c6] bg-[#fff0f0] text-[#b42318]",
    Medium: "border-[#f1dfb7] bg-[#fff7e8] text-[#9a6700]",
    Low: "border-[#d6eadc] bg-[#eef8f1] text-[#177245]",
  };

  const statusColors = {
    Active: "border-[#f2c6c6] bg-[#fff0f0] text-[#b42318]",
    Investigating: "border-[#f1dfb7] bg-[#fff7e8] text-[#9a6700]",
    Monitoring: "border-[#d9defc] bg-[#eef1ff] text-[#2f3a8f]",
    Resolved: "border-[#d6eadc] bg-[#eef8f1] text-[#177245]",
  };

  const filteredAnomalies = anomalies;

  return (
    <div className="h-[520px] overflow-hidden grid gap-4 p-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-black/45">Severity:</span>
          <div className="flex gap-1">
            {["High", "Medium", "Low"].map((severity) => (
              <button
                key={severity}
                onClick={() => setSelectedSeverity(selectedSeverity === severity ? null : severity)}
                className={`px-2 py-1 text-[11px] rounded transition ${
                  selectedSeverity === severity
                    ? "bg-black/10 font-medium text-black"
                    : "text-black/55 hover:bg-black/5"
                }`}
              >
                {severity}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[12px] text-black/45">Service:</span>
          <select
            value={selectedService || ""}
            onChange={(e) => setSelectedService(e.target.value || null)}
            className="text-[12px] bg-white border border-black/10 rounded px-2 py-1"
          >
            <option value="">All services</option>
            <option value="user.service">User Service</option>
            <option value="orders.service">Orders Service</option>
            <option value="restaurant.service">Restaurant Service</option>
            <option value="gateway">Gateway</option>
            <option value="payment.service">Payment Service</option>
          </select>
        </div>

      </div>

      {/* Summary Cards */}
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ["Unique incidents", filteredAnomalies.length.toString()],
          ["Affected services", new Set(filteredAnomalies.flatMap(a => a.affected)).size.toString()],
          ["Total detections", filteredAnomalies.reduce((sum, a) => sum + a.detections, 0).toString()],
        ].map(([label, value]) => (
          <motion.div
            key={label}
            className="rounded-[16px] border border-black/6 bg-[#fcfcfa] p-4"
          >
            <div className="text-[22px] font-semibold tracking-[-0.04em] text-black/90">
              {value}
            </div>
            <div className="mt-1 text-[12px] text-black/45">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Anomalies List */}
      <div className="rounded-t-[18px] border border-black/6 bg-white overflow-hidden">
        <div className="border-b border-black/6 px-4 py-3">
          <h3 className="text-[14px] font-medium text-black/85">
            Detected anomaly groups
          </h3>
          <p className="mt-1 text-[12px] text-black/45">
            AI-powered anomaly detection and correlation analysis
          </p>
        </div>

        <div className="space-y-0">
          {filteredAnomalies.map((anomaly) => (
            <div key={anomaly.id}>
              <div
                className="grid grid-cols-[minmax(0,1fr)_120px_80px_80px_20px] items-center gap-3 px-4 py-3 cursor-pointer hover:bg-black/[0.02] transition-colors border-b border-black/6 last:border-b-0"
                onClick={() => setExpandedAnomaly(expandedAnomaly === anomaly.id ? null : anomaly.id)}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-[13px] font-medium text-black/85 truncate">
                      {anomaly.title}
                    </div>
                    <span
                      className={`rounded-full border px-2 py-1 text-[10px] ${severityColors[anomaly.severity as keyof typeof severityColors]}`}
                    >
                      {anomaly.severity}
                    </span>
                  </div>
                  <div className="text-[12px] text-black/45 truncate">{anomaly.service}</div>
                </div>
                <span className="rounded-full border border-[#d9defc] bg-[#eef1ff] px-2.5 py-1 text-[11px] text-[#2f3a8f]">
                  {anomaly.detections} detections
                </span>
                <span
                  className={`rounded-full border px-2 py-1 text-[10px] ${statusColors[anomaly.status as keyof typeof statusColors]}`}
                >
                  {anomaly.status}
                </span>
                <span className="text-[11px] text-black/40">{anomaly.time}</span>
                <span className="text-[12px] text-black/40">
                  {expandedAnomaly === anomaly.id ? "−" : "+"}
                </span>
              </div>

              {expandedAnomaly === anomaly.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-black/6 bg-[#fafafa] px-4 py-3"
                >
                  <div className="mb-3">
                    <div className="text-[13px] text-black/70 mb-2">{anomaly.description}</div>
                    <div className="text-[12px] text-black/60 mb-2">
                      <strong>Pattern:</strong> {anomaly.pattern}
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-[12px] text-black/60">
                        <strong>Confidence:</strong> {anomaly.confidence}%
                      </div>
                      <div className="text-[12px] text-black/60">
                        <strong>Affected:</strong> {anomaly.affected.join(", ")}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-50 text-blue-700 text-[12px] rounded hover:bg-blue-100 transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-1 bg-green-50 text-green-700 text-[12px] rounded hover:bg-green-100 transition-colors">
                      Correlate
                    </button>
                    <button className="px-3 py-1 bg-gray-50 text-gray-700 text-[12px] rounded hover:bg-gray-100 transition-colors">
                      Suppress
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  const [selectedChart, setSelectedChart] = useState<"latency" | "errors">("latency");

  const renderChart = () => {
    switch (selectedChart) {
      case "latency":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData.latency}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#666" tick={{ fontSize: 10, fill: '#666' }} />
              <YAxis stroke="#666" tick={{ fontSize: 10, fill: '#666' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "errors":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.errors}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#666" tick={{ fontSize: 10, fill: '#666' }} />
              <YAxis stroke="#666" tick={{ fontSize: 10, fill: '#666' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="errors" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-[520px] overflow-hidden grid gap-4 p-4">
      <div className="rounded-[18px] border border-black/6 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[14px] font-medium text-black/85">
            Real-time Analytics
          </h3>
          <div className="flex gap-2">
            {[
              { key: "latency", label: "Latency" },
              { key: "errors", label: "Errors" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSelectedChart(key as any)}
                className={`rounded-full px-3 py-1 text-[12px] transition ${
                  selectedChart === key
                    ? "bg-black/10 font-medium text-black"
                    : "text-black/55 hover:bg-black/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[300px]">{renderChart()}</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[18px] border border-black/6 bg-white p-4">
          <h3 className="mb-3 text-[14px] font-medium text-black/85">
            Performance Metrics
          </h3>
          <div className="space-y-3">
            {[
              { label: "Avg Response Time", value: "245ms", trend: "↓ 12%" },
              { label: "Error Rate", value: "0.12%", trend: "↑ 5%" },
              { label: "Throughput", value: "12.5k/min", trend: "↑ 8%" },
              { label: "Uptime", value: "99.98%", trend: "→ 0%" },
            ].map(({ label, value, trend }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[13px] text-black/60">{label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-black/85">
                    {value}
                  </span>
                  <span
                    className={`text-[11px] ${
                      trend.startsWith("↑")
                        ? "text-red-600"
                        : trend.startsWith("↓")
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[18px] border border-black/6 bg-white p-4">
          <h3 className="mb-3 text-[14px] font-medium text-black/85">
            Service Status
          </h3>
          <div className="space-y-2">
            {[
              { name: "User Service", status: "Healthy", load: 78 },
              { name: "Order Service", status: "Healthy", load: 65 },
              { name: "Payment Service", status: "Warning", load: 89 },
              { name: "Delivery Service", status: "Healthy", load: 54 },
            ].map(({ name, status, load }) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      status === "Healthy"
                        ? "bg-green-500"
                        : status === "Warning"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                  <span className="text-[13px] text-black/85">{name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        load > 80
                          ? "bg-red-500"
                          : load > 60
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${load}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-black/60">{load}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPreview() {
  const [activeSidebar, setActiveSidebar] = useState<SidebarKey>("Overview");
  const [activeTab, setActiveTab] = useState<TabKey>("Open insights");
  const [selectedId, setSelectedId] = useState(
    dashboardData["Open insights"][0].id
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [realTimeMetrics, setRealTimeMetrics] = useState(initialMetrics);
  const [isLoading, setIsLoading] = useState(false);

  const items = dashboardData[activeTab];

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics((prev) => ({
        ...prev,
        "Active signals": prev["Active signals"] + Math.floor(Math.random() * 10 - 5),
        "Error rate": Math.max(0.01, prev["Error rate"] + (Math.random() - 0.5) * 0.02),
        "Response time": Math.max(100, prev["Response time"] + Math.floor(Math.random() * 20 - 10)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.team.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const handleSidebarChange = (sidebar: SidebarKey) => {
    if (sidebar !== activeSidebar) {
      setIsLoading(true);
      setActiveSidebar(sidebar);
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  const panel = useMemo(() => {
    switch (activeSidebar) {
      case "Metrics":
        return <MetricsPanel metrics={realTimeMetrics} />;
      case "Logs":
        return <LogsPanel />;
      case "Alerts":
        return <AlertsPanel />;
      case "Anomalies":
        return <AnomaliesPanel />;
      case "Analytics":
        return <AnalyticsPanel />;
      case "Overview":
      default:
        return (
          <OverviewPanel
            items={filteredItems}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        );
    }
  }, [activeSidebar, filteredItems, selectedId, realTimeMetrics]);

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      animate="visible"
      className="pb-20 sm:pb-24 lg:pb-28"
    >
      <Container>
        <div className="w-full rounded-[22px] border border-black/8 bg-[#f8f8f5] p-2 shadow-[0_10px_28px_rgba(0,0,0,0.035)]">
          <div className="overflow-hidden rounded-[18px] border border-black/6 bg-white">
            <div className="flex items-center gap-2 border-b border-black/6 px-4 py-3">
              <div className="h-2 w-2 rounded-full bg-black/14" />
              <div className="h-2 w-2 rounded-full bg-black/10" />
              <div className="h-2 w-2 rounded-full bg-black/7" />
              <span className="ml-3 text-[12px] text-black/40">
                ObserviQ workspace
              </span>
            </div>

            <div className="h-[560px] overflow-hidden grid lg:grid-cols-[190px_1fr]">
              <aside className="border-r border-black/6 bg-[#fcfcfa] px-3 py-4">
                <div className="mb-4 flex items-center gap-2 px-2">
                    <div className="flex items-center gap-3">
                      {/* Replaced text-based logo with SVG image, reduced size */}
                      <img src="/images/oblogo.svg" alt="ObserviQ Logo" className="h-6 opacity-70" />
                    </div>
                </div>

                <div className="space-y-1">
                  {sidebarItems.map((item) => {
                    const isActive = activeSidebar === item;

                    return (
                      <button
                        key={item}
                        onClick={() => handleSidebarChange(item)}
                        className={`flex w-full items-center rounded-[12px] px-3 py-2 text-left text-[13px] transition ${
                          isActive
                            ? "bg-black/[0.05] font-medium text-black"
                            : "text-black/55 hover:bg-black/[0.03] hover:text-black/80"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </aside>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/6 px-4 py-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex flex-wrap items-center gap-1">
                      {tabs.map((tab) => {
                        const isActive = activeTab === tab;

                        return (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`rounded-[10px] px-3 py-1.5 text-[13px] transition ${
                              isActive
                                ? "bg-black/[0.05] font-medium text-black"
                                : "text-black/55 hover:text-black"
                            }`}
                          >
                            {tab}
                          </button>
                        );
                      })}
                    </div>

                    {activeSidebar === "Overview" && (
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search insights..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="rounded-[10px] border border-black/10 bg-white px-3 py-1.5 pl-8 text-[13px] placeholder-black/40 focus:border-black/20 focus:outline-none"
                        />
                        <svg
                          className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-black/40"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[12px] text-black/40">
                    <span className="rounded-full border border-black/8 px-2.5 py-1">
                      {activeSidebar}
                    </span>
                    <span className="rounded-full border border-black/8 px-2.5 py-1">
                      Live preview
                    </span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSidebar}
                    variants={panelMotion}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {isLoading ? <LoadingSpinner /> : panel}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}