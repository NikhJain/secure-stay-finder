import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoomCard, type Room } from "./RoomCard";
import { BookingModal, type BookingData } from "./BookingModal";
import { Search, LogOut, Calendar, MapPin, Filter } from "lucide-react";
import roomStandardImage from "@/assets/room-standard.jpg";
import roomSuiteImage from "@/assets/room-suite.jpg";
import roomExecutiveImage from "@/assets/room-executive.jpg";

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

// Mock data for rooms
const mockRooms: Room[] = [
  {
    id: "1",
    name: "Comfort Room 101",
    type: "Standard",
    image: roomStandardImage,
    capacity: 2,
    price: 85,
    amenities: ["WiFi", "TV", "Private Bath", "Coffee"],
    available: true,
    description: "Comfortable standard room with modern amenities and city view."
  },
  {
    id: "2", 
    name: "Executive Suite 201",
    type: "Executive",
    image: roomExecutiveImage,
    capacity: 3,
    price: 150,
    amenities: ["WiFi", "TV", "Private Bath", "Coffee", "Parking"],
    available: true,
    description: "Spacious executive suite with separate work area and premium amenities."
  },
  {
    id: "3",
    name: "Luxury Suite 301",
    type: "Suite",
    image: roomSuiteImage,
    capacity: 4,
    price: 200,
    amenities: ["WiFi", "TV", "Private Bath", "Coffee", "Parking"],
    available: false,
    description: "Premium suite with kitchenette, living area, and panoramic views."
  },
  {
    id: "4",
    name: "Comfort Room 102",
    type: "Standard",
    image: roomStandardImage,
    capacity: 2,
    price: 85,
    amenities: ["WiFi", "TV", "Private Bath"],
    available: true,
    description: "Well-appointed standard room perfect for short stays."
  },
  {
    id: "5",
    name: "Executive Suite 202",
    type: "Executive", 
    image: roomExecutiveImage,
    capacity: 3,
    price: 150,
    amenities: ["WiFi", "TV", "Private Bath", "Coffee", "Parking"],
    available: true,
    description: "Professional-grade suite ideal for extended business visits."
  },
  {
    id: "6",
    name: "Luxury Suite 302",
    type: "Suite",
    image: roomSuiteImage,
    capacity: 4,
    price: 200,
    amenities: ["WiFi", "TV", "Private Bath", "Coffee", "Parking"],
    available: true,
    description: "Top-tier accommodation with full amenities and exceptional comfort."
  }
];

// Mock booking data
const mockBookings: (BookingData & { id: string; status: string })[] = [
  {
    id: "b1",
    room: mockRooms[1],
    checkIn: new Date("2024-08-15"),
    checkOut: new Date("2024-08-18"),
    guests: 2,
    specialRequests: "Late check-in requested",
    guestName: "John Smith",
    guestPhone: "+1-555-0123",
    employeeId: "EMP001",
    status: "Confirmed"
  },
  {
    id: "b2", 
    room: mockRooms[0],
    checkIn: new Date("2024-07-20"),
    checkOut: new Date("2024-07-22"),
    guests: 1,
    specialRequests: "",
    guestName: "Sarah Johnson",
    guestPhone: "+1-555-0456",
    employeeId: "EMP002",
    status: "Completed"
  }
];

export function Dashboard({ userEmail, onLogout }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookings, setBookings] = useState(mockBookings);
  const [roomFilter, setRoomFilter] = useState<"All" | "Standard" | "Executive" | "Suite">("All");
  const [availabilityFilter, setAvailabilityFilter] = useState<"All" | "Available" | "Occupied">("All");

  const filteredRooms = mockRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoomType = roomFilter === "All" || room.type === roomFilter;
    const matchesAvailability = availabilityFilter === "All" || 
                               (availabilityFilter === "Available" && room.available) ||
                               (availabilityFilter === "Occupied" && !room.available);
    
    return matchesSearch && matchesRoomType && matchesAvailability;
  });

  const handleBooking = (booking: BookingData) => {
    const newBooking = {
      ...booking,
      id: `b${Date.now()}`,
      status: "Confirmed"
    };
    setBookings([newBooking, ...bookings]);
    setSelectedRoom(null);
  };

  const availableRooms = mockRooms.filter(room => room.available).length;
  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter(b => b.checkIn > new Date()).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Facility Accommodations</h1>
                <p className="text-sm text-muted-foreground">Secure Guest Booking</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{userEmail}</p>
                <p className="text-xs text-muted-foreground">Guest Account</p>
              </div>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="rooms" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rooms">Available Rooms</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="rooms" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-2xl font-bold text-primary">{availableRooms}</p>
                    <p className="text-muted-foreground">Available Rooms</p>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-success" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-2xl font-bold text-primary">${mockRooms.filter(r => r.available).reduce((acc, r) => Math.min(acc, r.price), Infinity)}</p>
                    <p className="text-muted-foreground">Starting From</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-2xl font-bold text-primary">24/7</p>
                    <p className="text-muted-foreground">Security Support</p>
                  </div>
                  <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                    <LogOut className="w-6 h-6 text-warning" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search rooms..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <select
                      value={roomFilter}
                      onChange={(e) => setRoomFilter(e.target.value as any)}
                      className="px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="All">All Types</option>
                      <option value="Standard">Standard</option>
                      <option value="Executive">Executive</option>
                      <option value="Suite">Suite</option>
                    </select>
                    
                    <select
                      value={availabilityFilter}
                      onChange={(e) => setAvailabilityFilter(e.target.value as any)}
                      className="px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="All">All Status</option>
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Room Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onBook={(room) => setSelectedRoom(room)}
                />
              ))}
            </div>

            {filteredRooms.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No rooms found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            {/* Booking Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{totalBookings}</p>
                    <p className="text-muted-foreground">Total Bookings</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">{upcomingBookings}</p>
                    <p className="text-muted-foreground">Upcoming</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-muted-foreground">{totalBookings - upcomingBookings}</p>
                    <p className="text-muted-foreground">Completed</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <img 
                          src={booking.room.image} 
                          alt={booking.room.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{booking.room.name}</h3>
                          <p className="text-sm text-muted-foreground">{booking.room.type} Room</p>
                          <p className="text-sm">
                            {booking.checkIn.toLocaleDateString()} - {booking.checkOut.toLocaleDateString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Badge 
                          variant={booking.status === "Confirmed" ? "default" : "secondary"}
                        >
                          {booking.status}
                        </Badge>
                        <div className="text-right">
                          <p className="font-semibold">${(booking.checkOut.getTime() - booking.checkIn.getTime()) / (1000 * 60 * 60 * 24) * booking.room.price}</p>
                          <p className="text-sm text-muted-foreground">Total</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {bookings.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                    <p className="text-muted-foreground">Start by browsing available rooms to make your first booking.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Modal */}
      {selectedRoom && (
        <BookingModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onConfirm={handleBooking}
        />
      )}
    </div>
  );
}