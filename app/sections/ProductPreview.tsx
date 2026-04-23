"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../components/Container";

const sidebarItems = [
  "Overview",
  "Metrics",
  "Logs",
  "Alerts",
  "Anomalies",
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
    transition: { duration: 0.65, ease: "easeOut", delay: 0.45 },
  },
};

const panelMotion = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.18, ease: "easeOut" },
  },
};

function OverviewPanel({
  items,
  selectedId,
  setSelectedId,
}: {
  items: (typeof dashboardData)[TabKey];
  selectedId: string;
  setSelectedId: (id: string) => void;
}) {
  const selectedItem = items.find((item) => item.id === selectedId) ?? items[0];

  return (
    <div className="grid min-h-[520px] lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="min-w-0">
        {items.map((item) => {
          const isSelected = selectedItem.id === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`grid w-full grid-cols-[88px_minmax(0,1fr)_auto] items-center gap-3 border-b border-black/6 px-4 py-3 text-left transition ${
                isSelected ? "bg-[#fafaf8]" : "hover:bg-[#fcfcfa]"
              }`}
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
            </button>
          );
        })}
      </div>

      <aside className="border-l border-black/6 bg-[#fcfcfa] p-4">
        <div className="text-[11px] uppercase tracking-[0.16em] text-black/35">
          Selected insight
        </div>

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
      </aside>
    </div>
  );
}

function MetricsPanel() {
  const metrics = [
    { label: "Active signals", value: "193" },
    { label: "Services monitored", value: "12" },
    { label: "Coverage score", value: "92%" },
    { label: "Missing KPIs", value: "08" },
  ];

  const services = [
    ["User service", "97%", "Healthy"],
    ["Order service", "94%", "Healthy"],
    ["Restaurant service", "88%", "Watch"],
    ["Delivery service", "91%", "Healthy"],
  ];

  return (
    <div className="grid min-h-[520px] gap-4 p-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[16px] border border-black/6 bg-[#fcfcfa] p-4"
          >
            <div className="text-[22px] font-semibold tracking-[-0.04em] text-black/90">
              {metric.value}
            </div>
            <div className="mt-1 text-[12px] text-black/45">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-[18px] border border-black/6 bg-white">
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

        <div>
          {services.map(([name, score, state]) => (
            <div
              key={name}
              className="grid grid-cols-[minmax(0,1fr)_80px_90px] items-center gap-3 border-b border-black/6 px-4 py-3 last:border-b-0"
            >
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-black/85">{name}</div>
                <div className="mt-1 text-[12px] text-black/45">
                  Signal quality and KPI coverage
                </div>
              </div>
              <div className="text-[12px] text-black/55">{score}</div>
              <div>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] ${
                    state === "Healthy"
                      ? "border-[#d6eadc] bg-[#eef8f1] text-[#177245]"
                      : "border-[#f1dfb7] bg-[#fff7e8] text-[#9a6700]"
                  }`}
                >
                  {state}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LogsPanel() {
  const logs = [
    ["09:41:58", "info", "orders.service", "order.update.success"],
    ["09:42:12", "warn", "restaurant.service", "latency.threshold.approaching"],
    ["09:42:27", "info", "user.service", "user.login.success"],
    ["09:43:01", "error", "payment.service", "payment.retry.failed"],
    ["09:43:18", "info", "delivery.service", "route.assignment.completed"],
  ];

  const levelStyles: Record<string, string> = {
    info: "bg-[#eef1ff] text-[#4452c8] border-[#d9defc]",
    warn: "bg-[#fff7e8] text-[#9a6700] border-[#f1dfb7]",
    error: "bg-[#fff0f0] text-[#b42318] border-[#f2c6c6]",
  };

  return (
    <div className="grid min-h-[520px] gap-4 p-4">
      <div className="rounded-[18px] border border-black/6 bg-[#fbfbf9] p-3">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[14px] font-medium text-black/85">
            Realtime log stream
          </h3>
          <span className="text-[12px] text-black/40">5 recent events</span>
        </div>

        <div className="space-y-2">
          {logs.map(([time, level, service, event]) => (
            <div
              key={`${time}-${event}`}
              className="grid grid-cols-[70px_64px_150px_minmax(0,1fr)] items-center gap-3 rounded-[14px] border border-black/6 bg-white px-3 py-2.5"
            >
              <span className="text-[12px] text-black/40">{time}</span>
              <span
                className={`rounded-full border px-2 py-1 text-[11px] capitalize ${levelStyles[level]}`}
              >
                {level}
              </span>
              <span className="truncate text-[12px] text-black/55">
                {service}
              </span>
              <span className="truncate text-[12px] font-medium text-black/82">
                {event}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[18px] border border-black/6 bg-white p-4">
        <h3 className="text-[14px] font-medium text-black/85">
          Structuring summary
        </h3>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {[
            ["Templates mined", "14"],
            ["Services indexed", "5"],
            ["Log clusters", "32"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[14px] border border-black/6 bg-[#fcfcfa] p-3"
            >
              <div className="text-[18px] font-semibold tracking-[-0.03em] text-black/90">
                {value}
              </div>
              <div className="mt-1 text-[12px] text-black/45">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlertsPanel() {
  const alerts = [
    ["P1", "Payment retry failures increasing", "payment.service", "Open"],
    [
      "P2",
      "Latency spike across restaurant service",
      "restaurant.service",
      "Investigating",
    ],
    ["P2", "High CPU usage in user service", "user.service", "Open"],
    ["P3", "Error burst in gateway routes", "gateway", "Monitoring"],
  ];

  return (
    <div className="grid min-h-[520px] gap-4 p-4">
      <div className="rounded-[18px] border border-black/6 bg-white">
        <div className="border-b border-black/6 px-4 py-3">
          <h3 className="text-[14px] font-medium text-black/85">
            Prioritized alerts
          </h3>
          <p className="mt-1 text-[12px] text-black/45">
            Adaptive thresholds surface the most important incidents first
          </p>
        </div>

        <div>
          {alerts.map(([priority, name, service, state]) => (
            <div
              key={name}
              className="grid grid-cols-[52px_minmax(0,1fr)_140px_120px] items-center gap-3 border-b border-black/6 px-4 py-3 last:border-b-0"
            >
              <span className="rounded-full border border-[#f2c6c6] bg-[#fff0f0] px-2 py-1 text-[11px] font-medium text-[#b42318]">
                {priority}
              </span>
              <div className="min-w-0">
                <div className="truncate text-[13px] font-medium text-black/85">
                  {name}
                </div>
              </div>
              <div className="truncate text-[12px] text-black/50">{service}</div>
              <div className="text-[12px] text-black/55">{state}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnomaliesPanel() {
  const anomalies = [
    ["Incident cluster A", "User + Order services", "771 detections"],
    ["Latency pattern drift", "Restaurant service", "124 detections"],
    ["Traffic burst mismatch", "Gateway", "92 detections"],
  ];

  return (
    <div className="grid min-h-[520px] gap-4 p-4">
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ["Unique incidents", "8"],
          ["Affected services", "4"],
          ["Historical detections", "771"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-[16px] border border-black/6 bg-[#fcfcfa] p-4"
          >
            <div className="text-[22px] font-semibold tracking-[-0.04em] text-black/90">
              {value}
            </div>
            <div className="mt-1 text-[12px] text-black/45">{label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-[18px] border border-black/6 bg-white">
        <div className="border-b border-black/6 px-4 py-3">
          <h3 className="text-[14px] font-medium text-black/85">
            Detected anomaly groups
          </h3>
        </div>

        <div className="grid gap-3 p-4">
          {anomalies.map(([title, service, count]) => (
            <div
              key={title}
              className="rounded-[16px] border border-black/6 bg-[#fcfcfa] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[13px] font-medium text-black/85">
                    {title}
                  </div>
                  <div className="mt-1 text-[12px] text-black/45">{service}</div>
                </div>
                <span className="rounded-full border border-[#d9defc] bg-[#eef1ff] px-2.5 py-1 text-[11px] text-[#2f3a8f]">
                  {count}
                </span>
              </div>
            </div>
          ))}
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

  const items = dashboardData[activeTab];

  useEffect(() => {
    setSelectedId(items[0].id);
  }, [activeTab, items]);

  const panel = useMemo(() => {
    switch (activeSidebar) {
      case "Metrics":
        return <MetricsPanel />;
      case "Logs":
        return <LogsPanel />;
      case "Alerts":
        return <AlertsPanel />;
      case "Anomalies":
        return <AnomaliesPanel />;
      case "Overview":
      default:
        return (
          <OverviewPanel
            items={items}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        );
    }
  }, [activeSidebar, items, selectedId]);

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

            <div className="grid min-h-[560px] lg:grid-cols-[190px_1fr]">
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
                        onClick={() => setActiveSidebar(item)}
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
                    {panel}
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