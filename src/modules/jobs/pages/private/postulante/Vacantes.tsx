import { useState, useEffect } from 'react';
import PageHeader from '../../../../../core/components/ui/PageHeader';
import ProjectsFilterBar from '../../../../freelance/components/ProjectsFilterBar';
import JobCard, { type Job } from '../../../components/JobCard';

const JORNADA_OPTIONS = [
    { label: 'Todos', value: 'all' },
    { label: 'Full-Time', value: 'full-time' },
    { label: 'Part-Time', value: 'part-time' }
];

const MODALIDAD_OPTIONS = [
    { label: 'Todas', value: 'all' },
    { label: 'Remoto', value: 'remoto' },
    { label: 'Presencial', value: 'presencial' },
    { label: 'Híbrido', value: 'hibrido' }
];

export default function Vacantes() {
    const [search, setSearch] = useState("");
    const [jornada, setJornada] = useState("all");
    const [modalidad, setModalidad] = useState("all");

    // TODO: Define proper types centrally
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { jobService } = await import('../../../../../core/api/jobService');
                const data = await jobService.getAll();
                
                // Aplicar filtros locales si es necesario
                let filtered = data;
                if (search) {
                    filtered = filtered.filter(j => 
                        j.title?.toLowerCase().includes(search.toLowerCase()) || 
                        j.company?.toLowerCase().includes(search.toLowerCase()) ||
                        j.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
                    );
                }
                if (jornada !== "all") {
                    filtered = filtered.filter(j => j.type.toLowerCase().includes(jornada.replace('-', ' ')));
                }
                if (modalidad !== "all") {
                    filtered = filtered.filter(j => j.locationType.toLowerCase() === modalidad);
                }
                
                setJobs(filtered);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, [search, jornada, modalidad]);

    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-8">
            <PageHeader
                title="Bolsa de Empleo"
                subtitle="Encuentra oportunidades laborales permanentes en las mejores empresas."
            />

            <ProjectsFilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                category={jornada}
                onCategoryChange={setJornada}
                categoryOptions={JORNADA_OPTIONS}
                budget={modalidad}
                onBudgetChange={setModalidad}
                budgetOptions={MODALIDAD_OPTIONS}
            />

            <div className="flex flex-col gap-6 animate-fade-in-up mt-6">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : jobs.length > 0 ? (
                    jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))
                ) : (
                    <div className="glass p-12 text-center rounded-3xl">
                        <p className="text-slate-400 text-lg">No hay vacantes disponibles en este momento.</p>
                    </div>
                )}
            </div>
        </div>
    );
}