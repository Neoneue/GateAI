import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SettingsRow } from '@/components/ui/settings-row';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';
import { DashboardChrome } from './_shared/DashboardChrome';

/* ─────────────────────────────────────────────────────────────────────────
 * CMP-018 — Settings (Workspace Admin)
 *
 * Profile / security / logging / integration configuration surface. Same
 * production-frame chrome as CMP-012 / CMP-013 / CMP-014 / CMP-017.
 * Line-variant Tabs (General / Logging / Integration) — Settings is a
 * settled-state surface where each tab is a peer scope, not a workflow
 * funnel, so the line variant's "context switch" affordance reads better
 * than the pill funnel.
 *
 * Composition: title + subtitle + control rows flow through the shared
 * `<SettingsRow>` primitive at `@/components/ui/settings-row` — both the
 * Logging tab's four rows and SecurityCard's passkey row consume it.
 * Do not re-inline the recipe; extend the primitive (new variant, new
 * prop) when behavior diverges.
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
          description="Profile, security, logging, and integration configuration. Production-shell chrome shared with CMP-012 / CMP-013 / CMP-014 / CMP-017. Line-variant Tabs (General / Logging / Integration); rows in Logging use inline label + control composition rather than a dedicated primitive."
          parts="1 surface"
        />

        <div className="flex flex-col gap-4">
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
  return (
    <>
      <PageHeader />
      <div className="flex flex-col gap-4">
        <ProfileCard />
        <SecurityCard />
      </div>
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
            — this lets Enter from any input submit. Card.tsx applies
            `pb-0` automatically when a CardFooter slot is present, so
            the footer's own `p-4` carries the action-zone padding. */}
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
        {/* Passkey row — title + subtitle + action. Same shape as the
            Logging tab's SettingsRows; migrated to the shared primitive
            with `titleAs="h4"` to nest semantically under the CardTitle
            ("Authentication") and `alignTop` to preserve the original
            top-aligned layout when the subtitle wraps. */}
        <SettingsRow
          first
          static
          titleAs="h4"
          alignTop
          title="Passkey"
          subtitle="Sign in with Touch ID, Windows Hello, or a hardware key."
          control={
            <Button variant="default" size="sm" className="shrink-0">
              <KeyRound data-icon="inline-start" aria-hidden />
              Add a passkey
            </Button>
          }
        />

        {/* Registered passkeys subsection — sub-eyebrow + empty body.
            Eyebrow uses the same mono-uppercase recipe as section
            headers across the spec sheets. The wrapping `<CardContent
            className="flex flex-col gap-4">` (L276) supplies the 16px
            rhythm between the Passkey row and this group; adding a
            border-t + pt-4 here would double-up two rhythms (whitespace
            + hairline) for the same visual job. */}
        <div className="flex flex-col gap-2">
          {/* EXTRACT: <Eyebrow> — the literal recipe
              `font-mono text-xs uppercase tracking-[0.1em] font-medium text-ink-500`
              is duplicated in CMP-013, CMP-014, CMP-016, CMP-018, and
              sidebar.tsx (5+ sites). Extraction is owed and deferred
              from per-file polish scope — touching 4 sibling artboards
              + a primitive is a dedicated normalize pass. */}
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

/* SettingsRow — extracted to `@/components/ui/settings-row` (2026-05-10).
 * SecurityCard's passkey row imports from the primitive. Do not re-inline
 * the recipe here. */
