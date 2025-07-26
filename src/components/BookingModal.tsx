import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import type { Room } from "./RoomCard";

interface BookingModalProps {
  room: Room;
  onClose: () => void;
  onConfirm: (booking: BookingData) => void;
}

export interface BookingData {
  room: Room;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  specialRequests: string;
  guestName: string;
  guestPhone: string;
  employeeId: string;
}

export function BookingModal({ room, onClose, onConfirm }: BookingModalProps) {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = checkOut.getTime() - checkIn.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    return calculateNights() * room.price;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut) {
      toast({
        title: "Error",
        description: "Please select check-in and check-out dates.",
        variant: "destructive",
      });
      return;
    }
    
    if (checkIn >= checkOut) {
      toast({
        title: "Error", 
        description: "Check-out date must be after check-in date.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate booking process
    setTimeout(() => {
      const booking: BookingData = {
        room,
        checkIn,
        checkOut,
        guests,
        specialRequests,
        guestName,
        guestPhone,
        employeeId,
      };
      
      onConfirm(booking);
      setIsLoading(false);
      
      toast({
        title: "Booking Confirmed!",
        description: `Your reservation for ${room.name} has been confirmed.`,
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Book {room.name}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Guest Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Guest Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guest-name">Guest Name</Label>
                  <Input
                    id="guest-name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="guest-phone">Phone Number</Label>
                  <Input
                    id="guest-phone"
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employee-id">Sponsor Employee ID</Label>
                <Input
                  id="employee-id"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  placeholder="Employee ID of facility sponsor"
                  required
                />
              </div>
            </div>
            
            {/* Dates and Guests */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Booking Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Check-in Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !checkIn && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? format(checkIn, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label>Check-out Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !checkOut && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? format(checkOut, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(date) => date < (checkIn || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max={room.capacity}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="special-requests">Special Requests (Optional)</Label>
              <Textarea
                id="special-requests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special accommodations or requests..."
                rows={3}
              />
            </div>
            
            {/* Booking Summary */}
            {checkIn && checkOut && (
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">Booking Summary</h3>
                <div className="flex justify-between">
                  <span>{calculateNights()} nights × ${room.price}</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            )}
            
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Confirming..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}