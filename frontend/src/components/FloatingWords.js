import { useMemo } from "react";

const items = [
  "AI", "ML", "Deep Learning", "Neural Network",
  "LLM", "GPT", "Cloud", "API", "Backend",
  "Frontend", "Database", "React", "Node.js",
];

export default function FloatingWords() {

  // 🔥 generate once only (NO re-render change)
  const floatingItems = useMemo(() => {
    return items.map((item) => ({
      text: item,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 14 + Math.random() * 20,
      duration: 12 + Math.random() * 10,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {floatingItems.map((item, i) => (
        <span
          key={i}
          className="absolute text-white/30 font-semibold animate-float"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}