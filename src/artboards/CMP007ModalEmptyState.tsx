import { useState } from 'react';
import { toast } from 'sonner';
import { ExternalLink, KeyRound, Plus, Copy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CopyButton } from '@/components/ui/copy-button';
import { DetailList, DetailRow } from '@/components/ui/detail-list';
import { SectionHeading } from '@/components/ui/section-heading';
import {
  DialogScrollBody,
  DialogScrollFooter,
  DialogScrollHeader,
  DialogStaticContent,
  DialogTitleBlock,
} from '@/components/ui/dialog';
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

        <div className="flex flex-col gap-8">
          {/* CMP-007.1 — MODAL */}
          <div className="flex flex-col gap-4">
            <SectionHeader
              code="CMP-007.1 — MODAL"
              hint="<AlertDialog> · <Dialog> · <Dialog> (payload)"
            />
            <Card className="p-6 gap-8 rounded-sm">
              <div className="grid grid-cols-2 gap-4 items-start">
                <ModalSpecimen
                  title="Revoke prod-backend?"
                  subtitle="This key was last used 2 minutes ago."
                  onClose={() => setConfirmName('')}
                  footer={
                    <>
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
                    </>
                  }
                >
                  <p className="text-sm text-ink-900 m-0">
                    Apps using this key will fail authentication immediately. Type the key name to confirm.
                  </p>
                  <Input
                    placeholder="prod-backend"
                    value={confirmName}
                    onChange={(e) => setConfirmName(e.target.value)}
                    aria-label="Type key name to confirm"
                  />
                </ModalSpecimen>

                <ModalSpecimen
                  title="Create API key"
                  onClose={resetCreate}
                  footer={
                    <>
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
                    </>
                  }
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="cmp007-name" className="text-xs text-ink-600">
                      Name
                    </Label>
                    <Input
                      id="cmp007-name"
                      placeholder="preview-env"
                      value={keyName}
                      onChange={(e) => setKeyName(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
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
                </ModalSpecimen>

                <ModalSpecimen
                  title="Key created"
                  subtitle="Copy now — this is the only time the secret is shown."
                  className="col-span-2"
                  onClose={() => toast('Closed payload')}
                  footer={<Button onClick={() => toast.success('Done')}>Done</Button>}
                >
                  <SecretRow secret={FAKE_SECRET} />
                </ModalSpecimen>
              </div>
            </Card>
          </div>

          {/* CMP-007.1b — GENERATION DETAILS */}
          <div className="flex flex-col gap-4">
            <SectionHeader
              code="CMP-007.1b — GENERATION DETAILS"
              hint="<Dialog> · payload · spec sheet"
            />
            <Card className="p-6 rounded-sm items-center">
              <GenerationDetailsModal />
            </Card>
          </div>

          {/* CMP-007.2 — EMPTY STATE */}
          <div className="flex flex-col gap-4">
            <SectionHeader
              code="CMP-007.2 — EMPTY STATE"
              hint="centered icon · heading · subtext · CTA"
            />
            <Card className="p-6 rounded-sm">
              <div className="flex flex-col items-center justify-center h-80 rounded-md gap-4 bg-white shadow-(--shadow-border) p-6">
                <div className="flex items-center justify-center rounded-sm bg-ink-50 border border-ink-200 size-14">
                  <KeyRound className="size-7 text-ink-900" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col items-center gap-1 mt-2">
                  <h2 className="text-lg font-medium -tracking-[0.01em] text-ink-900">
                    No API keys yet
                  </h2>
                  <p className="max-w-60 text-center text-sm text-ink-500">
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
  footer,
  className,
  onClose,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClose: () => void;
}) {
  return (
    <DialogStaticContent className={className} onClose={onClose}>
      <DialogScrollHeader>
        <DialogTitleBlock mode="static" meta={subtitle}>
          {title}
        </DialogTitleBlock>
      </DialogScrollHeader>
      <DialogScrollBody>
        <div className="flex flex-col gap-4">{children}</div>
      </DialogScrollBody>
      {footer ? <DialogScrollFooter>{footer}</DialogScrollFooter> : null}
    </DialogStaticContent>
  );
}

function GenerationDetailsModal() {
  const requestId = 'req-7f3a9c2b4e1d';
  return (
    <DialogStaticContent
      className="w-[640px]"
      onClose={() => toast('Closed generation details')}
    >
      <DialogScrollHeader>
        <DialogTitleBlock
          mode="static"
          meta={
            <span className="font-mono tabular-nums tracking-snug">
              Apr 22, 2026 14:28:04 UTC · {requestId}
            </span>
          }
        >
          Generation details
        </DialogTitleBlock>
      </DialogScrollHeader>

      <DialogScrollBody>
        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-3">
            <SectionHeading>Details</SectionHeading>
            <DetailList>
              <DetailRow
                label="Model"
                value={
                  <span className="inline-flex items-center gap-2">
                    <VendorAvatar vendor="anthropic" />
                    <span className="font-mono text-sm text-ink-900 tracking-snug">
                      anthropic/claude-sonnet-4.8
                    </span>
                  </span>
                }
              />
              <DetailRow
                label="Provider"
                value={<span className="font-sans text-sm text-ink-900">AWS Bedrock (us-east-1)</span>}
              />
              <DetailRow
                label="Status"
                value={
                  <Badge variant="success">
                    <StatusDot kind="success" />
                    <span className="font-mono tabular-nums">200 OK</span>
                  </Badge>
                }
              />
              <DetailRow
                label="Tokens"
                value={
                  <span className="font-mono tabular-nums text-sm text-ink-900">
                    2,847 prompt
                    <span className="text-ink-500"> · </span>
                    1,204 completion
                  </span>
                }
              />
              <DetailRow
                label="Cost"
                value={<span className="font-mono tabular-nums text-sm text-ink-900">$0.0284</span>}
              />
            </DetailList>
          </section>

          <section className="flex flex-col gap-3">
            <SectionHeading>Security scan</SectionHeading>
            <DetailList>
              <DetailRow
                label="Overall"
                value={
                  <Badge variant="success">
                    <StatusDot kind="success" />
                    pass
                  </Badge>
                }
              />
              <DetailRow
                label="Injection scan"
                value={<Badge variant="success">clean</Badge>}
              />
              <DetailRow
                label="PII scan"
                value={<Badge variant="success">clean</Badge>}
              />
              <DetailRow
                label="Policy"
                value={<span className="font-sans text-sm text-ink-900">Default workspace policy</span>}
              />
            </DetailList>
          </section>
        </div>
      </DialogScrollBody>

      <DialogScrollFooter>
        <CopyButton mode="label" size="sm" text="Copy ID" value={requestId} label="request ID" />
        <Button variant="default" size="sm" onClick={() => toast('Opening request')}>
          Open request
          <ExternalLink data-icon="inline-end" aria-hidden />
        </Button>
      </DialogScrollFooter>
    </DialogStaticContent>
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

