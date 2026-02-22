import toast from "react-hot-toast";

interface Props {
  listId: string;
  title: string;
}

export const shareLink = async ({ listId, title }: Props): Promise<void> => {
  const url = `${window.location.origin}/gifts/list/${listId}`;
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text: `Check out my gift list: ${title}`,
        url,
      });
      return;
    } catch (err) {
      console.error("error", err);
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied!");
  } catch {
    window.prompt("Copy this link:", url);
  }
};
export const convertTimeStamp = (seconds: number) => {
  const date = new Date(seconds * 1000);
  return date.toISOString();
};
