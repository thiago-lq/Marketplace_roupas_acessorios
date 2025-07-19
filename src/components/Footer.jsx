import linkedinIcon from '../assets/linkedin.png';
export default function Footer() {
  return (
    <footer className="bg-black text-white py-4 w-full">
      <div className="container mx-auto text-center space-y-1">
        {/* Dono do site / marca */}
        <p>&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>

        {/* Crédito do desenvolvedor */}
        <p className="text-sm text-gray-400">Desenvolvido por Thiago Lima</p>
        <div className="flex justify-center space-x-4">
            <p>Contato: thiagolq100@gmail.com</p>
            <a href="https://www.linkedin.com/in/thiago-lima-21131a324/" target="_blank" rel="noreferrer">
                <img src={linkedinIcon} alt="Linkedin" className="w-6 h-6"/>
            </a>
        </div>
      </div>
    </footer>
  );
}
