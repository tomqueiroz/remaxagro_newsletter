import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  subtitle?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

export default function StatsCard({ title, value, icon, subtitle, color = 'primary' }: StatsCardProps) {
  const colorClasses = {
    primary: 'border-t-primary',
    success: 'border-t-green-600',
    warning: 'border-t-amber-500',
    danger: 'border-t-destructive'
  };

  const iconColorClasses = {
    primary: 'text-primary',
    success: 'text-green-600',
    warning: 'text-amber-500',
    danger: 'text-destructive'
  };

  return (
    <Card className={`p-6 border-t-4 ${colorClasses[color]} shadow-lg hover:shadow-xl transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-bold mt-2 text-foreground">
            {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`text-4xl ${iconColorClasses[color]}`}>
          <i className={icon}></i>
        </div>
      </div>
    </Card>
  );
}