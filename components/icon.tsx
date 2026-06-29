import {
  Shield,
  Recycle,
  Users,
  Zap,
  Leaf,
  Lock,
  Tag,
  Heart,
  Container,
  Truck,
  TriangleAlert,
  Hammer,
  Home,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  shield: Shield,
  recycle: Recycle,
  users: Users,
  zap: Zap,
  leaf: Leaf,
  lock: Lock,
  tag: Tag,
  heart: Heart,
  container: Container,
  truck: Truck,
  alert: TriangleAlert,
  hammer: Hammer,
  home: Home,
};

export function Icon({
  name,
  className,
  strokeWidth,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = icons[name] ?? Recycle;
  return <Cmp className={className} strokeWidth={strokeWidth} />;
}
