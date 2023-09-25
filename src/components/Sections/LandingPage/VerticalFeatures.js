import Section from './Section';
import VerticalFeatureRow from './VerticalFeatureRow';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const VerticalFeatures = () => (
  <div
    className={`mx-auto max-w-screen-lg px-3 py-16`}
  >
    <div className="mb-12 text-center">
      <h2 className="text-4xl font-bold text-gray-900">What Makes Us Unique?</h2>
      <div className="mt-4 text-xl md:px-20">
        <ul className='text-start list-disc'>
          <li>Tailored solutions for small Investment management & research firms</li>
          <li>Expectational value to your investment compared to one size fit all AI software</li>
          <li>Fully-managed solutions from infrastructure to technical expertise to maintenance</li>
          <li>Human-centered design</li>
          <li>Pilot, Prove & Scale approach</li>
        </ul>
      </div>
    </div>

    <VerticalFeatureRow
      title="Uncover hidden insights"
      description="Contextual Synonyms Search 
      Not just keyword, understand the hidden narratives and subtle cues that many miss & gain a competitive edge
      "
      image="/assets/images/hiddeninsights.png"
      imageAlt="First feature alt text"
    />
    <VerticalFeatureRow
      title="Keep a track of portfolio"
      description="AI Smart Summaries
      Observe & monitor the critical information through summarized earning calls, events & news 
      "
      image="/assets/images/monitorportfolio.png"
      imageAlt="Second feature alt text"
      reverse
    />
    <VerticalFeatureRow
      title="Read the pulse of the leaders"
      description="Statement analyzer
      Identify positive,negative & uncertain statements from documents & speech "
      image="/assets/images/readthepulse.png"
      imageAlt="Third feature alt text"
    />
    <VerticalFeatureRow
      title="Identify Undervalued companies"
      description="Precompiled insights
      Use analyst curated reports to quick sights on the sector specific comments, red flags & strategic focus of the firm "
      image="/assets/images/unervaluedcompanies.png"
      imageAlt="Third feature alt text"
      reverse
    />
    <VerticalFeatureRow
      title="Streamline workflows"
      description="Automation of repeated tasks 
      Say goodbye to manual tasks. Whether it's effortlessly compiling Pitchbooks, converting PDFs to Excel tables, do it all with precision"
      image="/assets/images/streamline-tasks.png"
      imageAlt="Third feature alt text"
    />
    <VerticalFeatureRow
      title="Any tailored solutions for your specific needs"
      description="Ask us for more. We are open to create any solution that solves your problem"
      image="/assets/images/tailoredsolutions.png"
      imageAlt="Third feature alt text"
      reverse
    />

    <div className='flex md:grid grid-cols-2 flex-col-reverse items-center mt-10 gap-4'>
      <div className='basis-full flex flex-col justify-center'>
        <div className="inline-block rounded-md text-center text-white font-extrabold text-xl py-4 px-6 bg-primary cursor-pointer">
          Book a consultation
        </div>
        <div className='text-center'>
          (No strings attached)
        </div>
      </div>
      <Splide className='my-4' options={{
        autoplay: true,
        interval: 4000,
        type: "loop"
      }}>
        <SplideSlide>
          <div>
            <img className="mx-auto" src="/assets/images/semantic.png" alt="" />

          </div>
        </SplideSlide>
        <SplideSlide>
          <div >
            <img className="mx-auto" src="/assets/images/statementanalyzer.png" alt="" />

          </div>
        </SplideSlide>
        <SplideSlide>
          <div>
            <img className="mx-auto" src="/assets/images/automation.png" alt="" />

          </div>
        </SplideSlide>
      </Splide>
    </div>

  </div>



);

export default VerticalFeatures;
