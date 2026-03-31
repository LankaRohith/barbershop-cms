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
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-barber-900" />
        <div className="absolute inset-0 bg-barber-800">
          <div className="w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-barber-gold/20 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
            Masters Barbershop
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Established in 2005
          </p>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Masters Barbershop was established in 2005. Our goal is to provide quality services to our customers. 
            Walk in as you are, leave as a gentleman.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="btn-primary text-center">
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
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-gray-400">Quality grooming services since 2005</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service._id} className="card hover:border-barber-gold/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <Scissors className="w-8 h-8 text-barber-gold" />
                  <span className="text-barber-gold font-bold text-xl">${service.price}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{service.duration_minutes} min</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/services" className="btn-secondary inline-flex items-center gap-2">
              View All Services <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 px-4 bg-barber-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-400">Expert barbers with years of experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {employees.map((employee) => (
              <div key={employee._id} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-barber-700 flex items-center justify-center overflow-hidden">
                  {employee.image_url ? (
                    <img src={employee.image_url} alt={employee.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-display text-barber-gold">
                      {employee.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-xl font-bold text-white">{employee.name}</h3>
                <p className="text-barber-gold">{employee.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Gallery
            </h2>
            <p className="text-gray-400">A glimpse into our shop and work</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((image) => (
              <div key={image._id} className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={image.url} 
                  alt={image.caption || 'Gallery image'} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-barber-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            Ready for a Fresh Cut?
          </h2>
          <p className="text-gray-400 mb-8">
            Visit us today and experience the difference. Walk-ins welcome, appointments preferred.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <MapPin className="w-5 h-5 text-barber-gold" />
              <span>260 Royal Palm Beach Blvd, Royal Palm Beach, FL 33411</span>
            </div>
            <div className="hidden sm:block text-gray-600">|</div>
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <Star className="w-5 h-5 text-barber-gold" />
              <span>4.4 Rating (155 Reviews)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
