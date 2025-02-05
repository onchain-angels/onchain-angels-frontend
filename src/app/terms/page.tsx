import React from 'react';

export default function TermsOfService() {
    return (
        <main className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

            <div className="prose prose-lg">
                <p className="text-gray-600 mb-8">
                    <strong>Effective Date:</strong> February 19, 2025
                </p>

                <p className="mb-8">
                    Welcome to OnchainAngels ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our AI-powered financial coach, which provides behavioral insights based on your on-chain actions to help you make better financial decisions. By using our service, you agree to these Terms.
                </p>

                <hr className="my-8" />

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using our service, you confirm that you have read, understood, and agreed to be bound by these Terms and our Privacy Policy. If you do not agree, you must not use the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
                        <p>
                            You must be at least 18 years old or the age of majority in your jurisdiction to use our services. By using our services, you represent and warrant that you meet this requirement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Description of Service</h2>
                        <p>Our service provides:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Behavioral insights and nudges based on on-chain activity</li>
                            <li>Portfolio tracking and analysis</li>
                            <li>Integration with blockchain networks and wallets</li>
                            <li>Access to financial recommendations based on your on-chain behavior</li>
                        </ul>
                        <p>
                            We do not provide investment, financial, legal, or tax advice. All decisions made using our insights are at your own risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Data Collection & Usage</h2>
                        <p>We collect and process the following data to provide our services:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Wallet addresses</li>
                            <li>Chain ID and blockchain transactions</li>
                            <li>Portfolio composition (e.g., stablecoins, major assets, altcoins, meme coins)</li>
                            <li>Recent operations and transaction history</li>
                            <li>Social media handles (Farcaster, Twitter)</li>
                        </ul>
                        <p>
                            We do not store private keys, nor do we have control over your funds. You are solely responsible for managing your assets securely.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. User Responsibilities</h2>
                        <p>You agree to:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Use our service in compliance with applicable laws and regulations</li>
                            <li>Maintain the security of your wallet and credentials</li>
                            <li>Not use the service for illegal activities, fraud, or unauthorized access</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Risks and Disclaimers</h2>
                        <ul className="list-none space-y-4">
                            <li>
                                <strong>Blockchain and Market Risks:</strong> The cryptocurrency market is volatile. Our insights do not guarantee financial success.
                            </li>
                            <li>
                                <strong>No Financial Advice:</strong> Our service provides analytical insights but does not offer financial, investment, or legal advice.
                            </li>
                            <li>
                                <strong>Third-Party Integrations:</strong> We may integrate with third-party services, and we are not responsible for their security or policies.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
                        <p>
                            All content, trademarks, and proprietary technology associated with our service are owned by us or our licensors. You may not copy, distribute, or modify our content without prior written consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
                        <p>
                            We may suspend or terminate your access to the service if you violate these Terms or engage in fraudulent, harmful, or unlawful activities.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with the laws of Brazil. Any disputes arising under these Terms shall be resolved in the courts of Brazil.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms at any time. Continued use of the service after changes indicates acceptance of the revised Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
                        <p>
                            For questions or concerns regarding these Terms, contact us at{' '}
                            <a href="mailto:contact@onchain-angels.com" className="text-blue-600 hover:underline">
                                contact@onchain-angels.com
                            </a>
                        </p>
                    </section>

                    <footer className="mt-8 pt-8 border-t border-gray-200">
                        <p className="text-gray-600">
                            By using our service, you acknowledge and agree to these Terms of Service.
                        </p>
                    </footer>
                </div>
            </div>
        </main>
    );
} 