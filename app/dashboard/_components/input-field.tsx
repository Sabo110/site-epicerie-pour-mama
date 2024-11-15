import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: string
}

export function InputField<T extends FieldValues>({ name, control, label, placeholder, type }: InputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} className="py-6" type={type ? type : "text"} onChange={(e) => {
              if (type === "number") {
               field.onChange(Number(e.target.value)) 
              } else field.onChange(e.target.value)
            }} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
