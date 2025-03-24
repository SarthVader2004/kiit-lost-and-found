
import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  previewImage: string | null;
  onImageChange: (file: File | null) => void;
  onPreviewChange: (preview: string | null) => void;
}

export const ImageUploader = ({
  previewImage,
  onImageChange,
  onPreviewChange
}: ImageUploaderProps) => {
  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onImageChange(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          onPreviewChange(event.target.result as string);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image">Upload Image (Optional)</Label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
        <div className="space-y-2 text-center">
          {previewImage ? (
            <div className="relative mx-auto w-full max-w-xs">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="mx-auto h-40 object-contain rounded-md"
              />
              <Button 
                type="button"
                variant="destructive" 
                size="sm"
                className="absolute top-0 right-0 rounded-full w-6 h-6 p-0 mt-2 mr-2"
                onClick={() => {
                  onPreviewChange(null);
                  onImageChange(null);
                }}
              >
                ×
              </Button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label htmlFor="image" className="relative cursor-pointer rounded-md font-medium text-kiit-green hover:text-kiit-dark">
                  <span>Upload a file</span>
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, GIF up to 5MB
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
