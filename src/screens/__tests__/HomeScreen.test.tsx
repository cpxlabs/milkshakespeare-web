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
        'home.navEstablished': 'EST. 1564',
        'home.navLocation': 'STRATFORD',
        'home.heroHeadline': 'Where Prose meets the Palate.',
        'home.heroDescription':
          'A curated sanctuary for the literary soul. Savor artisanal milkshakes crafted from forgotten recipes and contemporary imagination.',
        'home.heroReserveBtn': 'Reserve Your Table',
        'home.heroViewMenu': 'View Menu',
        'home.featuredDrinkName': '"The Midsummer Night\'s Cream"',
        'home.featuredDrinkLabel': 'SPECIAL OF THE MONTH',
        'home.chapterSelectTitle': 'Chapter Select',
        'home.exploreMenuTitle': 'Explore the Menu',
        'home.exploreMenuSubtitle':
          "From Romeo's Red Velvet to Hamlet's Dark Chocolate.",
        'home.dailyRiddleTitle': 'Daily Riddle',
        'home.dailyRiddleSubtitle': 'WIN A FREE TOPPING',
        'home.bookTableTitle': 'Book a Table',
        'home.bookTableSubtitle': 'GUARANTEED QUIET CORNER',
        'home.libraryTitle': 'A Library Built for the Thirsty Mind.',
        'home.libraryText':
          'Milkshakespeare began with a simple belief: that a great story is best shared over a great drink.',
        'home.libraryCurator': 'The Curator',
        'home.libraryQuote':
          '"I would give all my fame for a pot of ale and safety."',
        'home.libraryQuoteAttribution': '— Henry V',
        'home.rareEditionsTitle': 'The Rare Editions',
        'home.rareEditionsSubtitle': 'HAND-CRAFTED ARTISAN SHAKES',
        'home.rareEditionsViewCatalog': 'VIEW CATALOG',
        'home.rareOpheliaName': 'The Ophelia',
        'home.rareOpheliaPrice': '£8.50',
        'home.rareOpheliaDesc':
          'Lavender-infused white chocolate with honey glaze and edible wildflowers.',
        'home.rareMacbethName': 'The Macbeth',
        'home.rareMacbethPrice': '£9.00',
        'home.rareMacbethDesc':
          "Double-dark cocoa, activated charcoal, and a tart blackberry 'blood' swirl.",
        'home.rarePuckName': "Puck's Mischief",
        'home.rarePuckPrice': '£7.75',
        'home.rarePuckDesc':
          'Tangy lemon curd, crumbled oatcake shortbread, and a pop of berry fizz.',
        'home.ctaTitle': 'Ready for a Literary Experience?',
        'home.ctaText':
          "Visit us today and discover how the world's greatest stories taste in a glass.",
        'home.viewFullMenu': 'View Full Menu',
        'home.learnMore': 'Our Story',
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

  it('displays the brand name and navigation bar', () => {
    const { getAllByText, getByText } = render(<HomeScreen />);
    expect(getAllByText(/Milkshakespeare/).length).toBeGreaterThan(0);
    expect(getByText('STRATFORD')).toBeTruthy();
  });

  it('displays hero section with headline and CTA', () => {
    const { getAllByText, getByText } = render(<HomeScreen />);
    // "Prose" and "Palate" are rendered as nested Text nodes for gold italic styling
    expect(getAllByText(/Prose/).length).toBeGreaterThan(0);
    expect(getAllByText(/Palate/).length).toBeGreaterThan(0);
    expect(getByText('EST. 1564')).toBeTruthy();
    expect(getByText('Reserve Your Table')).toBeTruthy();
    expect(getByText('View Menu')).toBeTruthy();
  });

  it('displays featured drink of the month', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('"The Midsummer Night\'s Cream"')).toBeTruthy();
    expect(getByText('SPECIAL OF THE MONTH')).toBeTruthy();
  });

  it('displays chapter select section', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Chapter Select')).toBeTruthy();
    expect(getByText('Explore the Menu')).toBeTruthy();
    expect(getByText('Daily Riddle')).toBeTruthy();
    expect(getByText('Book a Table')).toBeTruthy();
  });

  it('displays library section with quote', () => {
    const { getAllByText, getByText } = render(<HomeScreen />);
    // Heading uses nested Text: "A Library Built for the " + italic "Thirsty Mind."
    expect(getAllByText(/Thirsty Mind/).length).toBeGreaterThan(0);
    expect(getByText('The Curator')).toBeTruthy();
    expect(getByText('— Henry V')).toBeTruthy();
  });

  it('displays rare editions with prices', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('The Rare Editions')).toBeTruthy();
    expect(getByText('The Ophelia')).toBeTruthy();
    expect(getByText('£8.50')).toBeTruthy();
    expect(getByText('The Macbeth')).toBeTruthy();
    expect(getByText('£9.00')).toBeTruthy();
    expect(getByText("Puck's Mischief")).toBeTruthy();
    expect(getByText('£7.75')).toBeTruthy();
  });

  it('displays footer call-to-action section', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Ready for a Literary Experience?')).toBeTruthy();
  });

  it('displays address and hours info bar', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('12 Stratford Lane, Avon District')).toBeTruthy();
    expect(getByText('Open daily 10am – 10pm')).toBeTruthy();
  });

  it('has navigation buttons', () => {
    const { getAllByText } = render(<HomeScreen />);
    const menuButtons = getAllByText('View Full Menu');
    expect(menuButtons.length).toBeGreaterThan(0);
  });
});

