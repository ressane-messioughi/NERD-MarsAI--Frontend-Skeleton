import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/ui/popover';
import { useLanguage } from '@/app/contexts/LanguageContext';

const aiToolFilters = ['Script', 'Image', 'Video', 'Sound'];
const countries = [
  { code: 'FR', name: 'France' },
  { code: 'US', name: 'États-Unis' },
  { code: 'JP', name: 'Japon' },
  { code: 'DE', name: 'Allemagne' },
  { code: 'GB', name: 'Royaume-Uni' },
  { code: 'CA', name: 'Canada' },
];

interface GalleryFiltersButtonProps {
  selectedAITools: string[];
  selectedCountries: string[];
  showOfficialOnly: boolean;
  onAIToolsChange: (tools: string[]) => void;
  onCountriesChange: (countries: string[]) => void;
  onOfficialChange: (official: boolean) => void;
  onClearAll: () => void;
}

export function GalleryFiltersButton({
  selectedAITools,
  selectedCountries,
  showOfficialOnly,
  onAIToolsChange,
  onCountriesChange,
  onOfficialChange,
  onClearAll,
}: GalleryFiltersButtonProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const toggleAITool = (tool: string) => {
    if (selectedAITools.includes(tool)) {
      onAIToolsChange(selectedAITools.filter(t => t !== tool));
    } else {
      onAIToolsChange([...selectedAITools, tool]);
    }
  };

  const toggleCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      onCountriesChange(selectedCountries.filter(c => c !== country));
    } else {
      onCountriesChange([...selectedCountries, country]);
    }
  };

  const activeFiltersCount = selectedAITools.length + selectedCountries.length + (showOfficialOnly ? 1 : 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-border/50 gap-2 relative"
        >
          <Filter className="w-4 h-4" />
          {t('landing.filters.title')}
          {activeFiltersCount > 0 && (
            <Badge className="ml-1 h-5 min-w-5 px-1 bg-primary text-primary-foreground">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0" align="start">
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <h3 className="font-medium">{t('landing.filters.title')}</h3>
          {activeFiltersCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearAll}
              className="h-8 text-xs"
            >
              <X className="w-3 h-3 mr-1" />
              {t('common.clear')}
            </Button>
          )}
        </div>

        <div className="p-4 grid grid-cols-3 gap-6">
          {/* Selection */}
          <div>
            <Label className="text-xs font-medium mb-3 block text-muted-foreground uppercase">
              {t('landing.filters.selection')}
            </Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="official-filter"
                checked={showOfficialOnly}
                onCheckedChange={(checked) => onOfficialChange(checked as boolean)}
              />
              <label htmlFor="official-filter" className="text-sm cursor-pointer">
                {t('landing.filters.official')}
              </label>
            </div>
          </div>

          {/* AI Tools */}
          <div>
            <Label className="text-xs font-medium mb-3 block text-muted-foreground uppercase">
              {t('landing.filters.aitools')}
            </Label>
            <div className="space-y-2">
              {aiToolFilters.map(tool => (
                <div key={tool} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filter-tool-${tool}`}
                    checked={selectedAITools.includes(tool)}
                    onCheckedChange={() => toggleAITool(tool)}
                  />
                  <label htmlFor={`filter-tool-${tool}`} className="text-sm cursor-pointer">
                    {t(`ai.${tool.toLowerCase()}`)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Countries */}
          <div>
            <Label className="text-xs font-medium mb-3 block text-muted-foreground uppercase">
              {t('landing.filters.country')}
            </Label>
            <div className="space-y-2">
              {countries.map(country => (
                <div key={country.code} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filter-country-${country.code}`}
                    checked={selectedCountries.includes(country.code)}
                    onCheckedChange={() => toggleCountry(country.code)}
                  />
                  <label htmlFor={`filter-country-${country.code}`} className="text-sm cursor-pointer">
                    {country.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
