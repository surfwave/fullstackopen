const Filter = (props) => {
  const { tip, displayFilter, filterStr } = props;

  return (
    <div>
      {tip}
      <input onChange={displayFilter} value={filterStr} />
    </div>
  );
};

export default Filter;
