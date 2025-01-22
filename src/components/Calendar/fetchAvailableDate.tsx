import { convertToDateFormat } from '@store/useSelectDateStore';

const fetchAvailableDate = async (_id: string, baseDate: Date) => {
  const base = `${import.meta.env.VITE_TOUCHEESE_API}/reservation/time?studioId=${_id}&date=${convertToDateFormat(baseDate)}&duration=${60}`;

  try {
    const response = await fetch(base, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.disableDates;
  } catch (err) {
    console.error('Failed to fetch data');
  }
};

export default fetchAvailableDate;
