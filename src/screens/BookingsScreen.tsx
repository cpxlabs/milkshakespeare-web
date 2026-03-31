import React, { useState, useMemo } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MenuButton } from '@/components/ui/menu-button';

interface EventType {
  id: string;
  nameKey: string;
  descKey: string;
  priceKey: string;
  emoji: string;
  priceValue: number;
  priceUnit: 'player' | 'table' | 'group' | 'free';
  quoteKey: string;
}

const EVENT_TYPES: EventType[] = [
  {
    id: 'board-games',
    nameKey: 'bookings.eventBoardGames',
    descKey: 'bookings.eventBoardGamesDesc',
    priceKey: 'bookings.eventBoardGamesPrice',
    emoji: '🎲',
    priceValue: 5,
    priceUnit: 'player',
    quoteKey: 'bookings.quoteBoardGames',
  },
  {
    id: 'mtg',
    nameKey: 'bookings.eventMTG',
    descKey: 'bookings.eventMTGDesc',
    priceKey: 'bookings.eventMTGPrice',
    emoji: '🃏',
    priceValue: 0,
    priceUnit: 'free',
    quoteKey: 'bookings.quoteMTG',
  },
  {
    id: 'dnd',
    nameKey: 'bookings.eventDnD',
    descKey: 'bookings.eventDnDDesc',
    priceKey: 'bookings.eventDnDPrice',
    emoji: '🐉',
    priceValue: 20,
    priceUnit: 'table',
    quoteKey: 'bookings.quoteDnD',
  },
  {
    id: 'book-club',
    nameKey: 'bookings.eventBookClub',
    descKey: 'bookings.eventBookClubDesc',
    priceKey: 'bookings.eventBookClubPrice',
    emoji: '📖',
    priceValue: 15,
    priceUnit: 'group',
    quoteKey: 'bookings.quoteBookClub',
  },
];

const TIME_SLOTS = ['17:00', '18:30', '20:00', '21:30'];
const MAX_GUESTS = 8;
const MIN_GUESTS = 1;
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function getWeekDates(): { day: number; label: string }[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
  return DAY_LABELS.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { day: d.getDate(), label };
  });
}

function getEndTime(startTime: string): string {
  const [hours, minutes] = startTime.split(':').map(Number);
  const endHours = hours + 3;
  return `${String(endHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function formatCost(event: EventType, guests: number, t: (key: string) => string): string {
  if (event.priceUnit === 'free') return t('bookings.costFree');
  if (event.priceUnit === 'player') return `$${event.priceValue * guests}`;
  return `$${event.priceValue}`;
}

const BookingsScreen: React.FC = () => {
  const { t } = useTranslation();

  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);

  const weekDates = useMemo(() => getWeekDates(), []);

  const currentEvent = EVENT_TYPES.find((e) => e.id === selectedEvent);
  const isComplete = selectedEvent !== null && selectedDate !== null && selectedTime !== null;

  const decreaseGuests = () => setGuests((g) => Math.max(MIN_GUESTS, g - 1));
  const increaseGuests = () => setGuests((g) => Math.min(MAX_GUESTS, g + 1));

  const selectedDayInfo = weekDates.find((d) => d.day === selectedDate);
  const dayIndex = selectedDayInfo ? weekDates.indexOf(selectedDayInfo) : -1;
  const dayNames = [
    t('bookings.monday'),
    t('bookings.tuesday'),
    t('bookings.wednesday'),
    t('bookings.thursday'),
    t('bookings.friday'),
    t('bookings.saturday'),
    t('bookings.sunday'),
  ];
  const summaryDayName = dayIndex >= 0 ? dayNames[dayIndex] : '';

  return (
    <View className="flex-1 bg-background">
      <MenuButton />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <View className="bg-primary px-8 pt-20 pb-14 items-center">
          <View className="bg-destructive rounded-md px-4 py-1.5 mb-4">
            <Text className="text-xs tracking-widest text-white font-semibold uppercase">
              {t('bookings.headerLabel')}
            </Text>
          </View>
          <Text className="text-4xl font-extrabold text-primary-foreground text-center italic tracking-tight">
            {t('bookings.title')}
          </Text>
          <View className="w-16 h-1 bg-accent rounded-full mt-4 mb-4" />
          <Text className="text-base text-primary-foreground/80 text-center max-w-xs leading-6">
            {t('bookings.subtitle')}
          </Text>
        </View>

        {/* Step 1 — Choose your Quest */}
        <View className="px-6 py-10 items-center">
          <View className="flex-row items-center gap-3 mb-6">
            <View className="bg-primary rounded-full w-8 h-8 items-center justify-center">
              <Text className="text-sm font-bold text-primary-foreground">1</Text>
            </View>
            <Text className="text-2xl font-bold text-foreground italic">
              {t('bookings.step1Title')}
            </Text>
          </View>

          <View className="w-full max-w-lg gap-3">
            {EVENT_TYPES.map((event) => {
              const isSelected = selectedEvent === event.id;
              return (
                <Pressable
                  key={event.id}
                  onPress={() => setSelectedEvent(event.id)}
                  accessibilityRole="button"
                  accessibilityLabel={t(event.nameKey)}
                >
                  <Card
                    className={`w-full ${isSelected ? 'border-primary border-2' : 'border-border'}`}
                  >
                    <CardContent className="flex-row items-center gap-4 pt-4 relative">
                      <Text className="text-3xl">{event.emoji}</Text>
                      <View className="flex-1 gap-1">
                        <Text className="text-base font-bold text-foreground">
                          {t(event.nameKey)}
                        </Text>
                        <Text className="text-sm text-muted-foreground">{t(event.descKey)}</Text>
                        <Text
                          className={`text-sm font-bold mt-1 ${event.priceUnit === 'free' ? 'text-green-600' : 'text-destructive'}`}
                        >
                          {t(event.priceKey)}
                        </Text>
                      </View>
                      {isSelected && (
                        <View className="bg-primary rounded-md px-2 py-1 absolute top-2 right-2">
                          <Text className="text-xs font-bold text-primary-foreground uppercase">
                            {t('bookings.selected')}
                          </Text>
                        </View>
                      )}
                    </CardContent>
                  </Card>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Step 2 — Date & Hour */}
        <View className="px-6 py-10 items-center bg-muted/30">
          <View className="flex-row items-center gap-3 mb-6">
            <View className="bg-primary rounded-full w-8 h-8 items-center justify-center">
              <Text className="text-sm font-bold text-primary-foreground">2</Text>
            </View>
            <Text className="text-2xl font-bold text-foreground italic">
              {t('bookings.step2Title')}
            </Text>
          </View>

          <View className="w-full max-w-lg">
            {/* Pick a Day */}
            <Text className="text-xs tracking-widest text-muted-foreground font-semibold uppercase mb-3">
              {t('bookings.pickDay')}
            </Text>
            <View className="flex-row justify-between mb-2">
              {DAY_LABELS.map((label, i) => (
                <Text
                  key={`label-${i}`}
                  className="text-xs text-muted-foreground font-semibold w-10 text-center"
                >
                  {label}
                </Text>
              ))}
            </View>
            <View className="flex-row justify-between mb-6">
              {weekDates.map((date, i) => {
                const isDateSelected = selectedDate === date.day;
                return (
                  <Pressable
                    key={`date-${i}`}
                    onPress={() => setSelectedDate(date.day)}
                    accessibilityRole="button"
                    accessibilityLabel={`${DAY_LABELS[i]} ${date.day}`}
                    className={`w-10 h-10 rounded-full items-center justify-center ${
                      isDateSelected ? 'bg-destructive' : ''
                    }`}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        isDateSelected ? 'text-white' : 'text-foreground'
                      }`}
                    >
                      {date.day}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Select Time */}
            <Text className="text-xs tracking-widest text-muted-foreground font-semibold uppercase mb-3">
              {t('bookings.selectTime')}
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {TIME_SLOTS.map((time) => {
                const isTimeSelected = selectedTime === time;
                return (
                  <Pressable
                    key={time}
                    onPress={() => setSelectedTime(time)}
                    accessibilityRole="button"
                    accessibilityLabel={time}
                    className={`px-5 py-2.5 rounded-lg border ${
                      isTimeSelected
                        ? 'bg-destructive border-destructive'
                        : 'border-border bg-background'
                    }`}
                  >
                    <Text
                      className={`text-sm font-semibold ${
                        isTimeSelected ? 'text-white' : 'text-foreground'
                      }`}
                    >
                      {time}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* Step 3 — The Fellowship */}
        <View className="px-6 py-10 items-center">
          <View className="flex-row items-center gap-3 mb-6">
            <View className="bg-primary rounded-full w-8 h-8 items-center justify-center">
              <Text className="text-sm font-bold text-primary-foreground">3</Text>
            </View>
            <Text className="text-2xl font-bold text-foreground italic">
              {t('bookings.step3Title')}
            </Text>
          </View>

          <View className="w-full max-w-lg flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-base font-bold text-foreground">
                {t('bookings.guestLabel')}
              </Text>
              <Text className="text-sm text-muted-foreground">{t('bookings.guestMax')}</Text>
            </View>
            <View className="flex-row items-center gap-4">
              <Pressable
                onPress={decreaseGuests}
                disabled={guests <= MIN_GUESTS}
                accessibilityRole="button"
                accessibilityLabel={t('bookings.decrease')}
                className={`w-10 h-10 rounded-full border border-border items-center justify-center ${
                  guests <= MIN_GUESTS ? 'opacity-40' : ''
                }`}
              >
                <Text className="text-lg font-bold text-foreground">−</Text>
              </Pressable>
              <Text className="text-2xl font-bold text-foreground w-8 text-center">{guests}</Text>
              <Pressable
                onPress={increaseGuests}
                disabled={guests >= MAX_GUESTS}
                accessibilityRole="button"
                accessibilityLabel={t('bookings.increase')}
                className={`w-10 h-10 rounded-full border border-border items-center justify-center ${
                  guests >= MAX_GUESTS ? 'opacity-40' : ''
                }`}
              >
                <Text className="text-lg font-bold text-foreground">+</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Folio Summary */}
        {isComplete && currentEvent && (
          <View className="bg-secondary px-6 py-10 items-center">
            <Text className="text-2xl font-bold text-secondary-foreground text-center italic mb-6">
              {t('bookings.summaryTitle')}
            </Text>

            <View className="w-full max-w-lg gap-4">
              {/* Event Type */}
              <View>
                <Text className="text-xs tracking-widest text-secondary-foreground/60 uppercase mb-1">
                  {t('bookings.summaryEvent')}
                </Text>
                <Text className="text-lg font-bold text-secondary-foreground">
                  {t(currentEvent.nameKey)}
                </Text>
              </View>

              {/* Date & Time */}
              <View className="flex-row gap-8">
                <View className="flex-1">
                  <Text className="text-xs tracking-widest text-secondary-foreground/60 uppercase mb-1">
                    {t('bookings.summaryDate')}
                  </Text>
                  <Text className="text-base font-bold text-secondary-foreground">
                    {summaryDayName}, {selectedDate}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xs tracking-widest text-secondary-foreground/60 uppercase mb-1">
                    {t('bookings.summaryTime')}
                  </Text>
                  <Text className="text-base font-bold text-secondary-foreground">
                    {selectedTime} – {getEndTime(selectedTime!)}
                  </Text>
                </View>
              </View>

              {/* Fellowship & Cost */}
              <View className="flex-row gap-8">
                <View className="flex-1">
                  <Text className="text-xs tracking-widest text-secondary-foreground/60 uppercase mb-1">
                    {t('bookings.summaryFellowship')}
                  </Text>
                  <Text className="text-base font-bold text-secondary-foreground">
                    {guests} {t('bookings.summaryPlayers')}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xs tracking-widest text-secondary-foreground/60 uppercase mb-1">
                    {t('bookings.summaryCost')}
                  </Text>
                  <Text className="text-2xl font-extrabold text-secondary-foreground">
                    {formatCost(currentEvent, guests, t)}
                  </Text>
                </View>
              </View>

              {/* Quote */}
              <View className="border-l-4 border-accent/50 pl-4 mt-2">
                <Text className="text-sm text-secondary-foreground/80 italic leading-5">
                  &ldquo;{t(currentEvent.quoteKey)}&rdquo;
                </Text>
              </View>

              {/* Confirm Button */}
              <Button
                variant="destructive"
                size="lg"
                className="mt-4 w-full"
                accessibilityLabel={t('bookings.confirmBtn')}
              >
                <Text className="text-white font-bold text-base">{t('bookings.confirmBtn')}</Text>
              </Button>

              <Text className="text-xs text-secondary-foreground/50 text-center mt-2 uppercase tracking-wide">
                {t('bookings.legalText')}
              </Text>
            </View>
          </View>
        )}

        {/* Quench thy Thirst — Upsell */}
        <View className="bg-destructive px-8 py-8 items-center">
          <Text className="text-xl font-bold text-white text-center italic">
            {t('bookings.upsellTitle')}
          </Text>
          <Text className="text-sm text-white/80 text-center mt-2 max-w-sm leading-5">
            {t('bookings.upsellText')}
          </Text>
          <Text className="text-sm font-bold text-white underline mt-3 uppercase tracking-widest">
            {t('bookings.upsellCTA')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookingsScreen;
