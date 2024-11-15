import { Box, Image } from "../ui";

interface OrnamentProps {
  position: number;
  itemId: number;
}
const POSITIONS = [
  [60, 600],
  [140, 560],
  [155, 650],
  [210, 525],
  [230, 605],
  [255, 675],
  [310, 580],
  [330, 505],
  [340, 705],
  [380, 625],
  [410, 550],
  [430, 685],
  [475, 475],
  [485, 730],
  [480, 615],
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
