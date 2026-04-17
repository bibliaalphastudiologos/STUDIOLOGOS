import * as React from 'react';
import { cn } from '@/lib/utils';

const ButtonGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex [&>button:not(:first-child)]:rounded-l-none [&>button:not(:last-child)]:rounded-r-none [&>button:not(:first-child)]:-ml-px', className)}
    {...props}
  />
));
ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup };
