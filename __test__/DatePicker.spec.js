/* eslint-env jest */

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
import moment from 'moment';

import DatePicker from '../src/DatePicker';

it('should provide correct initial month', () => {
  const wrapper = shallow(
    <DatePicker onDateSelect={() => {}} initialVisibleMonth={-1} />,
  );
  expect(wrapper.instance().getInitialMonth().startOf('day')).toEqual(
    moment().subtract(1, 'month').startOf('day'),
  );
});

it('should return false for blocked dates', () => {
  const cb = jest.fn();
  const wrapper = shallow(
    <DatePicker onDateSelect={cb} minDate={moment('2017-01-20')} />,
  );
  const inst = wrapper.instance();

  expect(inst.handleDateChange(moment('2017-01-10'))).toBe(false);
});

describe('single day', () => {
  it('should return correnct event for single day', () => {
    const cb = jest.fn();
    const date = moment('2017-01-10');
    const wrapper = shallow(<DatePicker onDateSelect={cb} />);
    wrapper.instance().handleDateChange(date);

    expect(cb).toBeCalledWith({ type: 'START', value: date });
  });
});

describe('range', () => {
  describe('should return events in correct order', () => {
    const cb = jest.fn();
    const wrapper = shallow(<DatePicker range onDateSelect={cb} />);

    wrapper.instance().handleDateChange(moment('2017-01-10'));
    wrapper.setProps({ startDate: moment('2017-01-10') });
    wrapper.instance().handleDateChange(moment('2017-01-20'));
    wrapper.setProps({ endDate: moment('2017-01-20') });
    wrapper.instance().handleDateChange(moment('2017-01-05'));
    wrapper.setProps({ startDate: moment('2017-01-05') });
    wrapper.setProps({ endDate: null });
    wrapper.instance().handleDateChange(moment('2017-01-10'));
    wrapper.setProps({ endDate: moment('2017-01-10') });
    wrapper.instance().handleDateChange(moment('2017-01-05'));
    wrapper.setProps({ startDate: moment('2017-01-05') });
    wrapper.instance().handleDateChange(moment('2017-01-10'));
    wrapper.setProps({ endDate: moment('2017-01-10') });

    expect(cb).toBeCalledWith({ type: 'START', value: moment('2017-01-10') });
    expect(cb).toBeCalledWith({ type: 'END', value: moment('2017-01-20') });
    expect(cb).toBeCalledWith({ type: 'START', value: moment('2017-01-05') });
    expect(cb).toBeCalledWith({ type: 'END', value: null });
    expect(cb).toBeCalledWith({ type: 'END', value: moment('2017-01-10') });
    expect(cb).toBeCalledWith({ type: 'START', value: moment('2017-01-05') });
    expect(cb).toBeCalledWith({ type: 'END', value: moment('2017-01-10') });
  });
});
