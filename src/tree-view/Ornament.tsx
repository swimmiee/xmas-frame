import { Image } from "../ui";

interface OrnamentProps {
  position: number;
  itemId: number;
}
const POSITIONS = [
  [485, 730],
  [480, 615],
  [450, 490],
  [380, 695],
  [390, 600],
  [350, 515],
  [290, 680],
  [275, 600],
  [240, 520],
  [180, 650],
  [160, 570],
  [70, 600],
];

const SIZE = 76;
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
      <Image src={`/ornaments/${itemId}.png`} width="100%" height="100%" />
    </div>
  );
};
