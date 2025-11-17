// src/components/layout/Footer.tsx

import { Link } from 'react-router-dom';
import { LogoDisplay } from '../ui/LogoDisplay';
import { ROUTES } from '@/utils/constants';

export const Footer = () => {
  const footerLinks = {
    Platform: [
      { label: 'About Us', to: ROUTES.ABOUT_US }, // <-- YEH LINE ADD HUI HAI
      { label: 'Tournaments', to: ROUTES.TOURNAMENTS },
      { label: 'Leaderboard', to: ROUTES.LEADERBOARD },
      { label: 'How It Works', to: ROUTES.HOW_IT_WORKS },
      { label: 'Referral Program', to: ROUTES.REFERRAL },
    ],
    Support: [
      { label: 'FAQ', to: ROUTES.FAQ },
      { label: 'Contact Us', to: ROUTES.CONTACT },
    ],
    Legal: [
      { label: 'Privacy Policy', to: ROUTES.PRIVACY_POLICY },
      { label: 'Terms & Conditions', to: ROUTES.TERMS },
      { label: 'Refund Policy', to: ROUTES.REFUND_POLICY },
    ],
  };

  return (
    <footer className="bg-background-elevated border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <LogoDisplay size="lg" className="mb-4" />
            <p className="text-sm text-muted-foreground max-w-sm">
              Join the ultimate gaming tournament platform. Compete with players worldwide,
              win prizes, and climb the leaderboard.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ArenaX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};