import { Activity, AlertTriangle, Gauge, Radio } from "lucide-react";
import { DashboardChart } from "./ui/dashboard-chart";
import { getDashboard } from "../lib/dashboard-service";

export default async function Home() {
  const data = await getDashboard();
  const { device, summary, counters, alarms } = data;

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">ThingsLog partner portal</p>
          <h1>Monitoring dashboard</h1>
        </div>
      </header>

      <section className="device-band">
        <div>
          <p className="eyebrow">Device</p>
          <h2>{device.name || device.deviceNumber || summary.deviceNumber}</h2>
          <p>{device.site || "Customer site"} · ThingsLog device</p>
        </div>
        <div className="status-pill">Last seen {formatDate(summary.lastSeen)}</div>
      </section>

      <section className="metrics">
        <Metric icon={<Gauge />} label="Latest counter" value={formatNumber(summary.latestCounter)} />
        <Metric icon={<Activity />} label="Period consumption" value={formatNumber(summary.periodConsumption)} />
        <Metric icon={<AlertTriangle />} label="Active alarms" value={summary.activeAlarms} warn />
        <Metric icon={<Radio />} label="Connection" value="Online" />
      </section>

      <section className="content">
        <div className="panel chart-panel">
          <div className="panel-heading">
            <h3>Counter history</h3>
            <span>{counters.length} points</span>
          </div>
          <DashboardChart counters={counters} />
        </div>

        <div className="panel">
          <div className="panel-heading">
            <h3>Alarms</h3>
            <span>{alarms.length}</span>
          </div>
          <div className="alarm-list">
            {alarms.map((alarm) => (
              <article className="alarm" key={`${alarm.alarmType}-${alarm.date}`}>
                <div>
                  <strong>{alarm.description || alarm.alarmType}</strong>
                  <p>{alarm.deviceNumber} · {formatDate(alarm.date)}</p>
                </div>
                <AlertTriangle size={18} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ icon, label, value, warn }) {
  return (
    <article className={`metric ${warn ? "warn" : ""}`}>
      <div className="metric-icon">{icon}</div>
      <div>
        <p>{label}</p>
        <strong>{value ?? "n/a"}</strong>
      </div>
    </article>
  );
}

function formatNumber(value) {
  if (value === null || value === undefined) return "n/a";
  return new Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(value);
}

function formatDate(value) {
  if (!value) return "n/a";
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

