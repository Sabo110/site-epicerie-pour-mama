import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox"
import { Control, FieldValues, Path } from "react-hook-form";

interface VisibleFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
}

export function VisibleField<T extends FieldValues>({ name, control, label }: VisibleFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                            {label}
                        </FormLabel>
                    </div>
                </FormItem>
            )}
        />
    );
}
