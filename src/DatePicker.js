// @flow

import React, { Component } from 'react';
import { DayPicker } from 'react-dates';
import moment from 'moment';

import createModifiers from './modifiers';
import type { ModifiersObject } from './modifiers';
import SelectTypes from './SelectTypes';
import type { SelectType } from './SelectTypes';

type ChangeEvent = { type: SelectType, value: moment | null };

type EventFunction = (event: ChangeEvent) => any;

type DefaultProps = {
  range: boolean,
  months: number,
  initialVisibleMonth: number,
  modifiers: ModifiersObject,
};

type Props = {
  onDateSelect: EventFunction,
  range?: boolean,
  startDate?: moment,
  endDate?: moment,
  /* eslint-disable react/no-unused-prop-types*/
  minDate?: moment,
  maxDate?: moment,
  /* eslint-enable react/no-unused-prop-types */
  months?: number,
  initialVisibleMonth: number,
  // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
  modifiers?: ModifiersObject,
};

class DatePicker extends Component<DefaultProps, Props, any> {
  static displayName = 'DatePicker';
  static props: Props;

  static defaultProps: DefaultProps = {
    range: false,
    startDate: undefined,
    endDate: undefined,
    minDate: undefined,
    maxDate: undefined,
    months: 1,
    initialVisibleMonth: 0,
    modifiers: {},
  };
  getInitialMonth = (): moment => {
    const { initialVisibleMonth } = this.props;

    return moment().add(initialVisibleMonth, 'month');
  };

  // eslint-disable-next-line consistent-return
  handleDateChange = (date: moment) => {
    const { blocked } = createModifiers(this.props);
    const { range, startDate, endDate, onDateSelect } = this.props;

    if (blocked && blocked(date)) {
      return false;
    }

    if (!range) {
      onDateSelect({ type: SelectTypes.START, value: date });
      return true;
    }

    if (!startDate) {
      onDateSelect({ type: SelectTypes.START, value: date });
      return true;
    }

    if (date.isBefore(startDate) || endDate) {
      onDateSelect({ type: SelectTypes.START, value: date });
      onDateSelect({ type: SelectTypes.END, value: null });
      return true;
    }

    if (date.isAfter(startDate)) {
      onDateSelect({ type: SelectTypes.END, value: date });
      return true;
    }
  };

  render() {
    return (
      <DayPicker
        {...this.props}
        numberOfMonths={this.props.months}
        initialVisibleMonth={this.getInitialMonth}
        onDayClick={this.handleDateChange}
        modifiers={createModifiers(this.props)}
      />
    );
  }
}

export default DatePicker;
