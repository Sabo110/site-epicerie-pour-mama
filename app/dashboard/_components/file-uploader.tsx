"use client"

import React, { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Trash2 } from 'lucide-react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Control, FieldValues, Path } from "react-hook-form";

interface FileUploaderProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string
}

export function FileUploader<T extends FieldValues>({
    name,
    control,
    label
}: FileUploaderProps<T>) {
    const input = useRef<HTMLInputElement | null>(null)
    const [file, setFile] = useState<File | undefined>()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel> {label} </FormLabel>
                    <FormControl>
                        <div>
                            <Input type='file' ref={input} className='hidden' accept='image/png, image/jpeg, image/jpg'
                                onChange={(e) => {
                                    console.log(e.target.files);
                                    field.onChange(e.target.files?.[0])
                                    setFile(e.target.files?.[0])
                                }}
                            />
                            <div className='border-2 border-gray-200 cursor-pointer rounded border-dashed p-5 text-center' onClick={() => input.current?.click()} >
                                <p>Cliquez pour choisir un fichier...</p>
                            </div>
                            <div className='flex items-center gap-3 mt-2'>
                                <p> {file?.name} </p>
                                {file ? <Trash2 size={17} className='cursor-pointer' onClick={() => {
                                    setFile(undefined)
                                    field.onChange(undefined)
                                }} /> : null}
                            </div>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

    )
}
