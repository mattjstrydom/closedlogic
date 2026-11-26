"use client";

import { useEffect } from "react";
import { track } from "../../analytics";

// Sends one GA4 "purchase" event, and only for a genuine live payment: Stripe's Payment Link is set to redirect here with
// ?session_id={CHECKOUT_SESSION_ID} (see README, "Signal Fix payments"). A direct visit, a test-mode payment or a refresh in the
// same tab fires nothing. GA4 also drops a repeated transaction_id. The tag itself only fires after the visitor accepts cookies.
export default function PurchaseEvent({ value }: { value: number }) {
  useEffect(() => {
    try {
      const id = new URLSearchParams(window.location.search).get("session_id") ?? "";
      if (!/^cs_live_[A-Za-z0-9]{10,200}$/.test(id)) return;
      if (sessionStorage.getItem("cl-purchase") === id) return;
      sessionStorage.setItem("cl-purchase", id);
      track("purchase", { transaction_id: id, value, currency: "USD", item_id: "signal-fix", item_name: "Signal Fix" });
    } catch {
      /* analytics must never break the page */
    }
  }, [value]);
  return null;
}
