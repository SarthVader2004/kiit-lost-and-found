
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { InfoIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { supabase } from '@/integrations/supabase/client';

const SupabaseConnectionInfo: React.FC = () => {
  // Extract project info from the config.toml file instead of accessing protected property
  const projectRef = 'zmiwhvkpjbppnmtilqks';
  
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span>Supabase: {projectRef}</span>
              </Badge>
              <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>Connected to Supabase project: {projectRef}</p>
            <p className="text-xs text-muted-foreground mt-1">Project ID: {projectRef}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SupabaseConnectionInfo;
