
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-kiit-green/10 blur-3xl" />
        <div className="absolute top-1/3 -left-20 h-80 w-80 rounded-full bg-kiit-green/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-32 md:py-40 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 max-w-3xl mx-auto"
        >
          <div className="inline-block mb-2">
            <span className="bg-kiit-green/10 text-kiit-green px-3 py-1 rounded-full text-sm font-medium">
              KIIT University
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Lost Something?<br />
            <span className="text-kiit-green">Find it</span> Here.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A simple and efficient way to report lost items or submit found ones across the KIIT campus.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              asChild
              size="lg" 
              className="font-medium bg-kiit-green hover:bg-kiit-green/90 text-white rounded-xl"
            >
              <Link to="/lost">
                Browse Lost Items
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              asChild
              size="lg" 
              variant="outline"
              className="font-medium rounded-xl border-kiit-green/30 text-kiit-dark hover:text-kiit-green hover:bg-kiit-green/5"
            >
              <Link to="/submit">
                Report an Item
              </Link>
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl mt-16 glass-panel p-6 rounded-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { number: '200+', text: 'Items Found' },
              { number: '1000+', text: 'Members' },
              { number: '90%', text: 'Recovery Rate' }
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <h2 className="text-3xl md:text-4xl font-bold text-kiit-green">{stat.number}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{stat.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
