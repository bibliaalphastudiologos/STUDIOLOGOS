import { cn } from '@/lib/utils';

export function Empty({ className, icon: Icon, title, description, action, children, ...props }) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-12 text-center', className)} {...props}>
      {Icon && <Icon className="h-12 w-12 text-muted-foreground/50" />}
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {description && <p className="text-sm text-muted-foreground max-w-sm">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
      {children}
    </div>
  );
}
