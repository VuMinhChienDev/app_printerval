// import { cva, type VariantProps } from 'class-variance-authority';
// import * as React from 'react';
// import { Pressable } from 'react-native';
// import { TextClassContext } from '~/components/ui/text';
// import { cn } from '~/lib/utils';

// const buttonVariants = cva(
//   'group flex items-center justify-center rounded-md web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
//   {
//     variants: {
//       variant: {
//         default: 'bg-primary web:hover:opacity-90 active:opacity-90',
//         destructive: 'bg-destructive web:hover:opacity-90 active:opacity-90',
//         outline:
//           'border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
//         secondary: 'bg-secondary web:hover:opacity-80 active:opacity-80',
//         ghost: 'web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent',
//         link: 'web:underline-offset-4 web:hover:underline web:focus:underline ',
//       },
//       size: {
//         default: 'h-10 px-4 py-2 native:h-12 native:px-5 native:py-3',
//         sm: 'h-9 rounded-md px-3',
//         lg: 'h-11 rounded-md px-8 native:h-14',
//         icon: 'h-10 w-10',
//       },
//     },
//     defaultVariants: {
//       variant: 'default',
//       size: 'default',
//     },
//   }
// );

// const buttonTextVariants = cva(
//   'web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors',
//   {
//     variants: {
//       variant: {
//         default: 'text-primary-foreground',
//         destructive: 'text-destructive-foreground',
//         outline: 'group-active:text-accent-foreground',
//         secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
//         ghost: 'group-active:text-accent-foreground',
//         link: 'text-primary group-active:underline',
//       },
//       size: {
//         default: '',
//         sm: '',
//         lg: 'native:text-lg',
//         icon: '',
//       },
//     },
//     defaultVariants: {
//       variant: 'default',
//       size: 'default',
//     },
//   }
// );

// type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
//   VariantProps<typeof buttonVariants>;

// const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
//   ({ className, variant, size, ...props }, ref) => {
//     return (
//       <TextClassContext.Provider
//         value={cn(
//           props.disabled && 'web:pointer-events-none',
//           buttonTextVariants({ variant, size })
//         )}
//       >
//         <Pressable
//           className={cn(
//             props.disabled && 'opacity-50 web:pointer-events-none',
//             buttonVariants({ variant, size, className })
//           )}
//           ref={ref}
//           role='button'
//           {...props}
//         />
//       </TextClassContext.Provider>
//     );
//   }
// );
// Button.displayName = 'Button';

// export { Button, buttonTextVariants, buttonVariants };
// export type { ButtonProps };
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
