const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-barber-gold/30 border-t-barber-gold rounded-full animate-spin" />
    </div>
  </div>
);

export default LoadingSpinner;
