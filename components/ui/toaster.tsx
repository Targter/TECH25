'use client';

import { useToast, Toast } from '@/hooks/use-toast';
import {
  Toast as ToastComponent,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }: Toast) {
        return (
          <ToastComponent key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </ToastComponent>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}