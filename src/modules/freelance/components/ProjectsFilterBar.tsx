import Input from '../../../core/components/ui/Input';
import Select from '../../../core/components/ui/Select';
import GlassCard from '../../../core/components/ui/GlassCard';

export interface FilterOption {
    label: string | number;
    value: string | number;
}

interface ProjectsFilterBarProps {
    searchQuery: string;
    onSearchChange: (val: string) => void;
    category: string;
    onCategoryChange: (val: string) => void;
    categoryOptions: FilterOption[];
    budget: string;
    onBudgetChange: (val: string) => void;
    budgetOptions: FilterOption[];
}

export default function ProjectsFilterBar({
    searchQuery,
    onSearchChange,
    category,
    onCategoryChange,
    categoryOptions,
    budget,
    onBudgetChange,
    budgetOptions
}: ProjectsFilterBarProps) {
    return (
        <GlassCard padding="p-4" rounded="rounded-2xl" borderColor="none" className="flex flex-col md:flex-row gap-4 mb-8 relative z-20">
            <div className="flex-1 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <Input
                    type="text"
                    placeholder="Buscar por palabra clave, tecnología o cliente..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-w-[350px]">
                <Select
                    options={categoryOptions}
                    value={category}
                    onChange={onCategoryChange}
                    placeholder="Categoría"
                    className="w-full"
                />
                <Select
                    options={budgetOptions}
                    value={budget}
                    onChange={onBudgetChange}
                    placeholder="Presupuesto"
                    className="w-full"
                />
            </div>
        </GlassCard>
    );
}
