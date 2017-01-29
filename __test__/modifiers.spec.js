/* eslint-env jest */
import moment from 'moment';

import createModifiers from '../src/modifiers';

describe('isDateBlocked', () => {
  const okDate = moment('2017-01-25');
  const errorDate = moment('2017-01-10');

  it('should block on defined min max', () => {
    const modifiers = createModifiers({
      minDate: moment('2017-01-20'),
      maxDate: moment('2017-01-30'),
    });

    expect(modifiers.blocked(okDate)).toBe(false);
    expect(modifiers.blocked(errorDate)).toBe(true);
  });

  it('should not block on undefined', () => {
    const modifiers = createModifiers({ minDate: null, maxDate: null });

    expect(modifiers.blocked(okDate)).toBe(false);
    expect(modifiers.blocked(errorDate)).toBe(false);
  });
});

describe('isDateSelectionStart', () => {
  it('should mark dates according to limits', () => {
    const okDate = moment('2017-01-20');
    const errorDate = moment('2017-01-21');
    const modifiers = createModifiers({
      startDate: moment('2017-01-20'),
      endDate: moment('2017-01-30'),
    });

    expect(modifiers['selected-start'](okDate)).toBe(true);
    expect(modifiers['selected-start'](errorDate)).toBe(false);
  });
});

describe('isDateSelectionEnd', () => {
  it('should mark dates according to limits', () => {
    const okDate = moment('2017-01-30');
    const errorDate = moment('2017-01-29');
    const modifiers = createModifiers({
      startDate: moment('2017-01-20'),
      endDate: moment('2017-01-30'),
    });

    expect(modifiers['selected-end'](okDate)).toBe(true);
    expect(modifiers['selected-end'](errorDate)).toBe(false);
  });
});

describe('isDateInSelection', () => {
  it('should mark dates according to limits', () => {
    const okDate = moment('2017-01-22');
    const errorDate = moment('2017-01-15');
    const modifiers = createModifiers({
      startDate: moment('2017-01-20'),
      endDate: moment('2017-01-30'),
    });

    expect(modifiers.selected(okDate)).toBe(true);
    expect(modifiers.selected(errorDate)).toBe(false);
  });
});
