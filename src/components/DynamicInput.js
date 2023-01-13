

const DynamicInput = ({ item, handleChange }) => {
  if (item.type === "select")
    return (
      <div className="control">
        <label className="label">{item.label}</label>
        <div className="select is-fullwidth">
          <select
            className="input is-primary"
            onChange={handleChange}
            defaultValue="none"
            name={item.name}
            required={item.required}
          >
            <option disabled value="none">
              Seleccione una opción
            </option>
            {item.options.map((opt) => (
              <option value={opt.value} key={item.value}>
                {opt.label}{" "}
              </option>
            ))}
          </select>
        </div>
      </div>
    );

  if (item.type === "submit")
    return (
      <div className="control">
        <button type={item.type} className="button is-primary">
          {item.label}
        </button>
      </div>
    );

  if (item.type === "checkbox")
    return (
      <div className="control">
        <label className={item.type}>
          <input
            onChange={handleChange}
            type={item.type}
            name={item.name}
            required={item.required}
          />
          {item.label}
        </label>
      </div>
    );

  return (
    <>
      <label className="label">{item.label}</label>
      <div className="control" >
        <input
          onChange={handleChange}
          className="input is-primary"
          type={item.type}
          name={item.name}
          required={item.required}
          label={item.label}
          placeholder={item.label}
        />
        
      </div>
    </>
  );
};

export default DynamicInput;
