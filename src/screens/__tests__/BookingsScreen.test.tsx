import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BookingsScreen from '../BookingsScreen';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'bookings.headerLabel': 'Reservations',
        'bookings.title': 'The Play is the Thing',
        'bookings.subtitle':
          "Secure your table for the evening's campaign or a casual duel among the stacks.",
        'bookings.step1Title': 'Choose your Quest',
        'bookings.step2Title': 'Date & Hour',
        'bookings.step3Title': 'The Fellowship',
        'bookings.eventBoardGames': 'Casual Board Games',
        'bookings.eventBoardGamesDesc': 'Table for 2–6 players. 3 hours limit.',
        'bookings.eventBoardGamesPrice': '$5 / player',
        'bookings.eventMTG': 'Magic: The Gathering',
        'bookings.eventMTGDesc': 'Commander Night or Standard Dueling.',
        'bookings.eventMTGPrice': 'Free Entry',
        'bookings.eventDnD': 'D&D Campaign Table',
        'bookings.eventDnDDesc': 'Private alcove with DM screen & terrain.',
        'bookings.eventDnDPrice': '$20 / table',
        'bookings.eventBookClub': 'Literary Book Club',
        'bookings.eventBookClubDesc': 'Quiet corner for discussion & tea.',
        'bookings.eventBookClubPrice': '$15 / group',
        'bookings.selected': 'Selected',
        'bookings.pickDay': 'Pick a Day',
        'bookings.selectTime': 'Select Time',
        'bookings.guestLabel': 'Number of Guests',
        'bookings.guestMax': 'Maximum 8 players per table.',
        'bookings.decrease': 'Decrease',
        'bookings.increase': 'Increase',
        'bookings.summaryTitle': 'Folio Summary',
        'bookings.summaryEvent': 'Event Type',
        'bookings.summaryDate': 'Date',
        'bookings.summaryTime': 'Time',
        'bookings.summaryFellowship': 'Total Fellowship',
        'bookings.summaryPlayers': 'Players',
        'bookings.summaryCost': 'Cost',
        'bookings.costFree': 'FREE',
        'bookings.confirmBtn': 'Confirm Reservation',
        'bookings.legalText': "By confirming, you agree to the Merchant's Code of Conduct.",
        'bookings.upsellTitle': 'Quench thy Thirst',
        'bookings.upsellText':
          "Add a round of 'Midsummer Meads' to your table for 20% off today.",
        'bookings.upsellCTA': 'Add Pre-Order',
        'bookings.quoteMTG':
          'Bring your own deck or borrow one of our curated Shakespearean-themed decks at the bar.',
        'bookings.quoteBoardGames':
          'Choose thy game wisely, for in play we reveal our truest selves.',
        'bookings.quoteDnD':
          'All the world\'s a stage, and your campaign is the grandest play of all.',
        'bookings.quoteBookClub':
          'A book is a garden carried in the pocket — and here, tea flows freely.',
        'bookings.monday': 'Monday',
        'bookings.tuesday': 'Tuesday',
        'bookings.wednesday': 'Wednesday',
        'bookings.thursday': 'Thursday',
        'bookings.friday': 'Friday',
        'bookings.saturday': 'Saturday',
        'bookings.sunday': 'Sunday',
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

// Helper: compute the same week dates that BookingsScreen uses
function getWeekDatesForTest(): number[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.getDate();
  });
}

describe('BookingsScreen', () => {
  it('renders without crashing', () => {
    const { toJSON } = render(<BookingsScreen />);
    expect(toJSON()).toBeTruthy();
  });

  it('displays the hero section with title and label', () => {
    const { getByText } = render(<BookingsScreen />);
    expect(getByText('Reservations')).toBeTruthy();
    expect(getByText('The Play is the Thing')).toBeTruthy();
  });

  it('displays all three step titles', () => {
    const { getByText } = render(<BookingsScreen />);
    expect(getByText('Choose your Quest')).toBeTruthy();
    expect(getByText('Date & Hour')).toBeTruthy();
    expect(getByText('The Fellowship')).toBeTruthy();
  });

  it('displays all four event type options', () => {
    const { getByText } = render(<BookingsScreen />);
    expect(getByText('Casual Board Games')).toBeTruthy();
    expect(getByText('Magic: The Gathering')).toBeTruthy();
    expect(getByText('D&D Campaign Table')).toBeTruthy();
    expect(getByText('Literary Book Club')).toBeTruthy();
  });

  it('displays event type emojis', () => {
    const { getByText } = render(<BookingsScreen />);
    expect(getByText('🎲')).toBeTruthy();
    expect(getByText('🃏')).toBeTruthy();
    expect(getByText('🐉')).toBeTruthy();
    expect(getByText('📖')).toBeTruthy();
  });

  it('displays event prices', () => {
    const { getByText } = render(<BookingsScreen />);
    expect(getByText('$5 / player')).toBeTruthy();
    expect(getByText('Free Entry')).toBeTruthy();
    expect(getByText('$20 / table')).toBeTruthy();
    expect(getByText('$15 / group')).toBeTruthy();
  });

  it('displays time slots', () => {
    const { getByText } = render(<BookingsScreen />);
    expect(getByText('17:00')).toBeTruthy();
    expect(getByText('18:30')).toBeTruthy();
    expect(getByText('20:00')).toBeTruthy();
    expect(getByText('21:30')).toBeTruthy();
  });

  it('displays guest counter section', () => {
    const { getByText } = render(<BookingsScreen />);
    expect(getByText('Number of Guests')).toBeTruthy();
    expect(getByText('Maximum 8 players per table.')).toBeTruthy();
  });

  it('displays the upsell section', () => {
    const { getByText } = render(<BookingsScreen />);
    expect(getByText('Quench thy Thirst')).toBeTruthy();
    expect(getByText('Add Pre-Order')).toBeTruthy();
  });

  it('does not show summary before all selections are made', () => {
    const { queryByText } = render(<BookingsScreen />);
    expect(queryByText('Folio Summary')).toBeNull();
  });

  it('shows "Selected" badge when an event is tapped', () => {
    const { getByLabelText, getByText } = render(<BookingsScreen />);
    fireEvent.press(getByLabelText('Magic: The Gathering'));
    expect(getByText('Selected')).toBeTruthy();
  });

  it('shows summary section when all selections are complete', () => {
    const { getByLabelText, getByText } = render(<BookingsScreen />);

    // Select event
    fireEvent.press(getByLabelText('Magic: The Gathering'));

    // Select a date by pressing a day label button
    const weekDates = getWeekDatesForTest();
    fireEvent.press(getByLabelText(`F ${weekDates[4]}`));

    // Select a time
    fireEvent.press(getByLabelText('18:30'));

    // Summary should now be visible
    expect(getByText('Folio Summary')).toBeTruthy();
    expect(getByText('Confirm Reservation')).toBeTruthy();
    expect(getByText('FREE')).toBeTruthy();
  });

  it('increments and decrements guest count', () => {
    const { getByLabelText, getByText } = render(<BookingsScreen />);

    // Select all fields so we can verify guest count in summary
    fireEvent.press(getByLabelText('Casual Board Games'));
    const weekDates = getWeekDatesForTest();
    fireEvent.press(getByLabelText(`F ${weekDates[4]}`));
    fireEvent.press(getByLabelText('17:00'));

    // Default 2 guests × $5 = $10
    expect(getByText('$10')).toBeTruthy();

    // Increase to 3 → $15
    fireEvent.press(getByLabelText('Increase'));
    expect(getByText('$15')).toBeTruthy();

    // Decrease back to 2 → $10
    fireEvent.press(getByLabelText('Decrease'));
    expect(getByText('$10')).toBeTruthy();
  });

  it('does not decrease guests below minimum (1)', () => {
    const { getByLabelText, getByText } = render(<BookingsScreen />);

    // Select all fields so we can verify guest count in summary
    fireEvent.press(getByLabelText('Casual Board Games'));
    const weekDates = getWeekDatesForTest();
    fireEvent.press(getByLabelText(`F ${weekDates[4]}`));
    fireEvent.press(getByLabelText('17:00'));

    // Default is 2 → $10
    expect(getByText('$10')).toBeTruthy();

    // Decrease to 1 → $5
    fireEvent.press(getByLabelText('Decrease'));
    expect(getByText('$5')).toBeTruthy();

    // Attempt to go below 1 — should stay at $5
    fireEvent.press(getByLabelText('Decrease'));
    expect(getByText('$5')).toBeTruthy();
  });

  it('shows cost based on event type in summary', () => {
    const { getByLabelText, getByText } = render(<BookingsScreen />);

    // Select board games ($5/player)
    fireEvent.press(getByLabelText('Casual Board Games'));

    // Select date and time
    const weekDates = getWeekDatesForTest();
    fireEvent.press(getByLabelText(`F ${weekDates[4]}`));
    fireEvent.press(getByLabelText('17:00'));

    // Default 2 guests × $5 = $10
    expect(getByText('$10')).toBeTruthy();
  });
});
