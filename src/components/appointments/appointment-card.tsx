import React from 'react';

interface AppointmentCardProps {
  date: string;
  time: string;
  doctorName: string;
  appointmentType: string;
  onCancel: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ date, time, doctorName, appointmentType, onCancel }) => {
  return (
    <div className="appointment-card">
      <h3>{doctorName}</h3>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p>Type: {appointmentType}</p>
      <button onClick={onCancel}>Cancel Appointment</button>
    </div>
  );
};

export default AppointmentCard;