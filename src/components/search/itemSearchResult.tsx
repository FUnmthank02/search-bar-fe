import { ResultItem } from "../../interfaces";
import { getText } from "../../utils/helpers";

interface ItemProps {
  data: ResultItem;
}
const ItemSearchResult: React.FC<ItemProps> = ({ data }) => {
  return (
    <>
      <div className="py-1 my-2 cursor-pointer">
        <p className="text-xl text-blue-500 uppercase my-1">{getText(data?.DocumentTitle?.Text)}</p>
        <p className="text-sm text-gray-700 line-clamp-2 my-1">{getText(data?.DocumentExcerpt?.Text)}</p>
        <a className="text-xs text-gray-500 my-1 hover:underline hover:text-blue-400" target="_blank">{getText(data?.DocumentURI)}</a>
      </div>
    </>
  );
};

export default ItemSearchResult;
