export interface AdInContentProps {
  slot?: string;
  className?: string;
}

export default function AdInContent({ className }: AdInContentProps) {
  return (
    <div className={`ad-slot-rectangle ${className || ''}`}>
      <span>Advertisement</span>
    </div>
  );
}
