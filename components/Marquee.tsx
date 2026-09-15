interface MarqueeProps {
  items: string[];
  className?: string;
  textClassName?: string;
}

export function Marquee({ items, className = "", textClassName = "" }: MarqueeProps) {
  const content = (
    <div className="flex items-center shrink-0">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center shrink-0">
          <span className={`whitespace-nowrap px-6 ${textClassName}`}>{item}</span>
          <span className="text-primary text-2xl">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden flex ${className}`}>
      <div className="flex animate-marquee">
        {content}
        {content}
      </div>
    </div>
  );
}
