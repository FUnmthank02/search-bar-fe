import { getUniqueId } from "../../utils/helpers";
import Item from "./item";

interface ListItemProps {
  items: (string | JSX.Element)[][];
  selectedIndex: number | null;
  onSelect: (value: string, index: number) => void;
}
const ListItems: React.FC<ListItemProps> = ({ items, selectedIndex, onSelect }) => {
  return (
    <>
      {items?.length > 0 &&
        items.map((item, i) => <Item data={item} selectedIndex={selectedIndex} index={i} onSelect={onSelect} key={getUniqueId()} />)}
    </>
  );
};

export default ListItems;
