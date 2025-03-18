import { useMemo } from "react";
import { SearchResponse } from "../../interfaces";
import ItemSearchResult from "./itemSearchResult";

interface ListItemProps {
  result: SearchResponse;
  total: number;
  isSearching: boolean;
}
const ListResults: React.FC<ListItemProps> = ({
  result,
  total,
  isSearching,
}) => {
  const itemsFromTo = useMemo(() => {
    const from = (result?.Page - 1) * result?.PageSize + 1;
    const to = from + result?.PageSize - 1;
    return [from, to];
  }, [result.Page, result.PageSize]);
  return (
    <>
      {isSearching && (result?.ResultItems?.length > 0 ? (
        <div className="py-2">
          <p>
            Showing {itemsFromTo[0]} - {itemsFromTo[1]} of {total} results
          </p>
        </div>
      ) : (
        <div className="py-2">
          <p>No results found</p>
        </div>
      ))}
      {result?.ResultItems?.length > 0 &&
        result?.ResultItems?.map((item) => (
          <ItemSearchResult data={item} key={item?.DocumentId} />
        ))}
    </>
  );
};

export default ListResults;
