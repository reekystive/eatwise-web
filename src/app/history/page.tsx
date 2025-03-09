import { FC } from 'react';

const HistoryPage: FC = () => {
  return (
    <div className="container h-full w-full overflow-auto overscroll-contain">
      <div className="h-6 w-full md:h-0"></div>

      <h1 className="mb-4 p-4 text-2xl font-bold md:mb-6 md:p-6">历史</h1>

      <div className="space-y-6 px-4 md:px-6">
        <div>
          <h2 className="mb-4 text-xl font-semibold">历史数据</h2>
          <div className="bg-muted/30 flex h-64 items-center justify-center rounded-lg">历史数据图表区域</div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">历史记录</h2>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-muted/30 flex items-center justify-between rounded-lg p-4">
                <div>
                  <div className="font-medium">记录 {index + 1}</div>
                  <div className="text-muted-foreground text-sm">2023-03-{String(index + 1).padStart(2, '0')}</div>
                </div>
                <div className="text-right">
                  <div>2000 卡路里</div>
                  <div className="text-muted-foreground text-sm">蛋白质: 120g</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-24 w-full md:h-12"></div>
    </div>
  );
};

export default HistoryPage;
