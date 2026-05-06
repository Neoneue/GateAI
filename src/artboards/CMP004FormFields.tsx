import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

/**
 * CMP-004 · Form fields
 *
 * Composes shadcn primitives (all from @base-ui/react/* under the hood):
 *   Input · Textarea · Label · Select · Checkbox · RadioGroup · Switch
 *
 * Showcases helper / error states + a fully wired form using local state.
 */
export function CMP004FormFields() {
  const [keyName, setKeyName] = useState('prod-backend');
  const [description, setDescription] = useState('Used by mobile-ios + the staging worker.');
  const [env, setEnv] = useState('production');
  const [webhook, setWebhook] = useState('not-a-url');

  const [scopes, setScopes] = useState({
    'requests:read': true,
    'requests:write': false,
    'audit:read': true,
  });
  const [rotation, setRotation] = useState('30');
  const [notifications, setNotifications] = useState({
    autoRotate: true,
    restrictIps: false,
    emailOnDormancy: true,
  });

  const webhookValid = /^https:\/\//.test(webhook);

  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-50">
        <ArtboardHeader
          code="CMP-004"
          title="Form fields"
          description="Text input, textarea, select, checkbox, radio, switch, helper / error states. Same hairline border, same focus ring."
          parts="7 controls"
        />

        <div className="flex items-start gap-6 bg-ink-50">
          {/* CMP-004.1 — TEXT INPUTS */}
          <div className="flex flex-col grow gap-3 basis-0 bg-ink-50">
            <SectionHeader
              code="CMP-004.1 — TEXT INPUTS"
              hint="<Input /> · <Textarea /> · <Select />"
            />
            <div className="flex flex-col rounded-sm gap-4 bg-white border border-ink-100 p-7">
              {/* Key name (required) */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="key-name" className="text-ink-600 font-medium text-sm">
                    Key name
                  </Label>
                  <span className="font-mono text-xs text-ink-500 tracking-[0.04em]">required</span>
                </div>
                <Input
                  id="key-name"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  required
                  aria-describedby="key-name-help"
                />
                <p id="key-name-help" className="text-sm text-ink-500">
                  Lowercase, hyphens. Visible to teammates with key:read.
                </p>
              </div>

              {/* Description (optional, textarea) */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description" className="text-ink-600 font-medium text-sm">
                    Description
                  </Label>
                  <span className="font-mono text-xs text-ink-500 tracking-[0.04em]">optional</span>
                </div>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-22 leading-[22px]"
                />
              </div>

              {/* Environment (select) */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="environment" className="text-ink-600 font-medium text-sm">Environment</Label>
                <Select value={env} onValueChange={setEnv}>
                  <SelectTrigger id="environment" className="w-full">
                    <SelectValue placeholder="Select an environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">production</SelectItem>
                    <SelectItem value="staging">staging</SelectItem>
                    <SelectItem value="preview">preview</SelectItem>
                    <SelectItem value="development">development</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email (disabled) */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email" className="text-ink-600 font-medium text-sm">
                    Email
                  </Label>
                  <span className="font-mono text-xs text-ink-500 tracking-[0.04em]">disabled</span>
                </div>
                <Input
                  id="email"
                  value="jane@constellation"
                  disabled
                />
              </div>

              {/* Webhook URL (error state) */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="webhook" className="text-ink-600 font-medium text-sm">
                  Webhook URL
                </Label>
                <Input
                  id="webhook"
                  value={webhook}
                  onChange={(e) => setWebhook(e.target.value)}
                  aria-invalid={!webhookValid}
                  aria-describedby={!webhookValid ? 'webhook-error' : undefined}
                />
                {!webhookValid && (
                  <p id="webhook-error" role="alert" className="text-sm text-destructive">
                    Must be a valid https:// URL.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* CMP-004.2 — CHECKBOX · RADIO · SWITCH */}
          <div className="flex flex-col grow gap-3 basis-0 bg-ink-50">
            <SectionHeader
              code="CMP-004.2 — CHECKBOX · RADIO · SWITCH"
              hint="<Checkbox /> · <RadioGroup /> · <Switch />"
            />
            <div className="flex flex-col rounded-sm gap-5 bg-white border border-ink-100 p-7">
              {/* Scopes — checkboxes */}
              <div role="group" aria-labelledby="scopes-label" className="flex flex-col gap-3">
                <Label id="scopes-label" className="text-ink-800 font-medium text-sm">Scopes</Label>
                {[
                  { id: 'requests:read', label: 'requests:read', hint: 'View request logs and metrics.' },
                  { id: 'requests:write', label: 'requests:write', hint: 'Send prompts through the gateway.' },
                  { id: 'audit:read', label: 'audit:read', hint: 'Verify Merkle proofs.' },
                ].map((s) => (
                  <div key={s.id} className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 items-center">
                    <Checkbox
                      id={s.id}
                      checked={scopes[s.id as keyof typeof scopes]}
                      onCheckedChange={(v) =>
                        setScopes((prev) => ({ ...prev, [s.id]: Boolean(v) }))
                      }
                      className="size-3.5 rounded-[3px] data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-700"
                    />
                    <Label htmlFor={s.id} className="text-ink-800 font-medium text-sm">
                      {s.label}
                    </Label>
                    <span aria-hidden />
                    <p className="text-sm text-ink-500">{s.hint}</p>
                  </div>
                ))}
              </div>

              {/* Rotation cadence — radios */}
              <div className="flex flex-col gap-3">
                <Label id="rotation-label" className="text-ink-800 font-medium text-sm">Rotation cadence</Label>
                <RadioGroup value={rotation} onValueChange={setRotation} aria-labelledby="rotation-label" className="flex flex-col gap-3">
                  {[
                    { value: '30', label: '30 days' },
                    { value: '60', label: '60 days' },
                    { value: '90', label: '90 days' },
                    { value: 'never', label: 'never (manual)' },
                  ].map((r) => (
                    <div key={r.value} className="flex items-center gap-3">
                      <RadioGroupItem
                        value={r.value}
                        id={`rotation-${r.value}`}
                        className="size-3.5 data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-700"
                      />
                      <Label htmlFor={`rotation-${r.value}`} className="text-ink-800 text-sm font-normal">
                        {r.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Notifications — switches */}
              <div role="group" aria-labelledby="notifications-label" className="flex flex-col gap-3">
                <Label id="notifications-label" className="text-ink-800 font-medium text-sm">Notifications</Label>
                {[
                  { key: 'autoRotate' as const, label: 'Auto-rotate before expiry' },
                  { key: 'restrictIps' as const, label: 'Restrict to allowlisted IPs' },
                  { key: 'emailOnDormancy' as const, label: 'Email me on use after dormancy' },
                ].map((n) => (
                  <div key={n.key} className="flex items-center justify-between">
                    <Label htmlFor={n.key} className="text-ink-800 text-sm font-normal">
                      {n.label}
                    </Label>
                    <Switch
                      id={n.key}
                      checked={notifications[n.key]}
                      onCheckedChange={(v) =>
                        setNotifications((prev) => ({ ...prev, [n.key]: v }))
                      }
                      className="data-[state=checked]:bg-blue-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
