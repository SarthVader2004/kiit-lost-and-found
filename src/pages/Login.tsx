
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import AuthForm from '@/components/AuthForm';

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    
    checkAuth();
  }, [navigate]);

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="bg-kiit-green/10 text-kiit-green px-3 py-1 rounded-full text-sm font-medium">
            Welcome Back
          </span>
          <h1 className="mt-4 text-3xl font-bold">Login to KIIT Lost & Found</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Log in to your account to report lost items, claim found items, and manage your profile.
          </p>
        </motion.div>
        
        <AuthForm type="login" />
      </div>
    </div>
  );
};

export default Login;
