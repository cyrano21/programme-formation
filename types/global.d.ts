// Global type declarations for libraries without official type definitions

declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';

  export type LucideIcon = FC<SVGProps<SVGSVGElement>>;

  export const Check: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const X: LucideIcon;
  export const Plus: LucideIcon;
  export const Minus: LucideIcon;

  export * from 'lucide-react';
}

declare module 'class-variance-authority' {
  import { ClassValue as CVAClassValue } from 'class-variance-authority/types';

  export function cva(
    base?: string, 
    config?: {
      variants?: Record<string, Record<string, string>>;
      defaultVariants?: Record<string, string>;
    }
  ): (props?: any) => string;

  export type VariantProps<T extends (...args: any) => any> = Parameters<T>[0];
  export type ClassValue = CVAClassValue | string | undefined | null | Record<string, boolean>;
}

// Node.js global types
declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

declare module '@radix-ui/react-tabs' {
  import * as React from 'react';

  export interface TabsProps extends React.ComponentPropsWithoutRef<'div'> {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    orientation?: 'horizontal' | 'vertical';
    dir?: 'ltr' | 'rtl';
    activationMode?: 'automatic' | 'manual';
  }

  export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
    value: string;
    disabled?: boolean;
  }

  export interface TabsContentProps extends React.ComponentPropsWithoutRef<'div'> {
    value: string;
    forceMount?: boolean;
  }

  export const Root: React.ForwardRefExoticComponent<
    TabsProps & React.RefAttributes<HTMLDivElement>
  >;
  export const List: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>
  >;
  export const Trigger: React.ForwardRefExoticComponent<
    TabsTriggerProps & React.RefAttributes<HTMLButtonElement>
  >;
  export const Content: React.ForwardRefExoticComponent<
    TabsContentProps & React.RefAttributes<HTMLDivElement>
  >;
}

declare module 'sonner' {
  import { ReactNode } from 'react';
  
  export interface ToastProps {
    title?: ReactNode;
    description?: ReactNode;
    action?: {
      label: string;
      onClick: () => void;
    };
    cancel?: {
      label: string;
      onClick?: () => void;
    };
  }

  export function toast(message: string, options?: ToastProps): void;
  export function toast(options: ToastProps): void;

  export namespace toast {
    function success(message: string, options?: ToastProps): void;
    function error(message: string, options?: ToastProps): void;
    function warning(message: string, options?: ToastProps): void;
    function info(message: string, options?: ToastProps): void;
  }

  export function Toaster(): JSX.Element;
}


