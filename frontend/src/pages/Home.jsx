import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Clock, MapPin, Star, ChevronRight } from 'lucide-react';
import { getServices, getEmployees, getGallery } from '../api/index.js';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, employeesRes, galleryRes] = await Promise.all([
          getServices(),
          getEmployees(),
          getGallery(),
        ]);
        setServices(servicesRes.data.slice(0, 4));
        setEmployees(employeesRes.data.slice(0, 3));
        setGallery(galleryRes.data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-barber-900" />
        <div className="absolute inset-0 bg-barber-800">
          <div className="w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-barber-gold/20 via-transparent to-transparent animate-float" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-down opacity-0" style={{ animationFillMode: 'forwards' }}>
            Masters Barbershop
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-up opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
            Established in 2005
          </p>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto animate-fade-in opacity-0 stagger-2" style={{ animationFillMode: 'forwards' }}>
            Masters Barbershop was established in 2005. Our goal is to provide quality services to our customers. 
            Walk in as you are, leave as a gentleman.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in opacity-0 stagger-3" style={{ animationFillMode: 'forwards' }}>
            <Link to="/services" className="btn-primary text-center animate-pulse-gold">
              View Services
            </Link>
            <Link to="/contact" className="btn-secondary text-center">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-gray-400">Quality grooming services since 2005</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={service._id} className="card group">
                <div className="flex items-center justify-between mb-4">
                  <Scissors className="w-8 h-8 text-barber-gold group-hover:scale-110 transition-transform" />
                  <span className="text-barber-gold font-bold text-xl group-hover:scale-110 transition-transform">${service.price}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-barber-gold transition-colors">{service.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration_minutes} min</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10 animate-scale-in opacity-0 stagger-1" style={{ animationFillMode: 'forwards' }}>
            <Link to="/services" className="btn-secondary inline-flex items-center gap-2 hover-glow">
              View All Services <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 px-4 bg-barber-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-400">Expert barbers with years of experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {employees.map((employee) => (
              <div key={employee._id} className="text-center group">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-barber-700 flex items-center justify-center overflow-hidden group-hover:ring-4 group-hover:ring-barber-gold/50 transition-all duration-300 group-hover:scale-105">
                  {employee.image_url ? (
                    <img src={employee.image_url} alt={employee.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <span className="text-4xl font-display text-barber-gold group-hover:scale-110 transition-transform">
                      {employee.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-barber-gold transition-colors">{employee.name}</h3>
                <p className="text-barber-gold">{employee.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Gallery
            </h2>
            <p className="text-gray-400">A glimpse into our shop and work</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((image, index) => (
              <div key={image._id} className="aspect-square overflow-hidden rounded-lg group cursor-pointer">
                <img 
                  src={image.url} 
                  alt={image.caption || 'Gallery image'} 
                  className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-barber-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-display text-white mb-8">
            Walk in as you are, leave as a gentleman
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://maps.google.com/?q=260+Royal+Palm+Beach+Blvd,+Royal+Palm+Beach,+FL+33411" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-gray-300 hover:text-barber-gold">
              <MapPin className="w-5 h-5 text-barber-gold" />
              <span>260 Royal Palm Beach Blvd, Royal Palm Beach, FL 33411</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
