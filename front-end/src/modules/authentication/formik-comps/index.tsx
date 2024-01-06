import { notifySuccess } from "@modules/common/components/toast-comps";
import { Button } from "@modules/common/components/ui/button";
import { Input, InputProps } from "@modules/common/components/ui/input";
import * as Checkbox from '@radix-ui/react-checkbox';
import { Label } from "@radix-ui/react-label";
import clsx from "clsx";
import { ErrorMessage, ErrorMessageProps, FieldInputProps, FieldProps } from 'formik';
import { Check, Copy, Eye, EyeOff, SendHorizonal, UploadCloud } from "lucide-react";
import React, { useEffect, useState } from "react";
import './button.scss'
import './button_rounded.scss'

// remove onChange from InputProps
type InputPropsWithoutOnChange = Omit<InputProps, 'onChange'>;

type FormikInputProps = {
    label: string,
    isCopyable: boolean,
    maxFileSize: number,
} & InputPropsWithoutOnChange & FieldProps;

// "flex items-center w-fit gap-2 p-4   group dark:before:bg-darker   dark:before:border-gray-600 before:absolute before:inset-0 before:rounded-3xl before:border before:transition-transform before:duration-300 active:duration-75 active:before:scale-95", {
//     "cursor-pointer hover:before:scale-105 dark:hover:before:border-gray-500 hover:before:border-gray-300 before:bg-gray-100 before:border-gray-400/60": !disabled,
//     "cursor-not-allowed before:border-gray-600  !active:before:scale-100 before:bg-gray": disabled,}

export const FormikInput: React.FC<FormikInputProps> = ({ field, form, type, label, isCopyable, disabled, maxFileSize, accept, className, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        const hasError = (form?.errors[field.name] && form?.touched[field.name]) ? true : false
        setHasError(hasError)

        if (type === "password" && showPassword) {
            setInputType("text")
        }

        if (type === "password" && !showPassword) {
            setInputType("password")
        }
    }, [type, showPassword, form])
    return (
        <>
            {type === "file" ? (
                <div className={clsx("relative w-fit", className)}>
                    <div className={clsx("w-full h-full ")
                    }>
                        {
                            label &&
                            <div className="relative pb-2">
                                <span className={clsx("block text-base font-bold relative text-blue-900 dark:text-white ", { "": disabled, "group-hover:text-blue-500": !disabled })}>
                                    {label}
                                </span>
                                <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400">{maxFileSize}</span>
                            </div>
                        }
                        <div className="relative">
                            <div
                                className={clsx("potato__button__rounded basis-1/4", { "!bg-slate-500": disabled })}>
                                <label title="Click to upload" htmlFor={field?.name} className={clsx("relative w-full h-full p-3", { "cursor-pointer ": !disabled, "cursor-not-allowed !bg-slate-500": disabled })}>
                                    <UploadCloud />
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
            ) :
                <Label htmlFor={field?.name}>{label}</Label>
            }
            <div className={clsx("flex relative z-0 w-full pt-2 ", { "pb-0": hasError, "pb-2": !hasError, "gap-2 center-item": isCopyable, "hidden": type === 'file' })}>

                <Input className={clsx({ "!rounded-r-none": type === 'password' }, className)} type={inputType} id={field?.name} accept={accept} disabled={disabled}
                    name={field?.name}
                    value={type === 'file' ? undefined : field?.value}
                    onChange={(e) => {
                        if (type !== 'file') {
                            field.onChange(e)
                        }
                        else {
                            const files = e.currentTarget.files;
                            if (files && files.length > 0) {
                                form.setFieldValue(field.name, files[0]);
                            }
                        }
                    }}
                    onBlur={field.onBlur}
                    multiple={type === 'file'}
                    checked={field?.value}
                    {...props}
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="transition-all duration-150"
                    >
                        <div className="px-1 bg-white text-black rounded-r-[10px] border border-beta border-l-0 h-full ">
                            {showPassword ? <Eye className="relative object-cover h-full" /> : <EyeOff className="relative object-cover  h-full" />}
                        </div>
                    </button>
                )}

                {isCopyable && (
                    <Button onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(props.value as string);
                        notifySuccess("Copied to clipboard")
                    }}>
                        <Copy className="text-white" />
                    </Button>
                )}
            </div>
            <FormikErrorMessage name={field?.name} className={clsx({ "py-0": type === 'file', "py-2": type !== 'file' })} />
        </>

    )
}


type FormikInputWithActionProps = {
    label: string;
    icon: React.ReactNode;
} & InputPropsWithoutOnChange & FieldProps;

export const FormikInputWithAction: React.FC<FormikInputWithActionProps> = ({ field, form, type, label, className, icon, ...props }) => {
    const [inputType, setInputType] = useState(type)
    const [hasError, setHasError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        const hasError = (form?.errors[field.name] && form?.touched[field.name]) ? true : false
        setHasError(hasError)

        if (type === "password" && showPassword) {
            setInputType("text")
        }

        if (type === "password" && !showPassword) {
            setInputType("password")
        }
    }, [type, showPassword, form])

    return (
        <div>
            {label && (<Label htmlFor={field?.name}>{label}</Label>)}
            <div className={clsx("flex relative z-0 w-full h-full pt-2 center-item gap-2 ", { "pb-0": hasError, "pb-2": !hasError })}>
                <Input
                    className={clsx({ "!rounded-r-none basis-3/4 ": type === 'password' }, className)} type={inputType}
                    {...field}
                    {...props}
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="transition-all duration-150"
                    >
                        <div className="px-1 bg-white text-black rounded-r-[10px] border border-beta border-l-0 h-full ">
                            {showPassword ? <Eye className="relative object-cover h-full" /> : <EyeOff className="relative object-cover  h-full" />}
                        </div>
                    </button>
                )}
                <button
                    onClick={(e) => { const button = e.target as HTMLButtonElement; button.classList.toggle("potato__button--active"); }}
                    className="potato__button basis-1/4">
                    <span className="w-full h-full">
                        {icon}
                    </span>
                </button>
            </div>
            <FormikErrorMessage name={field?.name} className={clsx("text-sm")} />
        </div>

    )
}

export const FormikCheckBox: React.FC<FieldProps> = ({ field, form, ...props }: {
    field: FieldInputProps<any>,
    form: any
}) => {
    return (
        <Checkbox.Root {...field} {...props} id={field?.name} className="h-[20px] w-[20px] !bg-white hover:bg-violet-800 center-item " defaultChecked    >
            <Checkbox.Indicator>
                <Check className="text-black" size={15} />
            </Checkbox.Indicator>
        </Checkbox.Root>
    )
}

export const FormikErrorMessage: React.FC<ErrorMessageProps> = ({ name, className }) => {
    return <ErrorMessage id={name} name={name} component="div" className={clsx('text-red-500 font-bold', className)} />;
}