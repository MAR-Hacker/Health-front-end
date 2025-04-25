import React from 'react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  imageUrl: string;
}

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <img src={doctor.imageUrl} alt={doctor.name} className="doctor-image" />
      <h3 className="doctor-name">{doctor.name}</h3>
      <p className="doctor-specialty">{doctor.specialty}</p>
      <p className="doctor-rating">Rating: {doctor.rating} / 5</p>
    </div>
  );
};

export default DoctorCard;