import React from 'react';
import DoctorCard from './doctor-card';

const doctorsData = [
  {
    id: '1',
    name: 'Dr. John Doe',
    specialty: 'Cardiology',
    experience: '10 years',
    rating: 4.5,
    imageUrl: '/images/doctors/doctor1.jpg',
  },
  {
    id: '2',
    name: 'Dr. Jane Smith',
    specialty: 'Dermatology',
    experience: '8 years',
    rating: 4.7,
    imageUrl: '/images/doctors/doctor2.jpg',
  },
  {
    id: '3',
    name: 'Dr. Emily Johnson',
    specialty: 'Pediatrics',
    experience: '5 years',
    rating: 4.9,
    imageUrl: '/images/doctors/doctor3.jpg',
  },
  {
    id: '4',
    name: 'Dr. Michael Brown',
    specialty: 'Orthopedics',
    experience: '12 years',
    rating: 4.6,
    imageUrl: '/images/doctors/doctor4.jpg',
  },
];

const DoctorList = () => {
  return (
    <div>
      <h2>Doctor Profiles</h2>
      <div className="doctor-list">
        {doctorsData.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;