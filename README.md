![](https://raw.githubusercontent.com/RafalFilipek/react-dates-range-picker/master/logo.png)

---

[![Build Status](https://travis-ci.org/RafalFilipek/react-dates-range-picker.svg?branch=master)](https://travis-ci.org/RafalFilipek/react-dates-range-picker)
[![Code Coverage](https://img.shields.io/codecov/c/github/RafalFilipek/react-dates-range-picker/master.svg)](https://codecov.io/gh/RafalFilipek/react-dates-range-picker)
[![Code Style](https://img.shields.io/badge/codestyle-airbnb-brightgreen.svg)](https://github.com/airbnb/javascript)

Small, stateless date / date range picker based on sweet `{ DayPicker }`  from `react-dates` by @airbnb.

We all know [react-dates](https://github.com/airbnb/react-dates). I love this lib! But there are cases, you want to select a _date range_ without the predefined `Start Date` and `End Date` input. I want to make this easier for you!

> For warriors: check out [DayPickerRangeController](https://github.com/airbnb/react-dates/blob/master/src/components/DayPickerRangeController.jsx).


### Installation

```
yarn add react-dates-range-picker react-addons-shallow-compare

// or

npm install react-dates-range-picker react-addons-shallow-compare
```

> `react-addons-shallow-compare` is [required](https://github.com/airbnb/react-dates/blob/0efa2538ede6a37f0a7ba9325595f86df6358587/package.json#L106) by `react-dates`.

### Usage

First, you have to import the component

```jsx
  import DatePicker from 'react-dates-range-picker';
```

Now all you have to do is set up some props. Let's start from date range.


```jsx
export default MyView extends React.Component {

  // our parent component will hold dates while DatePicker is stateless.
  state = {
    startDate: null,
    endDate: null,
  }

  // this function will be executed after some date was selected in DatePicker.
  handleDateSelect = (event) => {
    // we will back into that later.
  }

  render() {
    return (
      <DatePicker
        range
        startDate={this.state.startDate}
        endDate={this.state.startDate}
        onDateSelect={this.handleDateSelect}
      />
    )
  }

}
```

Nothing fancy. If you're confused by `state` and `handleDateSelect` syntax read [this](https://babeljs.io/docs/plugins/transform-class-properties/) article.

Let's back to `handleDateSelect`. This method is called out every time the start or end date should be changed, in the parent component. `event` argument is an `Object` with two keys: `type` and `value`.
`type` is a  `START` or `END` string. `value` is a `moment.js` instance or `null` if date was removed.

```js
// start date is 24-01-2017
{type:'START', value: moment('24-01-2017')}

// end date is 14-02-2017
{type:'END', value: moment('14-02-2017')}

// start date is unest
{type:'START', value: null}

// end date is unset
{type:'END', value: null}
```

While strings like `START` and `END` are uncool you can always

```js
import { SelectTypes } from 'react-dates-range-picker'
```

The simplest implementation of the `handleDateSelect` method can be:

```js
class MyView extends React.Component {
  // ...
  handleDateSelect = ({ type, value }) => {
    const key = type === SelectTypes.START ? 'startDate' : 'endDate';
    this.setState({ [key]: value });
  };
  // ...
}
```

### Props

**`range`** - `bool` / `false` - select range or single date

**`months`** - `number` / `1` - number of visible months

**`initialVisibleMonth`**  - `number` / `0`  - first visible month. `-1` previous, `1` next, etc.

**`onDateSelect`** - `function` / **required** - will be called every time start / end date was changed. For `range={false}` will always set `type='START'`.

**`minDate`** - `moment` / `-Infinity` - min. date that can be selected.

**`maxDate`** - `moment` / `-Infinity` - max. date that can be selected.

**`modifires`** - `object` / See `Default modifiers` section.

**`startDate`** - `moment` / `null` - selected start date. When `range={false}` is just selected date.

**`endDate`** - `moment` / `null` - selected end date. When `range={false}` is just selected date.

---

> **Info:** All additional props will be passesd into inner `DayPicker` component from `react-dates`.

### Default modifiers

`react-dates-range-picker` will always add four modifiers:

* `selected-start`
* `selected`
* `selected-end`
* `blocked`

---

You can read more about `modifiers`  in [react-dates docs](https://github.com/airbnb/react-dates/).

###  `onDateSelect` flow

1. If date is blocked nothing is sent
2. If `range` is `true`
   1. If `startDate` is not defined `{type:'START', value}` will be sent
   2. If selected date is **before** `startDate` two events are sent:
      1. `{type:'START', value}`
      2. `{type:'END', null}`
   3. If selected date is **after** `startDate`
      1. If both `startDate` and `endDate` are defined
         1. `{type:'START', value}`
         2. `{type:'END', null}`
      2. Otherwise `{type:'END', value}`will be sent
3. If `range` is `false` `{type:'START', value}` will be sent every time date changes.
