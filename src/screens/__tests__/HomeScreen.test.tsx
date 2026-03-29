import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'home.title': 'Milkshakespeare',
        'home.subtitle': 'Where Every Sip Tells a Story',
        'home.heroTagline': 'Craft milkshakes inspired by the greatest literary works of all time.',
        'home.aboutTitle': 'Our Story',
        'home.aboutText': 'Born from a love of classic literature and artisanal milkshakes.',
        'home.featuredTitle': 'Featured Creations',
        'home.featuredRomeo': 'Romeo & Juliet Berry',
        'home.featuredRomeoDesc': 'A passionate blend of strawberries, raspberries, and a hint of rose.',
        'home.featuredHamlet': "Hamlet's Dark Chocolate",
        'home.featuredHamletDesc': 'To drink or not to drink.',
        'home.featuredMidsummer': "Midsummer Night's Dream",
        'home.featuredMidsummerDesc': 'Lavender, vanilla bean, and honeycomb.',
        'home.viewFullMenu': 'View Full Menu',
        'home.learnMore': 'Our Story',
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('HomeScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<HomeScreen />);
    expect(toJSON()).toBeTruthy();
  });

  it('displays expected translated text', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Milkshakespeare')).toBeTruthy();
    expect(getByText('Where Every Sip Tells a Story')).toBeTruthy();
  });

  it('has navigation buttons', () => {
    const { getAllByText } = render(<HomeScreen />);
    const menuButtons = getAllByText('View Full Menu');
    expect(menuButtons.length).toBeGreaterThan(0);
  });

  it('displays featured creations', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Featured Creations')).toBeTruthy();
    expect(getByText('Romeo & Juliet Berry')).toBeTruthy();
    expect(getByText("Hamlet's Dark Chocolate")).toBeTruthy();
    expect(getByText("Midsummer Night's Dream")).toBeTruthy();
  });
});
