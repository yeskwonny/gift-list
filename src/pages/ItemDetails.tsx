import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../helpers/firebaseHelper";
import type { Timestamp } from "firebase/firestore";
import { convertTimeStamp } from "../helpers/utils";
type WishlistItem = {
  createdAt: Timestamp;
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
  const { name, url, price, priority, purchaseStatus, createdAt } = item || {};
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
  const renderPriority = (count: number) => {
    return "❤️".repeat(count);
  };
  if (loading) return <div>Loading...</div>;
  if (!item) return <div>Item not found.</div>;
  console.log("item", item);

  return (
    <div>
      <div>{name}</div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          backgroundColor: "#ff4d4f",
          color: "white",
          borderRadius: "25px",
          textDecoration: "none",
          fontWeight: "bold",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        🎁 Buy a gift
      </a>
      <div>{price}</div>
      <div>{renderPriority(priority ?? 0)}</div>
      <div>{purchaseStatus}</div>
      <div>
        <div>{convertTimeStamp(createdAt?.seconds || 0)}</div>
      </div>
    </div>
  );
}
