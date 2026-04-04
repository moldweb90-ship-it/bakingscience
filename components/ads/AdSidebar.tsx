export interface AdSidebarProps {
  slot?: string;
  sticky?: boolean;
  className?: string;
}

export default function AdSidebar({ sticky = true, className }: AdSidebarProps) {
  return (
    <div className={`ad-slot-sidebar ${sticky ? 'sticky top-20' : ''} ${className || ''}`}>
      <span>Advertisement</span>
    </div>
  );
}
