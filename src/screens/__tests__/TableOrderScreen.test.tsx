import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TableOrderScreen from '../TableOrderScreen';

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
  useRoute: () => ({
    params: { tableId: '2' },
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'tableOrder.headerLabel': 'Order',
        'tableOrder.subtitle': 'Manage table order',
        'tableOrder.emptyOrder': 'No items in this order yet',
        'tableOrder.billSummary': 'Bill Summary',
        'tableOrder.subtotal': 'Subtotal',
        'tableOrder.serviceTax': 'Service (10%)',
        'tableOrder.total': 'Total',
        'tableOrder.closeBill': 'Close Bill',
        'tableOrder.billClosed': 'Bill Closed!',
        'tableOrder.backToTables': 'Back to Tables',
        'tableOrder.removeItem': 'Remove',
        'tableOrder.decrease': 'Decrease quantity',
        'tableOrder.increase': 'Increase quantity',
        'tables.table': 'Table',
        'common.back': 'Back',
      };
      return translations[key] || key;
    },
    i18n: { changeLanguage: jest.fn() },
  }),
}));

describe('TableOrderScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { toJSON } = render(<TableOrderScreen />);
    expect(toJSON()).toBeTruthy();
  });

  it('displays the table number in the header', () => {
    const { getByText } = render(<TableOrderScreen />);
    expect(getByText('Table 2')).toBeTruthy();
  });

  it('displays order items', () => {
    const { getByText } = render(<TableOrderScreen />);
    expect(getByText('Romeo & Juliet Berry')).toBeTruthy();
    expect(getByText("Hamlet's Dark Chocolate")).toBeTruthy();
  });

  it('displays item emojis', () => {
    const { getByText } = render(<TableOrderScreen />);
    expect(getByText('🍓')).toBeTruthy();
    expect(getByText('🍫')).toBeTruthy();
  });

  it('displays the bill summary', () => {
    const { getByText } = render(<TableOrderScreen />);
    expect(getByText('Bill Summary')).toBeTruthy();
    expect(getByText('Subtotal')).toBeTruthy();
    expect(getByText('Service (10%)')).toBeTruthy();
    expect(getByText('Total')).toBeTruthy();
  });

  it('has a close bill button', () => {
    const { getByText } = render(<TableOrderScreen />);
    expect(getByText('Close Bill')).toBeTruthy();
  });

  it('shows bill closed state when close bill is pressed', () => {
    const { getByText } = render(<TableOrderScreen />);
    fireEvent.press(getByText('Close Bill'));
    expect(getByText('Bill Closed!')).toBeTruthy();
    expect(getByText('Back to Tables')).toBeTruthy();
  });

  it('has a back button', () => {
    const { getByText } = render(<TableOrderScreen />);
    expect(getByText('Back')).toBeTruthy();
  });

  it('has remove buttons for items', () => {
    const { getAllByText } = render(<TableOrderScreen />);
    const removeButtons = getAllByText('Remove');
    expect(removeButtons.length).toBeGreaterThan(0);
  });
});
