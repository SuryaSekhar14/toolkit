export class PyPiStatsModel {
  lastDayDownloads: number;
  lastWeekDownloads: number;
  lastMonthDownloads: number;
  lastSixMonthsDownloads: number;
  lastYearDownloads: number;
  totalDownloads: number;

  constructor(
    lastDayDownloads: number,
    lastWeekDownloads: number,
    lastMonthDownloads: number,
    lastSixMonthsDownloads: number,
    lastYearDownloads: number,
    totalDownloads: number
  ) {
    this.lastDayDownloads = lastDayDownloads;
    this.lastWeekDownloads = lastWeekDownloads;
    this.lastMonthDownloads = lastMonthDownloads;
    this.lastSixMonthsDownloads = lastSixMonthsDownloads;
    this.lastYearDownloads = lastYearDownloads;
    this.totalDownloads = totalDownloads;
  }
} 