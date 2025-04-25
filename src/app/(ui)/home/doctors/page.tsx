"use client"
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  availability: string;
  image: string;
};

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  
  // Mock data
  useEffect(() => {
    const mockDoctors: Doctor[] = [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        rating: 4.8,
        availability: "Mon, Wed, Fri",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Neurologist",
        rating: 4.9,
        availability: "Tue, Thu, Sat",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: 3,
        name: "Dr. Emma Wilson",
        specialty: "Pediatrician",
        rating: 4.7,
        availability: "Mon, Tue, Thu",
        image: "https://randomuser.me/api/portraits/women/67.jpg"
      },
      {
        id: 4,
        name: "Dr. James Rodriguez",
        specialty: "Orthopedic",
        rating: 4.6,
        availability: "Wed, Fri, Sat",
        image: "https://randomuser.me/api/portraits/men/78.jpg"
      }
    ];
    setDoctors(mockDoctors);
  }, []);
  
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? doctor.specialty === selectedSpecialty : true;
    return matchesSearch && matchesSpecialty;
  });
  
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];

  return (
    <div>
      <h1 className="text-3xl text-black font-bold mb-8">Find Doctors</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute top-3 left-3 text-gray-800" size={20} />
          <input
            type="text"
            placeholder="Search doctors by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Specialties</option>
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h3 className="text-lg text-black font-medium">{doctor.name}</h3>
                  <p className="text-blue-600">{doctor.specialty}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="flex mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">{doctor.rating}</span>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-medium">Availability:</span> {doctor.availability}
              </p>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200">
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}