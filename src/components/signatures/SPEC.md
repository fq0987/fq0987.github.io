# Project Signatures, the contract

File: src/components/signatures/<Name>Signature.tsx
"use client", default export, props: { accent: string } from ./types
Registered in SignatureSlot.tsx. Rendered inside <SignatureFrame>.

<SignatureFrame
  accent={accent}
  title="..."       // 2 to 4 words naming the moment
  meaning="..."     // 1 to 2 plain sentences, verbatim facts only, explaining
                    // what this project was and why this scene belongs to it
  hint="..."        // imperative, 6 words or fewer
  done={hasInteracted}   // dims the hint after the first successful interaction
>

1. Material. The scene sits on a light glass pane. A physically dark object
   inside the scene (a screen, a night photo, a dark prop) may be dark: it
   reads as an object placed on the glass, not as a theme change.
2. Resting state is a finished illustration, never a blank box.
3. Reduced motion: state may change instantly, nothing loops.
4. Touch first. Never trap page scroll. Handle pointercancel. 375 to 1280.
5. Zero invented facts.
6. Copy: no em dashes, no en dashes, no emoji. Short and human.
7. Self contained. No new npm deps. No edits to globals.css. No imports from
   another signature. Scoped <style> blocks prefix every class uniquely.
8. Performance: no idle loops, source under about 12KB, lazy loaded per page.
9. Accessibility: keyboard operable, or a pure delight layer whose information
   is also visible statically.
10. Clear, not clever. A first time visitor understands within seconds what
    they are looking at and why it belongs to this project. If the metaphor
    needs decoding, it is the wrong metaphor.
11. Verify with npx tsc --noEmit before moving to the next one.
