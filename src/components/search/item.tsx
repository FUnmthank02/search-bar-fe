import { ResultItem } from "../../interfaces";
import { getText } from "../../utils/helpers";

interface ItemProps {
  data: ResultItem;
}
const Item: React.FC<ItemProps> = ({ data }) => {
  return (
    <>
      <div className="px-4 py-2 cursor-pointer hover:bg-gray-100">
        <p>{getText(data?.DocumentTitle?.Text)}</p>
      </div>
    </>
  );
};

export default Item;
