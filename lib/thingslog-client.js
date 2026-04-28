export class ThingsLogClient {
  constructor({ baseUrl, token }) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.token = token;
  }

  async request(path) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: "application/json"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`ThingsLog API error ${response.status}: ${await response.text()}`);
    }

    return response.json();
  }

  getDevice(deviceNumber) {
    return this.request(`/api/v2/devices/${encodeURIComponent(deviceNumber)}`);
  }

  getCounters({ deviceNumber, sensorIndex = 0, fromDate, toDate }) {
    const params = new URLSearchParams({ fromDate, toDate });
    return this.request(
      `/device/${encodeURIComponent(deviceNumber)}/${encodeURIComponent(sensorIndex)}/counters?${params}`
    );
  }

  getAlarms({ deviceNumber, fromDate, toDate }) {
    const params = new URLSearchParams({ fromDate, toDate });
    return this.request(`/device/${encodeURIComponent(deviceNumber)}/alarms?${params}`);
  }
}

