import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CarSkeleton = () => (
  <li className="rounded-xl shadow-sm pb-6">
    <div className="h-60">
      <Skeleton
        className="w-full h-full rounded-t-xl"
        alt=""
      />
    </div>
    <div className="flex justify-between mt-5 px-6">
      <h4 className="text-[#353537] font-semibold sm:text-lg">
        <Skeleton width={100} />
      </h4>
      <button type="button" className=" text-red-600 w-5 h-5 duration-150 hover:text-red-800">
        <Skeleton />
      </button>
    </div>
  </li>
);

export default CarSkeleton;
