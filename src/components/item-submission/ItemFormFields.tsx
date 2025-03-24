
import { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Clock } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  time: string;
  contactInfo: string;
}

interface ItemFormFieldsProps {
  formData: FormData;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (id: string, value: string) => void;
  categories: string[];
  locations: string[];
}

export const ItemFormFields = ({
  formData,
  onInputChange,
  onSelectChange,
  categories,
  locations
}: ItemFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Item Name</Label>
          <Input 
            id="title" 
            placeholder="e.g., Black Wallet" 
            required 
            value={formData.title}
            onChange={onInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            required
            value={formData.category}
            onValueChange={(value) => onSelectChange('category', value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select 
            required
            value={formData.location}
            onValueChange={(value) => onSelectChange('location', value)}
          >
            <SelectTrigger id="location">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <div className="relative">
            <Input
              id="date"
              type="date"
              required
              className="pl-10"
              value={formData.date}
              onChange={onInputChange}
            />
            <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">Approximate Time</Label>
          <div className="relative">
            <Input
              id="time"
              type="time"
              required
              className="pl-10"
              value={formData.time}
              onChange={onInputChange}
            />
            <Clock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactInfo">Contact Information</Label>
          <Input 
            id="contactInfo" 
            placeholder="Phone number or email" 
            required 
            value={formData.contactInfo}
            onChange={onInputChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Provide details about the item..."
          className="min-h-32"
          required
          value={formData.description}
          onChange={onInputChange}
        />
      </div>
    </>
  );
};
