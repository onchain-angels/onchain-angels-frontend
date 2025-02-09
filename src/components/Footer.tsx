'use client';

import { ONCHAINKIT_LINK } from 'src/links';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import ArrowSvg from 'src/svg/ArrowSvg';

const docLinks = [
  { href: '/terms', title: 'Terms', external: false },
  { href: '/privacy', title: 'Privacy', external: false },
  { href: ONCHAINKIT_LINK, title: 'Built with OnchainKit', external: true },
];


export default function Footer() {
  return (
    <section className="mt-auto mb-2 flex w-full flex-col-reverse justify-center gap-2 md:mb-6 md:flex-row py-8">
      <ul className="mt-4 flex max-w-full flex-wrap justify-center gap-4 md:mt-0 md:flex-row md:justify-start md:gap-6">
        {docLinks.map(({ href, title, external }) => (
          <li key={href}>
            <motion.a
              href={href}
              target={external ? "_blank" : "_self"}
              rel={external ? "noreferrer" : undefined}
              title={title}
              className="flex items-center gap-1 hover:text-indigo-600"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <p>{title}</p>
              {external && <ArrowSvg />}
            </motion.a>
          </li>
        ))}
      </ul>

    </section>
  );
}
