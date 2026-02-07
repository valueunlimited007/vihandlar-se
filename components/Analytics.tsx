import Script from "next/script";

export function Analytics() {
  return (
    <Script
      defer
      data-site-id="1e314f21-8cca-4ded-9c3d-dd4af4e1e3f0"
      data-api="https://besokskollen.se"
      src="https://besokskollen.se/script.js"
      strategy="afterInteractive"
    />
  );
}
