import { Link } from "react-router-dom";

const LegalPage = ({ title, content }) => {
  return (
    <div className="min-h-screen bg-[#010410] px-4 py-16 text-white md:px-8">
      <div className="mx-auto max-w-4xl rounded-xl border border-white/10 bg-[#0f172a]/70 p-8 shadow-2xl">
        <h1 className="mb-6 text-3xl font-bold md:text-4xl">{title}</h1>
        <div className="whitespace-pre-line text-sm leading-8 text-gray-300 md:text-base">
          {content}
        </div>
        <div className="mt-10">
          <Link to="/" className="text-secondary underline-offset-4 hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export const termsOfServiceContent = `Terms of Service

Welcome to Zyra, a platform for transparent community fundraising and verified social impact campaigns.

By accessing or using Zyra, you agree to comply with these Terms of Service and all applicable laws and regulations. You are responsible for the accuracy of the information you provide and for any activity conducted through your account.

You may not use Zyra to promote fraud, scams, illegal fundraising, or harmful behavior. Zyra reserves the right to review, restrict, or remove campaigns or accounts that violate these terms, applicable laws, or platform policies.

Donations, campaigns, and blockchain-related transactions may be subject to technical, legal, or network conditions beyond Zyra's control. Users should exercise caution and verify information independently where necessary.

These terms may be updated from time to time. Continued use of Zyra after any changes constitutes your acceptance of the updated terms.`;

export const privacyPolicyContent = `Privacy Policy

Zyra respects your privacy and is committed to protecting the personal information you share while using our platform.

We collect information needed to create and secure your account, process donations, communicate with you, and improve our services. This may include your name, email address, wallet-related information, campaign details, and usage data.

We use reasonable technical and organizational measures to protect your information from unauthorized access, loss, or misuse. However, no system is completely secure, and you should also take steps to protect your account credentials and wallet information.

You may manage certain privacy preferences in your account settings. We may update this policy from time to time to reflect changes in our platform, legal obligations, or best practices.

By using Zyra, you consent to the collection and use of your information as described in this privacy policy.`;

export const securityContent = `Zyra Security

At Zyra, security is fundamental to building trust in community fundraising.

Blockchain Transparency

Every eligible donation is recorded on the blockchain, providing an immutable and transparent record that can be independently verified.

Campaign Verification

Every campaign is reviewed before publication to reduce fraud and help ensure that fundraisers are legitimate.

Smart Contract Security

Where smart contracts are used, they are designed to automate donation handling and reduce reliance on manual processes. Zyra continuously reviews and improves contract security as the platform evolves.

Data Protection

Sensitive user information is encrypted during transmission and stored using industry-standard security practices.

Account Security

Users are encouraged to:

Use strong, unique passwords.
Enable multi-factor authentication where available.
Never share wallet recovery phrases or private keys.
Verify official Zyra communication channels before responding to requests.

Fraud Prevention

Zyra actively monitors suspicious activity and reserves the right to suspend campaigns or accounts involved in fraud, scams, money laundering, or other prohibited activities.

Responsible Disclosure

If you discover a security vulnerability, we encourage responsible disclosure. Please report it privately to our security team so it can be investigated and resolved before public disclosure.

Continuous Improvement

Security is an ongoing commitment. Zyra continuously improves its infrastructure, monitoring systems, and verification processes to protect donors, campaign creators, and the broader community.`;

export default LegalPage;
