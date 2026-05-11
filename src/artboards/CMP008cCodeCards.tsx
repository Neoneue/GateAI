import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import {
  CodeBlock,
  CodeCard,
  CodeCardCopyButton,
  CodeCardHeader,
  CodeCardTabs,
  TerminalCard,
  linesToString,
  type CodeLine,
} from '@/components/ui/code-card';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

/* ─────────────────────────────────────────────────────────────────────────
 * CMP-008c — Code cards
 *
 * Five layouts × one primitive family. Every visible thing traces back
 * to a primitive in src/components/ui/:
 *
 *   A · HERO              — CodeCard + CodeCardHeader + CodeCardTabs +
 *                           CodeCardCopyButton + CodeBlock + Button (CTAs)
 *   B1 · LIGHT TABBED     — same family, smaller scale
 *   B2 · DARK TERMINAL    — TerminalCard + CodeBlock(tone=dark)
 *   B3 · REQUEST/RESPONSE — CodeCard + Tag (status pill) + CodeBlock × 2
 *   C · STEPS             — CodeCard wrapping numbered rows whose snippets
 *                           use CodeBlock(density=inline)
 *
 * Code colour comes from semantic syntax tokens added to index.css —
 * never inline hex / oklch.
 *
 * Per repo contract: primary CTA is the default <Button> (resolves to
 * black via --primary). The Paper design uses brand blue here; this
 * intentional deviation is explained in the contract chain (system.md
 * not present yet → globals.css wins; black is the defined primary).
 * ───────────────────────────────────────────────────────────────────────── */

/* ─── Reusable code snippets (LLM-gateway flavoured placeholders) ──────── */

const CURL_LINES: CodeLine[] = [
  [
    { text: 'curl', tone: 'keyword' },
    { text: ' https://api.constellation.io/v1/messages ' },
    { text: '\\', tone: 'muted' },
  ],
  [
    { text: '  ' },
    { text: '-H', tone: 'keyword' },
    { text: ' ' },
    { text: '"Authorization: Bearer ', tone: 'string' },
    { text: '$KEY', tone: 'variable' },
    { text: '"', tone: 'string' },
    { text: ' ' },
    { text: '\\', tone: 'muted' },
  ],
  [
    { text: '  ' },
    { text: '-d', tone: 'keyword' },
    { text: ' ' },
    { text: "'{", tone: 'string' },
    { text: '"model"', tone: 'property' },
    { text: ':', tone: 'muted' },
    { text: '"claude-sonnet-4.5"', tone: 'string' },
    { text: "}'", tone: 'string' },
  ],
];

const STEP1_SNIPPET: CodeLine = [
  { text: 'export', tone: 'keyword' },
  { text: ' KEY' },
  { text: '=', tone: 'muted' },
  { text: 'sk-tp-prod_a7c3...2f8', tone: 'string' },
];

const STEP2_SNIPPET: CodeLine = [
  { text: 'curl', tone: 'keyword' },
  { text: ' ' },
  { text: '-H', tone: 'keyword' },
  { text: ' ' },
  { text: '"Authorization: Bearer ', tone: 'string' },
  { text: '$KEY', tone: 'variable' },
  { text: '"', tone: 'string' },
  { text: ' ' },
  { text: '...', tone: 'muted' },
];

const TERMINAL_LINES: CodeLine[] = [
  [
    { text: '$ ', tone: 'muted' },
    { text: 'npm install ', tone: 'keyword' },
    { text: '@constellation/gateway', tone: 'default' },
  ],
  [
    { text: 'added ', tone: 'muted' },
    { text: '14', tone: 'number' },
    { text: ' packages in ', tone: 'muted' },
    { text: '1.2s', tone: 'number' },
  ],
  [
    { text: '$ ', tone: 'muted' },
    { text: 'tp send ', tone: 'keyword' },
    { text: '"Hello, world"', tone: 'property' },
  ],
  [
    { text: '200', tone: 'number' },
    { text: ' OK ', tone: 'default' },
    { text: '· ', tone: 'muted' },
    { text: '842ms', tone: 'number' },
    { text: ' · ', tone: 'muted' },
    { text: 'root', tone: 'number' },
    { text: ' ' },
    { text: '9c2e04a7', tone: 'number' },
  ],
];

const REQUEST_LINES: CodeLine[] = [
  [{ text: '// request', tone: 'muted' }],
  [
    { text: '{ ', tone: 'muted' },
    { text: '"model"', tone: 'property' },
    { text: ': ', tone: 'muted' },
    { text: '"claude-sonnet-4.5"', tone: 'string' },
    { text: ', ', tone: 'muted' },
    { text: '"prompt"', tone: 'property' },
    { text: ': ', tone: 'muted' },
    { text: '"Hello"', tone: 'string' },
    { text: ' }', tone: 'muted' },
  ],
];

const RESPONSE_LINES: CodeLine[] = [
  [{ text: '// response', tone: 'muted' }],
  [
    { text: '{ ', tone: 'muted' },
    { text: '"id"', tone: 'property' },
    { text: ': ', tone: 'muted' },
    { text: '"msg_a7c3..."', tone: 'string' },
    { text: ', ', tone: 'muted' },
    { text: '"root"', tone: 'property' },
    { text: ': ', tone: 'muted' },
    { text: '"9c2e04a7..."', tone: 'string' },
    { text: ' }', tone: 'muted' },
  ],
];

/* ─── Page ───────────────────────────────────────────────────────────────── */

export function CMP008cCodeCards() {
  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-50">
        <ArtboardHeader
          code="CMP-008c"
          title="Code cards"
          description="Three layouts for showing code in marketing and quickstart contexts. All built from the same .v-codebox primitive — same syntax classes, same tab chrome — only the surrounding shell differs."
          parts="3 layouts · 1 primitive"
        />

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SectionHeader
              code="CMP-008c.1 — CARD LAYOUTS"
              hint="A · marketing hero · C · numbered steps"
            />

            <HeroCard />
            <StepsCard />
          </div>

          <div className="flex flex-col gap-4">
            <SectionHeader
              code="CMP-008c.2 — COMPACT · THREE FLAVORS"
              hint="B1 · light tabs · B2 · dark terminal · B3 · request / response"
            />

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <LightTabbedCard />
              <DarkTerminalCard />
              <RequestResponseCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── A · HERO ───────────────────────────────────────────────────────────── */

function HeroCard() {
  return (
    <div className="flex items-center gap-8 p-6 rounded-md bg-white shadow-(--shadow-border)">
      <div className="flex flex-col grow shrink basis-0 gap-4">
        <div className="font-mono uppercase tracking-[0.1em] text-blue-700 text-xs/4 font-medium">
          QUICKSTART
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-sans font-medium text-ink-800 text-2xl/8 -tracking-[0.25px] m-0">
            Send your first request
            <br />
            in one shot.
          </h3>
          <p className="text-ink-500 text-base/6 max-w-[425px] m-0">
            Replace the placeholder key, paste it in your terminal. Sub-second
            TTFB, audit chain mounted, no SDK required.
          </p>
        </div>
        <div className="flex gap-2 mt-2">
          <Button size="sm">Get an API key</Button>
          <Button size="sm" variant="outline">
            Read the docs
          </Button>
        </div>
      </div>
      <CodeCard elevation="raised" className="flex-1 shrink basis-0">
        <CodeCardHeader>
          <CodeCardTabs items={['curl', 'node', 'python']} active="curl" />
          <CodeCardCopyButton value={linesToString(CURL_LINES)} label="cURL snippet" />
        </CodeCardHeader>
        <CodeBlock lines={CURL_LINES} />
      </CodeCard>
    </div>
  );
}

/* ─── C · STEPS ──────────────────────────────────────────────────────────── */

interface StepItem {
  n: number;
  title: string;
  body: string;
  snippet?: CodeLine;
}

const STEPS: StepItem[] = [
  {
    n: 1,
    title: 'Get a key',
    body: 'Visit /api-keys and click Create key. Copy the secret. Treat it like a password.',
    snippet: STEP1_SNIPPET,
  },
  {
    n: 2,
    title: 'Send a request',
    body: 'Hit /v1/messages with the bearer token. The gateway routes to the cheapest healthy provider for the model.',
    snippet: STEP2_SNIPPET,
  },
  {
    n: 3,
    title: 'Verify the audit root',
    body: 'Every response includes a Merkle root. Pull /v1/audit/proof?id=… for the inclusion proof and verify locally.',
  },
];

function StepsCard() {
  return (
    <div className="flex flex-col p-6 gap-4 rounded-md bg-white shadow-(--shadow-border)">
      {STEPS.map((step) => (
        <div key={step.n} className="flex items-start gap-4">
          <div aria-hidden className="flex items-center justify-center shrink-0 size-6 rounded-full bg-blue-700">
            <span className="font-mono font-medium text-white text-xs/4">
              {step.n}
            </span>
          </div>
          <div className="flex flex-col grow shrink basis-0 gap-2">
            <h4 className="font-sans font-medium text-ink-800 text-sm/5 m-0">
              {step.title}
            </h4>
            <p className="text-ink-500 text-xs/4 m-0">{step.body}</p>
            {step.snippet && (
              <div className="mt-2 rounded-sm bg-ink-100 border border-ink-100">
                <CodeBlock lines={[step.snippet]} density="inline" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── B1 · LIGHT · TABBED ────────────────────────────────────────────────── */

function LightTabbedCard() {
  return (
    <CodeCard elevation="raised">
      <CodeCardHeader>
        <CodeCardTabs items={['curl', 'node', 'python']} active="curl" />
        <CodeCardCopyButton value={linesToString(CURL_LINES)} label="cURL snippet" />
      </CodeCardHeader>
      <CodeBlock lines={CURL_LINES} />
    </CodeCard>
  );
}

/* ─── B2 · DARK TERMINAL ─────────────────────────────────────────────────── */

function DarkTerminalCard() {
  return (
    <TerminalCard title="~/projects/gateway · zsh">
      <CodeBlock lines={TERMINAL_LINES} tone="dark" />
    </TerminalCard>
  );
}

/* ─── B3 · REQUEST / RESPONSE ────────────────────────────────────────────── */

function RequestResponseCard() {
  return (
    <CodeCard>
      <div className="flex items-center gap-2 px-4 py-3 bg-ink-100 border-b border-ink-100">
        <span className="inline-flex items-center h-5 px-2 rounded-sm bg-ink-800 font-sans font-medium text-white text-xs/4 tracking-wider">
          POST
        </span>
        <span className="font-sans text-ink-800 text-xs/4">/v1/messages</span>
        {/* Status pill — uses <Tag> primitive with chrome stripped for density.
            Paper renders the pill as text-only on the header strip; the <Tag>
            wrapper keeps it semantically a "removable/status chip" type. */}
        <Tag className="ml-auto h-5 bg-transparent border-transparent text-success-700 font-mono">
          200 · 842ms
        </Tag>
      </div>
      <div className="border-b border-ink-100">
        <CodeBlock lines={REQUEST_LINES} />
      </div>
      <CodeBlock lines={RESPONSE_LINES} />
    </CodeCard>
  );
}
