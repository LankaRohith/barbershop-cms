import { useState, useEffect } from 'react';
import { getGallery, getEmployees } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [galleryRes, employeesRes] = await Promise.all([
          getGallery(),
          getEmployees(),
        ]);
        setImages(galleryRes.data);
        setEmployees(employeesRes.data);
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
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Our Work
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse our portfolio of haircuts, beard designs, and the atmosphere of our shop.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div 
              key={image._id} 
              className="group relative aspect-square overflow-hidden rounded-lg bg-barber-800"
            >
              <img 
                src={image.url} 
                alt={image.caption || 'Gallery image'} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              {image.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {employees.map((employee) => (
              <div key={employee._id} className="card text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-barber-700 flex items-center justify-center overflow-hidden">
                  {employee.image_url ? (
                    <img 
                      src={employee.image_url} 
                      alt={employee.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-display text-barber-gold">
                      {employee.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-xl font-bold text-white">{employee.name}</h3>
                <p className="text-barber-gold mb-2">{employee.role}</p>
                {employee.bio && (
                  <p className="text-gray-400 text-sm">{employee.bio}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
