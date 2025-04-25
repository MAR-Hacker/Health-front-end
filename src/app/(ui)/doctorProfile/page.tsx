"use client"
import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Camera, Save, Clock, Star, Award, Briefcase, Video } from 'lucide-react';

// Sample doctor data - would typically come from an API or state management
const initialDoctorData = {
  userId: "clerk-user-id-123",
  name: "Dr. John Smith",
  specialization: "Cardiologist",
  experience: 5,
  location: "New York",
  phoneNumber: "‪+1-234-567-8901‬",
  email: "doctor@example.com",
  imageUrl: "https://randomuser.me/api/portraits/men/32.jpg", // Placeholder image
  about: "Board-certified cardiologist with 5+ years of experience specializing in preventative cardiology and heart disease management. Committed to providing compassionate and evidence-based care to all patients.",
  education: [
    { degree: "MD", institution: "Harvard Medical School", year: "2015" },
    { degree: "Residency in Internal Medicine", institution: "Massachusetts General Hospital", year: "2018" },
    { degree: "Fellowship in Cardiology", institution: "Cleveland Clinic", year: "2020" }
  ],
  languages: ["English", "Spanish"],
  rating: 4.8,
  reviewCount: 124
};

export default function DoctorProfilePage() {
  const [doctorData, setDoctorData] = useState(initialDoctorData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialDoctorData);
  const [activeTab, setActiveTab] = useState('about');
  
  // Mock schedule data
  const scheduleData = {
    monday: [{start: "09:00", end: "12:00"}, {start: "14:00", end: "17:00"}],
    tuesday: [{start: "09:00", end: "12:00"}, {start: "14:00", end: "17:00"}],
    wednesday: [{start: "09:00", end: "12:00"}, {start: "14:00", end: "17:00"}],
    thursday: [{start: "09:00", end: "12:00"}, {start: "14:00", end: "17:00"}],
    friday: [{start: "09:00", end: "12:00"}],
    saturday: [],
    sunday: []
  };

  // Mock appointments
  const appointments = [
    { 
      id: "apt-123", 
      patientName: "Sarah Johnson", 
      date: "2025-04-28", 
      time: "10:00 AM",
      status: "confirmed",
      issue: "Follow-up on recent EKG results"
    },
    { 
      id: "apt-124", 
      patientName: "Michael Brown", 
      date: "2025-04-28", 
      time: "11:30 AM",
      status: "confirmed",
      issue: "Chest pain and shortness of breath"
    },
    { 
      id: "apt-125", 
      patientName: "Emily Davis", 
      date: "2025-04-29", 
      time: "09:15 AM",
      status: "pending",
      issue: "Annual heart check-up"
    }
  ];

  // Handle edit mode toggle
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setDoctorData(editedData);
    }
    setIsEditing(!isEditing);
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-32 relative">
              {isEditing && (
                <button className="absolute right-4 top-4 bg-white p-2 rounded-full shadow-md">
                  <Camera size={20} className="text-blue-600" />
                </button>
              )}
            </div>
            
            <div className="relative px-6 pt-16 pb-6">
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <img 
                    src={doctorData.imageUrl} 
                    alt={doctorData.name} 
                    className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full shadow-md">
                      <Camera size={16} className="text-white" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="text-center">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleChange}
                    className="text-xl font-bold text-black text-center mb-1 border-b-2 border-blue-500 focus:outline-none"
                  />
                ) : (
                  <h1 className="text-xl font-bold text-black mb-1">{doctorData.name}</h1>
                )}
                
                {isEditing ? (
                  <input
                    type="text"
                    name="specialization"
                    value={editedData.specialization}
                    onChange={handleChange}
                    className="text-blue-600 font-medium text-center mb-3 border-b border-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-blue-600 font-medium mb-3">{doctorData.specialization}</p>
                )}
                
                <div className="flex items-center justify-center mb-4">
                  <Star size={18} className="text-yellow-400 mr-1" fill="#facc15" />
                  <span className="font-medium text-black">{doctorData.rating}</span>
                  <span className="text-gray-500 ml-1">({doctorData.reviewCount} reviews)</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Award className="text-gray-500" size={18} />
                    <div className="text-left">
                      <p className="text-xs text-gray-500">Experience</p>
                      {isEditing ? (
                        <input
                          type="number"
                          name="experience"
                          value={editedData.experience}
                          onChange={handleChange}
                          className="font-medium text-black border-b border-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="font-medium text-black">{doctorData.experience} years</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="text-gray-500" size={18} />
                    <div className="text-left">
                      <p className="text-xs text-gray-500">Location</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          value={editedData.location}
                          onChange={handleChange}
                          className="font-medium text-black border-b border-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="font-medium text-black">{doctorData.location}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="text-gray-500" size={18} />
                    <div className="text-left">
                      <p className="text-xs text-gray-500">Email</p>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={editedData.email}
                          onChange={handleChange}
                          className="font-medium text-black border-b border-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="font-medium text-black">{doctorData.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="text-gray-500" size={18} />
                    <div className="text-left">
                      <p className="text-xs text-gray-500">Phone</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={editedData.phoneNumber}
                          onChange={handleChange}
                          className="font-medium text-black border-b border-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="font-medium text-black">{doctorData.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleEditToggle}
                  className={`
                    mt-6 px-4 py-2 rounded-md w-full flex items-center justify-center gap-2
                    ${isEditing 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'}
                  `}
                >
                  {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs Navigation */}
          <div className="bg-white rounded-xl shadow-md mb-6">
            <div className="flex border-b overflow-x-auto">
              <button 
                className={`py-4 px-6 font-medium ${activeTab === 'about' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
              <button 
                className={`py-4 px-6 font-medium ${activeTab === 'schedule' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('schedule')}
              >
                Schedule
              </button>
              <button 
                className={`py-4 px-6 font-medium ${activeTab === 'appointments' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('appointments')}
              >
                Appointments
              </button>
            </div>
            
            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-black mb-3">About Me</h2>
                  {isEditing ? (
                    <textarea
                      name="about"
                      value={editedData.about}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                  ) : (
                    <p className="text-gray-700">{doctorData.about}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-black mb-3">Education</h2>
                  <div className="space-y-3">
                    {doctorData.education.map((edu, index) => (
                      <div key={index} className="flex">
                        <div className="w-12 flex-shrink-0">
                          <div className="w-4 h-4 rounded-full bg-blue-600 mt-1 mx-auto"></div>
                          {index < doctorData.education.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-200 mx-auto"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-black">{edu.degree}</h3>
                          <p className="text-gray-600">{edu.institution} • {edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold text-black mb-3">Languages</h2>
                  <div className="flex flex-wrap gap-2">
                    {doctorData.languages.map((lang, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-black mb-4">Weekly Schedule</h2>
                
                <div className="space-y-4">
                  {Object.entries(scheduleData).map(([day, slots]) => (
                    <div key={day} className="flex border-b pb-3">
                      <div className="w-1/3 font-medium capitalize text-black">{day}</div>
                      <div className="w-2/3">
                        {slots.length > 0 ? (
                          slots.map((slot, index) => (
                            <div key={index} className="flex items-center mb-2">
                              <Clock size={16} className="text-blue-600 mr-2" />
                              <span>{slot.start} - {slot.end}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-500">Not Available</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-black mb-4">Upcoming Appointments</h2>
                
                <div className="space-y-4">
                  {appointments.map(appointment => (
                    <div key={appointment.id} className="bg-white border rounded-lg shadow-sm p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-black">{appointment.patientName}</h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(appointment.date)} • {appointment.time}
                          </p>
                        </div>
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-medium uppercase
                          ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                        `}>
                          {appointment.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-4">
                        <span className="font-medium">Reason for visit:</span> {appointment.issue}
                      </p>
                      
                      <div className="flex justify-end gap-2">
                        {appointment.status === 'pending' && (
                          <>
                            <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm">
                              Decline
                            </button>
                            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                              Accept
                            </button>
                          </>
                        )}
                        
                        {appointment.status === 'confirmed' && (
                          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm flex items-center gap-1">
                            <Video size={14} />
                            Start Call
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}