import React from 'react';

export default function PrivacyPolicy() {
    return (
        <main className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose prose-lg">
                <p className="text-gray-600 mb-8">
                    <strong>Effective Date:</strong> February 9, 2025
                </p>

                <p className="mb-8">
                    Welcome to OnchainAngels ("we," "our," or "us"). This Privacy Policy describes how we collect, use, and share information about users of our AI-powered financial coach. By using our service, you consent to the data practices described in this policy.
                </p>

                <hr className="my-8" />

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                        <p>We collect the following types of data to provide and improve our services:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Wallet Information</strong>: Public wallet addresses used for on-chain analysis.</li>
                            <li><strong>Blockchain Data</strong>: Chain ID, transactions, and portfolio composition, including holdings in stablecoins, major assets, altcoins, and meme coins.</li>
                            <li><strong>Social Media Information</strong>: Handles from platforms like Farcaster and Twitter, if provided.</li>
                            <li><strong>Transaction History</strong>: Details of recent operations, including token amounts, values, and changes in portfolio structure.</li>
                            <li><strong>Usage Data</strong>: Interactions with our service to enhance functionality and user experience.</li>
                        </ul>
                        <p>We do <strong>not</strong> collect or store private keys, passwords, or other sensitive access credentials.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                        <p>We use collected data for the following purposes:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Providing behavioral insights based on your on-chain activities.</li>
                            <li>Improving our AI-powered financial coach to deliver better decision-making support.</li>
                            <li>Analyzing market trends and user behavior in an aggregated, anonymized manner.</li>
                            <li>Enhancing user experience through personalized nudges and recommendations.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. Data Sharing and Disclosure</h2>
                        <p>We <strong>do not</strong> sell or share your personal data with third parties for marketing purposes. However, we may share data in the following cases:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Third-Party Integrations</strong>: With external service providers that assist in analyzing blockchain transactions.</li>
                            <li><strong>Legal Compliance</strong>: When required by law, regulatory authorities, or in response to legal proceedings.</li>
                            <li><strong>Business Transfers</strong>: In case of a merger, acquisition, or asset sale involving our service.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect user data. However, as blockchain transactions are inherently public, users should exercise caution and manage their wallets securely. We are not responsible for losses due to compromised wallets or third-party breaches.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Your Rights and Choices</h2>
                        <p>Users have the following rights regarding their data:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Access and Correction</strong>: You may request access to your collected data and request corrections.</li>
                            <li><strong>Data Deletion</strong>: You can request the removal of your data from our systems, subject to legal or operational limitations.</li>
                            <li><strong>Opt-Out</strong>: You can opt out of certain data collection features by adjusting your wallet and privacy settings.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
                        <p>
                            Our service may include links or integrations with third-party services, such as cryptocurrency analytics platforms. We are not responsible for the privacy policies or security practices of these third-party providers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
                        <p>
                            Our service is not intended for individuals under 18 years of age. We do not knowingly collect data from minors. If we learn that a minor has provided information, we will take appropriate steps to remove it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">8. Changes to this Privacy Policy</h2>
                        <p>
                            We reserve the right to update this Privacy Policy as needed. We will notify users of significant changes by updating the effective date at the top of this document. Continued use of our service after changes constitute acceptance of the revised policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
                        <p>
                            For any questions or concerns regarding this Privacy Policy, please contact us at{' '}
                            <a href="mailto:contact@onchain-angels.com" className="text-blue-600 hover:underline">
                                contact@onchain-angels.com
                            </a>
                        </p>
                    </section>

                    <footer className="mt-8 pt-8 border-t border-gray-200">
                        <p className="text-gray-600">
                            By using our service, you acknowledge and agree to the practices outlined in this Privacy Policy.
                        </p>
                    </footer>
                </div>
            </div>
        </main>
    );
} 