'use client';

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Demo() {
  return (
    <div className="container h-full w-full overflow-auto overscroll-contain">
      <div className="h-6 w-full md:h-0"></div>

      <div className="container mx-auto max-w-[1200px] space-y-16 px-4 py-16">
        {/* 页面标题 */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">组件展示 </h1>
          <p className="text-muted-foreground text-lg">这里展示了所有可用的组件及其变体组合</p>
        </div>

        {/* 功能预览 */}
        <section className="space-y-8">
          <div className="space-y-3 border-b pb-6">
            <h2 className="text-2xl font-semibold tracking-tight">功能预览</h2>
            <p className="text-muted-foreground text-lg">应用的主要功能预览</p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/demo/capture">
                <Button>拍摄食物功能预览</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 按钮组件 */}
        <section className="space-y-8">
          <div className="space-y-3 border-b pb-6">
            <h2 className="text-2xl font-semibold tracking-tight">按钮 Button</h2>
            <p className="text-muted-foreground text-lg">按钮组件支持多种样式变体和尺寸</p>
          </div>

          {/* 变体展示 */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium">变体 Variants</h3>
              <div className="flex flex-wrap items-center gap-6">
                <Button variant="default">Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            {/* 尺寸展示 */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">尺寸 Sizes</h3>
              <div className="flex flex-wrap items-center gap-6">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* 状态展示 */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">状态 States</h3>
              <div className="flex flex-wrap gap-6">
                <Button disabled>Disabled</Button>
                <Button variant="outline" disabled>
                  Disabled Outline
                </Button>
                <Button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  With Icon
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 抽屉组件 */}
        <section className="space-y-8">
          <div className="space-y-3 border-b pb-6">
            <h2 className="text-2xl font-semibold tracking-tight">抽屉 Drawer</h2>
            <p className="text-muted-foreground text-lg">抽屉组件支持多个方向和自定义内容</p>
          </div>

          <div className="space-y-8">
            {/* 方向展示 */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">方向 Directions</h3>
              <div className="flex flex-wrap gap-6">
                <Drawer direction="bottom">
                  <DrawerTrigger asChild>
                    <Button variant="outline">从底部打开</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>底部抽屉</DrawerTitle>
                      <DrawerDescription>这是一个从底部滑出的抽屉组件，常用于移动端。</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                      <p>抽屉的主要内容区域</p>
                    </div>
                    <DrawerFooter>
                      <Button variant="outline" className="w-full">
                        关闭
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                <Drawer direction="right">
                  <DrawerTrigger asChild>
                    <Button variant="outline">从右侧打开</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>右侧抽屉</DrawerTitle>
                      <DrawerDescription>这是一个从右侧滑出的抽屉组件，常用于桌面端。</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                      <p>抽屉的主要内容区域</p>
                    </div>
                    <DrawerFooter>
                      <Button variant="outline" className="w-full">
                        关闭
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                <Drawer direction="left">
                  <DrawerTrigger asChild>
                    <Button variant="outline">从左侧打开</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>左侧抽屉</DrawerTitle>
                      <DrawerDescription>这是一个从左侧滑出的抽屉组件，常用于导航菜单。</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                      <p>抽屉的主要内容区域</p>
                    </div>
                    <DrawerFooter>
                      <Button variant="outline" className="w-full">
                        关闭
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                <Drawer direction="top">
                  <DrawerTrigger asChild>
                    <Button variant="outline">从顶部打开</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>顶部抽屉</DrawerTitle>
                      <DrawerDescription>这是一个从顶部滑出的抽屉组件，适用于特殊场景。</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                      <p>抽屉的主要内容区域</p>
                    </div>
                    <DrawerFooter>
                      <Button variant="outline" className="w-full">
                        关闭
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>

            {/* 自定义内容展示 */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium">自定义内容 Custom Content</h3>
              <div className="flex flex-wrap gap-6">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">打开表单抽屉</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>表单示例</DrawerTitle>
                      <DrawerDescription>这是一个包含表单的抽屉示例。</DrawerDescription>
                    </DrawerHeader>
                    <div className="space-y-4 p-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">用户名</label>
                        <input type="text" className="w-full rounded-md border px-3 py-2" placeholder="请输入用户名" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">密码</label>
                        <input
                          type="password"
                          className="w-full rounded-md border px-3 py-2"
                          placeholder="请输入密码"
                        />
                      </div>
                    </div>
                    <DrawerFooter>
                      <Button className="w-full">提交</Button>
                      <Button variant="outline" className="w-full">
                        取消
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline">打开列表抽屉</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>列表示例</DrawerTitle>
                      <DrawerDescription>这是一个包含列表的抽屉示例。</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                      <ul className="space-y-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <li key={i} className="bg-muted flex items-center justify-between rounded-lg p-3">
                            <span>列表项 {i + 1}</span>
                            <Button variant="ghost" size="sm">
                              操作
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <DrawerFooter>
                      <Button variant="outline" className="w-full">
                        关闭
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </div>
        </section>

        {/* 这里可以添加更多组件展示区域 */}
        <div className="border-muted-foreground/20 flex h-[300px] items-center justify-center rounded-xl border-2 border-dashed">
          <p className="text-muted-foreground text-lg">更多组件即将添加...</p>
        </div>
      </div>

      <div className="h-24 w-full md:h-12"></div>
    </div>
  );
}
