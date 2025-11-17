// src/pages/TermsAndConditionsPage.tsx

import { Card } from '@/components/ui/card';
import { NeonText } from '@/components/ui/NeonText';

export default function TermsAndConditionsPage() {
  const lastUpdated = "May 2024"; // Change this date when updated

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <NeonText as="h1" className="text-3xl md:text-5xl mb-4">
            Terms & Conditions
          </NeonText>
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
        </div>

        <Card className="p-8 bg-gradient-card border-card-border space-y-8">
          <p className="text-muted-foreground">
            These Terms & Conditions (“Terms”) govern your use of ArenaX. By accessing or using ArenaX, you agree to these Terms.
          </p>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">1. Eligibility</h2>
            <p className="text-muted-foreground">You must be 18 years or older to use ArenaX. By using the platform, you confirm you meet this requirement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">2. Account Registration</h2>
            <p className="text-muted-foreground">You must provide accurate information including your Email, Phone Number, Game ID (e.g., FreeFire ID), and IGN. You are responsible for maintaining the confidentiality of your login credentials.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">3. Wallet & Payments</h2>
            <p className="text-muted-foreground mb-4">Wallet top-ups are processed via Razorpay/UPI. ArenaX does not store payment details. Wallet balance cannot be transferred. We may deduct platform fees for specific tournaments. ArenaX may freeze or review accounts for suspicious transactions, multi-accounting, false KYC, or chargebacks.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">4. Tournaments</h2>
            <p className="text-muted-foreground">By joining a tournament, you agree to follow all match rules, join with your correct Game ID, not cheat, and accept admin decisions as final. Entry fees are deducted from your wallet and are non-refundable once a match starts, unless the tournament is cancelled by us or there is a server/technical error on our side.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">5. Winner Selection & Rewards</h2>
            <p className="text-muted-foreground">Winners are selected based on match results and admin decisions in case of disputes. Prize rewards are credited to the user wallet. All decisions by ArenaX are final and binding.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">6. Withdrawals</h2>
            <p className="text-muted-foreground">Withdrawal requests are subject to a minimum amount, KYC verification, and a processing time of 1-3 business days. ArenaX reserves the right to hold or reject withdrawals for accounts under review, suspicious activity, or KYC mismatch.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">7. Prohibited Conduct</h2>
            <p className="text-muted-foreground">You agree not to create multiple accounts, share login details, exploit bugs, manipulate results, abuse others, or use cheats. Violation may result in account suspension, a permanent ban, and forfeiture of wallet balance if fraud is detected.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">8. Liability Disclaimer</h2>
            <p className="text-muted-foreground">ArenaX is not responsible for your network issues, game server outages, incorrect game IDs, player mistakes, or third-party service failures.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">9. Termination</h2>
            <p className="text-muted-foreground">ArenaX may terminate accounts that violate these terms or show suspicious activity.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">10. Governing Law</h2>
            <p className="text-muted-foreground">These Terms are governed by Indian law. Disputes will be handled in designated city jurisdiction courts.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">11. Contact</h2>
            <p className="text-muted-foreground">For any queries, contact: <a href="mailto:helparenax@zohomail.in" className="text-primary hover:underline">helparenax@zohomail.in</a></p>
          </section>
        </Card>
      </div>
    </div>
  );
}