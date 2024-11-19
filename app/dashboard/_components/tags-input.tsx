import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { TagsInput } from "@/components/ui/extension/tags-input";

interface TagsInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    placeholder?: string;
}

export function TagsInpute<T extends FieldValues>({ name, control, label, placeholder }: TagsInputProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel> {label}   </FormLabel>
                    <TagsInput
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder={placeholder}
                    />
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
