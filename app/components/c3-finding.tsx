"use client";

import { useId, useState } from "react";
import { Accent, Chip, Tick } from "./ui";

// C3 annotated finding with a Before fix / After fix toggle (fictional account). The server passes the caption
// label, so this client bundle doesn't carry the whole site config. Before is the default and the no-JS state.
const secondary = "rounded-pill border border-solid border-gray-200 px-3 py-1 text-[0.75rem] text-gray-600 sm:text-[0.8125rem]";
const primary = "rounded-pill bg-pill px-3 py-1 text-[0.75rem] text-pill-ink sm:text-[0.8125rem]";

function Tag({ n, kind, children }: { n: number; kind: "bad" | "ok"; children: string }) {
  return kind === "bad" ? (
    <span className="tag-bad">
      <span className="tag-num">{n}</span>
      <span className="max-md:hidden">{children}</span>
    </span>
  ) : (
    <span className="tag-ok">
      <span className="status-dot status-dot-ok" aria-hidden="true" />
      <span className="max-md:hidden">{children}</span>
      <span className="sr-only md:hidden">{children}</span>
    </span>
  );
}

export default function C3Finding({ label }: { label: string }) {
  const [fixed, setFixed] = useState(false);
  const name = useId();

  return (
    <figure
      aria-labelledby="c3-title"
      className="bento mt-10 grid grid-cols-1 gap-8 !p-5 sm:!p-10 lg:grid-cols-[5fr_7fr] lg:grid-rows-[1fr_auto] lg:gap-x-12"
    >
      <div className="flex min-w-0 flex-col lg:col-start-1 lg:row-start-1">
        <Chip>Finding, close up</Chip>
        <h3 id="c3-title" className="mt-4 text-title-m">
          Qualified stages are imported <Accent small>but not used for bidding</Accent>
        </h3>
        <p className="mt-4 text-text-l text-gray-800">“Lead form submit” is the only Primary conversion action. “HubSpot MQL” and “HubSpot SQL” are syncing, but they are set to Secondary.</p>

        <ol className="mt-7 space-y-4 text-text-m" aria-live="polite">
          {!fixed ? (
            <>
              <li className="flex gap-3"><span className="note-num" aria-hidden="true">1</span><span><span className="sr-only">Note 1. </span>Form fills are the only Primary action, so Smart Bidding looks for more form fills.</span></li>
              <li className="flex gap-3"><span className="note-num" aria-hidden="true">2</span><span><span className="sr-only">Note 2. </span>Syncing from HubSpot, so the connection looks fine.</span></li>
              <li className="flex gap-3"><span className="note-num" aria-hidden="true">3</span><span><span className="sr-only">Note 3. </span>Set to Secondary, so Smart Bidding ignores it.</span></li>
            </>
          ) : (
            <>
              <li className="flex gap-3 text-green-text"><Tick size={22} /><span>Set to Primary, so Smart Bidding uses it.</span></li>
              <li className="flex gap-3"><span className="note-ok" aria-hidden="true">✓</span><span>Syncing from HubSpot, so the connection looks fine.</span></li>
            </>
          )}
          <li className="flex gap-3 border-t border-gray-100 pt-4 text-green-text">
            <Tick size={22} />
            <span>The fix is a settings change, logged with its undo step and switched on the date you choose.</span>
          </li>
        </ol>
      </div>

      <div className="tile min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <fieldset className="mb-4 flex justify-center border-0 p-0 sm:justify-start">
          <legend className="sr-only">Show the conversion actions before or after the fix</legend>
          <div className="seg">
            <input type="radio" id={`${name}-before`} name={name} className="seg-input sr-only" checked={!fixed} onChange={() => setFixed(false)} />
            <label htmlFor={`${name}-before`} className="seg-item">Before fix</label>
            <input type="radio" id={`${name}-after`} name={name} className="seg-input sr-only" checked={fixed} onChange={() => setFixed(true)} />
            <label htmlFor={`${name}-after`} className="seg-item">After fix</label>
          </div>
        </fieldset>

        <div className="frag overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-4 py-3.5 sm:px-5">
            <p className="text-[1rem] font-medium tracking-[-0.02em]">Conversion actions</p>
            <p className="flex items-center gap-2 font-mono text-[11.5px] text-gray-600">
              Account ID <span className="inline-block h-[13px] w-[96px] rounded-[3px] bg-gray-100" role="img" aria-label="Account ID hidden" />
            </p>
          </div>
          <table className="w-full border-collapse text-left text-[0.8125rem] leading-snug tracking-[-0.01em] sm:text-[0.9375rem]">
            <caption className="sr-only">Example conversion actions, with notes</caption>
            <thead>
              <tr className="text-[0.75rem] text-gray-600 sm:text-[0.8125rem]">
                <th scope="col" className="py-3 pl-4 pr-2 font-normal sm:pl-5">Conversion action</th>
                <th scope="col" className="px-2 py-3 font-normal max-sm:hidden">Source</th>
                <th scope="col" className="px-2 py-3 font-normal">Goal</th>
                <th scope="col" className="py-3 pl-2 pr-4 font-normal sm:pr-5"><span className="sr-only">Notes</span></th>
              </tr>
            </thead>
            <tbody className="[&_td]:h-[56px] [&_tr]:border-t [&_tr]:border-gray-100">
              <tr>
                <td className="pl-4 pr-2 sm:pl-5">Lead form submit</td>
                <td className="px-2 text-gray-600 max-sm:hidden">Website form</td>
                <td className="px-2">
                  {fixed ? (
                    <span className={secondary}>Secondary</span>
                  ) : (
                    <span className="anno-box inline-flex"><span className={primary}>Primary</span></span>
                  )}
                </td>
                <td className="pl-2 pr-4 text-right sm:pr-5">{!fixed && <Tag n={1} kind="bad">Only Primary action</Tag>}</td>
              </tr>
              <tr>
                <td className="pl-4 pr-2 sm:pl-5">HubSpot MQL</td>
                <td className="px-2 font-mono text-[0.75rem] max-sm:hidden sm:text-[0.8125rem]">HubSpot, synced</td>
                <td className="px-2"><span className={secondary}>Secondary</span></td>
                <td className="pl-2 pr-4 sm:pr-5" />
              </tr>
              <tr>
                <td className="pl-4 pr-2 sm:pl-5">HubSpot SQL</td>
                <td className="px-2 max-sm:hidden">
                  <span className={`inline-flex px-1 font-mono text-[0.75rem] sm:text-[0.8125rem] ${fixed ? "anno-ok" : "anno-box"}`}>HubSpot, synced</span>
                </td>
                <td className="px-2">
                  {fixed ? (
                    <span className="anno-ok inline-flex"><span className={primary}>Primary</span></span>
                  ) : (
                    <span className="anno-box inline-flex"><span className={secondary}>Secondary</span></span>
                  )}
                </td>
                <td className="pl-2 pr-4 text-right sm:pr-5">
                  {fixed ? (
                    <Tag n={1} kind="ok">Counted for bidding</Tag>
                  ) : (
                    <span className="flex flex-col items-end gap-1.5">
                      <Tag n={2} kind="bad">Looks fine</Tag>
                      <Tag n={3} kind="bad">Ignored by bidding</Tag>
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="pl-4 pr-2 sm:pl-5">Test conversion</td>
                <td className="px-2 text-gray-600 max-sm:hidden">Website</td>
                <td className="px-2"><span className={secondary}>Secondary</span></td>
                <td className="pl-2 pr-4 sm:pr-5" />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Change log row, floating over the bottom edge of the table */}
        <div className="frag relative z-10 mt-4 p-4 sm:-mt-3 sm:ml-12 sm:p-5">
          <p className="font-mono text-[11.5px] uppercase tracking-[0.08em] text-gray-600">Change log row</p>
          <dl className="mt-3 grid grid-cols-1 gap-x-5 gap-y-3 text-[0.9375rem] leading-[1.45] tracking-[-0.01em] md:grid-cols-[1.1fr_1.1fr_0.8fr]">
            <div>
              <dt className="text-[0.8125rem] text-gray-600">Change</dt>
              <dd className="mt-1">Set “HubSpot SQL” to Primary and add it to the goal. Move “Lead form submit” to Secondary.</dd>
            </div>
            <div className="rounded-chip bg-green-100 px-3 py-2">
              <dt className="text-[0.8125rem] text-green-deep">To reverse</dt>
              <dd className="mt-1">Set “Lead form submit” back to Primary and “HubSpot SQL” back to Secondary.</dd>
            </div>
            <div>
              <dt className="text-[0.8125rem] text-gray-600">Status</dt>
              <dd className="mt-1"><span className="tag-ok">Approved, scheduled</span></dd>
              <dd className="mt-2 text-[0.8125rem] text-gray-600">Go-live date: you choose, because bidding relearns.</dd>
            </div>
          </dl>
        </div>
      </div>

      <figcaption className="img-label-quiet justify-self-start self-start lg:col-start-1 lg:row-start-2 lg:self-end">{label}</figcaption>
    </figure>
  );
}
