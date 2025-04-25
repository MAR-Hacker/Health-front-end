"use client"
import { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Phone } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

// Define the response type from your API
interface ApiAppointment {
  _id: string;
  userId: string;
  doctorId: {
    _id: string;
    name: string;
    specialization: string;
    imageUrl: string;
  };
  date: string;
  time: string;
  status: string;
  meetingType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define our local appointment type
type Appointment = {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  date: string;
  time: string;
  type: 'video' | 'inPerson' | 'phone';
  status: 'upcoming' | 'completed' | 'cancelled';
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { userId } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Use the userId from Clerk auth, or fallback to hardcoded ID for testing
        const id = userId || 'user_2wE5LzManinuLsPI5nOivpfTxda';
        const response = await axios.get(
          `https://health-backend-m8l5.onrender.com/users/get-user-appointment/${id}`
        );
        
        // Transform API data to our local format
        const transformedAppointments: Appointment[] = response.data.map((apt: ApiAppointment) => ({
          id: apt._id,
          doctorName: apt.doctorId.name,
          doctorSpecialty: apt.doctorId.specialization,
          doctorImage: apt.doctorId.imageUrl || "https://randomuser.me/api/portraits/men/32.jpg", // Fallback image
          date: apt.date,
          time: apt.time,
          type: (apt.meetingType as 'video' | 'inPerson' | 'phone') || 'video',
          // Map status to our local status format
          status: apt.status === 'pending' ? 'upcoming' : 
                 apt.status === 'cancelled' ? 'cancelled' : 'completed'
        }));
        
        setAppointments(transformedAppointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments. Please try again later.");
        
        // Fallback to mock data for development/demo purposes
        const mockAppointments: Appointment[] = [
          {
            id: "1",
            doctorName: "Dr. Sarah Johnson",
            doctorSpecialty: "Cardiologist",
            doctorImage: "https://randomuser.me/api/portraits/women/44.jpg",
            date: "2025-05-04",
            time: "10:00 AM",
            type: 'video',
            status: 'upcoming'
          },
          {
            id: "2",
            doctorName: "Dr. Michael Chen",
            doctorSpecialty: "Neurologist",
            doctorImage: "https://randomuser.me/api/portraits/men/32.jpg",
            date: "2025-05-06",
            time: "3:30 PM",
            type: 'phone',
            status: 'upcoming'
          },
          {
            id: "3",
            doctorName: "Dr. Emma Wilson",
            doctorSpecialty: "Pediatrician",
            doctorImage: "https://randomuser.me/api/portraits/women/67.jpg",
            date: "2025-04-20",
            time: "1:15 PM",
            type: 'video',
            status: 'completed'
          }
        ];
        setAppointments(mockAppointments);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]);
  
  const upcomingAppointments = appointments.filter(app => app.status === 'upcoming');
  const pastAppointments = appointments.filter(app => ['completed', 'cancelled'].includes(app.status));
  
  const displayedAppointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;
  
  const formatDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch (err) {
      return dateStr; // If date parsing fails, return original string
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-black font-bold mb-8">Your Appointments</h1>
      
      <div className="flex border-b mb-6">
        <button 
          className={`py-2 px-4 mr-4 font-medium ${activeTab === 'upcoming' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={`py-2 px-4 mr-4 font-medium ${activeTab === 'past' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <p>{error}</p>
        </div>
      ) : displayedAppointments.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-lg">No {activeTab} appointments found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedAppointments.map(appointment => (
            <div key={appointment.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <img 
                    src={appointment.doctorImage} 
                    alt={appointment.doctorName} 
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://randomuser.me/api/portraits/men/32.jpg";
                    }}
                  />
                  <div>
                    <h3 className="text-lg text-black font-medium">{appointment.doctorName}</h3>
                    <p className="text-blue-600">{appointment.doctorSpecialty}</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:items-end">
                  <div className="flex items-center mb-2">
                    <Calendar size={18} className="mr-2 text-gray-500" />
                    <span className='text-black'>{formatDate(appointment.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={18} className="mr-2 text-gray-500" />
                    <span className='text-black'>{appointment.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t flex items-center justify-between">
                <div className="flex items-center">
                  {appointment.type === 'video' ? (
                    <Video size={18} className="mr-2 text-green-600" />
                  ) : (
                    <Phone size={18} className="mr-2 text-blue-600" />
                  )}
                  <span className="capitalize text-black">{appointment.type} consultation</span>
                </div>
                
                {appointment.status === 'upcoming' && (
                  <div className="flex gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm">
                      Join Call
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded text-sm">
                      Reschedule
                    </button>
                  </div>
                )}
                
                {appointment.status === 'completed' && (
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    Completed
                  </span>
                )}
                
                {appointment.status === 'cancelled' && (
                  <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                    Cancelled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}