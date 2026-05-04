import { useState } from 'react';
import { toast } from 'sonner';
import { KeyRound, Plus, Copy, X } from 'lucide-react';
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
      <div className="flex flex-col w-full bg-ink-25">
        <ArtboardHeader
          code="CMP-007"
          title="Modal · toast · empty state"
          description="Three states a list view drifts through. Modal anchored mid-screen, toast slides in lower-right, empty state fills the table well."
          parts="3 states"
        />

        <div className="flex flex-col gap-7">
          {/* CMP-007.1 — MODAL */}
          <div className="flex flex-col gap-2.5">
            <SectionHeader
              code="CMP-007.1 — MODAL"
              hint="<AlertDialog> · <Dialog> · <Dialog> (payload)"
            />
            <Card className="p-7 gap-7 rounded-sm">
              <div className="grid grid-cols-2 gap-5">
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
                  <div className="flex flex-col gap-1.5">
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
                  <div className="flex gap-2.5">
                    <div className="flex flex-col gap-1.5 flex-1">
                      <Label className="text-xs text-ink-600">Scope</Label>
                      <Select value={scope} onValueChange={setScope}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="read-only">read-only</SelectItem>
                          <SelectItem value="read-write">read-write</SelectItem>
                          <SelectItem value="admin">admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <Label className="text-xs text-ink-600">Expires</Label>
                      <Select value={expires} onValueChange={setExpires}>
                        <SelectTrigger className="w-full">
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
                      onClick={() => {
                        toast.success('Key created', { description: keyName || 'preview-env' });
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

          {/* CMP-007.2 — EMPTY STATE */}
          <div className="flex flex-col gap-2.5">
            <SectionHeader
              code="CMP-007.2 — EMPTY STATE"
              hint="centered icon · heading · subtext · CTA"
            />
            <Card className="p-7 rounded-sm">
              <div className="flex flex-col items-center justify-center h-80 rounded-lg gap-3 bg-white border border-ink-75 p-5">
                <div className="flex items-center justify-center rounded-xl bg-ink-25 border border-ink-100 size-14">
                  <KeyRound className="size-7 text-ink-900" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col items-center gap-1 mt-2">
                  <h3 className="text-lg font-medium -tracking-[0.01em] text-ink-900">
                    No API keys yet
                  </h3>
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
        'flex flex-col rounded-xl bg-white border border-ink-100 shadow-[0_12px_32px_-8px_rgba(17,20,23,0.18)] overflow-clip ' +
        (className ?? '')
      }
    >
      <div className="flex items-start justify-between pt-4 pr-3 pb-1 pl-5">
        <div className="flex flex-col">
          <div className="text-base font-medium -tracking-[0.01em] text-ink-900">
            {title}
          </div>
          {subtitle && <div className="text-xs text-ink-600 mt-0.5">{subtitle}</div>}
        </div>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Close"
          onClick={onClose}
          className="text-ink-300 hover:text-ink-600"
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

function SecretRow({ secret }: { secret: string }) {
  return (
    <div className="flex items-center h-10 rounded-sm pr-1.5 pl-3 gap-1.5 bg-ink-25 border border-ink-75">
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

