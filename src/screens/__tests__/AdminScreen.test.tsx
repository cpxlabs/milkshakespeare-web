import React from 'react';
import { render } from '@testing-library/react-native';
import AdminScreen from '../AdminScreen';

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
    dispatch: jest.fn(),
    openDrawer: jest.fn(),
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'admin.headerLabel': 'Admin',
        'admin.title': 'Dashboard',
        'admin.subtitle': 'Overview of your operations',
        'admin.tablesOverview': 'Tables Overview',
        'admin.revenueOverview': 'Revenue Overview',
        'admin.quickActions': 'Quick Actions',
        'admin.manageTables': 'Manage Tables',
        'admin.manageTablesDesc': 'View and manage all tables and their orders',
        'admin.goToTables': 'Go to Tables',
        'admin.statTotalTables': 'Total Tables',
        'admin.statOccupied': 'Occupied',
        'admin.statAvailable': 'Available',
        'admin.statReserved': 'Reserved',
        'admin.statTodayRevenue': "Today's Revenue",
        'admin.statOpenOrders': 'Open Orders',
        'admin.statClosedToday': 'Closed Today',
        'admin.statAvgTicket': 'Avg. Ticket',
        'common.back': 'Back',
      };
      return translations[key] || key;
    },
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('AdminScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { toJSON } = render(<AdminScreen />);
    expect(toJSON()).toBeTruthy();
  });

  it('displays admin dashboard title', () => {
    const { getByText } = render(<AdminScreen />);
    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('Overview of your operations')).toBeTruthy();
  });

  it('displays header label', () => {
    const { getByText } = render(<AdminScreen />);
    expect(getByText('Admin')).toBeTruthy();
  });

  it('displays tables overview section', () => {
    const { getByText } = render(<AdminScreen />);
    expect(getByText('Tables Overview')).toBeTruthy();
  });

  it('displays revenue overview section', () => {
    const { getByText } = render(<AdminScreen />);
    expect(getByText('Revenue Overview')).toBeTruthy();
  });

  it('displays dashboard statistics', () => {
    const { getByText } = render(<AdminScreen />);
    expect(getByText('Total Tables')).toBeTruthy();
    expect(getByText('Occupied')).toBeTruthy();
    expect(getByText('Available')).toBeTruthy();
    expect(getByText('Reserved')).toBeTruthy();
  });

  it('displays revenue statistics', () => {
    const { getByText } = render(<AdminScreen />);
    expect(getByText("Today's Revenue")).toBeTruthy();
    expect(getByText('Open Orders')).toBeTruthy();
    expect(getByText('Closed Today')).toBeTruthy();
    expect(getByText('Avg. Ticket')).toBeTruthy();
  });

  it('displays quick actions section', () => {
    const { getByText } = render(<AdminScreen />);
    expect(getByText('Quick Actions')).toBeTruthy();
    expect(getByText('Manage Tables')).toBeTruthy();
    expect(getByText('Go to Tables')).toBeTruthy();
  });

  it('displays stat emojis', () => {
    const { getByText } = render(<AdminScreen />);
    expect(getByText('🪑')).toBeTruthy();
    expect(getByText('💰')).toBeTruthy();
  });

  it('has a back button', () => {
    const { getByText } = render(<AdminScreen />);
    expect(getByText('Back')).toBeTruthy();
  });
});
