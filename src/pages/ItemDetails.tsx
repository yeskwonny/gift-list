import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../helpers/firebaseHelper";
type WishlistItem = {
  createdAt: string;
  id: string;
  listId: string;
  name: string;
  price: number;
  priority: number;
  purchaseStatus: string;
  url: string;
};
export default function WishlistItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Partial<WishlistItem> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      setLoading(true);
      const data = await getItemById(id);
      console.log("data", data);
      setItem(data);
      setLoading(false);
    };
    run();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!item) return <div>Item not found.</div>;

  return (
    <div>
      <div>{item.name}</div>
      <div>{item.price}</div>
      <div>{item.priority}</div>
      <div>{item.purchaseStatus}</div>
      <div>{item.createdAt?.seconds}</div>
    </div>
  );
}