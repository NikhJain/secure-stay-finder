import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/airforce-base-sketch.jpg";

interface HeroProps {
  onLoginClick: () => void;
}

export function Hero({ onLoginClick }: HeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Secure Facility
          <span className="block text-primary-glow">Accommodations</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Comfortable guest accommodations for family and friends of facility employees. 
          Book your stay with confidence in our secure environment.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="premium"
            onClick={onLoginClick}
            className="text-lg px-8 py-6"
          >
            Guest Login
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Learn More
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center">
            <div className="text-3xl font-bold text-primary-glow mb-2">24/7</div>
            <div className="text-gray-200">Security & Support</div>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center">
            <div className="text-3xl font-bold text-primary-glow mb-2">100%</div>
            <div className="text-gray-200">Secure Environment</div>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center">
            <div className="text-3xl font-bold text-primary-glow mb-2">50+</div>
            <div className="text-gray-200">Guest Rooms Available</div>
          </Card>
        </div>
      </div>
    </div>
  );
}