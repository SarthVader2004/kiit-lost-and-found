
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import SupabaseConnectionInfo from '@/components/SupabaseConnectionInfo';
import { useToast } from '@/components/ui/use-toast';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        console.log('Fetching item with ID:', id);
        
        if (!id) {
          throw new Error('Item ID is missing');
        }

        const { data, error } = await supabase
          .from('items')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        if (!data) {
          console.log('No item found with ID:', id);
          setError('Item not found. It may have been deleted or you may not have permission to view it.');
          return;
        }

        console.log('Item data retrieved:', data);
        setItem(data);
      } catch (error: any) {
        console.error('Error fetching item:', error.message);
        setError('Failed to load item details. The item may have been deleted or you may not have permission to view it.');
        
        toast({
          title: "Error",
          description: "Could not load item details. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    } else {
      setError('No item ID provided');
      setLoading(false);
    }
  }, [id, toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 pt-24">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="h-64 w-full" />
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 pt-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        
        <div className="mt-8">
          <SupabaseConnectionInfo />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-12 pt-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Item Not Found</h2>
        <p className="text-muted-foreground mb-6">The requested item could not be found.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
        
        <div className="mt-8">
          <SupabaseConnectionInfo />
        </div>
      </div>
    );
  }

  // Default image if none provided
  const itemImage = item.image_url || 'https://via.placeholder.com/800?text=No+Image';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12 pt-24"
    >
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <SupabaseConnectionInfo />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="relative">
          <div className={cn(
            "absolute inset-0 z-10 opacity-50",
            item.status === 'lost' 
              ? "bg-gradient-to-r from-orange-100/50 to-amber-100/50 dark:from-orange-900/30 dark:to-amber-900/30"
              : "bg-gradient-to-r from-green-100/50 to-emerald-100/50 dark:from-green-900/30 dark:to-emerald-900/30"
          )}/>
          <img 
            src={itemImage} 
            alt={item.title}
            className="w-full h-auto rounded-lg shadow-md object-cover aspect-square"
          />
          <Badge className={cn(
            "absolute top-4 right-4 z-20",
            item.status === 'lost' 
              ? "bg-orange-500" 
              : "bg-emerald-500"
          )}>
            {item.status === 'lost' ? 'Lost' : 'Found'}
          </Badge>
        </div>
        
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
          
          <Badge variant="outline" className="mb-6">
            {item.category}
          </Badge>
          
          <div className="prose dark:prose-invert mb-6">
            <p>{item.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-kiit-green" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p>{item.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-kiit-green" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p>{item.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-kiit-green" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p>{item.time}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <h3 className="text-lg font-medium mb-2">Contact Information</h3>
            <p>{item.contact_info}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemDetail;
