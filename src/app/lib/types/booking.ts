export interface Field {
  label: string;
  type: "select" | "date" | "time" | "text";
  val?: string;
  icon?: React.ReactNode;
  required?: boolean;
}