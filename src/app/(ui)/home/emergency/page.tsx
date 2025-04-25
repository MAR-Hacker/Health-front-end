"use client"
import { useState } from 'react';
import { Ambulance, MapPin, Phone, Clock } from 'lucide-react';

export default function EmergencyPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setPhone('');
        setAddress('');
        setDescription('');
      }, 3000);
    }, 1500);
  };
  
  return (
    <div>
      <h1 className="text-3xl text-black font-bold mb-6">Emergency Ambulance Service</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-start mb-4">
            <div className="bg-red-100 p-2 rounded mr-3">
              <Ambulance className="text-red-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-black">Fast Response</h3>
              <p className="text-gray-600">Medical help within minutes of your request</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-start mb-4">
            <div className="bg-blue-100 p-2 rounded mr-3">
              <MapPin className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-black">GPS Tracking</h3>
              <p className="text-gray-600">Real-time tracking of your ambulance</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-start mb-4">
            <div className="bg-green-100 p-2 rounded mr-3">
              <Phone className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-black">24/7 Support</h3>
              <p className="text-gray-600">Emergency medical assistance available anytime</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-black">Request Emergency Ambulance</h2>
        
        {isSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p className="font-medium">Emergency request submitted successfully!</p>
            <p>An ambulance has been dispatched to your location. Please stay on the line.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="address">Current Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Or allow location access for precise GPS coordinates
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Emergency Description (optional)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded flex items-center
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isSubmitting ? (
                  <>
                    <Clock className="animate-spin mr-2" size={20} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Ambulance className="mr-2" size={20} />
                    Request Ambulance Now
                  </>
                )}
              </button>
              
              <a href="tel:911" className="text-blue-600 hover:text-blue-800 font-medium">
                Or Call Emergency: 911
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}