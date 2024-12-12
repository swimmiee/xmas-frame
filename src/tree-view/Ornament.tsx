import { Image } from "../ui.js";

interface OrnamentProps {
  position: number;
  itemId: number;
}
const POSITIONS = [
  [512, 755],
  [505, 660],
  [480, 560],
  [440, 475],
  [395, 735],
  [360, 660],
  [335, 565],
  [245, 500],
  [205, 600],
  [130, 680],
  [130, 520],
  [60, 600],
];

const SIZE = 80;
export const Ornament = ({ position, itemId }: OrnamentProps) => {
  const [top, left] = POSITIONS[position];
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        top: top - SIZE / 2,
        left: left - SIZE / 2,
        width: SIZE,
        height: SIZE,
      }}
    >
      <Image src={`/static/ornaments/${itemId}.png`} width="100%" height="100%" />
    </div>
  );
};
