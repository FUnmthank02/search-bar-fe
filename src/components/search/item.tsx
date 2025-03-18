import { getText } from "../../utils/helpers";

interface ItemProps {
  data: (string | JSX.Element)[];
  selectedIndex: number | null;
  index: number;
  onSelect: (value: string, index: number) => void;
}
const Item: React.FC<ItemProps> = ({
  data,
  selectedIndex,
  index,
  onSelect,
}) => {
  return (
    <>
      <div
        className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
          selectedIndex === index ? "bg-gray-200" : ""
        }`}
        onClick={() =>
          onSelect(
            data.map((part) => (typeof part === "string" ? part : "")).join(""),
            index
          )
        }
      >
        <p>{typeof data === "string" ? getText(data) : data}</p>
      </div>
    </>
  );
};

export default Item;
