import React, { useEffect, useState } from 'react';
import { Button, Spinner } from '@chakra-ui/react';

export default function Users({ sessionToken }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('http://127.0.0.1:4000/api/adminUser/users', {
          headers: { 'authorization': sessionToken }
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        // Handle error
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [sessionToken]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Manage Users</h2>
      {loading ? <Spinner /> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Role</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.firstName} {user.lastName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.isAdmin ? 'Admin' : 'User'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {/* Example admin actions */}
                  <Button size="sm" colorScheme="red" mr={2}>Delete</Button>
                  <Button size="sm" colorScheme="blue">Promote</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
