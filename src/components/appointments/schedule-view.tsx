import React from 'react';

const ScheduleView = () => {
  // Sample data for scheduled appointments
  const appointments = [
    { id: 1, date: '2023-10-01', time: '10:00 AM', doctor: 'Dr. Smith', status: 'Confirmed' },
    { id: 2, date: '2023-10-02', time: '11:00 AM', doctor: 'Dr. Johnson', status: 'Pending' },
    { id: 3, date: '2023-10-03', time: '09:00 AM', doctor: 'Dr. Lee', status: 'Cancelled' },
  ];

  return (
    <div>
      <h2>Scheduled Appointments</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            <strong>{appointment.date}</strong> at {appointment.time} with {appointment.doctor} - {appointment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleView;