import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

function VercelAnalytics() {
  return <Analytics />;
}

function VercelSpeedInsights() {
  return <SpeedInsights />;
}

export { VercelAnalytics, VercelSpeedInsights };
