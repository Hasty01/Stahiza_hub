import React, { useState, useEffect } from 'react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Search, Shield, GraduationCap, UserCog, Trash2, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabaseService, UserProfile } from '@/src/lib/supabaseService';

export const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await supabaseService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      await supabaseService.approveUser(id, !currentStatus);
      await fetchUsers();
    } catch (error) {
      console.error('Error toggling approval:', error);
    }
  };

  const deleteUser = async (id: string) => {
    // In a real app, we'd have a deleteUser method in supabaseService
    // For now, let's just filter it out locally to simulate deletion
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Users</h1>
          <p className="text-muted-foreground">Approve, edit, or remove users from the system.</p>
        </div>
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
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-navy" />
            </div>
          ) : (
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
                        user.isApproved ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {user.isApproved ? <CheckCircle className="h-2 w-2" /> : <XCircle className="h-2 w-2" />}
                        {user.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => toggleApproval(user.id, user.isApproved)}
                        >
                          {user.isApproved ? 'Revoke' : 'Approve'}
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
          )}
        </div>
        {!loading && filteredUsers.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            <p>No users found matching your search.</p>
          </div>
        )}
      </Card>
    </div>
  );
};
