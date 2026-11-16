import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "@clerk/react";
import {
  myProductsApi,
  type EditableProduct,
  type SellerProduct,
  type ListingStatus,
} from "../services/myProductsApi";

// This is deliberately self-contained. Mount it inside your existing
// protected layout and connect your existing create-listing route below.
const CREATE_PRODUCT_PATH = "/products/new"; // adjust to your app's actual route

type Filter = "all" | ListingStatus;

export default function MyProducts() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<SellerProduct | null>(null);
  const [form, setForm] = useState<EditableProduct | null>(null);

  const load = useCallback(async () => {
    if (!isLoaded || !isSignedIn) return;
    setError(null);
    setLoading(true);
    try {
      setProducts(await myProductsApi.list(getToken));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load products");
    } finally {
      setLoading(false);
    }
  }, [getToken, isLoaded, isSignedIn]);

  useEffect(() => {
    void load();
  }, [load]);

  const visible = useMemo(
    () =>
      products.filter((p) => filter === "all" || p.listing_status === filter),
    [products, filter],
  );
  const activeCount = products.filter(
    (p) => p.listing_status === "active",
  ).length;
  const pendingCount = products.filter(
    (p) => p.listing_status === "pending_upload",
  ).length;

  function openEditor(p: SellerProduct) {
    setEditing(p);
    setForm({
      name: p.name,
      price: p.price,
      description: p.description,
      condition: p.condition,
      category: p.category,
      delivery_options: p.delivery_options,
      attributes: p.attributes ?? {},
    });
  }

  async function submitEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing || !form) return;
    setBusyId(editing.product_id);
    setError(null);
    try {
      const updated = await myProductsApi.update(
        getToken,
        editing.product_id,
        form,
      );
      setProducts((items) =>
        items.map((p) => (p.product_id === updated.product_id ? updated : p)),
      );
      setEditing(null);
      setForm(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  }

  async function changeStatus(p: SellerProduct) {
    const next = p.listing_status === "active" ? "archived" : "active";
    if (
      !window.confirm(
        `${next === "archived" ? "Archive" : "Reactivate"} ${p.name}?`,
      )
    )
      return;
    setBusyId(p.product_id);
    setError(null);
    try {
      const updated = await myProductsApi.setStatus(
        getToken,
        p.product_id,
        next,
      );
      setProducts((items) =>
        items.map((item) =>
          item.product_id === updated.product_id ? updated : item,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Status update failed");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(p: SellerProduct) {
    if (
      !window.confirm(
        `Delete “${p.name}” from My Products? This hides the listing and cannot be undone from this page.`,
      )
    )
      return;
    setBusyId(p.product_id);
    setError(null);
    try {
      await myProductsApi.remove(getToken, p.product_id);
      setProducts((items) =>
        items.filter((item) => item.product_id !== p.product_id),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  if (!isLoaded) return <p>Checking session…</p>;
  if (!isSignedIn) return <p>Sign in to manage your listings.</p>;

  return (
    <section style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <h1>My Products</h1>
          <p>Manage your LeafTrade listings.</p>
        </div>
        <a href={CREATE_PRODUCT_PATH}>+ Create listing</a>
      </header>

      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBlock: 20 }}
      >
        <span>
          <strong>{products.length}</strong> total
        </span>
        <span>
          <strong>{activeCount}</strong> active
        </span>
        <span>
          <strong>{pendingCount}</strong> pending
        </span>
      </div>

      <label htmlFor="listing-filter">Filter by status: </label>
      <select
        id="listing-filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value as Filter)}
      >
        {(
          ["all", "active", "pending_upload", "archived", "sold"] as Filter[]
        ).map((s) => (
          <option key={s} value={s}>
            {s.replaceAll("_", " ")}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => void load()}
        style={{ marginLeft: 12 }}
      >
        Refresh
      </button>

      {error && (
        <p role="alert" style={{ color: "crimson" }}>
          {error}
        </p>
      )}
      {loading ? (
        <p>Loading products…</p>
      ) : visible.length === 0 ? (
        <p style={{ paddingBlock: 32 }}>No listings in this category.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: 20,
            marginTop: 20,
          }}
        >
          {visible.map((p) => (
            <article
              key={p.product_id}
              style={{
                border: "1px solid #d9e1df",
                borderRadius: 12,
                padding: 14,
              }}
            >
              {p.preview_image ? (
                <img
                  src={p.preview_image}
                  alt={p.name}
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              ) : (
                <div
                  style={{
                    aspectRatio: "4/3",
                    background: "#eef2f0",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  No image
                </div>
              )}
              <h2 style={{ fontSize: 18, marginBlock: 10 }}>{p.name}</h2>
              <p>
                ₱{p.price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
              </p>
              <p>
                Status: <strong>{p.listing_status.replaceAll("_", " ")}</strong>
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <button
                  type="button"
                  disabled={
                    busyId === p.product_id || p.listing_status === "sold"
                  }
                  onClick={() => openEditor(p)}
                >
                  Edit
                </button>
                {(p.listing_status === "active" ||
                  p.listing_status === "archived") && (
                  <button
                    type="button"
                    disabled={busyId === p.product_id}
                    onClick={() => void changeStatus(p)}
                  >
                    {p.listing_status === "active" ? "Archive" : "Restore"}
                  </button>
                )}
                <button
                  type="button"
                  disabled={
                    busyId === p.product_id || p.listing_status === "sold"
                  }
                  onClick={() => void remove(p)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing && form && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Edit product"
          style={{
            position: "fixed",
            inset: 0,
            background: "#0009",
            display: "grid",
            placeItems: "center",
            padding: 20,
            zIndex: 1000,
          }}
        >
          <form
            onSubmit={(e) => void submitEdit(e)}
            style={{
              background: "white",
              color: "#17231e",
              borderRadius: 12,
              padding: 24,
              width: "min(500px, 100%)",
              maxHeight: "85vh",
              overflowY: "auto",
              display: "grid",
              gap: 12,
            }}
          >
            <h2>Edit listing</h2>
            {(
              [
                "name",
                "description",
                "condition",
                "category",
                "delivery_options",
              ] as const
            ).map((key) => (
              <label key={key} style={{ display: "grid", gap: 4 }}>
                {key.replaceAll("_", " ")}
                <input
                  value={form[key]}
                  maxLength={
                    key === "description" ? 2000 : key === "name" ? 50 : 30
                  }
                  onChange={(e) =>
                    setForm(
                      (prev) => prev && { ...prev, [key]: e.target.value },
                    )
                  }
                  required={key !== "description"}
                />
              </label>
            ))}
            <label>
              Price (PHP)
              <input
                type="number"
                min="0.01"
                max="10000000"
                step="0.01"
                required
                value={form.price}
                onChange={(e) =>
                  setForm(
                    (prev) =>
                      prev && { ...prev, price: Number(e.target.value) },
                  )
                }
              />
            </label>
            <small>Media replacement is not part of this release.</small>
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
            >
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setForm(null);
                }}
              >
                Cancel
              </button>
              <button type="submit" disabled={busyId === editing.product_id}>
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
