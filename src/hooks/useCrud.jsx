import { useState, useEffect } from "react";

export const useCrud = (api) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const fetchAll = async () => {
    try {
      const data = await api.getAll();
      setRows(data);
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleOpenAdd = () => {
    setIsEdit(false);
    setCurrentId(null);
    setOpen(true);
  };

  const handleOpenEdit = (item) => {
    setIsEdit(true);
    setCurrentId(item.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentId(null);
  };

  const handleSave = async (values) => {
    setLoading(true);
    setError(null);
    try {
      if (isEdit && currentId) {
        await api.update(currentId, values);
        const updated = await api.update(currentId, values); // expect API to return full job

        setRows((prev) =>
          prev.map((r) => (r.id === currentId ? { ...r, ...updated } : r))
        );
  // const updated = await api.update(currentId, values); // expect API to return full job
  // setRows((prev) =>
  //   prev.map((r) => (r.id === currentId ? updated : r))
  // );

      } else {
        const created = await api.create(values);
        setRows((prev) => [...prev, created]);
      }
      fetchAll();
      handleClose();
    } catch (err) {
      setError("Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError("Failed to delete");
    }
      fetchAll();

  };

  return {
    rows,
    loading,
    error,
    open,
    isEdit,
    currentId,
    handleOpenAdd,
    handleOpenEdit,
    handleClose,
    handleSave,
    handleDelete,
  };
};
