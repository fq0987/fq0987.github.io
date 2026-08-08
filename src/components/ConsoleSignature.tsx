"use client";

import { useEffect } from "react";
import { site } from "@/lib/content";

/**
 * The one thing this site ever prints to the console. Nothing else in the app
 * logs, at all, so the console stays clean apart from this.
 *
 * Contact details are pulled from src/content rather than written here, and
 * the whole message is skipped if there is nothing real to show.
 */
export default function ConsoleSignature() {
  useEffect(() => {
    if (!site.email) return;

    const heading = [
      "color: #16203F",
      "font-family: Georgia, serif",
      "font-size: 20px",
      "padding: 6px 0",
    ].join(";");

    const body = ["color: #1A63C8", "font-size: 12px", "line-height: 1.6"].join(";");

    const lines = [site.email, ...site.links.map((link) => `${link.label}  ${link.href}`)];

    console.log(`%cHello.%c\n${lines.join("\n")}`, heading, body);
  }, []);

  return null;
}
