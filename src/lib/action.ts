import { createUser } from "@/lib/data";


export const registerUser = async (name: string, phone: string, email: string, password: string) => {
  try {
    const user = await createUser({ name, phone, email, password });
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}