
export interface RunningApp {
  name: string;
  pid: number;
  memory_usage: number;
  risk_level?: 'low' | 'medium' | 'high';
  status?: 'active' | 'suspicious' | 'blocked';
}

export interface InstalledSoftware {
  name: string;
  version: string;
  status: 'secure' | 'outdated' | 'vulnerable';
  security_state: string;
}

export const getRunningApps = async (): Promise<RunningApp[]> => {
  // Mock data for initial UI implementation as requested
  return [
    { name: "Chrome.exe", pid: 1240, memory_usage: 450 * 1024 * 1024, risk_level: 'low', status: 'active' },
    { name: "Discord.exe", pid: 8520, memory_usage: 220 * 1024 * 1024, risk_level: 'low', status: 'active' },
    { name: "VSCode.exe", pid: 3412, memory_usage: 850 * 1024 * 1024, risk_level: 'low', status: 'active' },
    { name: "Steam.exe", pid: 9910, memory_usage: 120 * 1024 * 1024, risk_level: 'low', status: 'active' },
    { name: "Spotify.exe", pid: 4432, memory_usage: 180 * 1024 * 1024, risk_level: 'low', status: 'active' },
    { name: "Telegram.exe", pid: 2110, memory_usage: 90 * 1024 * 1024, risk_level: 'low', status: 'active' },
    { name: "Slack.exe", pid: 6654, memory_usage: 340 * 1024 * 1024, risk_level: 'low', status: 'active' },
    { name: "Postman.exe", pid: 7781, memory_usage: 520 * 1024 * 1024, risk_level: 'medium', status: 'active' },
  ];
};

export const getMockInstalledSoftware = (): InstalledSoftware[] => {
  return [
    { name: "Node.js", version: "20.11.0", status: "secure", security_state: "Verified" },
    { name: "Git", version: "2.43.0", status: "secure", security_state: "Verified" },
    { name: "Docker Desktop", version: "4.27.1", status: "secure", security_state: "Verified" },
    { name: "Python", version: "3.10.12", status: "outdated", security_state: "Patch Available" },
    { name: "OpenSSL", version: "1.1.1t", status: "vulnerable", security_state: "High Risk" },
  ];
};
