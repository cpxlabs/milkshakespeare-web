import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TablesScreen from '../TablesScreen';

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
        'tables.headerLabel': 'Service',
        'tables.title': 'Tables',
        'tables.subtitle': 'Manage your bar service area',
        'tables.table': 'Table',
        'tables.seats': 'seats',
        'tables.status_available': 'Available',
        'tables.status_occupied': 'Occupied',
        'tables.status_reserved': 'Reserved',
        'tables.currentTotal': 'Current total',
        'tables.filterAll': 'All',
        'tables.filterAvailable': 'Available',
        'tables.filterOccupied': 'Occupied',
        'tables.filterReserved': 'Reserved',
        'common.back': 'Back',
      };
      return translations[key] || key;
    },
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('TablesScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { toJSON } = render(<TablesScreen />);
    expect(toJSON()).toBeTruthy();
  });

  it('displays screen title and subtitle', () => {
    const { getByText } = render(<TablesScreen />);
    expect(getByText('Tables')).toBeTruthy();
    expect(getByText('Manage your bar service area')).toBeTruthy();
  });

  it('displays header label', () => {
    const { getByText } = render(<TablesScreen />);
    expect(getByText('Service')).toBeTruthy();
  });

  it('displays tables with their numbers', () => {
    const { getAllByText } = render(<TablesScreen />);
    const tableTexts = getAllByText(/Table/);
    expect(tableTexts.length).toBeGreaterThan(0);
  });

  it('displays table status indicators', () => {
    const { getAllByText } = render(<TablesScreen />);
    const availableTexts = getAllByText('Available');
    const occupiedTexts = getAllByText('Occupied');
    expect(availableTexts.length).toBeGreaterThan(0);
    expect(occupiedTexts.length).toBeGreaterThan(0);
  });

  it('displays filter pills', () => {
    const { getByText } = render(<TablesScreen />);
    expect(getByText(/All \(/)).toBeTruthy();
  });

  it('displays chair emoji for tables', () => {
    const { getAllByText } = render(<TablesScreen />);
    const chairs = getAllByText('🪑');
    expect(chairs.length).toBeGreaterThan(0);
  });

  it('displays current total for occupied tables', () => {
    const { getAllByText } = render(<TablesScreen />);
    const totals = getAllByText('Current total');
    expect(totals.length).toBeGreaterThan(0);
  });

  it('navigates to table order when table is pressed', () => {
    const { getByLabelText } = render(<TablesScreen />);
    const table1 = getByLabelText('Table 1');
    fireEvent.press(table1);
    expect(mockNavigate).toHaveBeenCalledWith('TableOrder', { tableId: '1' });
  });

  it('has a back button', () => {
    const { getByText } = render(<TablesScreen />);
    expect(getByText('Back')).toBeTruthy();
  });
});
