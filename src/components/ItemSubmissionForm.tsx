
import { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// Import our new components
import { StatusSelector } from './item-submission/StatusSelector';
import { ItemFormFields } from './item-submission/ItemFormFields';
import { ImageUploader } from './item-submission/ImageUploader';
import { uploadImageToSupabase } from '@/utils/imageUpload';
import { categories, locations } from '@/constants/formOptions';

const ItemSubmissionForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    time: '',
    contactInfo: '',
  });
  const [itemStatus, setItemStatus] = useState<'lost' | 'found'>('lost');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleStatusChange = (status: 'lost' | 'found') => {
    setItemStatus(status);
  };
  
  const handleImageChange = (file: File | null) => {
    setImageFile(file);
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'You must be logged in to submit an item.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Upload image if provided
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImageToSupabase(imageFile, user.id);
      }
      
      // Insert item into database
      const { error } = await supabase.from('items').insert([
        {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          location: formData.location,
          date: formData.date,
          time: formData.time,
          image_url: imageUrl,
          status: itemStatus,
          user_id: user.id,
          contact_info: formData.contactInfo
        }
      ]);
      
      if (error) throw error;
      
      toast({
        title: `Item ${itemStatus === 'lost' ? 'Lost' : 'Found'} Report Submitted`,
        description: "We've received your report. Thank you!",
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        date: '',
        time: '',
        contactInfo: '',
      });
      setPreviewImage(null);
      setImageFile(null);
      
    } catch (error: any) {
      console.error('Error submitting item:', error.message);
      toast({
        title: 'Error',
        description: 'Failed to submit your report. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="border-none shadow-soft">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Report an Item</CardTitle>
          <CardDescription>
            Fill out the form below to report a lost or found item
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <StatusSelector 
              itemStatus={itemStatus} 
              onStatusChange={handleStatusChange} 
            />
            
            <ItemFormFields 
              formData={formData}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
              categories={categories}
              locations={locations}
            />
            
            <ImageUploader 
              previewImage={previewImage}
              onImageChange={handleImageChange}
              onPreviewChange={setPreviewImage}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-kiit-green hover:bg-kiit-green/90 text-white font-medium rounded-xl py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ItemSubmissionForm;
