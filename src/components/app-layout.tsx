'use client';

/**
 * AppLayout Component
 *
 * This component provides the main layout structure for the EatWise application.
 * It includes:
 * - A responsive layout with sidebar for desktop and bottom navigation for mobile
 * - Navigation tabs for different sections of the application
 * - Active state highlighting for the current route
 * - Global Dialog provider for showing dialogs from anywhere in the app
 *
 * The layout adapts to different screen sizes, showing a sidebar on desktop
 * and a bottom navigation bar on mobile devices.
 */

import { Beef, Calendar, Compass, History, Settings, User } from 'lucide-react';
import { FC, MouseEventHandler, ReactNode, useMemo } from 'react';
import { SecretDrawer } from '@/components/secret-drawer';
import { useSecretDemo } from '@/hooks/use-secret-demo';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/component';
import Link from 'next/link';

/**
 * TabItem interface defines the structure for navigation tabs
 * - id: Unique identifier for the tab
 * - label: Display text for the tab
 * - icon: React component to be used as the tab icon
 * - path: URL path the tab links to
 */
interface TabItem {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
}

/**
 * Props for the NavTab component
 */
interface NavTabProps {
  tab: TabItem;
  variant: 'desktop' | 'mobile';
  pathname: string;
  onTabItemClick?: () => void;
}

/**
 * NavTab component renders a single navigation tab
 */
const NavTab: FC<NavTabProps> = ({ tab, variant, pathname, onTabItemClick }) => {
  /**
   * Determines if a navigation path is currently active
   */
  const isActive = () => {
    if (tab.path === '/' && pathname === '/') return true;
    if (tab.path !== '/' && pathname.startsWith(tab.path)) return true;
    return false;
  };

  // Handle click event, trigger onTabItemClick if it's the settings tab
  const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
    if (tab.id === 'settings' && onTabItemClick) {
      // Call onTabItemClick to handle consecutive click logic
      onTabItemClick();
    }
  };

  if (variant === 'desktop') {
    return (
      <Link
        href={tab.path}
        onClick={handleClick}
        className={cn(
          'flex items-center gap-3 rounded-md px-4 py-3 transition-colors',
          'text-sidebar-foreground opacity-50',
          { 'hover:opacity-80': !isActive() },
          { 'bg-sidebar-accent opacity-100 hover:opacity-100': isActive() }
        )}
      >
        {tab.icon}
        <span>{tab.label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={tab.path}
      onClick={handleClick}
      className={cn(
        'text-sidebar-foreground opacity-40 hover:opacity-80',
        'text-xs transition-colors',
        'pb-[env(safe-area-inset-bottom)]',
        { 'opacity-100': isActive() }
      )}
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        {tab.icon}
        <span className="mt-1">{tab.label}</span>
      </div>
    </Link>
  );
};

/**
 * Props for the DesktopSidebar component
 */
interface DesktopSidebarProps {
  tabs: TabItem[];
  pathname: string;
  onTabItemClick?: () => void;
}

/**
 * DesktopSidebar component renders the sidebar navigation for desktop view
 */
const DesktopSidebar: FC<DesktopSidebarProps> = ({ tabs, pathname, onTabItemClick }) => {
  return (
    <nav className="bg-sidebar hidden h-full w-56 shrink-0 grow-0 flex-col border-r pl-[env(safe-area-inset-left)] md:flex">
      <div className="flex flex-row items-center gap-2 px-5 py-4">
        <Beef className="size-6" />
        <h1 className="text-sidebar-foreground text-xl font-semibold">EatWise</h1>
      </div>
      <hr className="bg-sidebar-accent h-[1px]" />
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
        {tabs.map((tab) => (
          <NavTab key={tab.id} tab={tab} pathname={pathname} variant="desktop" onTabItemClick={onTabItemClick} />
        ))}
      </div>
      <div className="flex flex-row items-center gap-2 px-5 py-4">
        <div className="bg-sidebar-accent rounded-full p-2">
          <User className="size-5" />
        </div>
        <div className="text-sidebar-foreground text-sm">John Doe</div>
      </div>
    </nav>
  );
};

/**
 * Props for the MobileNavBar component
 */
interface MobileNavBarProps {
  tabs: TabItem[];
  pathname: string;
  onTabItemClick?: () => void;
}

/**
 * MobileNavBar component renders the bottom navigation bar for mobile view
 */
const MobileNavBar: FC<MobileNavBarProps> = ({ tabs, pathname, onTabItemClick }) => {
  return (
    <nav className="bg-sidebar fixed right-0 bottom-0 left-0 box-content h-[calc(56px+env(safe-area-inset-bottom))] shrink-0 grow-0 touch-none border-t-[1px] md:hidden">
      <div
        className={`grid h-full w-full items-stretch justify-center`}
        style={useMemo(() => ({ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }), [tabs.length])}
      >
        {tabs.map((tab) => (
          <NavTab key={tab.id} tab={tab} pathname={pathname} variant="mobile" onTabItemClick={onTabItemClick} />
        ))}
      </div>
    </nav>
  );
};

/**
 * MobileNavBarPlaceholder's height should be exactly the same as the MobileNavBar
 */
const MobileNavBarPlaceholder: FC = () => {
  return (
    <div className="invisible box-content h-[calc(56px+env(safe-area-inset-bottom))] shrink-0 grow-0 border-t-[1px] md:hidden" />
  );
};

const ZoomInWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="animate-in fade-in-60 zoom-in-[0.995] md:zoom-in-[0.998] cubic-bezier(0.1, 1, 0.3, 1) h-full w-full duration-150 motion-reduce:animate-none">
      {children}
    </div>
  );
};

/**
 * Props for the AppLayout component
 */
interface AppLayoutProps {
  children: ReactNode;
}

/**
 * AppLayout component provides the main application layout with navigation tabs
 * It wraps the main content and displays a tab bar at the bottom
 */
export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { handleClick, isDrawerOpen, onDrawerOpenChange } = useSecretDemo();

  const tabs: TabItem[] = [
    {
      id: 'today',
      label: '今日',
      icon: <Calendar className="size-5" />,
      path: '/',
    },
    {
      id: 'discover',
      label: '发现',
      icon: <Compass className="size-5" />,
      path: '/discover',
    },
    {
      id: 'history',
      label: '历史',
      icon: <History className="size-5" />,
      path: '/history',
    },
    {
      id: 'settings',
      label: '设置',
      icon: <Settings className="size-5" />,
      path: '/settings',
    },
  ];

  return (
    <div
      className="bg-background relative flex h-full w-full flex-col overflow-clip md:flex-row"
      data-vaul-drawer-wrapper
    >
      <DesktopSidebar tabs={tabs} pathname={pathname} onTabItemClick={handleClick} />
      <main className="flex h-full min-w-0 flex-1 flex-col overflow-clip">
        <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-start pr-[env(safe-area-inset-right)] pl-[env(safe-area-inset-left)] md:pl-0">
          <ZoomInWrapper key={pathname}>{children}</ZoomInWrapper>
        </div>
        <MobileNavBarPlaceholder />
      </main>
      <MobileNavBar tabs={tabs} pathname={pathname} onTabItemClick={handleClick} />

      {/* Secret drawer */}
      <SecretDrawer isOpen={isDrawerOpen} onOpenChange={onDrawerOpenChange} />
    </div>
  );
};
