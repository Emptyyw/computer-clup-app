import { IconGauge, IconFingerprint, IconUsers } from '@tabler/icons-react';
import { RoutePaths } from 'Enum/Enum';

export const mockdata = [
  {
    icon: IconGauge,
    label: 'Dashboard',
    route: RoutePaths.DASHBOARD_ROUTE,
    requiredRole: null,
  },
  {
    icon: IconFingerprint,
    label: 'Security',
    route: RoutePaths.ADMIN_ROUTE,
    requiredRole: 'admin',
  },
  {
    icon: IconUsers,
    label: 'Client',
    route: RoutePaths.CLIENT_PAGE_ROUTE,
    requiredRole: 'admin',
  },
];
