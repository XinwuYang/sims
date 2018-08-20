import React, { Component } from 'react';
import './App.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(
      {date: new Date()}
    );
  }

  render() {
    return (
      <div>
        <h1>Hello {this.props.user}!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}!</h2>
      </div>
    );
  }
}

class ActionLink extends Component {
  handleClick(e) {
    e.preventDefault();
    console.log("Clicked Link");
  }

  render() {
    return (
      <a href="#" onClick={this.handleClick}>
        Click Me
      </a>
    )
  }
}

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

class NumberList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const numbers = this.props.numbers;
    const listItems = numbers.map(
      (number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
  }
}

class NameForms extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value.toUpperCase()});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
        <input type="submit" value="Submit" />
        </form>
        <h1>Hello, {this.state.value}</h1>
      </div>
    );
  }
}

class BoilingVerdict extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      this.props.celsius >= 100 ? <p>The water would boil.</p> : <p>The water would not boil.</p>
  );
  }
}

class TemperatureInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const scaleNames = {
      c: 'Celsius',
      f: 'Fahrenheit'
    };
    const scale = this.props.scale;
    const temperature = this.props.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Caculator extends Component {

  constructor(props) {
    super(props);
    this.state = {temperature: '', scale: 'c'};
    this.handleCelsiusChange= this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.toCelsius = this.toCelsius.bind(this);
    this.toFahrenheit = this.toFahrenheit.bind(this);
    this.tryConvert = this.tryConvert.bind(this);
  }

  toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }

  toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }

  tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature: temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature: temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = (scale === 'f') ? this.tryConvert(temperature, this.toCelsius) : temperature;
    const fahrenheit = (scale === 'c') ? this.tryConvert(temperature, this.toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput
           scale="c"
           temperature={celsius}
           onTemperatureChange={this.handleCelsiusChange} />

        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }

}

class App extends Component {
  render() {
    return (
      <div>
        <Caculator />
      </div>
    );
  }
}

export default App;
