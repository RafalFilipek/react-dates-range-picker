export const isDateBlocked = (date, { minDate, maxDate }) => (
  date.isBefore(minDate) || date.isAfter(maxDate)
);

export const isDateSelectionStart = (date, { startDate }) => (
  date.isSame(startDate, 'day')
);

export const isDateSelectionEnd = (date, { endDate }) => (
  date.isSame(endDate, 'day')
);

export const isDateInSelection = (date, props) => (
  date.isBetween(props.startDate, props.endDate, 'day') ||
  isDateSelectionStart(date, props) ||
  isDateSelectionEnd(date, props)
);

export default props => ({
  blocked: date => isDateBlocked(date, props),
  selected: date => isDateInSelection(date, props),
  'selected-start': date => isDateSelectionStart(date, props),
  'selected-end': date => isDateSelectionEnd(date, props),
  ...props.modifiers,
});
