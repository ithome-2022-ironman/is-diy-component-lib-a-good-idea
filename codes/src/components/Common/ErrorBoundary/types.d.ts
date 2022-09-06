export interface Props {
  children: React.ReactNode;
}

export interface State {
  hasError: Boolean;
  errorMessage: string | null;
  callStack: string | null;
}
