export const mockDashboard = {
  device: {
    deviceNumber: "01008213",
    name: "District Meter Zone 12",
    site: "Sofia North"
  },
  summary: {
    deviceNumber: "01008213",
    latestCounter: 84304,
    periodConsumption: 216.4,
    activeAlarms: 1,
    lastSeen: "2026-02-01T10:40:00+02:00"
  },
  counters: [
    { date: "2026-02-01T08:00:00+02:00", counter: 84087.6 },
    { date: "2026-02-01T08:30:00+02:00", counter: 84124.2 },
    { date: "2026-02-01T09:00:00+02:00", counter: 84178.8 },
    { date: "2026-02-01T09:30:00+02:00", counter: 84231.4 },
    { date: "2026-02-01T10:40:00+02:00", counter: 84304 }
  ],
  alarms: [
    {
      alarmType: "MISSED_TRANSMISSION",
      date: "2026-02-01T08:30:00.002+02:00",
      deviceNumber: "01008213",
      description: "Missed transmissions"
    }
  ]
};

