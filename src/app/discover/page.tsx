import { FC } from 'react';

const DiscoverPage: FC = () => {
  return (
    <div className="container h-full w-full overflow-auto overscroll-contain">
      <div className="h-6 w-full md:h-0"></div>

      <h1 className="mb-4 p-4 text-2xl font-bold md:mb-6 md:p-6">发现</h1>

      <div className="flex flex-col gap-4 md:gap-6">
        <section>
          <h2 className="mb-3 px-4 text-xl font-semibold md:mb-4 md:px-6">推荐食谱</h2>
          <div className="grid grid-cols-1 gap-3 px-4 md:grid-cols-2 md:gap-4 md:px-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-muted/30 flex flex-col rounded-lg md:p-4">
                <div className="bg-muted/50 flex h-24 items-center justify-center rounded-md md:h-32">食谱图片</div>
                <div className="p-2">
                  <h3 className="truncate text-sm font-medium md:text-base">健康食谱 {index + 1}</h3>
                  <p className="text-muted-foreground mt-1 line-clamp-2 text-xs md:text-sm">
                    这是一道美味又健康的食谱，富含蛋白质和维生素。
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1 text-xs md:text-sm">
                    <span className="bg-primary/10 text-primary inline-block rounded-full px-2 py-0.5">低脂</span>
                    <span className="bg-primary/10 text-primary inline-block rounded-full px-2 py-0.5">高蛋白</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full">
          <h2 className="mb-3 w-full px-4 text-xl font-semibold md:mb-4 md:px-6">热门食物</h2>
          <div className="flex w-full min-w-0 flex-row gap-3 overflow-x-auto px-4 md:px-6">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="w-24 flex-shrink-0 md:w-32">
                <div className="bg-muted/30 mb-2 flex h-24 items-center justify-center rounded-lg md:h-32">
                  食物 {index + 1}
                </div>
                <div className="truncate text-xs font-medium md:text-sm">热门食物 {index + 1}</div>
                <div className="text-muted-foreground text-xs">300 卡路里</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 px-4 text-xl font-semibold md:mb-4 md:px-6">健康饮食建议</h2>
          <div className="flex flex-col gap-2 px-4 md:gap-3 md:px-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-3 md:p-4">
                <h3 className="mb-1 truncate text-sm font-medium md:text-base">饮食建议 {index + 1}</h3>
                <p className="text-muted-foreground line-clamp-3 text-xs md:text-sm">
                  这是一条基于您的饮食习惯和健康目标的个性化建议，帮助您保持健康的生活方式。
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-24 w-full md:h-12"></div>
      </div>
    </div>
  );
};

export default DiscoverPage;
