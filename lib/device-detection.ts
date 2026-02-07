export type DeviceType = "iPhone" | "Android" | "Desktop" | "Tablet" | "Unknown";

export function detectDeviceType(userAgent?: string): DeviceType {
  const ua = userAgent || (typeof navigator !== "undefined" ? navigator.userAgent : "");
  if (!ua) return "Unknown";

  const lower = ua.toLowerCase();

  if (/iphone|ipod/.test(lower)) return "iPhone";
  if (/ipad/.test(lower) || (/macintosh/.test(lower) && "ontouchend" in (typeof document !== "undefined" ? document : {}))) return "Tablet";
  if (/android/.test(lower) && /mobile/.test(lower)) return "Android";
  if (/android/.test(lower)) return "Tablet";

  return "Desktop";
}

export function getDeviceEmoji(device: DeviceType): string {
  switch (device) {
    case "iPhone": return "\u{1F4F1}";
    case "Android": return "\u{1F4F1}";
    case "Tablet": return "\u{1F4F1}";
    case "Desktop": return "\u{1F4BB}";
    default: return "\u{1F389}";
  }
}

export function getDeviceLabel(device: DeviceType): string {
  switch (device) {
    case "iPhone": return "iPhone";
    case "Android": return "Android";
    case "Tablet": return "Surfplatta";
    case "Desktop": return "Desktop";
    default: return "";
  }
}
