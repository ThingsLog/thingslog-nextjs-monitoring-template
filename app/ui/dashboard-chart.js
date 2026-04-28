"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function DashboardChart({ counters }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={counters} margin={{ top: 8, right: 18, left: 0, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#dce3ea" />
        <XAxis dataKey="date" tickFormatter={formatTime} minTickGap={24} />
        <YAxis width={70} />
        <Tooltip labelFormatter={formatDate} />
        <Line type="monotone" dataKey="counter" stroke="#18736d" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function formatTime(value) {
  return new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

