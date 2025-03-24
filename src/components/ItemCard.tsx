
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  time: string;
  image_url?: string;
  status: 'lost' | 'found';
  index?: number;
  onDelete?: (id: string) => void;
}

const ItemCard = ({
  id,
  title,
  description,
  category,
  location,
  date,
  time,
  image_url,
  status,
  index = 0,
  onDelete
}: ItemCardProps) => {
  // Default image if none provided
  const itemImage = image_url || 'https://via.placeholder.com/300?text=No+Image';
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      console.log('Deleting item with ID:', id);
      
      // Delete the item from the database
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting item:', error);
        throw error;
      }
      
      console.log('Item deleted successfully from database');
      
      toast({
        title: "Success",
        description: `${status === 'lost' ? 'Lost' : 'Found'} item deleted successfully`,
      });
      
      // Call the onDelete callback to update the UI
      if (onDelete) {
        onDelete(id);
      }
    } catch (error: any) {
      console.error('Error deleting item:', error.message);
      toast({
        title: "Error",
        description: "Failed to delete item. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden"
    >
      <div className="relative">
        {/* Background gradient overlay */}
        <div 
          className={cn(
            "absolute inset-0 z-10 opacity-50",
            status === 'lost' 
              ? "bg-gradient-to-r from-orange-100/50 to-amber-100/50 dark:from-orange-900/30 dark:to-amber-900/30"
              : "bg-gradient-to-r from-green-100/50 to-emerald-100/50 dark:from-green-900/30 dark:to-emerald-900/30"
          )}
        />
        
        {/* Status badge */}
        <div className={cn(
          "absolute top-3 right-3 z-20 px-3 py-1 rounded-full text-xs font-medium",
          status === 'lost' 
            ? "bg-orange-500/90 text-white" 
            : "bg-emerald-500/90 text-white"
        )}>
          {status === 'lost' ? 'Lost' : 'Found'}
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white">
          {category}
        </div>
        
        {/* Image */}
        <img 
          src={itemImage} 
          alt={title}
          className="w-full h-48 object-cover object-center"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold line-clamp-1 mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-kiit-green" />
            <span className="line-clamp-1">{location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-kiit-green" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-kiit-green" />
            <span>{time}</span>
          </div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <Button 
            variant="link" 
            asChild 
            className="p-0 text-kiit-green font-medium text-sm hover:text-kiit-dark transition-colors"
          >
            <Link to={`/item/${id}`}>
              View Details →
            </Link>
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this {status} item from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;
