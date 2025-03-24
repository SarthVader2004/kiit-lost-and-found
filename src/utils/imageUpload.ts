
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export const uploadImageToSupabase = async (
  imageFile: File | null, 
  userId: string
): Promise<string | null> => {
  if (!imageFile) return null;
  
  const fileExt = imageFile.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;
  
  const { error: uploadError } = await supabase.storage
    .from('item_images')
    .upload(filePath, imageFile);
    
  if (uploadError) {
    console.error('Error uploading image:', uploadError);
    throw uploadError;
  }
  
  // Get public URL for the uploaded image
  const { data: { publicUrl } } = supabase.storage
    .from('item_images')
    .getPublicUrl(filePath);
    
  return publicUrl;
};
