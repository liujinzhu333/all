/**
 * 可暂停/继续的计时器类
 */
export class Timer {
  private duration: number;       // 总计时长（毫秒）
  private remaining: number;      // 剩余时间（毫秒）
  private timerId: number | null; // 计时器ID
  private startTime: number | null; // 开始时间戳
  private isRunning: boolean;     // 是否正在运行
  private onTick: (remaining: number) => void; // 每次触发的回调
  private onComplete: () => void; // 计时结束回调

  constructor(
    duration: number,
    onTick: (remaining: number) => void = () => {},
    onComplete: () => void = () => {}
  ) {
    this.duration = duration;
    this.remaining = duration;
    this.timerId = null;
    this.startTime = null;
    this.isRunning = false;
    this.onTick = onTick;
    this.onComplete = onComplete;
  }

  /**
   * 开始/继续计时
   */
  start(): void {
    if (this.isRunning) return;

    this.startTime = Date.now();
    this.isRunning = true;

    this.timerId = window.setInterval(() => {
      if (!this.startTime) return;

      const elapsed = Date.now() - this.startTime;
      this.remaining = this.duration - elapsed;

      // 触发回调
      this.onTick(this.remaining);

      if (this.remaining <= 0) {
        this.stop();
        this.onComplete();
      }
    }, 100) as unknown as number; // TypeScript中setInterval返回值为number
  }

  /**
   * 暂停计时
   */
  pause(): void {
    if (!this.isRunning || !this.timerId) return;

    clearInterval(this.timerId);
    this.duration = this.remaining;
    this.isRunning = false;
    this.timerId = null;
  }

  /**
   * 停止计时（重置）
   */
  stop(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    this.remaining = this.duration;
    this.isRunning = false;
    this.timerId = null;
    this.startTime = null;
  }

  /**
   * 获取剩余时间（毫秒）
   */
  getRemainingTime(): number {
    return this.remaining;
  }

  /**
   * 检查是否正在运行
   */
  isTimerRunning(): boolean {
    return this.isRunning;
  }
}


const timer = new Timer(
  10000, // 10秒
  (remaining) => {
    // 更新显示（格式化为秒）
    // timerDisplay.textContent = (remaining / 1000).toFixed(1) + 's';
  },
  () => {
    // timerDisplay.textContent = '计时结束！';
  }
)
