import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'home.title': 'Milkshakespeare',
        'home.subtitle': 'Café · Games · Books · Collectibles',
        'home.heroLabel': 'Welcome to',
        'home.heroTagline': 'A cozy café where you can sip craft milkshakes, play retro board games & TCGs, browse books and vinyl, and discover rare collectibles — all under one roof.',
        'home.aboutLabel': 'Discover',
        'home.aboutTitle': 'Our Story',
        'home.aboutText': 'Born from a love of classic literature, tabletop games, and artisanal milkshakes.',
        'home.experiencesTitle': 'More Than a Café',
        'home.expGames': 'Retro Games & Board Games',
        'home.expGamesDesc': 'Chess, checkers, and classic board games available for everyone.',
        'home.expTCG': 'Trading Card Games',
        'home.expTCGDesc': 'Buy, trade, and play your favorite TCGs with fellow enthusiasts.',
        'home.expBooks': 'Books & Vinyl',
        'home.expBooksDesc': 'Curated shelves of books, CDs, and vinyl records to explore.',
        'home.expCollectibles': 'Rare Collectibles',
        'home.expCollectiblesDesc': 'Retro game cartridges, rare cards, figurines, and more.',
        'home.featuredLabel': "Don't Miss",
        'home.featuredTitle': 'Featured Creations',
        'home.featuredRomeo': 'Romeo & Juliet Berry',
        'home.featuredRomeoDesc':
          'A passionate blend of strawberries, raspberries, and a hint of rose.',
        'home.featuredRomeoPrice': 'R$ 22.90',
        'home.featuredHamlet': "Hamlet's Dark Chocolate",
        'home.featuredHamletDesc': 'To drink or not to drink.',
        'home.featuredHamletPrice': 'R$ 24.90',
        'home.featuredMidsummer': "Midsummer Night's Dream",
        'home.featuredMidsummerDesc': 'Lavender, vanilla bean, and honeycomb.',
        'home.featuredMidsummerPrice': 'R$ 25.90',
        'home.viewFullMenu': 'View Full Menu',
        'home.learnMore': 'Our Story',
        'home.ctaTitle': 'Ready for a Literary Experience?',
        'home.ctaText':
          "Visit us today and discover how the world's greatest stories taste in a glass.",
        'home.hoursAddress': '12 Stratford Lane, Avon District',
        'home.hoursValue': 'Open daily 10am – 10pm',
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
    expect(getByText('Café · Games · Books · Collectibles')).toBeTruthy();
  });

  it('has navigation buttons', () => {
    const { getAllByText } = render(<HomeScreen />);
    const menuButtons = getAllByText('View Full Menu');
    expect(menuButtons.length).toBeGreaterThan(0);
  });

  it('displays featured creations with prices', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Featured Creations')).toBeTruthy();
    expect(getByText('Romeo & Juliet Berry')).toBeTruthy();
    expect(getByText("Hamlet's Dark Chocolate")).toBeTruthy();
    expect(getByText("Midsummer Night's Dream")).toBeTruthy();
    expect(getByText('R$ 22.90')).toBeTruthy();
    expect(getByText('R$ 24.90')).toBeTruthy();
    expect(getByText('R$ 25.90')).toBeTruthy();
  });

  it('displays hero label and decorative elements', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Welcome to')).toBeTruthy();
  });

  it('displays footer call-to-action section', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Ready for a Literary Experience?')).toBeTruthy();
  });

  it('displays emoji badges for featured creations', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('🍓')).toBeTruthy();
    expect(getByText('🍫')).toBeTruthy();
    expect(getByText('🌸')).toBeTruthy();
  });

  it('displays address and hours info bar at the top', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('12 Stratford Lane, Avon District')).toBeTruthy();
    expect(getByText('Open daily 10am – 10pm')).toBeTruthy();
  });

  it('displays experiences section', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('More Than a Café')).toBeTruthy();
    expect(getByText('Retro Games & Board Games')).toBeTruthy();
    expect(getByText('Trading Card Games')).toBeTruthy();
    expect(getByText('Books & Vinyl')).toBeTruthy();
    expect(getByText('Rare Collectibles')).toBeTruthy();
  });
});
