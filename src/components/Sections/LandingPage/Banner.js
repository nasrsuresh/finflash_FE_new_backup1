import Link from 'next/link';

import CTABanner from './CTABanner';
import Section from './Section';

const Banner = () => (
  <Section>
    <CTABanner
      title="Adopting new technology feels like a major shift"
      subtitle="It doesn't have to be."
      button={
        <Link href="https://calendly.com/sdivyamit/30min?back=1&month=2023-09">
          <div className="inline-block rounded-md text-center text-white font-extrabold text-xl py-4 px-6 bg-primary cursor-pointer">
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
