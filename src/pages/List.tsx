import { useEffect, useState } from "react";
import { getAllWishLists } from "../helpers/firebaseHelper";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import WishlistCard from "../components/Card";
import Error from "./EmptyPage";
import { shareLink } from "../helpers/utils";

type Wishlist = {
  id: string;
  title?: string;
  ownerId?: string;
  isDefault?: boolean;
};
const List = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, authLoading } = useAuth();
  const userId = user?.uid;
  const navigate = useNavigate();
  console.log("user", userId);

  useEffect(() => {
    const run = async () => {
      if (!userId) {
        setLoading(false);
        setWishlists([]);
        return;
      }

      setLoading(true);

      try {
        const wishListResultByUserId = await getAllWishLists(userId);
        setWishlists(wishListResultByUserId ?? []);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [userId]);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please login first.");
    }
  }, [authLoading, user]);

  if (authLoading) return <div>Loading...</div>;
  if (loading) return <div>Loading...</div>;

  if (!userId) return <div>Please log in.</div>;
  if (wishlists.length === 0) {
    return <Error />;
  }
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-3">
        {wishlists?.map((w) => (
          <WishlistCard
            key={w.id}
            title={w.title ?? "Untitled"}
            description="Tap to open this list"
            onOpen={() => navigate(`/gifts/list/${w.id}`)}
            onShare={() =>
              shareLink({
                listId: w.id,
                title: w.title ?? "Untitled",
              })
            }
            buttonTitle="SHARE"
            image="../../public/card.png"
          />
        ))}
      </div>
    </div>
  );
};

export default List;
