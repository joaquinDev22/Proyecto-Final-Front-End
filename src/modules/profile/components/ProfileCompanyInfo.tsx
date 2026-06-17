interface ProfileCompanyInfoProps {
    website?: string;
    employeeCount?: string;
    industry?: string;
    foundedYear?: string;
}

export default function ProfileCompanyInfo({ website, employeeCount, industry, foundedYear }: ProfileCompanyInfoProps) {
    return (
        <div className="glass p-8 rounded-3xl border-t border-blue-500/20 mb-6">
            <h2 className="text-xl font-bold text-white mb-6">Información Corporativa</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                    <p className="text-slate-500 text-sm mb-1">Sitio Web</p>
                    {website ? (
                        <a href={website} target="_blank" rel="noreferrer" className="text-blue-400 font-medium hover:underline truncate block">
                            {website}
                        </a>
                    ) : (
                        <p className="text-slate-300 font-medium">-</p>
                    )}
                </div>
                
                <div>
                    <p className="text-slate-500 text-sm mb-1">Tamaño de Empresa</p>
                    <p className="text-white font-medium">{employeeCount || "No especificado"}</p>
                </div>
                
                <div>
                    <p className="text-slate-500 text-sm mb-1">Industria</p>
                    <p className="text-white font-medium">{industry || "Tecnología"}</p>
                </div>
                
                <div>
                    <p className="text-slate-500 text-sm mb-1">Fundación</p>
                    <p className="text-white font-medium">{foundedYear || "-"}</p>
                </div>
            </div>
        </div>
    );
}
