import { useState, useEffect } from 'react';
import { Clock, Scissors } from 'lucide-react';
import { getServices } from '../api/index.js';
import LoadingSpinner from '../components/LoadingSpinner';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
      } catch (error) {
        console.error('Failed to fetch services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From classic cuts to modern styles, we offer a full range of grooming services 
            tailored to your needs. All services include a complimentary hot towel treatment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={service._id} 
              className="card group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-barber-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Scissors className="w-6 h-6 text-barber-gold group-hover:rotate-12 transition-transform" />
                </div>
                <span className="text-barber-gold font-bold text-2xl group-hover:scale-110 transition-transform">${service.price}</span>
              </div>
              
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {service.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {service.description}
              </p>
              
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration_minutes} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <h4 className="font-display text-lg font-bold text-white mb-2">Walk-ins Welcome</h4>
            <p className="text-gray-400 text-sm">No appointment necessary, but appointments are preferred for guaranteed service.</p>
          </div>
          <div className="card text-center">
            <h4 className="font-display text-lg font-bold text-white mb-2">Complimentary Services</h4>
            <p className="text-gray-400 text-sm">Every cut includes hot towel treatment, neck shave, and styling.</p>
          </div>
          <div className="card text-center">
            <h4 className="font-display text-lg font-bold text-white mb-2">Satisfaction Guaranteed</h4>
            <p className="text-gray-400 text-sm">Not happy with your cut? We'll fix it free of charge within 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
