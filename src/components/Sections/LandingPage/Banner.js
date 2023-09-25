import Link from 'next/link';

import CTABanner from './CTABanner';
import Section from './Section';

const Banner = () => (
  <Section>
    <CTABanner
      title="Adopting new technology feels like a major shift"
      subtitle="It doesn't have to be."
      button={
        <Link href="https://creativedesignsguru.com/category/nextjs/">
          <div className="inline-block rounded-md text-center text-white bg-primary cursor-pointer text-lg font-semibold py-2 px-4">
            Book a consultation
          </div>
          <div className='text-center'>
            (No strings attached)
          </div>
        </Link>
      }
    />
  </Section>
);

export default Banner;
