import className from 'classnames';
import Image from "next/image";
import { useRouter } from 'next/navigation';

const VerticalFeatureRow = (props) => {
  const verticalFeatureClass = className(
    'mt-20',
    'flex',
    'flex-wrap',
    'items-center',
    {
      'flex-row-reverse': props.reverse,
    },
  );

  const router = useRouter();

  return (
    <div className={verticalFeatureClass}>
      <div className="w-full text-center sm:w-1/2 sm:px-6">
        <h3 className="text-3xl font-semibold text-gray-900">{props.title}</h3>
        <div className="mt-6 text-xl leading-9">{props.description}</div>
      </div>

      <div className="w-full p-6 sm:w-1/2">

        <img className={`w-80 mx-auto md:mx-0 ${props.reverse ? 'md:mr-auto' : 'md:ml-auto'}`} src={`${props.image}`} alt={props.imageAlt} />
      </div>
    </div>
  );
};

export default VerticalFeatureRow;
