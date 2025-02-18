import { getOwnerInfo } from '@/types/global';
import { Icons } from '@/utils/icons';

export default function Footer() {
  const { name, email } = getOwnerInfo();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="owner-info">
          <Icons.Mail className="icon" /> 
          <a href={`mailto:${email}`} className="owner-email">
            {email}
          </a>
        </div>
        <div className="owner-name">
          <Icons.User className="icon" /> 
          <span className="owner-name">{name}</span>
        </div>
        <div className="copyright">
          <p> {currentYear} {name}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
