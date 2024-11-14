import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Loader } from "./loader";

import { Control, FieldValues, Path } from "react-hook-form";
//import { BtnLoader } from "../BtnLoader";

interface SelectFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    options: Record<string, any>[] | undefined; // Tableau d'objets génériques pour plus de flexibilité
    valueKey: string; // Clé pour la valeur (id, âge, etc.)
    labelKey: string; // Clé pour l'affichage (nom, description, etc.)
    placeholder?: string;
    isPending: boolean
}

export function SelectField<T extends FieldValues>({
    name,
    control,
    label,
    options,
    valueKey,
    labelKey,
    placeholder,
    isPending
}: SelectFieldProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel> {label} </FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value ? String(field.value): undefined}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectGroup>
                            {(options && options.length > 0) ?
                                options.map((item) => (
                                    <SelectItem value={String(item[valueKey])} key={item[valueKey]} > {item[labelKey]} </SelectItem>
                                )) : (options && options.length === 0) ?
                                <SelectLabel>Aucun contenu</SelectLabel> : null
                            }
                            {isPending ? <Loader /> : null}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </ FormItem>
            )}
        />
            );
}
