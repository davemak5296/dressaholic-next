import {ChangeEventHandler} from 'react';
import styles from './form-input.style';

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler;
  required: boolean;
}

const FormInput = ({ label, ...otherProps}: FormInputProps) => {
  return (
    <div className="relative my-6 lg:my-8">
      <input {...otherProps} className={styles.input} />
      <label className={otherProps.value.length > 0 ? styles.label_isNotEmpty : styles.label_isEmpty}>
        {label}
      </label>
    </div>
  );
};

export default FormInput