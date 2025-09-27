import { http, HttpResponse } from "msw";

// Тип для отчета
interface MockReport {
  id: string;
  timestamp: string;
  title: string;
  type: string;
}

// Генерируем моковые отчеты за последний год
function generateMockReports(): MockReport[] {
  const reports: MockReport[] = []; // Явно указываем тип
  const now = new Date();
  const oneYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate(),
  );

  // Количество отчетов по месяцам (от 150 до 350)
  const reportsPerMonth = [
    250, 180, 320, 150, 280, 340, 200, 310, 170, 290, 220, 350,
  ];

  reportsPerMonth.forEach((monthCount, monthIndex) => {
    const year =
      oneYearAgo.getFullYear() +
      Math.floor((monthIndex + oneYearAgo.getMonth()) / 12);
    const month = (oneYearAgo.getMonth() + monthIndex) % 12;

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < monthCount; i++) {
      // Случайный день в месяце
      const day = Math.floor(Math.random() * daysInMonth) + 1;
      // Случайное время в течение дня
      const hours = Math.floor(Math.random() * 24);
      const minutes = Math.floor(Math.random() * 60);

      const randomDate = new Date(year, month, day, hours, minutes);

      // Пропускаем даты в будущем
      if (randomDate > now) continue;

      reports.push({
        id: `report-${reports.length + 1}`,
        timestamp: randomDate.toISOString(),
        title: `Отчет #${reports.length + 1}`,
        type: ["аналитический", "технический", "финансовый"][
          Math.floor(Math.random() * 3)
        ],
      });
    }
  });

  return reports;
}

const mockReports = generateMockReports();

export const handlersReports = [
  // Новый handler для получения отчетов
  http.get("/api/reports", () => {
    return HttpResponse.json(mockReports);
  }),
];
