export interface Field {
  label: string;
  type: "select" | "date" | "time" | "text";
  val?: string;
  name?: string;
  icon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
}
export interface ValidationError {
  field: string;
  message: string;
}