import React, { useState } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Search, Filter, UserPlus, MoreVertical, Shield, GraduationCap, UserCog, Trash2, Edit2, CheckCircle, XCircle } from 'lucide-react';

export const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@edustream.com', role: 'student', status: 'Active', joined: '2023-09-01' },
    { id: 2, name: 'Bob Smith', email: 'bob@edustream.com', role: 'teacher', status: 'Active', joined: '2023-08-15' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@edustream.com', role: 'student', status: 'Inactive', joined: '2023-10-05' },
    { id: 4, name: 'David Wilson', email: 'david@edustream.com', role: 'admin', status: 'Active', joined: '2023-01-10' },
    { id: 5, name: 'Eve Davis', email: 'eve@edustream.com', role: 'student', status: 'Active', joined: '2023-11-20' },
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id: number) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  const deleteUser = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Users</h1>
          <p className="text-muted-foreground">Add, edit, or remove users from the system.</p>
        </div>
        <Button variant="navy" className="gap-2">
          <UserPlus className="h-5 w-5" /> Add New User
        </Button>
      </div>

      <Card className="p-0 overflow-hidden border-none shadow-md bg-card-bg">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/50">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" className="flex-1 md:flex-none gap-2">
              <Filter className="h-4 w-4" /> All Roles
            </Button>
            <Button variant="outline" size="sm" className="flex-1 md:flex-none gap-2">
              <Filter className="h-4 w-4" /> Status
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">User</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Role</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-navy">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                      user.role === 'student' ? 'bg-navy/10 text-navy' : 
                      user.role === 'teacher' ? 'bg-maroon/10 text-maroon' : 'bg-gold/10 text-gold'
                    }`}>
                      {user.role === 'student' ? <GraduationCap className="h-3 w-3" /> : 
                       user.role === 'teacher' ? <UserCog className="h-3 w-3" /> : 
                       <Shield className="h-3 w-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                      user.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-muted text-muted-foreground'
                    }`}>
                      {user.status === 'Active' ? <CheckCircle className="h-2 w-2" /> : <XCircle className="h-2 w-2" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-navy" onClick={() => toggleStatus(user.id)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-maroon" onClick={() => deleteUser(user.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            <p>No users found matching your search.</p>
          </div>
        )}
      </Card>
    </div>
  );
};
