import {
  Button,
  InputAdornment,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import CustomizedRating from "../components/Rating";
import { useState } from "react";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createDefaultWishlist } from "../helpers/firebaseHelper";
import { useAuth } from "../hooks/useAuth";
// !TODO
// ! show result and move to list page
// ! error message
// ! loading useState
// ! login singup page as well.
//!todo validate Form

interface GiftFormState {
  name: string;
  url: string;
  price: number;
  priority: number;
}
const GiftForm = () => {
  const [result, setResult] = useState<GiftFormState>({
    name: "",
    url: "",
    price: 0,
    priority: 0,
  });
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const { userId, loading } = useAuth();

  const validateForm = () => {
    const isEmpty =
      !result.name || !result.url || !result.price || !result.priority;

    if (isEmpty) {
      return true;
    }
    return false;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      toast.error("Please login first.");
      return;
    }
    //validate
    const hasError = validateForm();
    if (hasError) {
      toast.error("Please fill out all fields");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      const listId = await createDefaultWishlist(user.uid);

      await addDoc(collection(db, "wishlistItems"), {
        listId,
        name: result.name,
        url: result.url,
        price: Number(result.price),
        priority: result.priority,
        purchaseStatus: "available",
        createdAt: serverTimestamp(),
      });

      toast.success("Created successfully");
      navigate("/gifts/list", { replace: true });
    } catch {
      setError("Failed to create. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      spacing={3}
      sx={{
        height: "100vh",
        maxWidth: {
          xs: "70%",
          md: "30%",
        },
        margin: "0 auto",
        justifyContent: "center",
      }}
    >
      <TextField
        type="name"
        label="Name"
        variant="outlined"
        value={result.name}
        onChange={(e) =>
          setResult((result) => ({ ...result, name: e.target.value }))
        }
      />
      <TextField
        label="Product URL"
        type="url"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LinkIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
        placeholder="Paste product link"
        value={result.url}
        onChange={(e) =>
          setResult((result) => ({ ...result, url: e.target.value }))
        }
      />
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography sx={{ minWidth: 100 }}>Price range</Typography>
        <Slider
          min={0}
          max={200}
          step={10}
          valueLabelDisplay="auto"
          marks={[
            { value: 0, label: "$0" },
            { value: 100, label: "$100" },
            { value: 200, label: "$200+" },
          ]}
          onChange={(_, value) => setResult((r) => ({ ...r, price: value }))}
        />
      </Stack>
      <CustomizedRating
        value={result.priority}
        onChange={(newValue) =>
          setResult((r) => ({ ...r, priority: newValue }))
        }
        max={3}
      />
      <Button type="submit" variant="contained" disabled={isSaving}>
        {isSaving ? "Saving..." : "Submit"}
      </Button>
    </Stack>
  );
};

export default GiftForm;
