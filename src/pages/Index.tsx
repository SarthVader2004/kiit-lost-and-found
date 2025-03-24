
import Hero from '@/components/Hero';
import { ArrowRight, Search, FileCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Index = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: <Search />,
      title: 'Easy Search',
      description: 'Quickly find lost items with our powerful search and filtering system.'
    },
    {
      icon: <FileCheck />,
      title: 'Simple Reporting',
      description: 'Report lost or found items in minutes with our streamlined form.'
    },
    {
      icon: <Clock />,
      title: 'Real-time Updates',
      description: 'Get notifications when items matching your description are found.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="bg-kiit-green/10 text-kiit-green px-3 py-1 rounded-full text-sm font-medium">
              Simple Process
            </span>
            <h2 className="mt-4 text-3xl font-bold">How It Works</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Our platform makes it easy to report and find lost items on campus
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { number: '01', title: 'Report', text: 'Submit a detailed description of the lost or found item' },
              { number: '02', title: 'Search', text: 'Browse through the listings or search for specific items' },
              { number: '03', title: 'Connect', text: 'Contact the finder/owner to arrange item retrieval' }
            ].map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl glass-card flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-kiit-green/10 text-kiit-green flex items-center justify-center font-bold text-lg mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.span 
                variants={item}
                className="bg-kiit-green/10 text-kiit-green px-3 py-1 rounded-full text-sm font-medium"
              >
                Platform Features
              </motion.span>
              <motion.h2 
                variants={item}
                className="mt-4 text-3xl font-bold"
              >
                Everything you need to find what's lost
              </motion.h2>
              <motion.p 
                variants={item}
                className="mt-4 text-gray-600 dark:text-gray-400"
              >
                Our platform provides all the tools necessary to help the KIIT community reconnect with their lost belongings.
              </motion.p>
              
              <motion.div variants={item} className="mt-8 space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 bg-kiit-green/10 p-2 rounded-lg text-kiit-green">
                      {feature.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{feature.title}</h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
              
              <motion.div variants={item} className="mt-8">
                <Button 
                  asChild
                  size="lg" 
                  className="font-medium bg-kiit-green hover:bg-kiit-green/90 text-white rounded-xl"
                >
                  <Link to="/submit">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              variants={item}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-kiit-green/20 to-kiit-green/5 rounded-2xl p-8 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/d849df61-aa8c-4eff-b202-94645c6f1e46.png" 
                  alt="KIIT Lost and Found" 
                  className="w-2/3 h-auto animate-float"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-kiit-green/10 rounded-full blur-xl" />
              <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-kiit-green/5 rounded-full blur-xl" />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="bg-kiit-green/10 text-kiit-green px-3 py-1 rounded-full text-sm font-medium">
              Join The Community
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">Ready to find what you've lost?</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Start by browsing through items others have found, or report your own lost item.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
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
                <Link to="/found">
                  View Found Items
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
