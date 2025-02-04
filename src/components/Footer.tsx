'use client';

import { ONCHAINKIT_LINK } from 'src/links';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import ArrowSvg from 'src/svg/ArrowSvg';

const docLinks = [
  { href: ONCHAINKIT_LINK, title: 'Built with OnchainKit' },
];


export default function Footer() {
  return (
    <section className="mt-auto mb-2 flex w-full flex-col-reverse justify-center gap-2 md:mb-6 md:flex-row">
      {/* <aside className="flex items-center pt-2 md:pt-0">
        <h3 className="mr-2 mb-2 text-m md:mb-0">
          Built with {' '}
          <a
            href={ONCHAINKIT_LINK}
            target="_blank"
            rel="noreferrer"
            title="OnchainKit"
            className="font-semibold hover:text-indigo-600"
          >
            OnchainKit
          </a>
        </h3>
      </aside> */}
      <ul className="mt-4 flex max-w-full flex-col flex-wrap justify-center gap-3 md:mt-0 md:flex-row md:justify-start md:gap-6">
        {docLinks.map(({ href, title }) => (
          <li className="flex" key={href}>
            <motion.a
              href={href}
              target="_blank"
              rel="noreferrer"
              title={title}
              className="flex items-center gap-1 hover:text-indigo-600"
              whileHover={{ y: -5 }} // Move up slightly on hover
              transition={{ type: 'spring', stiffness: 300 }} // Add bounciness
            >
              <p>{title}</p>
              <ArrowSvg />
            </motion.a>
          </li>
        ))}
      </ul>

    </section>
  );
}
