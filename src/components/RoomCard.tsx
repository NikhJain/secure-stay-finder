import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Wifi, Car, Coffee, Tv, Bath } from "lucide-react";

export interface Room {
  id: string;
  name: string;
  type: "Standard" | "Executive" | "Suite";
  image: string;
  capacity: number;
  price: number;
  amenities: string[];
  available: boolean;
  description: string;
}

interface RoomCardProps {
  room: Room;
  onBook: (room: Room) => void;
}

const amenityIcons: Record<string, React.ReactNode> = {
  "WiFi": <Wifi className="w-4 h-4" />,
  "Parking": <Car className="w-4 h-4" />,
  "Coffee": <Coffee className="w-4 h-4" />,
  "TV": <Tv className="w-4 h-4" />,
  "Private Bath": <Bath className="w-4 h-4" />,
};

export function RoomCard({ room, onBook }: RoomCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img 
          src={room.image} 
          alt={room.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge 
            variant={room.available ? "default" : "destructive"}
            className="shadow-md"
          >
            {room.available ? "Available" : "Occupied"}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="shadow-md">
            {room.type}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{room.name}</span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">{room.capacity}</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{room.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {room.amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md">
              {amenityIcons[amenity]}
              <span>{amenity}</span>
            </div>
          ))}
        </div>
        
        <div className="text-2xl font-bold text-primary">
          ${room.price}
          <span className="text-sm font-normal text-muted-foreground">/night</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onBook(room)}
          disabled={!room.available}
          variant={room.available ? "default" : "secondary"}
        >
          {room.available ? "Book Now" : "Not Available"}
        </Button>
      </CardFooter>
    </Card>
  );
}