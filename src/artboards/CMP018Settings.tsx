import { useState } from 'react';
import { KeyRound, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StatusDot } from '@/components/ui/status-dot';
import { Switch } from '@/components/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';
import { DashboardChrome } from './_shared/DashboardChrome';

/* ─────────────────────────────────────────────────────────────────────────
 * CMP-018 — Settings (Workspace Admin)
 *
 * Profile / security / logging / integration configuration surface. Same
 * production-frame chrome as CMP-012 / CMP-013 / CMP-014 / CMP-017.
 * Default-pill Tabs (General / Logging / Integration) per the screenshot
 * inspirations — Settings is a settled-state surface where each tab is a
 * peer scope, not a workflow funnel, so the pill variant's "switch context"
 * affordance reads better than the underline funnel.
 *
 * No SettingsRow primitive: only three rows in Logging share the
 * "title + subtitle + control" pattern, which is below the abstraction
 * threshold. Inline `flex justify-between` + `<Label>` + descriptive `<p>`
 * keeps the recipe legible at the call site.
 * ───────────────────────────────────────────────────────────────────────── */

export function CMP018Settings({
  onNavigate,
  innerSidebarExpanded = false,
  onToggleInnerSidebar,
}: {
  onNavigate?: (pageId: string) => void;
  innerSidebarExpanded?: boolean;
  onToggleInnerSidebar?: () => void;
} = {}) {
  return (
    <div className="flex flex-col w-[1440px] min-w-0">
      <div className="flex flex-col w-full bg-ink-50">
        <ArtboardHeader
          code="CMP-018"
          title="Settings · Workspace Admin"
          description="Profile, security, logging, and integration configuration. Production-shell chrome shared with CMP-012 / CMP-013 / CMP-014 / CMP-017. Default-pill Tabs (General / Logging / Integration); rows in Logging use inline label + control composition rather than a dedicated primitive."
          parts="1 surface"
        />

        <div className="flex flex-col gap-3">
          <SectionHeader
            code="CMP-018.1 — SETTINGS SURFACE"
            hint="v-shell · gray well · page header · pill tabs · cards"
          />

          <DashboardChrome
            urlSlug="settings"
            screenEyebrow="SETTINGS"
            breadcrumbCurrent="Settings"
            activeNavId="settings"
            sidebarExpanded={innerSidebarExpanded}
            onToggleSidebar={onToggleInnerSidebar ?? (() => {})}
            onNavigate={onNavigate}
          >
            <SettingsSurface />
          </DashboardChrome>
        </div>
      </div>
    </div>
  );
}

/* ─── Page surface — header + tabs container ───────────────────────────── */

function SettingsSurface() {
  const [tab, setTab] = useState<'general' | 'logging' | 'integration'>('general');

  return (
    <>
      <PageHeader />
      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="gap-4">
        <TabsList variant="line" className="px-0 -mt-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="logging">Logging</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="flex flex-col gap-4">
          <ProfileCard />
          <SecurityCard />
        </TabsContent>
        <TabsContent value="logging">
          <LoggingCard />
        </TabsContent>
        <TabsContent value="integration">
          <IntegrationEmptyState />
        </TabsContent>
      </Tabs>
    </>
  );
}

/* ─── Page header — no eyebrow per spec, just title + subtitle ────────── */

function PageHeader() {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex flex-col gap-2 max-w-1/2">
        <h2 className="font-sans font-medium text-ink-900 text-3xl/9 -tracking-[1px] text-balance m-0">
          Settings
        </h2>
        <p className="font-sans text-ink-500 text-base tracking-tight text-pretty m-0">
          Profile, security, logging, and integrations.
        </p>
      </div>
    </div>
  );
}

/* ─── General · Profile & workspace ────────────────────────────────────── */

function ProfileCard() {
  const [displayName, setDisplayName] = useState('Chad Ponticas');
  const [email, setEmail] = useState('chad@constellationnetwork.io');
  const [organization, setOrganization] = useState("Chad Ponticas's workspace");
  // Snapshot the saved values so we can detect dirty state — the Save
  // button stays disabled until something actually changes, which is
  // the standard "no-op submit" guard.
  const [saved, setSaved] = useState({
    displayName: 'Chad Ponticas',
    email: 'chad@constellationnetwork.io',
    organization: "Chad Ponticas's workspace",
  });
  const dirty =
    displayName !== saved.displayName ||
    email !== saved.email ||
    organization !== saved.organization;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-base font-medium text-ink-900">
          Profile &amp; workspace
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Two-column form grid. Display name + Email pair on the first
            row (canonical "who you are" pair); Organization sits alone on
            the second row because it's a workspace-scope value, not a
            personal one — the gap signals the shift. Form labels follow
            the codified pattern: sans, ink-600, font-medium, text-sm
            (NOT mono uppercase). The form lives inside CardContent and
            the Save button in CardFooter associates via `form` attribute
            — this lets Enter from any input submit while keeping the
            CardFooter primitive's chrome (border-t + ink-50 wash) and
            the Card's auto `pb-0` when a footer slot is present. */}
        <form
          id="settings-profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            setSaved({ displayName, email, organization });
          }}
          className="grid grid-cols-2 gap-x-4 gap-y-4"
        >
          <FormField
            id="settings-display-name"
            label="Display name"
            value={displayName}
            onChange={setDisplayName}
            autoComplete="name"
          />
          <FormField
            id="settings-email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
          />
          <FormField
            id="settings-organization"
            label="Organization"
            value={organization}
            onChange={setOrganization}
            autoComplete="organization"
          />
        </form>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!dirty}
          onClick={() => {
            setDisplayName(saved.displayName);
            setEmail(saved.email);
            setOrganization(saved.organization);
          }}
          className="border-ink-200 bg-white text-ink-900"
        >
          Reset
        </Button>
        <Button
          type="submit"
          form="settings-profile-form"
          variant="default"
          size="sm"
          disabled={!dirty}
        >
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
}

function FormField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-ink-600 font-medium text-sm">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        spellCheck={false}
      />
    </div>
  );
}

/* ─── General · Security ───────────────────────────────────────────────── */

function SecurityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-base font-medium text-ink-900">
          Security
        </CardTitle>
        <CardDescription className="font-sans text-sm text-ink-500">
          Passkeys — phishing-resistant, no password required.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Passkey row — title + subtitle on the left, action on the right.
            Same "row with a control on the right" composition the Logging
            rows use; not abstracted into a primitive at this scale. */}
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-1 min-w-0">
            <h4 className="font-sans text-sm font-medium text-ink-900 m-0">
              Passkey
            </h4>
            <p className="font-sans text-sm text-ink-500 text-pretty m-0">
              Sign in with Touch ID, Windows Hello, or a hardware key.
            </p>
          </div>
          <Button variant="default" size="sm" className="shrink-0">
            <KeyRound data-icon="inline-start" aria-hidden />
            Add a passkey
          </Button>
        </div>

        {/* Registered passkeys subsection — sub-eyebrow + empty body.
            Eyebrow uses the same mono-uppercase recipe as section
            headers in the spec sheets, sized smaller because this is a
            sub-tier inside a card, not a top-level grouping. */}
        <div className="flex flex-col gap-2 pt-4 border-t border-ink-200">
          <span className="font-mono text-xs uppercase tracking-[0.1em] font-medium text-ink-500">
            Registered passkeys
          </span>
          <p className="font-sans text-sm text-ink-500 m-0">
            No passkeys registered yet.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Logging configuration ───────────────────────────────────────────── */

function LoggingCard() {
  const [logBodies, setLogBodies] = useState(true);
  const [retention, setRetention] = useState('90');
  const [logLevel, setLogLevel] = useState('info');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-sans text-base font-medium text-ink-900">
          Logging configuration
        </CardTitle>
        <CardDescription className="font-sans text-sm text-ink-500">
          Controls what gateway data is captured and how long it&rsquo;s retained.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        {/* Each row = title + subtitle on the left, control on the right.
            Dividers between rows so the rhythm reads as a list of
            independent settings (not a paragraph of correlated copy).
            First row has its own top divider via the card header
            border-spacing; subsequent rows use border-t. */}
        <SettingsRow
          id="setting-log-bodies"
          title="Log request & response bodies"
          subtitle="Store full payloads for debugging. May increase storage costs."
          control={
            <Switch
              id="setting-log-bodies"
              checked={logBodies}
              onCheckedChange={setLogBodies}
            />
          }
          first
        />
        <SettingsRow
          static
          title="Audit fingerprints"
          subtitle="Attach cryptographic fingerprints to every log entry for tamper detection."
          control={
            <Badge variant="success">
              <StatusDot kind="success" />
              Enabled
            </Badge>
          }
        />
        <SettingsRow
          id="setting-retention"
          title="Retention period"
          subtitle="How long log entries are stored before automatic deletion."
          control={
            <Select value={retention} onValueChange={setRetention}>
              <SelectTrigger
                id="setting-retention"
                size="default"
                className="w-32 border-ink-200 bg-white text-ink-900"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
                <SelectItem value="365">365 days</SelectItem>
              </SelectContent>
            </Select>
          }
        />
        <SettingsRow
          id="setting-log-level"
          title="Log level"
          subtitle="Minimum severity for gateway log capture."
          control={
            <Select value={logLevel} onValueChange={setLogLevel}>
              <SelectTrigger
                id="setting-log-level"
                size="default"
                className="w-32 border-ink-200 bg-white text-ink-900"
              >
                <SelectValue>
                  {(value) => LOG_LEVEL_LABEL[value as string] ?? String(value)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debug">Debug</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warn">Warn</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          }
        />
      </CardContent>
    </Card>
  );
}

const LOG_LEVEL_LABEL: Record<string, string> = {
  debug: 'Debug',
  info: 'Info',
  warn: 'Warn',
  error: 'Error',
};

/* SettingsRow — local helper, NOT a primitive. Lives in this file to keep
 * the Logging composition legible without inflating the design-system
 * surface. If a third surface needs the same shape, lift to
 * `components/ui/`.
 *
 * Two modes:
 *   - default (input-bearing): title renders as `<Label htmlFor={id}>`
 *     associating the click target with the control; pass `id` matching
 *     the inner control's id.
 *   - `static` (no real control): title renders as a heading-styled span
 *     because there's nothing for `<Label htmlFor>` to point at. Used by
 *     rows where the right-side affordance is a Badge or other read-only
 *     state, not a focusable input.
 */
function SettingsRow({
  id,
  title,
  subtitle,
  control,
  first = false,
  static: isStatic = false,
}: {
  id?: string;
  title: string;
  subtitle: string;
  control: React.ReactNode;
  first?: boolean;
  static?: boolean;
}) {
  return (
    <div
      className={
        first
          ? 'flex items-center justify-between gap-6 py-4'
          : 'flex items-center justify-between gap-6 py-4 border-t border-ink-200'
      }
    >
      <div className="flex flex-col gap-1 min-w-0">
        {isStatic ? (
          <span className="font-sans text-ink-900 font-medium text-sm leading-none">
            {title}
          </span>
        ) : (
          <Label htmlFor={id} className="text-ink-900 font-medium text-sm">
            {title}
          </Label>
        )}
        <p className="font-sans text-sm text-ink-500 text-pretty m-0">
          {subtitle}
        </p>
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

/* ─── Integration · empty state ───────────────────────────────────────── */

function IntegrationEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 px-6 rounded-sm bg-white shadow-(--shadow-border) text-center">
      <span
        aria-hidden
        className="inline-flex items-center justify-center size-12 rounded-sm bg-ink-100 text-ink-600"
      >
        <Layers className="size-6" strokeWidth={1.5} />
      </span>
      <h3 className="font-sans text-base font-medium text-ink-900 m-0">
        No integrations configured
      </h3>
      <p className="font-sans text-sm text-ink-500 max-w-md text-pretty m-0">
        Forward gateway events to Slack, PagerDuty, Datadog, and other
        destinations. Integrations are scoped to this workspace.
      </p>
      <Button variant="outline" size="sm" className="mt-1 border-ink-200 bg-white text-ink-900">
        Browse integrations
      </Button>
    </div>
  );
}
