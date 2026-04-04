export interface AdBannerProps {
  slot?: string;
  className?: string;
}

export default function AdBanner({ className }: AdBannerProps) {
  return (
    <div className={`ad-slot-horizontal ${className || ''}`}>
      <span>Advertisement</span>
    </div>
  );
}
