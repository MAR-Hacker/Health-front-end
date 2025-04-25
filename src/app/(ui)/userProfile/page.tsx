"use client"
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Camera, Save } from 'lucide-react';

// Sample user data - would typically come from an API or state management
const initialUserData = {
  userId: "user_2xRvMnL9M7kH8a3K1",
  name: "John Doe",
  age: 32,
  gender: "Male",
  imageUrl: "https://randomuser.me/api/portraits/men/44.jpg", // Placeholder image
  phoneNumber: "+1234567890",
  email: "john.doe@example.com",
  location: "New York, NY"
};

export default function UserProfilePage() {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialUserData);
  
  // Mock medical history data
  const medicalHistory = [
    { 
      id: "visit-123", 
      date: "2025-03-15", 
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      diagnosis: "Mild hypertension",
      treatment: "Prescribed lisinopril 10mg"
    },
    { 
      id: "visit-124", 
      date: "2025-02-03", 
      doctorName: "Dr. Michael Chen",
      specialty: "Neurologist",
      diagnosis: "Tension headaches",
      treatment: "Recommended stress management techniques and OTC pain relievers"
    }
  ];

  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUserData(editedData);
    }
    setIsEditing(!isEditing);
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value
    });
  };

  // Format date string to readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header with Avatar */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-40 relative">
          {isEditing && (
            <button className="absolute right-4 top-4 bg-white p-2 rounded-full shadow-md">
              <Camera size={20} className="text-blue-600" />
            </button>
          )}
        </div>
        
        <div className="relative px-6 pt-16 pb-6">
          <div className="absolute -top-16 left-6">
            <div className="relative">
              <img 
                src={userData.imageUrl} 
                alt={userData.name} 
                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full shadow-md">
                  <Camera size={16} className="text-white" />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedData.name}
                  onChange={handleChange}
                  className="text-2xl font-bold text-black mb-1 border-b-2 border-blue-500 focus:outline-none px-1"
                />
              ) : (
                <h1 className="text-2xl font-bold text-black mb-1">{userData.name}</h1>
              )}
              <p className="text-gray-500 flex items-center gap-1">
                <User size={16} />
                {isEditing ? (
                  <select 
                    name="gender"
                    value={editedData.gender}
                    onChange={(e) => setEditedData({...editedData, gender: e.target.value})}
                    className="border-b border-blue-500 focus:outline-none px-1"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  userData.gender
                )}
                <span className="mx-2">•</span>
                <Calendar size={16} className="mr-1" />
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    value={editedData.age}
                    onChange={handleChange}
                    className="w-12 border-b border-blue-500 focus:outline-none px-1"
                  />
                ) : (
                  `${userData.age} years`
                )}
              </p>
            </div>
            
            <button 
              onClick={handleEditToggle}
              className={`
                px-4 py-2 rounded-md flex items-center gap-2
                ${isEditing 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'}
              `}
            >
              {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
          
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
            <div className="flex items-center gap-3">
              <Mail className="text-gray-500" size={18} />
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedData.email}
                  onChange={handleChange}
                  className="flex-1 border-b border-blue-500 focus:outline-none px-1"
                />
              ) : (
                <span className="text-black">{userData.email}</span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Phone className="text-gray-500" size={18} />
              {isEditing ? (
                <input
                  type="tel"
                  name="phoneNumber"
                  value={editedData.phoneNumber}
                  onChange={handleChange}
                  className="flex-1 border-b border-blue-500 focus:outline-none px-1"
                />
              ) : (
                <span className="text-black">{userData.phoneNumber}</span>
              )}
            </div>
            
            <div className="flex items-center gap-3 md:col-span-2">
              <MapPin className="text-gray-500" size={18} />
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={editedData.location}
                  onChange={handleChange}
                  className="flex-1 border-b border-blue-500 focus:outline-none px-1"
                />
              ) : (
                <span className="text-black">{userData.location}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Medical History Section */}
      <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-black">Medical History</h2>
        </div>
        
        {medicalHistory.length > 0 ? (
          <div className="divide-y">
            {medicalHistory.map(visit => (
              <div key={visit.id} className="px-6 py-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-blue-600">Visit to {visit.doctorName}</h3>
                  <span className="text-sm text-gray-500">{formatDate(visit.date)}</span>
                </div>
                <p className="text-sm text-gray-700 mb-1"><span className="font-medium">Specialty:</span> {visit.specialty}</p>
                <p className="text-sm text-gray-700 mb-1"><span className="font-medium">Diagnosis:</span> {visit.diagnosis}</p>
                <p className="text-sm text-gray-700"><span className="font-medium">Treatment:</span> {visit.treatment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-8 text-center text-gray-500">
            No medical history available.
          </div>
        )}
      </div>
      
      {/* Upcoming Appointments Section */}
      <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-black">Upcoming Appointments</h2>
        </div>
        
        <div className="px-6 py-6">
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Dr. Sarah Johnson" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-medium text-black">Dr. Sarah Johnson</h3>
                  <p className="text-sm text-blue-600">Cardiologist</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-black">April 28, 2025</p>
                <p className="text-sm text-gray-500">10:00 AM</p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="mr-2 px-4 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 text-gray-700">
                Reschedule
              </button>
              <button className="px-4 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                Join Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}