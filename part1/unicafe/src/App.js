import React, { useState } from "react";

const StatisticLine = (props) => {
  const { text, value } = props;

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  if (!good && !neutral && !bad) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
      <tbody>
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine text="average" value={(good + neutral + bad) / 3} />
        <StatisticLine
          text="positive"
          value={`${(good / (good + neutral + bad)) * 100}%`}
        />
      </tbody>
    </table>
  );
};

const Button = (props) => {
  const { text, handler } = props;

  return (
    <>
      <button onClick={handler}>{text}</button>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodHandler = () => {
    setGood(good + 1);
  };

  const neutralHandler = () => {
    setNeutral(neutral + 1);
  };

  const badHandler = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button text="good" handler={goodHandler} />
        &nbsp;&nbsp;
        <Button text="neutral" handler={neutralHandler} />
        &nbsp;&nbsp;
        <Button text="bad" handler={badHandler} />
      </div>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
