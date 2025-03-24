
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface StatusSelectorProps {
  itemStatus: 'lost' | 'found';
  onStatusChange: (status: 'lost' | 'found') => void;
}

export const StatusSelector = ({
  itemStatus,
  onStatusChange
}: StatusSelectorProps) => {
  return (
    <div className="space-y-4">
      <Label>Item Status</Label>
      <RadioGroup 
        defaultValue={itemStatus} 
        onValueChange={(val) => onStatusChange(val as 'lost' | 'found')}
        className="flex gap-4"
      >
        <div className={cn(
          "flex items-center space-x-2 rounded-lg border p-4 transition-all",
          itemStatus === 'lost' ? "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20" : "border-gray-200 dark:border-gray-800"
        )}>
          <RadioGroupItem value="lost" id="lost" />
          <Label htmlFor="lost" className="cursor-pointer font-medium">I Lost an Item</Label>
        </div>
        <div className={cn(
          "flex items-center space-x-2 rounded-lg border p-4 transition-all",
          itemStatus === 'found' ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/20" : "border-gray-200 dark:border-gray-800"
        )}>
          <RadioGroupItem value="found" id="found" />
          <Label htmlFor="found" className="cursor-pointer font-medium">I Found an Item</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
