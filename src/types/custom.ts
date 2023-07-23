import React from "react";

export type InputType = React.ChangeEvent<HTMLInputElement>;
export type InputHandlerType = React.ChangeEventHandler<HTMLInputElement>;
export type SelectHandler = React.ChangeEventHandler<HTMLSelectElement>;
export type ClickType = React.MouseEventHandler<HTMLInputElement>;
export type FormType = React.FormEvent<HTMLFormElement>;
export type ButtonHandler = React.MouseEventHandler<HTMLButtonElement>;
export type ClickHandler = React.MouseEventHandler<HTMLElement>;
export type InputHtmlType = "text" | "email" | "number" | "password";
export type InputSelectChangeType =
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLInputElement>;
