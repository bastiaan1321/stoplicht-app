export function msToBft(ms: number): number {
    const thresholds = [0.3, 1.5, 3.3, 5.5, 7.9, 10.7, 13.8, 17.1, 20.7, 24.4, 28.4, 32.6];
    for (let bft = 0; bft < thresholds.length; bft++) {
      if (ms < thresholds[bft]) return bft;
    }
    return 12;
  }
  