import { useEffect, useState } from "react";
import api from "../api/api";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (id) => {
    await api.put(`/admin/users/${id}/toggle-status`);
    load();
  };

  return (
    <div>
      <AdminNavbar />
      <h2 className="text-center">Customer Management</h2>
      {loading && (
        <div className="alefrt alert-secondary">
          Loading customer...
          </div>
      )}

      {!loading && users.length ===0 && (
        <div className="alert-alert-info">
          No customers found
          </div>
      )}

      {loading && users.length > 0 && (

      )}

      {/* {users.map((u) => (
        <div key={u._id}>
          {u.email} - {u.isActive ? "Active" : "Inactive"}
          <button onClick={() => toggle(u._id)}>Toggle</button>
        </div>
      ))} */}
    </div>
  );
}
