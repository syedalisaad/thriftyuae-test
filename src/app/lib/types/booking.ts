export interface Field {
  label: string;
  type: "select" | "date" | "time" | "text";
  val?: string;
  name?: string; 
  icon?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  options?: string[]; 
  onChange?: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface CityLocation {
  city: string;
  areas: string[];
}