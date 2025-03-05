import FilterPriceSlidePC from '@components/FilterPriceSlide/FilterPriceSlidePC';
import ServiceAvailability from '@components/ServiceAvailability/ServiceAvailability';

const PCFilterWrapper = () => {
  return (
    <>
      <FilterPriceSlidePC />
      <ServiceAvailability isPc={true} />
    </>
  );
};

export default PCFilterWrapper;
