export interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  error?: boolean;
  helperText?: string;
  classes?: Partial<InputTextClasses>;
}

interface InputTextClasses {
  label: string;
  input: string;
  helperText: string;
}
