import {
  Activity,
  ArrowLeftRight,
  Bell,
  Box,
  Coins,
  CreditCard,
  Home,
  KeyRound,
  Lock,
  MessageSquare,
  Settings2,
  Shield,
  ShieldCheck,
  TriangleAlert,
  Users,
} from 'lucide-react';
import type { SidebarSection } from '@/components/ui/sidebar';

/* Single source of truth for the production-shell sidebar (CMP-012 / CMP-013
 * / CMP-014). Active state is derived from the surface's `activeNavId`
 * matched against `SidebarItem.id`; the items list is identical across
 * surfaces so collapsed and expanded variants stay in lock-step. */

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    items: [
      { id: 'overview',      icon: Home,           label: 'Overview',      pageId: 'cmp-012' },
      { id: 'requests',      icon: ArrowLeftRight, label: 'Requests',      pageId: 'cmp-013' },
      { id: 'conversations', icon: MessageSquare,  label: 'Conversations', pageId: 'cmp-014' },
    ],
  },
  {
    label: 'Gateway',
    items: [
      { id: 'models',        icon: Box,         label: 'Models', pageId: 'cmp-016' },
      { id: 'token-savings', icon: Coins,       label: 'Token Savings' },
      { id: 'guardrails',    icon: ShieldCheck, label: 'Guardrails' },
    ],
  },
  {
    label: 'Security',
    items: [
      { id: 'security-overview', icon: TriangleAlert, label: 'Overview', pageId: 'cmp-015' },
      { id: 'policies',          icon: Shield,        label: 'Policies' },
      { id: 'events',            icon: Bell,          label: 'Events' },
    ],
  },
  {
    label: 'Audit',
    items: [{ id: 'audit-trail', icon: Lock, label: 'Audit Trail' }],
  },
  {
    label: 'Workspace Admin',
    items: [
      { id: 'activity', icon: Activity,   label: 'Activity' },
      { id: 'team',     icon: Users,      label: 'Team', pageId: 'cmp-017' },
      { id: 'billing',  icon: CreditCard, label: 'Billing' },
      { id: 'api-keys', icon: KeyRound,   label: 'API Keys' },
      { id: 'settings', icon: Settings2,  label: 'Settings', pageId: 'cmp-018' },
    ],
  },
];
