import { ICONS, IconName } from "./icons";

export default function BenefitIcon({ name }: { name: IconName }) {
  const Icon = ICONS[name];
  return (
    <div className="benefit-icon">
      <Icon />
    </div>
  );
}
