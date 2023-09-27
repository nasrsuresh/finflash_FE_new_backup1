import LandingHeader from '@/components/Sections/LandingPage/LandingHeader';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Link from 'next/link';


const Hero = () => {


  return (
    <div className="bg-gray-100">
      <LandingHeader />
      <div className="mx-auto container px-3 pt-20 pb-32">
        <div className="flex w-full gap-6 flex-col md:flex-row">
          <div className="text-right">
            <header className="text-left">
              <h1
                className="whitespace-pre-line text-3xl md:text-5xl font-bold md:leading-snug text-gray-900"
              >
                Crafted for your needs &amp; Automation solutions for Boutique Investment Mgmt.
                &amp; Research firms
                <span className="text-primary block">Achieve More in Less time</span>
              </h1>
              <div className="mb-16 mt-4 text-2xl">
                Curious to discover a solution precisely crafted for your needs?
              </div>
              <Link className='flex w-fit flex-col' href="https://calendly.com/sdivyamit/30min?back=1&month=2023-09">
                <div className="inline-block rounded-md text-center text-white font-extrabold text-xl py-4 px-6 bg-primary cursor-pointer">
                  Book a consultation
                </div>
                <div className='text-center'>
                  (No strings attached)
                </div>
              </Link>

            </header>
          </div>
          <div>
            <Splide className="my-4 " options={{
              autoplay: true,
              interval: 4000,
              width: 1200,
              type: "loop"
            }}>
              <SplideSlide>
                <div>
                  <img className='mx-auto' src="/assets/images/semantic.png" alt="" />

                </div>
              </SplideSlide>
              <SplideSlide>
                <div >
                  <img className='mx-auto' src="/assets/images/statementanalyzer.png" alt="" />

                </div>
              </SplideSlide>
              <SplideSlide>
                <div>
                  <img className='mx-auto' src="/assets/images/automation.png" alt="" />
                </div>
              </SplideSlide>
            </Splide>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Hero;
