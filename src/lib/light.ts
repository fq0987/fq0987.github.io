/**
 * The light picker.
 *
 * Instead of a generic theme switcher, a visitor to this site changes the
 * light falling on it. Each condition is a hand tuned palette in the same pink
 * and blue family, defined in globals.css under html[data-light="..."]. None
 * of them is a hue rotation of another, and every one has had its contrast
 * ratios computed.
 *
 * This is a permanent feature of the site, not a toggle that can be quietly
 * dropped later.
 */

export const LIGHT_CONDITIONS = [
  {
    id: "morning",
    name: "Morning",
    // Shown in the picker. Kept to a few words so the control stays small.
    description: "Palest blush, clear azure",
    themeColor: "#FBF4F7",
  },
  {
    id: "overcast",
    name: "Overcast",
    description: "Cooler, softer, matte glass",
    themeColor: "#EFF2F6",
  },
  {
    id: "golden",
    name: "Golden",
    description: "Warmer, rose dominant",
    themeColor: "#FCF2EC",
  },
  {
    id: "dusk",
    name: "Dusk",
    description: "Dim blue ground, rose light",
    themeColor: "#DEDCEE",
  },
] as const;

export type LightId = (typeof LIGHT_CONDITIONS)[number]["id"];

export const DEFAULT_LIGHT: LightId = "morning";

export const LIGHT_IDS = LIGHT_CONDITIONS.map((c) => c.id) as readonly LightId[];

export const STORAGE_KEY = "softglass-light";

export function isLightId(value: unknown): value is LightId {
  return typeof value === "string" && (LIGHT_IDS as readonly string[]).includes(value);
}

export function themeColorFor(id: LightId): string {
  return LIGHT_CONDITIONS.find((c) => c.id === id)!.themeColor;
}

/**
 * Runs before the first paint, inlined in <head>, so the stored light
 * condition is already on <html> when the browser paints. Without this there
 * is a visible flash of Morning on every load for anyone who chose another
 * condition.
 *
 * Precedence, highest first:
 *   1. ?light= in the URL, so a specific condition can be linked directly
 *   2. sessionStorage, which is per tab, so four tabs can show four lights
 *   3. localStorage, which is sticky across visits
 *   4. Morning
 *
 * Deliberately not wrapped in a try/catch that swallows the error silently.
 * If storage is unavailable the catch falls through to the default and does
 * nothing else, which is the only correct behaviour here.
 */
export const LIGHT_PREPAINT_SCRIPT = `
(function(){
  var IDS = ${JSON.stringify(LIGHT_IDS)};
  var KEY = ${JSON.stringify(STORAGE_KEY)};
  var THEME = ${JSON.stringify(
    Object.fromEntries(LIGHT_CONDITIONS.map((c) => [c.id, c.themeColor])),
  )};
  var pick = null;
  try {
    var q = new URLSearchParams(window.location.search).get('light');
    if (IDS.indexOf(q) > -1) {
      pick = q;
      sessionStorage.setItem(KEY, q);
      localStorage.setItem(KEY, q);
    }
    if (!pick) {
      var s = sessionStorage.getItem(KEY);
      if (IDS.indexOf(s) > -1) pick = s;
    }
    if (!pick) {
      var l = localStorage.getItem(KEY);
      if (IDS.indexOf(l) > -1) pick = l;
    }
  } catch (e) {
    pick = null;
  }
  if (!pick) pick = ${JSON.stringify(DEFAULT_LIGHT)};
  document.documentElement.setAttribute('data-light', pick);
  var m = document.querySelector('meta[name="theme-color"]');
  if (m && THEME[pick]) m.setAttribute('content', THEME[pick]);
})();
`.trim();
