import React, { Component, PropTypes } from 'react';
import { DayPicker } from 'react-dates';
import moment from 'moment';

import createModifiers from './modifiers';


const MomentShape = PropTypes.shape({
  subtract: PropTypes.func.isRequired,
  isBefore: PropTypes.func.isRequired,
  isAfter: PropTypes.func.isRequired,
  isBetween: PropTypes.func.isRequired,
  isSame: PropTypes.func.isRequired,
  isValid: PropTypes.func.isRequired,
});

export const SelectTypes = { START: 'START', END: 'END' };

export default class DatePicker extends Component {
  static displayName = 'DatePicker';

  static propTypes = {
    onDateSelect: PropTypes.func.isRequired,
    range: PropTypes.bool,
    startDate: MomentShape,
    endDate: MomentShape,
    /* eslint-disable react/no-unused-prop-types*/
    minDate: PropTypes.oneOfType([MomentShape, PropTypes.number]),
    maxDate: PropTypes.oneOfType([MomentShape, PropTypes.number]),
    /* eslint-enable react/no-unused-prop-types */
    months: PropTypes.number,
    initialVisibleMonth: PropTypes.number,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    modifiers: PropTypes.object,
  }

  static defaultProps = {
    range: false,
    startDate: null,
    endDate: null,
    minDate: -Infinity,
    maxDate: +Infinity,
    months: 1,
    initialVisibleMonth: 0,
    modifiers: {},
  }

  handleDateChange = (date) => {
    const { blocked } = createModifiers(this.props);

    const { range, onDateSelect } = this.props;

    if (blocked && blocked(date)) {
      return false;
    }

    if (range) {
      const { startDate, endDate } = this.props;
      const hasBothDates = !!startDate && !!endDate;

      if (!startDate) {
        onDateSelect({ type: SelectTypes.START, value: date });
        return true;
      }

      if (date.isBefore(startDate)) {
        onDateSelect({ type: SelectTypes.START, value: date });
        onDateSelect({ type: SelectTypes.END, value: null });
        return true;
      }

      if (date.isAfter(startDate)) {
        if (hasBothDates) {
          onDateSelect({ type: SelectTypes.START, value: date });
          onDateSelect({ type: SelectTypes.END, value: null });
          return true;
        }
        onDateSelect({ type: SelectTypes.END, value: date });
        return true;
      }
      return false;
    }

    onDateSelect({ type: SelectTypes.START, value: date });
    return true;
  };

  render() {
    const { months, initialVisibleMonth } = this.props;

    return (
      <DayPicker
        {...this.props}
        numberOfMonths={months}
        initialVisibleMonth={() =>
          moment().subtract(initialVisibleMonth, 'month')
        }
        onDayClick={this.handleDateChange}
        modifiers={createModifiers(this.props)}
      />
    );
  }
}
