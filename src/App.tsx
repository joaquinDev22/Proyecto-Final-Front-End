import { Routes, Route } from "react-router-dom";
import Home from "./modules/home/pages/public/Home";
import Login from "./modules/auth/pages/Login";
import Signup from "./modules/auth/pages/Signup";
import Onboarding from "./modules/auth/pages/Onboarding";
import FreelancerLanding from "./modules/freelance/pages/public/FreelancerLanding";
import EnterpriseLanding from "./modules/jobs/pages/public/EnterpriseLanding";
import Bootcamp from "./modules/bootcamp/pages/public/Bootcamp";
import ProfilePage from "./modules/profile/pages/ProfilePage";
import { AuthProvider } from "./core/context/AuthContext";

import PublicLayout from "./core/components/layout/public/Publiclayout";
import PrivateLayout from "./core/components/layout/private/Privatelayout";

// Rutas Privadas - Freelance
import BuscarProyectos from "./modules/freelance/pages/private/freelancer/BuscarProyectos";
import Cobros from "./modules/freelance/pages/private/freelancer/Cobros";
import ProyectosEnCurso from "./modules/freelance/pages/private/freelancer/ProyectosEnCurso";
import Bootcamps from "./modules/bootcamp/pages/private/Bootcamps";
import Vacantes from "./modules/jobs/pages/private/postulante/Vacantes";
import PostulacionesRealizadas from "./modules/jobs/pages/private/postulante/PostulacionesRealizadas";
import DetalleVacante from "./modules/jobs/pages/private/postulante/DetalleVacante";
import RealizarPostulacion from "./modules/jobs/pages/private/postulante/RealizarPostulacion";
import DetalleProyecto from "./modules/freelance/pages/private/freelancer/DetalleProyecto";
import EnviarPropuesta from "./modules/freelance/pages/private/freelancer/EnviarPropuesta";
import DetalleBootcamp from "./modules/bootcamp/pages/private/DetalleBootcamp";
import AulaBootcamp from "./modules/bootcamp/pages/private/AulaBootcamp";
import PagoBootcamp from "./modules/bootcamp/pages/private/PagoBootcamp";
import DejarResenaBootcamp from "./modules/bootcamp/pages/private/DejarResenaBootcamp";
import RetirarFondos from "./modules/freelance/pages/private/freelancer/RetirarFondos";
import DashboardCliente from "./modules/freelance/pages/private/cliente/DashboardCliente";
import MisProyectosCliente from "./modules/freelance/pages/private/cliente/MisProyectosCliente";
import PublicarProyecto from "./modules/freelance/pages/private/cliente/PublicarProyecto";
import RevisionPropuestas from "./modules/freelance/pages/private/cliente/RevisionPropuestas";
import RealizarPago from "./modules/freelance/pages/private/cliente/RealizarPago";
import DejarResena from "./modules/freelance/pages/private/cliente/DejarResena";
import HitosProyecto from "./modules/freelance/pages/private/cliente/HitosProyecto";

// Rutas Privadas - Enterprise
import DashboardEnterprise from "./modules/jobs/pages/private/empresa/DashboardEnterprise";
import GestionRecruiters from "./modules/jobs/pages/private/empresa/GestionRecruiters";
import GestionInstructores from "./modules/jobs/pages/private/empresa/GestionInstructores";

// Rutas Privadas - Instructor
import VisualizarBootcamp from "./modules/bootcamp/pages/private/Instructor/VisualizarBootcamp";
import CrearBootcamp from "./modules/bootcamp/pages/private/Instructor/CrearBootcamp";
import EditarBootcamp from "./modules/bootcamp/pages/private/Instructor/EditarBootcamp";

// Rutas Privadas - Recruiter
import MisVacantesRecruiter from "./modules/jobs/pages/private/recruiter/VerVacantesPublicadas";
import PublicarVacante from "./modules/jobs/pages/private/recruiter/PublicarVacantes";
import PostulacionesPorVacante from "./modules/jobs/pages/private/recruiter/VerPostulaciones";
import EntrevistasAgendadas from "./modules/jobs/pages/private/recruiter/OrganizarEntrevista";
import PublicProfilePage from "./modules/profile/pages/PublicProfilePage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* GRUPO DE RUTAS PÚBLICAS (Usan el Header normal) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/freelancer" element={<FreelancerLanding />} />
          <Route path="/enterprise" element={<EnterpriseLanding />} />
          <Route path="/bootcamp" element={<Bootcamp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* GRUPO DE RUTAS PRIVADAS (Usan el LoggedHeader) */}
        <Route element={<PrivateLayout />}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Dashboard Freelance */}
          <Route path="/freelance/buscar-proyecto" element={<BuscarProyectos />} />
          <Route path="/freelance/buscar-proyecto/:id" element={<DetalleProyecto />} />
          <Route path="/freelance/buscar-proyecto/:id/propuesta" element={<EnviarPropuesta />} />
          <Route path="/freelance/proyectos-en-curso" element={<ProyectosEnCurso />} />
          <Route path="/freelance/bootcamps" element={<Bootcamps />} />
          <Route path="/freelance/bootcamps/:id" element={<DetalleBootcamp />} />
          <Route path="/freelance/bootcamps/:id/pago" element={<PagoBootcamp />} />
          <Route path="/freelance/bootcamps/:id/aula" element={<AulaBootcamp />} />
          <Route path="/freelance/bootcamps/:id/resena" element={<DejarResenaBootcamp />} />
          <Route path="/freelance/cobros" element={<Cobros />} />
          <Route path="/freelance/retirar-fondos" element={<RetirarFondos />} />
          <Route path="/postulante/vacantes" element={<Vacantes />} />
          <Route path="/postulante/vacantes/:id" element={<DetalleVacante />} />
          <Route path="/postulante/vacantes/:id/postular" element={<RealizarPostulacion />} />
          <Route path="/postulante/postulaciones" element={<PostulacionesRealizadas />} />
          <Route path="/postulante/bootcamps" element={<Bootcamps />} />
          <Route path="/postulante/bootcamps/:id" element={<DetalleBootcamp />} />
          <Route path="/postulante/bootcamps/:id/pago" element={<PagoBootcamp />} />
          <Route path="/postulante/bootcamps/:id/aula" element={<AulaBootcamp />} />
          <Route path="/postulante/bootcamps/:id/resena" element={<DejarResenaBootcamp />} />

          {/* Dashboard Cliente */}
          <Route path="/cliente/dashboard" element={<DashboardCliente />} />
          <Route path="/cliente/mis-proyectos" element={<MisProyectosCliente />} />
          <Route path="/cliente/mis-proyectos/:id/propuestas" element={<RevisionPropuestas />} />
          <Route path="/cliente/mis-proyectos/:id/hitos" element={<HitosProyecto />} />
          <Route path="/cliente/mis-proyectos/:id/pago" element={<RealizarPago />} />
          <Route path="/cliente/mis-proyectos/:id/resena" element={<DejarResena />} />
          <Route path="/cliente/publicar" element={<PublicarProyecto />} />

          {/* Dashboard Enterprise */}
          <Route path="/enterprise/dashboard" element={<DashboardEnterprise />} />
          <Route path="/enterprise/recruiters" element={<GestionRecruiters />} />
          <Route path="/enterprise/instructores" element={<GestionInstructores />} />

          {/* Dashboard Instructor */}
          <Route path="/instructor/bootcamps" element={<VisualizarBootcamp />} />
          <Route path="/instructor/bootcamps/crear" element={<CrearBootcamp />} />
          <Route path="/instructor/bootcamps/editar/:id" element={<EditarBootcamp />} />
          <Route path="/instructor/bootcamps/:id/preview" element={<DetalleBootcamp />} />
          <Route path="/instructor/cobros" element={<Cobros />} />

          {/* Dashboard Recruiter */}
          <Route path="/recruiter/dashboard" element={<MisVacantesRecruiter />} />
          <Route path="/recruiter/vacantes/crear" element={<PublicarVacante />} />
          <Route path="/recruiter/vacantes/:id/postulaciones" element={<PostulacionesPorVacante />} />
          <Route path="/recruiter/vacantes/:id/preview" element={<DetalleVacante />} />
          <Route path="/recruiter/entrevistas" element={<EntrevistasAgendadas />} />
          <Route path="/perfil/:id" element={<PublicProfilePage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
