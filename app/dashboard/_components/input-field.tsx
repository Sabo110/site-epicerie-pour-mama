import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
}

export function InputField<T extends FieldValues>({ name, control, label, placeholder }: InputFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} className="py-6" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
