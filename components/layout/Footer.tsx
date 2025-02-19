import { getOwnerInfo } from '@/types/global';
import { Icons } from '@/utils/icons';

export default function Footer() {
  const { name, email } = getOwnerInfo();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-gradient-to-br from-background/98 via-background/95 to-primary/5 backdrop-blur-xl py-6 px-4 mt-auto shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground/90">
        <div className="flex items-center gap-2 hover:text-primary transition-colors duration-300 hover:scale-105">
          <Icons.Mail className="h-4 w-4 text-primary/70" />
          <a href={`mailto:${email}`} className="hover:underline hover:text-primary">
            {email}
          </a>
        </div>
        <div className="flex items-center gap-2 hover:text-primary/90 transition-colors duration-300">
          <Icons.User className="h-4 w-4 text-primary/70" />
          <span>{name}</span>
        </div>
        <div className="text-center md:text-right text-muted-foreground/80 hover:text-muted-foreground transition-colors duration-300">
          <p>© {currentYear} {name}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
