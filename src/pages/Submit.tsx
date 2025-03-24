
import { motion } from 'framer-motion';
import ItemSubmissionForm from '@/components/ItemSubmissionForm';
import ProtectedRoute from '@/components/ProtectedRoute';

const Submit = () => {
  return (
    <ProtectedRoute>
      <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="bg-kiit-green/10 text-kiit-green px-3 py-1 rounded-full text-sm font-medium">
              Report an Item
            </span>
            <h1 className="mt-4 text-3xl font-bold">Submit a Report</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Lost something or found an item? Fill out the form below to submit a report to our system.
            </p>
          </motion.div>
          
          <ItemSubmissionForm />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Submit;
