import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Visit Masters Barbershop
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Located in Royal Plaza, Royal Palm Beach. Stop by for a walk-in or call ahead to book your appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-barber-gold/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-barber-gold" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-1">Address</h3>
                  <p className="text-gray-400">260 Royal Palm Beach Blvd</p>
                  <p className="text-gray-400">Royal Palm Beach, FL 33411</p>
                  <p className="text-gray-500 text-sm mt-1">Located in: Royal Plaza</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-barber-gold/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-barber-gold" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-1">Phone</h3>
                  <p className="text-gray-400">(561) 798-2622</p>
                  <p className="text-gray-500 text-sm mt-1">Call or text to book</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-barber-gold/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-barber-gold" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-1">Email</h3>
                  <p className="text-gray-400">eliobarber@yahoo.com</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-barber-gold/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-barber-gold" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">Hours</h3>
                  <div className="space-y-1 text-gray-400">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="card flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-barber-gold mx-auto mb-4" />
              <p className="text-gray-400">
                Masters Barbershop
              </p>
              <p className="text-gray-500 text-sm mt-2">
                260 Royal Palm Beach Blvd, Royal Palm Beach, FL 33411
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
