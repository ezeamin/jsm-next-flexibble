interface FormFieldProps {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
}

const FormField = (props: FormFieldProps) => {
  const { type, title, state, placeholder, isTextArea, setState } = props;

  return (
    <div className="flexStart flex-col w-full gap-4">
      <label htmlFor="" className="w-full text-gray-100">
        {title}
      </label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          required
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          placeholder={placeholder}
          value={state}
          required
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
