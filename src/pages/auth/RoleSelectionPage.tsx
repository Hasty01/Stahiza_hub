import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/src/context/AuthContext';
import { Button } from '@/src/components/ui/Button';
import { GraduationCap, UserCog, ShieldCheck } from 'lucide-react';

export const RoleSelectionPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    navigate(`/login?role=${role}`);
  };

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Access your classes, assignments, and AI tutor.',
      icon: GraduationCap,
      color: 'bg-navy',
    },
    {
      id: 'teacher',
      title: 'Teacher',
      description: 'Manage your classes, grade work, and upload resources.',
      icon: UserCog,
      color: 'bg-maroon',
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage users, admissions, and school notifications.',
      icon: ShieldCheck,
      color: 'bg-black',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-black text-foreground">Choose Your <span className="text-gold">Role</span></h1>
        <p className="text-sm text-muted-foreground font-medium">Select your portal to access STAHIZA HUB</p>
      </div>
      <div className="grid gap-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => handleRoleSelect(role.id as UserRole)}
            className="flex items-center gap-4 rounded-2xl border border-border p-5 text-left transition-all hover:border-gold hover:bg-white/5 group"
          >
            <div className={`rounded-xl ${role.color} p-4 text-white shadow-lg group-hover:rotate-6 transition-transform`}>
              <role.icon className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{role.title}</h3>
              <p className="text-sm text-muted-foreground font-medium">{role.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
