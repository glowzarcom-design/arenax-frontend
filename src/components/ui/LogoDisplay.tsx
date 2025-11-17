import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NeonText } from './NeonText';

interface LogoDisplayProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const LogoDisplay = ({ size = 'md', showText = true, className }: LogoDisplayProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Trophy className={cn(sizeClasses[size], 'text-primary animate-pulse-neon')} />
      {showText && (
        <NeonText as="span" className={textSizeClasses[size]}>
          ArenaX
        </NeonText>
      )}
    </div>
  );
};
