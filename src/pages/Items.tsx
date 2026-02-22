import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWishlistItems } from "../helpers/firebaseHelper";
import WishlistCard from "../components/Card";

interface WishlistItem {
  createdAt: string;
  id: string;
  listId: string;
  name: string;
  price: number;
  priority: number;
  purchaseStatus: string;
  url: string;
}

const COLORS = {
  main: "#A78BFA",
  accent: "#F472B6", 
  bg: "#F5F3FF", 
  purchased: "#94A3B8", 
};

const Items = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [wishListItems, setWishlistsItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      setLoading(true);
      const items = await getWishlistItems(id);
      console.log("items", items);
      if (!items || items.length === 0) {
        setWishlistsItems([]);
        return;
      }

      setWishlistsItems(items);
      setLoading(false);
    };

    run();
  }, [id]);
  return (
    <div>
      {wishListItems?.map((i) => (
        <WishlistCard
          key={i.id}
          title={i.name}
          price={i.price}
          buttonTitle={
            i.purchaseStatus === "available" ? "Available" : "Taken!"
          }
          onOpen={() => navigate(`/gifts/list/item/${i.id}`)}
          variant="vertical"
          image="../../public/card.png"
        />
      ))}
    </div>
  );
};
export default Items;
