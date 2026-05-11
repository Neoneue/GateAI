import * as React from 'react';
import { LogOut, Sparkles, UserRound } from 'lucide-react';

import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
} from '@/components/ui/menu';

type UserMenuProps = {
  children: React.ReactElement;
  onNavigate?: (pageId: string) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
};

function UserMenu({
  children,
  onNavigate,
  side = 'bottom',
  align = 'end',
  sideOffset = 8,
}: UserMenuProps) {
  return (
    <Menu>
      <MenuTrigger render={children} />
      <MenuContent side={side} align={align} sideOffset={sideOffset}>
        <MenuLabel>
          <span className="font-sans text-sm font-medium text-ink-900 truncate leading-tight">
            Chad
          </span>
          <span className="inline-flex items-center h-5 px-2 rounded-full bg-blue-50 text-blue-700 font-sans text-xs font-medium self-start">
            Pro plan
          </span>
        </MenuLabel>
        <MenuSeparator />
        <MenuItem>
          <Sparkles strokeWidth={1.75} aria-hidden />
          Upgrade
        </MenuItem>
        <MenuItem onClick={() => onNavigate?.('cmp-018')}>
          <UserRound strokeWidth={1.75} aria-hidden />
          Account
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <LogOut strokeWidth={1.75} aria-hidden />
          Sign out
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}

export { UserMenu };
