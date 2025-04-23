interface ReservationItem {
  date: string;
  startTime: string;
}

export const sortReservations = <T extends ReservationItem>(items: T[]): T[] => {
  return items.sort((a, b) => {
    // 1. date 비교
    if (a.date !== b.date) {
      return a.date < b.date ? -1 : 1; // date가 빠른 순으로 정렬
    }

    // 2. startTime 비교 (date가 같을 때)
    return a.startTime < b.startTime ? -1 : 1;
  });
};
