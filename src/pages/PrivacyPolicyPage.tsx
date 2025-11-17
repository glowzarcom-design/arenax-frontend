// src/pages/PrivacyPolicyPage.tsx

import { Card } from '@/components/ui/card';
import { NeonText } from '@/components/ui/NeonText';

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 2024"; // Change this date when updated

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <NeonText as="h1" className="text-3xl md:text-5xl mb-4">
            Privacy Policy
          </NeonText>
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
        </div>

        <Card className="p-8 bg-gradient-card border-card-border space-y-8">
          <p className="text-muted-foreground">
            Welcome to ArenaX (“Platform”, “We”, “Us”, “Our”). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect your information when you use the ArenaX esports tournament platform.
          </p>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">We collect the following categories of data:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Information You Provide:</strong> Full Name, Email Address, Phone Number, Game ID (e.g., Free Fire ID), Username/IGN, Wallet-related details, and KYC documents (if required for withdrawals).</li>
              <li><strong>Automatically Collected Data:</strong> IP Address, Device information, Browser data, Login logs, Approximate location, and data from Cookies and analytics.</li>
              <li><strong>Payment Information:</strong> Transaction IDs, Razorpay order IDs, Wallet top-ups, and Withdrawal details. We do NOT store your full card/UPI details.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">We use your information to create and manage your ArenaX account, allow you to join tournaments, process wallet deposits and withdrawals, verify payments, send match updates & notifications, prevent fraud, improve user experience, provide customer support, and comply with legal requirements.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">3. Sharing of Information</h2>
            <p className="text-muted-foreground">We may share your information with our payment partners (Razorpay, UPI networks), verification services (KYC providers), analytics providers, and law enforcement if required by law. We never sell your personal information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">4. Data Security</h2>
            <p className="text-muted-foreground">We implement strict security controls including HTTPS encryption, token-based authentication, limited internal access, secured servers, firewalls, and regular security audits to protect your data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">5. Your Rights</h2>
            <p className="text-muted-foreground">You have the right to request access to your data, request correction or deletion of your data, request account deletion, and opt-out of marketing communications.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">6. Children’s Privacy</h2>
            <p className="text-muted-foreground">ArenaX is not intended for users under the age of 18. If we discover that an underage account has been created, it will be terminated immediately.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">7. Changes to This Policy</h2>
            <p className="text-muted-foreground">We may update this policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">8. Contact Us</h2>
            <p className="text-muted-foreground">For any queries regarding this policy, please contact us at:</p>
            <ul className="list-none space-y-1 mt-2 text-muted-foreground">
              <li><strong>Email:</strong> <a href="mailto:helparenax@zohomail.in" className="text-primary hover:underline">helparenax@zohomail.in</a></li>
              {/* Add Phone and Address when available */}
            </ul>
          </section>
        </Card>
      </div>
    </div>
  );
}