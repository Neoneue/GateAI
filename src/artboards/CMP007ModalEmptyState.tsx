import { useState } from 'react';
import { toast } from 'sonner';
import { KeyRound, Plus, Copy, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import { VendorAvatar } from '@/components/icons/vendor-meta';
import { ArtboardHeader, SectionHeader } from './_shared/ArtboardHeader';

const FAKE_SECRET = 'sk-tp-prev_c2d8a4f0e1b97f1';

export function CMP007ModalEmptyState() {
  const [confirmName, setConfirmName] = useState('');
  const [keyName, setKeyName] = useState('');
  const [scope, setScope] = useState('read-write');
  const [expires, setExpires] = useState('90d');

  const resetCreate = () => {
    setKeyName('');
    setScope('read-write');
    setExpires('90d');
  };

  return (
    <div className="flex flex-col w-[1440px]">
      <div className="flex flex-col w-full bg-ink-50">
        <ArtboardHeader
          code="CMP-007"
          title="Modal"
          description="Modal panels for confirm, create, and payload reveal. Anchored mid-screen, white card on a dimmed backdrop. Detail-payload variant uses a bordered key-value grid."
          parts="4 modal variants"
        />

        <div className="flex flex-col gap-7">
          {/* CMP-007.1 — MODAL */}
          <div className="flex flex-col gap-3">
            <SectionHeader
              code="CMP-007.1 — MODAL"
              hint="<AlertDialog> · <Dialog> · <Dialog> (payload)"
            />
            <Card className="p-7 gap-7 rounded-sm">
              <div className="grid grid-cols-2 gap-5 items-start">
                <ModalSpecimen
                  title="Revoke prod-backend?"
                  subtitle="This key was last used 2 minutes ago."
                  onClose={() => setConfirmName('')}
                >
                  <p className="text-sm text-ink-900">
                    Apps using this key will fail authentication immediately. Type the key name to confirm.
                  </p>
                  <Input
                    placeholder="prod-backend"
                    value={confirmName}
                    onChange={(e) => setConfirmName(e.target.value)}
                    aria-label="Type key name to confirm"
                  />
                  <ModalFooter>
                    <Button variant="ghost" onClick={() => setConfirmName('')}>Cancel</Button>
                    <Button
                      variant="destructive"
                      disabled={confirmName !== 'prod-backend'}
                      onClick={() => {
                        toast.success('Key revoked', {
                          description: 'prod-backend will fail auth immediately.',
                        });
                        setConfirmName('');
                      }}
                    >
                      Revoke key
                    </Button>
                  </ModalFooter>
                </ModalSpecimen>

                <ModalSpecimen
                  title="Create API key"
                  onClose={resetCreate}
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="cmp006-name" className="text-xs text-ink-600">
                      Name
                    </Label>
                    <Input
                      id="cmp006-name"
                      placeholder="preview-env"
                      value={keyName}
                      onChange={(e) => setKeyName(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col gap-2 flex-1">
                      <Label htmlFor="cmp007-scope" className="text-xs text-ink-600">Scope</Label>
                      <Select value={scope} onValueChange={setScope}>
                        <SelectTrigger id="cmp007-scope" className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="read-only">read-only</SelectItem>
                          <SelectItem value="read-write">read-write</SelectItem>
                          <SelectItem value="admin">admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <Label htmlFor="cmp007-expires" className="text-xs text-ink-600">Expires</Label>
                      <Select value={expires} onValueChange={setExpires}>
                        <SelectTrigger id="cmp007-expires" className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30d">30d</SelectItem>
                          <SelectItem value="60d">60d</SelectItem>
                          <SelectItem value="90d">90d</SelectItem>
                          <SelectItem value="never">never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <ModalFooter>
                    <Button variant="ghost" onClick={resetCreate}>Cancel</Button>
                    <Button
                      disabled={!keyName.trim()}
                      onClick={() => {
                        toast.success('Key created', { description: keyName });
                        resetCreate();
                      }}
                    >
                      Create key
                    </Button>
                  </ModalFooter>
                </ModalSpecimen>

                <ModalSpecimen
                  title="Key created"
                  subtitle="Copy now — this is the only time the secret is shown."
                  className="col-span-2"
                  onClose={() => toast('Closed payload')}
                >
                  <SecretRow secret={FAKE_SECRET} />
                  <ModalFooter>
                    <Button onClick={() => toast.success('Done')}>Done</Button>
                  </ModalFooter>
                </ModalSpecimen>
              </div>
            </Card>
          </div>

          {/* CMP-007.1b — GENERATION DETAILS */}
          <div className="flex flex-col gap-3">
            <SectionHeader
              code="CMP-007.1b — GENERATION DETAILS"
              hint="<Dialog> · payload · spec sheet"
            />
            <Card className="p-7 rounded-sm items-center">
              <GenerationDetailsModal />
            </Card>
          </div>

          {/* CMP-007.2 — EMPTY STATE */}
          <div className="flex flex-col gap-3">
            <SectionHeader
              code="CMP-007.2 — EMPTY STATE"
              hint="centered icon · heading · subtext · CTA"
            />
            <Card className="p-7 rounded-sm">
              <div className="flex flex-col items-center justify-center h-80 rounded-sm gap-3 bg-white border border-ink-100 p-5">
                <div className="flex items-center justify-center rounded-xl bg-ink-50 border border-ink-200 size-14">
                  <KeyRound className="size-7 text-ink-900" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col items-center gap-1 mt-2">
                  <h2 className="text-lg font-medium -tracking-[0.01em] text-ink-900">
                    No API keys yet
                  </h2>
                  <p className="max-w-60 text-center text-sm text-ink-600">
                    Create your first key to start sending requests through the gateway.
                  </p>
                </div>
                <Button className="mt-2" onClick={() => toast.success('Empty state CTA fired')}>
                  <Plus />
                  Create first key
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalSpecimen({
  title,
  subtitle,
  children,
  className,
  onClose,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
}) {
  return (
    <div
      className={
        'flex flex-col rounded-xl bg-white border border-ink-200 shadow-(--shadow-modal) overflow-clip ' +
        (className ?? '')
      }
    >
      <div className="flex items-start justify-between pt-4 pr-3 pb-1 pl-5">
        <div className="flex flex-col">
          <div className="text-base font-medium -tracking-[0.01em] text-ink-900">
            {title}
          </div>
          {subtitle && <div className="text-xs text-ink-500 mt-1">{subtitle}</div>}
        </div>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Close"
          onClick={onClose}
          className="text-ink-500 hover:text-ink-700"
        >
          <X />
        </Button>
      </div>
      <div className="flex flex-col gap-4 pt-3 pb-4 px-5">{children}</div>
    </div>
  );
}

function ModalFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-end gap-2 pt-1 -mx-5 -mb-4 pb-4 px-5">
      {children}
    </div>
  );
}

function GenerationDetailsModal() {
  return (
    <div
      className="flex flex-col w-[640px] rounded-xl bg-white border border-ink-200 shadow-(--shadow-modal) overflow-clip"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-ink-200">
        <div className="flex flex-col gap-1">
          <div className="text-base font-medium -tracking-[0.01em] text-ink-900">
            Generation details
          </div>
          <div className="font-mono tabular-nums text-xs text-ink-500">
            Apr 22, 2026 14:28:04 UTC
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Close"
          onClick={() => toast('Closed generation details')}
          className="text-ink-500 hover:text-ink-700"
          type="button"
        >
          <X />
        </Button>
      </div>

      {/* Body */}
      <div className="flex flex-col px-5 py-5 gap-4">
        {/* Primary metadata */}
        <DetailGrid>
          <DetailRow label="Model">
            <span className="inline-flex items-center gap-2">
              <VendorAvatar vendor="anthropic" />
              <span className="font-mono text-sm text-ink-900 -tracking-[0.2px]">
                anthropic/claude-sonnet-4.8
              </span>
            </span>
          </DetailRow>
          <DetailRow label="Provider">
            <span className="text-sm text-ink-900">AWS Bedrock (us-east-1)</span>
          </DetailRow>
          <DetailRow label="Status">
            <Badge variant="success">
              <StatusDot kind="success" />
              <span className="font-mono tabular-nums">200 OK</span>
            </Badge>
          </DetailRow>
          <DetailRow label="First token latency">
            <span className="font-mono tabular-nums text-sm text-ink-900">0.42 s</span>
          </DetailRow>
          <DetailRow label="Throughput">
            <span className="font-mono tabular-nums text-sm text-ink-900">
              87.3 tokens/sec
            </span>
          </DetailRow>
          <DetailRow label="Tokens">
            <span className="font-mono tabular-nums text-sm text-ink-900">
              2,847 prompt
              <span className="text-ink-500"> · </span>
              1,204 completion
            </span>
          </DetailRow>
          <DetailRow label="Cost">
            <span className="font-mono tabular-nums text-sm text-ink-900">$0.0284</span>
          </DetailRow>
          <DetailRow label="Request ID">
            <span className="font-mono tabular-nums text-sm text-ink-900">
              req-7f3a9c2b4e1d
            </span>
          </DetailRow>
        </DetailGrid>

        {/* Eyebrow */}
        <div className="font-mono font-medium uppercase tracking-[0.1em] text-xs text-ink-500 mt-2 mb-0">
          Security scan
        </div>

        {/* Security scan */}
        <DetailGrid>
          <DetailRow label="Overall">
            <Badge variant="success">
              <StatusDot kind="success" />
              pass
            </Badge>
          </DetailRow>
          <DetailRow label="Injection scan">
            <Badge variant="success">clean</Badge>
          </DetailRow>
          <DetailRow label="PII scan">
            <Badge variant="success">clean</Badge>
          </DetailRow>
          <DetailRow label="Policy">
            <span className="text-sm text-ink-900">Default workspace policy</span>
          </DetailRow>
        </DetailGrid>
      </div>
    </div>
  );
}

function DetailGrid({ children }: { children: React.ReactNode }) {
  return (
    <dl className="grid grid-cols-[36%_1fr] rounded-sm border border-ink-200 overflow-clip divide-y divide-ink-200">
      {children}
    </dl>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="contents group/row">
      <dt className="px-3 py-3 text-sm text-ink-500 border-r border-ink-200 bg-white">
        {label}
      </dt>
      <dd className="px-3 py-3 text-sm text-ink-900 bg-white flex items-center min-w-0">
        {children}
      </dd>
    </div>
  );
}

function SecretRow({ secret }: { secret: string }) {
  return (
    <div className="flex items-center h-10 rounded-sm pr-2 pl-3 gap-2 bg-ink-50 border border-ink-100">
      <code className="grow text-xs font-mono tabular-nums -tracking-[0.01em] text-ink-900">
        {secret}
      </code>
      <Button
        variant="secondary"
        size="xs"
        onClick={() => {
          navigator.clipboard.writeText(secret);
          toast.success('Copied to clipboard');
        }}
      >
        <Copy />
        Copy
      </Button>
    </div>
  );
}

