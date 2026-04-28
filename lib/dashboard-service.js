import { mockDashboard } from "./mock-data";
import { ThingsLogClient } from "./thingslog-client";

export async function getDashboard() {
  if (process.env.THINGSLOG_MOCK !== "false") {
    return mockDashboard;
  }

  const deviceNumber = requiredEnv("THINGSLOG_DEVICE_NUMBER");
  const sensorIndex = process.env.THINGSLOG_SENSOR_INDEX || "0";
  const fromDate = requiredEnv("THINGSLOG_FROM_DATE");
  const toDate = requiredEnv("THINGSLOG_TO_DATE");
  const client = new ThingsLogClient({
    baseUrl: process.env.THINGSLOG_BASE_URL || "https://iot.thingslog.com:4443",
    token: requiredEnv("THINGSLOG_TOKEN")
  });

  const [device, counters, alarms] = await Promise.all([
    client.getDevice(deviceNumber),
    client.getCounters({ deviceNumber, sensorIndex, fromDate, toDate }),
    client.getAlarms({ deviceNumber, fromDate, toDate })
  ]);

  return { device, counters, alarms, summary: summarize(deviceNumber, counters, alarms) };
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function summarize(deviceNumber, counters, alarms) {
  const first = counters.at(0)?.counter ?? null;
  const last = counters.at(-1)?.counter ?? null;
  return {
    deviceNumber,
    latestCounter: last,
    periodConsumption: first !== null && last !== null ? last - first : null,
    activeAlarms: alarms.length,
    lastSeen: counters.at(-1)?.date ?? null
  };
}

