import { getText } from "../../utils/helpers";

interface ItemProps {
  data: (string | JSX.Element)[];
}
const Item: React.FC<ItemProps> = ({ data }) => {
  return (
    <>
      <div className="px-4 py-2 cursor-pointer hover:bg-gray-100">
        <p>{typeof data === "string" ? getText(data) : data}</p>
      </div>
    </>
  );
};

export default Item;
