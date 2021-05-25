const Legend = () => {
  const items = [
    ["Taken", "taken"],
    ["Taking", "taking"],
    ["Not Taken", "not-taken"],
  ];
  return (
    <div className="legend">
      {items.map((item, index) => (
        <div className="legend-item" key={index}>
          <div className={`legend-circle ${item[1]}`}></div>
          <div className="legend-label">{item[0]}</div>
        </div>
      ))}
    </div>
  );
};

export default Legend;
