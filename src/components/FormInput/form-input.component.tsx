import * as React from 'react';
import styles from './form-input.style';

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler;
  required: boolean;
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const { label, ...otherProps } = props;

  return (
    <div className="relative my-6 lg:my-8">
      <input {...otherProps} className={styles.input} />
      <label className={props.value.length > 0 ? styles.label_isNotEmpty : styles.label_isEmpty}>
        {label}
      </label>
    </div>
  );
};

export default React.memo(FormInput);
// export default FormInput;
