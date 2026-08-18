// Google Ads conversion tracking for Signature Nature's Edge.
//
// The account ID alone is not enough to record a conversion. Google Ads issues a
// separate CONVERSION LABEL for each conversion action, and the event has to be
// sent to "<account-id>/<label>". Get it from:
//
//   Google Ads -> Goals -> Conversions -> Summary -> "+ New conversion action"
//   -> Website -> create an action (e.g. "Lead form submission")
//   -> open it -> "Tag setup" -> "Use Google tag" -> the snippet shows:
//
//        gtag('event', 'conversion', { 'send_to': 'AW-18369369185/AbC-D_efG...' });
//                                                                 ^^^^^^^^^^^ this part
//
// Paste that trailing part into LEAD_CONVERSION_LABEL below and leads start
// reporting immediately — no other change needed.

export const GOOGLE_ADS_ID = "AW-18369369185";

/** Conversion label for a submitted lead form — Ads action "Submit lead form". */
export const LEAD_CONVERSION_LABEL = "h6WGCKX2leIcEOGombdE";

/** Optional: separate label for phone-call clicks. Leave blank to skip. */
export const CALL_CONVERSION_LABEL = "";

/** Optional: separate label for WhatsApp clicks. Leave blank to skip. */
export const WHATSAPP_CONVERSION_LABEL = "";

function gtagReady() {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/**
 * Reports a conversion to Google Ads.
 *
 * Without a label we deliberately do NOT send an Ads conversion event — sending
 * one to the bare account ID silently does nothing in Ads and just makes the
 * dashboard look like tracking works when it doesn't. The GA4-style event is
 * still pushed so the activity is visible while the label is being set up.
 */
export function trackConversion(label, { eventName = "conversion", params = {} } = {}) {
  if (!gtagReady()) return false;

  if (label) {
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${label}`,
      ...params,
    });
  }

  // Always fire a readable event too, so it shows up in DebugView / GA4 and in
  // the dataLayer regardless of whether the Ads label is configured yet.
  window.gtag("event", eventName, params);

  return Boolean(label);
}

/** Fired once a lead has actually been accepted by the CRM. */
export function trackLead(formSource) {
  const reported = trackConversion(LEAD_CONVERSION_LABEL, {
    eventName: "generate_lead",
    params: { form_source: formSource, currency: "INR", value: 1 },
  });

  if (!reported && process.env.NODE_ENV !== "production") {
    console.warn(
      "[gtag] Lead recorded locally but NOT reported to Google Ads — " +
        "set LEAD_CONVERSION_LABEL in app/gtag.js."
    );
  }
}

export function trackCallClick() {
  trackConversion(CALL_CONVERSION_LABEL, {
    eventName: "contact_call",
    params: { method: "phone" },
  });
}

export function trackWhatsappClick() {
  trackConversion(WHATSAPP_CONVERSION_LABEL, {
    eventName: "contact_whatsapp",
    params: { method: "whatsapp" },
  });
}
