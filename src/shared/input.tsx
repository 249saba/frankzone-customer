import cn from "classnames";
import React, { InputHTMLAttributes, memo } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  label?: string;
  note?: string;
  name: string;
  error?: any;
  type?: string;
  shadow?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  touched?: any;
  handleKeyDown?: any;
  handldChange?: any;
  containerClass?: string;
  variant?: "normal" | "solid" | "outline" | "base";
}
const classes = {
  root: "pl-4 pr-9 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-blue-cta placeholder:text-blue-placeholder placeholder:font-normal text-base font-medium focus:outline-none",
  normal:
    "bg-gray-light border border-gray-light focus:outline-transparent rounded-lg",
  solid: "bg-lightGrey",
  outline:
    "border border-solid border-blue-placeholder focus:border-blue-cta focus:border-[3px]",
  base: "h-11 bg-blue-10 border border-blue-450 text-sharpBlue placeholder:text-sharpBlue font-normal !text-base",
  error: "border border-red",
  shadow: "focus:shadow",
};
const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      touched,
      note,
      name,
      error,
      variant = "normal",
      shadow = false,
      type = "text",
      inputClassName,
      labelClassName,
      containerClass,
      rightIcon,
      leftIcon,
      handldChange,
      handleKeyDown,
      ...rest
    },
    ref
  ) => {
    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === "normal",
        [classes.solid]: variant === "solid",
        [classes.outline]: variant === "outline",
        [classes.base]: variant === "base",
      },
      {
        [classes.shadow]: shadow,
      },
      inputClassName
    );
    const _labelClassName = "mb-2 text-sm font-semibold inline-block";
    const keyDown = (e: any) => {
      handleKeyDown?.(e);
    };
    return (
      <div className={className}>
        {label && (
          <label htmlFor={name} className={cn(_labelClassName, labelClassName)}>
            {label}
          </label>
        )}
        <div className={cn(`relative flex items-center   `, containerClass)}>
          <input
            id={name}
            name={name}
            type={type}
            ref={ref}
            className={`text-black-100 break-words  truncate w-[100%] flex sm:flex-col ${rootClassName} ${leftIcon ? "!pl-12" : ""} ${
              error && touched ? classes.error : ""
            }`}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            aria-invalid={error ? "true" : "false"}
            onChange={handldChange}
            onKeyDown={keyDown}
            {...rest}
          />
          <div className="lg:absolute lg:right-3">{rightIcon}</div>
          <div className="absolute left-3">{leftIcon}</div>
        </div>
        {note && <p className="mt-2 text-xs text-body">{note}</p>}
        {touched && error && (
          <p className="my-2 text-xs text-start text-red-100">{error}</p>
        )}
      </div>
    );
  }
);

export default memo(Input);
