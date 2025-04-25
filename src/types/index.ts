export type User = {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'doctor';
  };
  
  export type Doctor = {
    id: string;
    name: string;
    specialty: string;
    experience: number; // in years
    rating: number; // out of 5
  };
  
  export type Appointment = {
    id: string;
    userId: string;
    doctorId: string;
    date: string; // ISO date string
    time: string; // time in HH:mm format
    status: 'scheduled' | 'completed' | 'canceled';
  };
  
  export type ChatMessage = {
    id: string;
    sender: 'user' | 'ai';
    message: string;
    timestamp: string; // ISO date string
  };