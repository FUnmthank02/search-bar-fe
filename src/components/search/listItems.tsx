import { ResultItem } from "../../interfaces";
import Item from "./item";

interface ListItemProps {
  items: ResultItem[];
}
const ListItems: React.FC<ListItemProps> = ({ items }) => {
  return (
    <>
      {items?.length > 0 &&
        items.map((item) => <Item data={item} key={item?.DocumentId} />)}
    </>
  );
};

export default ListItems;
