
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ItemCard from './ItemCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { categories } from '@/constants/formOptions';

// Data interface
export interface ItemData {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  time: string;
  image_url?: string | null;
  status: 'lost' | 'found';
  contact_info?: string;
}

interface ItemsListProps {
  type: 'lost' | 'found';
}

const ItemsList = ({ type }: ItemsListProps) => {
  const [items, setItems] = useState<ItemData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const filterCategories = ['All Categories', ...categories];

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      console.log(`Fetching ${type} items from database...`);
      
      let query = supabase
        .from('items')
        .select('*')
        .eq('status', type);
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching items:', error);
        throw error;
      }
      
      console.log(`Fetched ${data?.length || 0} items from database`);
      
      // Format dates and times for display, and ensure proper typing
      const formattedData = data ? data.map(item => ({
        ...item,
        date: new Date(item.date).toISOString().split('T')[0],
        time: item.time.substr(0, 5), // Format time to HH:MM
        status: item.status as 'lost' | 'found' // Ensure proper typing
      })) : [];
      
      setItems(formattedData as ItemData[]);
    } catch (error: any) {
      console.error('Error fetching items:', error.message);
      toast({
        title: 'Error',
        description: 'Failed to load items. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [type]);

  const handleRefresh = () => {
    fetchItems();
  };

  // Delete item handler - updated to ensure proper removal
  const handleDeleteItem = async (deletedItemId: string) => {
    console.log('Item deleted from UI with ID:', deletedItemId);
    
    // Update local state to remove the deleted item
    setItems(prevItems => prevItems.filter(item => item.id !== deletedItemId));
    
    // Optionally force a refresh of the data from the server to ensure UI is in sync with database
    await fetchItems();
  };

  // Filter items based on search query and category
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white/50 dark:bg-black/20 backdrop-blur-md p-4 rounded-xl border border-gray-100 dark:border-gray-800">
        {/* Search input */}
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={`Search ${type} items...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Category filter */}
          <div className="relative w-full md:w-auto">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-[180px] pl-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Filter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          {/* Refresh button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isLoading}
            className="aspect-square"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      {filteredItems.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, index) => (
            <ItemCard 
              key={item.id} 
              {...item} 
              index={index} 
              onDelete={handleDeleteItem}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-full mb-6">
            <Search className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No Items Found</h3>
          <p className="text-muted-foreground">
            {searchQuery || selectedCategory !== 'All Categories'
              ? 'Try adjusting your search or filter criteria'
              : isLoading 
                ? 'Loading items...' 
                : `There are currently no ${type} items in the system`}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ItemsList;
