// src/pages/RefundPolicyPage.tsx

import { Card } from '@/components/ui/card';
import { NeonText } from '@/components/ui/NeonText';
import { CheckCircle, XCircle } from 'lucide-react';

export default function RefundPolicyPage() {
  const lastUpdated = "May 2024"; // Change this date when updated

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <NeonText as="h1" className="text-3xl md:text-5xl mb-4">
            Refund Policy
          </NeonText>
          <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
        </div>

        <Card className="p-8 bg-gradient-card border-card-border space-y-8">
          <p className="text-muted-foreground">
            ArenaX provides a transparent and fair refund policy for all tournaments and wallet transactions.
          </p>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">1. Refunds for Tournaments</h2>
            <p className="text-muted-foreground mb-4">Refunds for entry fees are issued ONLY in the following cases:</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" /><span><strong>Tournament Cancelled:</strong> If ArenaX cancels a tournament, a 100% refund of the entry fee will be returned to your wallet.</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" /><span><strong>Technical/Server Issue:</strong> If a match cannot start due to a technical failure from our side, entry fees will be refunded.</span></li>
              <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" /><span><strong>Incorrect Match Setup:</strong> If ArenaX creates incorrect room details or an invalid match, refunds will be made.</span></li>
            </ul>
            <p className="text-muted-foreground my-4">No refunds will be provided for:</p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3"><XCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" /><span>Wrong Free Fire ID entered by the user.</span></li>
              <li className="flex items-start gap-3"><XCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" /><span>User not joining the match on time.</span></li>
              <li className="flex items-start gap-3"><XCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" /><span>User getting eliminated early.</span></li>
              <li className="flex items-start gap-3"><XCircle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" /><span>Personal network issues, lag, or device problems.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">2. Wallet Top-Up Refunds</h2>
            <p className="text-muted-foreground">Wallet top-ups are final and non-refundable, except in cases of duplicate payment, a failed transaction where the amount was deducted but not added to the wallet. Such cases are verified and refunded within 3-7 business days.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-primary">3. Contact for Refunds</h2>
            <p className="text-muted-foreground mb-2">To request a refund, please email <a href="mailto:helparenax@zohomail.in" className="text-primary hover:underline">helparenax@zohomail.in</a> with the following details:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Your Registered Email</li>
              <li>Transaction ID</li>
              <li>A clear reason for the refund request</li>
              <li>Screenshot of the issue (if any)</li>
            </ul>
          </section>
        </Card>
      </div>
    </div>
  );
}