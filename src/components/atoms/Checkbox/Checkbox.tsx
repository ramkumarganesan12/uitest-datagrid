
import type { CheckboxState } from '../../../utils/types';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    state: CheckboxState,
    onChange: () => void,
}

// This is a custom checkbox component wraps over the native element to provide an additional mixed state
export const Checkbox = ({ state, onChange }: CheckboxProps) => {

    return (
        // Usage of button ensures that the element remains accesibile
        <button 
            tabIndex={0} 
            className={styles.pretendCheckbox} 
            onClick={onChange} 
            aria-label={"Select or Unselect all rows"}
            style={{background: `${state === "unchecked" ? "#ffffff" : "#007bff"}`}}
        >
            {state === "checked" && "✔"}
            {state === "mixed" && "—"}
            {state === "unchecked" && " "}
        </button>

    )
}