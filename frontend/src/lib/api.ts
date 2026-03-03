const API_BASE = import.meta.env.VITE_API_URL ?? "";

// ── JWT token management ────────────────────────────────────────────
let accessToken: string | null = null;
let tokenExpiry = 0; // epoch ms

async function getToken(): Promise<string> {
  if (accessToken && Date.now() < tokenExpiry) return accessToken;

  const res = await fetch(`${API_BASE}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: import.meta.env.VITE_AUTH_USERNAME,
      password: import.meta.env.VITE_AUTH_PASSWORD,
    }),
  });

  if (!res.ok) throw new Error(`Auth failed: ${res.status}`);

  const data = await res.json();
  accessToken = data.access_token;
  // refresh 30 s before actual expiry
  tokenExpiry = Date.now() + (data.expires_in - 30) * 1000;
  return accessToken!;
}

async function authFetch(url: string, init: RequestInit = {}): Promise<Response> {
  let token = await getToken();
  const headers = { ...init.headers, Authorization: `Bearer ${token}` } as Record<string, string>;

  let res = await fetch(url, { ...init, headers });

  // retry once on 401
  if (res.status === 401) {
    accessToken = null;
    tokenExpiry = 0;
    token = await getToken();
    headers.Authorization = `Bearer ${token}`;
    res = await fetch(url, { ...init, headers });
  }

  return res;
}

// ── API types ───────────────────────────────────────────────────────
export interface InferenceResult {
  frailty_probability: number;
  frail: number; // 0 | 1
}

export interface GuidanceResult {
  bullets: string[];
}

export interface ChatHandoff {
  session_id: string;
  initial_message: string;
}

export interface InferWithGuidanceResponse {
  inference: InferenceResult;
  guidance: GuidanceResult;
  chat_handoff: ChatHandoff;
}

export interface ChatResponse {
  session_id: string;
  answer: string;
  inference: InferenceResult | null;
  guidance: GuidanceResult | null;
}

// ── Public API calls ────────────────────────────────────────────────
export async function inferWithGuidance(
  patientId: string
): Promise<InferWithGuidanceResponse> {
  const res = await authFetch(`${API_BASE}/infer-with-guidance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ patient_id: patientId }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Inference failed (${res.status}): ${text}`);
  }

  return res.json();
}

export async function chatMessage(
  sessionId: string,
  message: string
): Promise<ChatResponse> {
  const res = await authFetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, message }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Chat failed (${res.status}): ${text}`);
  }

  return res.json();
}
