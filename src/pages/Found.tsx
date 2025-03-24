
import { motion } from 'framer-motion';
import ItemsList from '@/components/ItemsList';

const Found = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-sm font-medium">
            Found Items
          </span>
          <h1 className="mt-4 text-3xl font-bold">Browse Found Items</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Check out items that have been found around campus. If you've lost any of these, contact the finder to reclaim it.
          </p>
        </motion.div>
        
        <ItemsList type="found" />
      </div>
    </div>
  );
};

export default Found;
