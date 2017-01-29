// @flow

import moment from 'moment';
// import type moment$Object from 'moment';

// export type moment = moment;

type ModifierFunction = (date: moment) => boolean;
export type ModifiersObject = { [key: string]: ModifierFunction };
type DatesTypes = {
  [key: string]: any,
  startDate?: moment,
  endDate?: moment,
  minDate?: moment,
  maxDate?: moment,
};
type CreateModifiersFunction = (props: DatesTypes) => ModifiersObject;
type CheckFunctionType = (date: moment, props: DatesTypes) => boolean;

export const isDateBlocked: CheckFunctionType = (
  date,
  { minDate, maxDate },
) => {
  const isBefore = !!minDate && date.isBefore(minDate);
  const isAfter = !!maxDate && date.isAfter(maxDate);

  return isBefore || isAfter;
};

export const isDateSelectionStart: CheckFunctionType = (date, { startDate }) =>
  !!startDate && date.isSame(startDate, 'day');

export const isDateSelectionEnd: CheckFunctionType = (date, { endDate }) =>
  !!endDate && date.isSame(endDate, 'day');

export const isDateInSelection: CheckFunctionType = (date, props) => {
  const inSelection = !!props.startDate &&
    date.isBetween(props.startDate, props.endDate, 'day');
  return inSelection ||
    isDateSelectionStart(date, props) ||
    isDateSelectionEnd(date, props);
};

const createModifiers: CreateModifiersFunction = (
  { modifiers, ...props },
): ModifiersObject => ({
  blocked: (date: moment) => isDateBlocked(date, props),
  'selected-start': (date: moment) => isDateSelectionStart(date, props),
  selected: (date: moment) => isDateInSelection(date, props),
  'selected-end': (date: moment) => isDateSelectionEnd(date, props),
  ...modifiers,
});

export default createModifiers;
