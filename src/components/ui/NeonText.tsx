import { cn } from '@/lib/utils';

interface NeonTextProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'success';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  animate?: boolean;
}

export const NeonText = ({ 
  children, 
  color = 'primary', 
  className, 
  as: Component = 'span',
  animate = false 
}: NeonTextProps) => {
  const colorClasses = {
    primary: 'neon-text-primary',
    secondary: 'neon-text-secondary',
    accent: 'neon-text-accent',
    success: 'text-success',
  };

  return (
    <Component
      className={cn(
        'font-bold',
        colorClasses[color],
        animate && 'animate-pulse-neon',
        className
      )}
    >
      {children}
    </Component>
  );
};
