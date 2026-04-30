import { NextResponse } from "next/server";

export const revalidate = 3600;

type HtbMachine = {
  id: number;
  name: string;
  os: string;
  difficulty: string;
  stars: number;
  avatar: string;
  ownedUser: boolean;
  ownedRoot: boolean;
  ownedAt: string | null;
  points: number;
  release: string | null;
  synopsis: string | null;
};

const HTB_API_BASE = "https://labs.hackthebox.com/api/v4";
const HTB_CDN_BASE = "https://labs.hackthebox.com/storage";

const fallbackMachines: HtbMachine[] = [
  {
    id: 1,
    name: "Lame",
    os: "Linux",
    difficulty: "Easy",
    stars: 4.4,
    avatar: "",
    ownedUser: true,
    ownedRoot: true,
    ownedAt: "2024-06-02",
    points: 20,
    release: "2017-03-14",
    synopsis: null,
  },
  {
    id: 2,
    name: "Legacy",
    os: "Windows",
    difficulty: "Easy",
    stars: 4.3,
    avatar: "",
    ownedUser: true,
    ownedRoot: true,
    ownedAt: "2024-06-05",
    points: 20,
    release: "2017-03-14",
    synopsis: null,
  },
  {
    id: 3,
    name: "Blue",
    os: "Windows",
    difficulty: "Easy",
    stars: 4.5,
    avatar: "",
    ownedUser: true,
    ownedRoot: true,
    ownedAt: "2024-06-10",
    points: 20,
    release: "2017-07-28",
    synopsis: null,
  },
  {
    id: 4,
    name: "Devel",
    os: "Windows",
    difficulty: "Easy",
    stars: 4.2,
    avatar: "",
    ownedUser: true,
    ownedRoot: true,
    ownedAt: "2024-07-01",
    points: 20,
    release: "2017-03-14",
    synopsis: null,
  },
  {
    id: 5,
    name: "Jerry",
    os: "Windows",
    difficulty: "Easy",
    stars: 3.8,
    avatar: "",
    ownedUser: true,
    ownedRoot: true,
    ownedAt: "2024-07-15",
    points: 20,
    release: "2018-10-20",
    synopsis: null,
  },
  {
    id: 6,
    name: "Bashed",
    os: "Linux",
    difficulty: "Easy",
    stars: 4.0,
    avatar: "",
    ownedUser: true,
    ownedRoot: true,
    ownedAt: "2024-08-03",
    points: 20,
    release: "2017-12-09",
    synopsis: null,
  },
];

async function fetchFromHtb<T>(
  endpoint: string,
  token: string,
  { retries = 3 }: { retries?: number } = {}
): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const response = await fetch(`${HTB_API_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "User-Agent": "portfolio-anas",
      },
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      return response.json() as Promise<T>;
    }

    if (response.status === 429 && attempt < retries) {
      const retryAfterHeader = response.headers.get("retry-after");
      const retryAfter = retryAfterHeader ? Number(retryAfterHeader) : NaN;
      const delayMs = Number.isFinite(retryAfter)
        ? retryAfter * 1000
        : 600 * (attempt + 1);
      await new Promise((r) => setTimeout(r, delayMs));
      continue;
    }

    throw new Error(`HTB API ${endpoint} -> ${response.status}`);
  }

  throw new Error(`HTB API ${endpoint} -> exhausted retries`);
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      results[index] = await fn(items[index], index);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    worker
  );
  await Promise.all(workers);
  return results;
}

type UserInfoResponse = { info?: { id?: number } };
type ActivityEntry = {
  date: string;
  object_type: string;
  type: "user" | "root" | string;
  id: number;
  name: string;
  points?: number;
  machine_avatar?: string;
};
type ActivityResponse = { profile?: { activity?: ActivityEntry[] } };
type MachineProfileInfo = {
  id: number;
  name: string;
  os: string;
  retired?: boolean;
  release?: string | null;
  static_points?: number;
  points?: number;
  stars?: number;
  avatar?: string;
  difficultyText?: string;
  synopsis?: string | null;
  machinePwnedDate?: string | null;
  authUserInUserOwns?: boolean;
  authUserInRootOwns?: boolean;
};
type MachineProfileResponse = { info?: MachineProfileInfo };

async function resolveUserId(token: string): Promise<number | null> {
  const envId = process.env.HTB_USER_ID;
  if (envId && /^\d+$/.test(envId)) return Number(envId);

  try {
    const me = await fetchFromHtb<UserInfoResponse>("/user/info", token);
    const id = me?.info?.id;
    return typeof id === "number" ? id : null;
  } catch {
    return null;
  }
}

function absoluteUrl(path: string | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${HTB_CDN_BASE}${path}`;
}

type OwnFlags = {
  ownedUser: boolean;
  ownedRoot: boolean;
  ownedAt: string | null;
  avatar: string;
  name: string;
};

function aggregateActivity(activity: ActivityEntry[]): Map<number, OwnFlags> {
  const byId = new Map<number, OwnFlags>();
  for (const entry of activity) {
    if (entry.object_type !== "machine") continue;
    const existing: OwnFlags = byId.get(entry.id) ?? {
      ownedUser: false,
      ownedRoot: false,
      ownedAt: null,
      avatar: absoluteUrl(entry.machine_avatar),
      name: entry.name,
    };
    if (entry.type === "user") existing.ownedUser = true;
    if (entry.type === "root") existing.ownedRoot = true;
    if (!existing.ownedAt || entry.date > existing.ownedAt) {
      existing.ownedAt = entry.date;
    }
    if (!existing.avatar && entry.machine_avatar) {
      existing.avatar = absoluteUrl(entry.machine_avatar);
    }
    byId.set(entry.id, existing);
  }
  return byId;
}

async function enrichMachine(
  id: number,
  flags: OwnFlags,
  token: string
): Promise<HtbMachine> {
  try {
    const data = await fetchFromHtb<MachineProfileResponse>(
      `/machine/profile/${id}`,
      token
    );
    const info = data.info;
    if (info) {
      return {
        id,
        name: info.name ?? flags.name,
        os: info.os ?? "Unknown",
        difficulty: info.difficultyText ?? "Unknown",
        stars: info.stars ?? 0,
        avatar: absoluteUrl(info.avatar) || flags.avatar,
        ownedUser: flags.ownedUser || !!info.authUserInUserOwns,
        ownedRoot: flags.ownedRoot || !!info.authUserInRootOwns,
        ownedAt: info.machinePwnedDate ?? flags.ownedAt,
        points: info.static_points ?? info.points ?? 0,
        release: info.release ?? null,
        synopsis: info.synopsis ?? null,
      };
    }
  } catch {
    // ignore, fall back to activity-only data
  }

  return {
    id,
    name: flags.name,
    os: "Unknown",
    difficulty: "Unknown",
    stars: 0,
    avatar: flags.avatar,
    ownedUser: flags.ownedUser,
    ownedRoot: flags.ownedRoot,
    ownedAt: flags.ownedAt,
    points: 0,
    release: null,
    synopsis: null,
  };
}

async function fetchOwnedMachines(token: string): Promise<HtbMachine[]> {
  const userId = await resolveUserId(token);
  if (!userId) return [];

  const data = await fetchFromHtb<ActivityResponse>(
    `/user/profile/activity/${userId}`,
    token
  );
  const activity = data?.profile?.activity ?? [];
  const aggregated = aggregateActivity(activity);
  if (aggregated.size === 0) return [];

  const entries = Array.from(aggregated.entries());
  const machines = await mapWithConcurrency(entries, 4, ([id, flags]) =>
    enrichMachine(id, flags, token)
  );

  return machines
    .filter((m) => m.ownedUser || m.ownedRoot)
    .sort((a, b) => (b.ownedAt ?? "").localeCompare(a.ownedAt ?? ""));
}

export async function GET() {
  const token = process.env.HTB_API_TOKEN;

  if (!token) {
    return NextResponse.json({
      source: "fallback",
      machines: fallbackMachines,
    });
  }

  try {
    const machines = await fetchOwnedMachines(token);
    if (machines.length === 0) {
      return NextResponse.json({
        source: "fallback",
        machines: fallbackMachines,
      });
    }
    return NextResponse.json({ source: "htb", machines });
  } catch (error) {
    console.error("HTB API error:", error);
    return NextResponse.json({
      source: "fallback",
      machines: fallbackMachines,
    });
  }
}