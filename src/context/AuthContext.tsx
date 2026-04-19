import { createContext, useContext } from "react";
import { supabase } from "../supabaseClient";

export type UserRole = "student" | "teacher" | "admin";
export type ClassGroup = "S1" | "S2" | "S3" | "S4" | "S5" | "S6";

interface AuthContextType {
  signup: (
    name: string,
    email: string,
    role: UserRole,
    classGroup: ClassGroup,
    password: string
  ) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: any) => {

  // =========================
  // 🔐 SIGNUP LOGIC (FIXED)
  // =========================
  const signup = async (
    name: string,
    email: string,
    role: UserRole,
    classGroup: ClassGroup,
    password: string
  ) => {

    // 1. Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    const user = data.user;
    if (!user) throw new Error("User creation failed");

    // 2. Get class UUID from class name (S1-S6)
    const { data: classData, error: classError } = await supabase
      .from("classes")
      .select("id")
      .eq("name", classGroup)
      .single();

    if (classError) throw classError;

    const classId = classData.id;

    // 3. OPTIONAL: store user profile (recommended)
    await supabase.from("users").insert({
      id: user.id,
      name,
      email,
      role,
    });

    // 4. Role-based inserts
    if (role === "student") {
      const { error: studentError } = await supabase
        .from("students")
        .insert({
          user_id: user.id,
          class_id: classId,
          approved: false,
        });

      if (studentError) throw studentError;
    }

    if (role === "teacher") {
      const { error: teacherError } = await supabase
        .from("teachers")
        .insert({
          user_id: user.id,
          assigned_class_id: classId,
        });

      if (teacherError) throw teacherError;
    }

    if (role === "admin") {
      // optional future table
      console.log("Admin created");
    }
  };

  // =========================
  // 🔐 LOGIN LOGIC
  // =========================
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ signup, login }}>
      {children}
    </AuthContext.Provider>
  );
};