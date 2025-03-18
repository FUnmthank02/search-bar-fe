import { getUniqueId } from "../../utils/helpers";
import Item from "./item";

interface ListItemProps {
  items: (string | JSX.Element)[][];
}
const ListItems: React.FC<ListItemProps> = ({ items }) => {
  return (
    <>
      {items?.length > 0 &&
        items.map((item) => <Item data={item} key={getUniqueId()} />)}
    </>
  );
};

export default ListItems;
